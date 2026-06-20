import { Ionicons } from "@expo/vector-icons";
import type { SQLiteDatabase } from "expo-sqlite";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import type { Product } from "react-native-iap";
import { builtInLexicons, type AccessLevel } from "./src/data/freeLexicons";
import {
  ensureDefaultProfile,
  listDueWords,
  listEntitlements,
  listLexicons,
  listStudyWords,
  openLocalDatabase,
  upsertEntitlement,
  upsertProgress,
  type EntitlementRecord,
  type Profile,
  type WordWithProgress
} from "./src/db/localRepository";
import { buildEntitlement, canAccessLexicon, productForLexicon, type Entitlement } from "./src/entitlement";
import {
  buyLexicon,
  closePurchaseConnection,
  loadProducts,
  readErrorMessage,
  restorePurchases,
  subscribeToPurchaseUpdates,
  syncOwnedPurchases
} from "./src/purchases";
import { applyReview } from "./src/srs";

type Tab = "study" | "library" | "settings";
type StudyMode = "autoplay" | "challenge";
type AutoplaySpeed = 3000 | 5000 | 8000;
type ChallengeStatus = "active" | "passed" | "failed";

type LexiconSummary = {
  id: string;
  title: string;
  level: string;
  access: AccessLevel;
  wordCount: number;
};

type StudyChapter = {
  id: string;
  label: string;
  words: WordWithProgress[];
};

const challengeLivesMax = 5;
const kanaPool = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゃゅょっー".split("");

export default function App() {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tab, setTab] = useState<Tab>("study");
  const [studyMode, setStudyMode] = useState<StudyMode>("autoplay");
  const [lexicons, setLexicons] = useState<LexiconSummary[]>([]);
  const [entitlementRecords, setEntitlementRecords] = useState<EntitlementRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedLexiconId, setSelectedLexiconId] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState("");
  const [studyWords, setStudyWords] = useState<WordWithProgress[]>([]);
  const [dueWords, setDueWords] = useState<WordWithProgress[]>([]);
  const [autoplayIndex, setAutoplayIndex] = useState(0);
  const [autoplayPlaying, setAutoplayPlaying] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState<AutoplaySpeed>(5000);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeInput, setChallengeInput] = useState("");
  const [challengeResult, setChallengeResult] = useState<"" | "correct" | "wrong">("");
  const [challengeLives, setChallengeLives] = useState(challengeLivesMax);
  const [challengeCorrect, setChallengeCorrect] = useState(0);
  const [challengeWrong, setChallengeWrong] = useState(0);
  const [challengeStartedAt, setChallengeStartedAt] = useState(Date.now());
  const [challengeEndedAt, setChallengeEndedAt] = useState(0);
  const [challengeStatus, setChallengeStatus] = useState<ChallengeStatus>("active");
  const [loading, setLoading] = useState(true);
  const [busyMessage, setBusyMessage] = useState("");
  const [notice, setNotice] = useState("");

  const entitlement = useMemo(
    () => buildEntitlement(entitlementRecords.map((record) => record.lexiconId)),
    [entitlementRecords]
  );
  const productById = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);
  const chapters = useMemo(() => buildChapters(studyWords), [studyWords]);
  const activeChapter = chapters.find((chapter) => chapter.id === selectedChapterId) || chapters[0];
  const chapterWords = activeChapter?.words || studyWords;
  const challengeWords = useMemo(() => {
    const ids = new Set(chapterWords.map((word) => word.id));
    const dueInChapter = dueWords.filter((word) => ids.has(word.id));
    return dueInChapter.length ? dueInChapter : chapterWords;
  }, [chapterWords, dueWords]);
  const currentAutoplayWord = chapterWords[autoplayIndex % Math.max(chapterWords.length, 1)];
  const currentChallengeWord = challengeWords[challengeIndex % Math.max(challengeWords.length, 1)];
  const visibleLexiconCount = lexicons.filter((lexicon) => canAccessLexicon(lexicon.access, lexicon.id, entitlement)).length;

  useEffect(() => {
    let mounted = true;
    openLocalDatabase()
      .then(async (database) => {
        const [nextProfile, nextLexicons, nextEntitlements] = await Promise.all([
          ensureDefaultProfile(database),
          listLexicons(database),
          listEntitlements(database)
        ]);
        if (!mounted) return;
        const initialEntitlement = buildEntitlement(nextEntitlements.map((record) => record.lexiconId));
        const firstOpenLexicon = nextLexicons.find((lexicon) => canAccessLexicon(lexicon.access, lexicon.id, initialEntitlement));
        setDb(database);
        setProfile(nextProfile);
        setLexicons(nextLexicons);
        setEntitlementRecords(nextEntitlements);
        setSelectedLexiconId(firstOpenLexicon?.id || nextLexicons[0]?.id || "");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setNotice(readErrorMessage(error));
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!db) return;
    const unsubscribe = subscribeToPurchaseUpdates(
      async (record) => {
        await upsertEntitlement(db, record);
        await reloadEntitlements(db);
        setNotice("购买成功，词库已解锁。");
      },
      (message) => setNotice(message)
    );
    return unsubscribe;
  }, [db]);

  useEffect(() => {
    loadProducts()
      .then(setProducts)
      .catch((error) => setNotice(readErrorMessage(error)));
    return () => {
      void closePurchaseConnection();
    };
  }, []);

  useEffect(() => {
    void refresh();
  }, [db, profile?.id, selectedLexiconId, entitlementRecords]);

  useEffect(() => {
    const current = lexicons.find((lexicon) => lexicon.id === selectedLexiconId);
    if (!current || canAccessLexicon(current.access, current.id, entitlement)) return;
    const fallback = lexicons.find((lexicon) => canAccessLexicon(lexicon.access, lexicon.id, entitlement));
    setSelectedLexiconId(fallback?.id || "");
    setSelectedChapterId("");
  }, [entitlement, lexicons, selectedLexiconId]);

  useEffect(() => {
    if (!selectedChapterId && chapters[0]) setSelectedChapterId(chapters[0].id);
    if (selectedChapterId && !chapters.some((chapter) => chapter.id === selectedChapterId)) {
      setSelectedChapterId(chapters[0]?.id || "");
    }
  }, [chapters, selectedChapterId]);

  useEffect(() => {
    if (studyMode !== "autoplay" || !autoplayPlaying || chapterWords.length <= 1) return;
    const timer = setInterval(() => {
      setAutoplayIndex((index) => (index + 1) % chapterWords.length);
    }, autoplaySpeed);
    return () => clearInterval(timer);
  }, [autoplayPlaying, autoplaySpeed, studyMode, chapterWords.length]);

  async function reloadEntitlements(database = db) {
    if (!database) return [];
    const nextEntitlements = await listEntitlements(database);
    setEntitlementRecords(nextEntitlements);
    return nextEntitlements;
  }

  async function refresh(nextLexiconId = selectedLexiconId) {
    if (!db || !profile || !nextLexiconId) return;
    const [nextDueWords, nextStudyWords] = await Promise.all([
      listDueWords(db, entitlement, profile.id, nextLexiconId),
      listStudyWords(db, entitlement, profile.id, nextLexiconId)
    ]);
    setDueWords(nextDueWords);
    setStudyWords(nextStudyWords);
    setAutoplayIndex(0);
    resetChallengeState();
  }

  async function selectLexicon(lexicon: LexiconSummary) {
    if (!canAccessLexicon(lexicon.access, lexicon.id, entitlement)) {
      setTab("library");
      setNotice("该词库需要购买后学习。");
      return;
    }
    setSelectedLexiconId(lexicon.id);
    setSelectedChapterId("");
    await refresh(lexicon.id);
  }

  async function purchaseLexicon(lexicon: LexiconSummary) {
    if (!db) return;
    const product = productForLexicon(lexicon.id);
    if (!product) {
      setNotice("该词库尚未配置商店商品。");
      return;
    }
    await withBusy("正在打开商店", async () => {
      const result = await buyLexicon(product.productId);
      for (const record of result.entitlements) {
        await upsertEntitlement(db, record);
      }
      await reloadEntitlements();
      setNotice(result.message);
    });
  }

  async function restoreOwnedLexicons() {
    if (!db) return;
    await withBusy("正在恢复购买", async () => {
      const result = await restorePurchases();
      for (const record of result.entitlements) {
        await upsertEntitlement(db, record);
      }
      await reloadEntitlements();
      setNotice(result.message);
    });
  }

  async function syncPurchases() {
    if (!db) return;
    await withBusy("正在同步购买", async () => {
      const result = await syncOwnedPurchases();
      for (const record of result.entitlements) {
        await upsertEntitlement(db, record);
      }
      await reloadEntitlements();
      setNotice(result.message);
    });
  }

  async function withBusy(message: string, task: () => Promise<void>) {
    setBusyMessage(message);
    try {
      await task();
    } catch (error) {
      setNotice(readErrorMessage(error));
    } finally {
      setBusyMessage("");
    }
  }

  function selectChapter(id: string) {
    setSelectedChapterId(id);
    setAutoplayIndex(0);
    resetChallengeState();
  }

  function switchStudyMode(nextMode: StudyMode) {
    setStudyMode(nextMode);
    setAutoplayPlaying(false);
    resetChallengeState();
  }

  function moveAutoplay(offset: number) {
    if (!chapterWords.length) return;
    setAutoplayIndex((index) => (index + offset + chapterWords.length) % chapterWords.length);
  }

  async function gradeCurrentWord(grade: "wrong" | "hard" | "correct") {
    if (!db || !profile || !currentAutoplayWord) return;
    await upsertProgress(db, profile.id, applyReview(currentAutoplayWord.progress, grade));
    await refresh();
    moveAutoplay(1);
  }

  function appendChallengeKana(kana: string) {
    if (!currentChallengeWord || challengeStatus !== "active") return;
    if (challengeResult === "correct") return;
    const cleanInput = challengeResult === "wrong" ? "" : challengeInput;
    const next = `${cleanInput}${kana}`.slice(0, currentChallengeWord.kana.length);
    setChallengeResult("");
    setChallengeInput(next);
    if (next.length >= currentChallengeWord.kana.length) void resolveChallengeAnswer(next);
  }

  async function resolveChallengeAnswer(input: string) {
    if (!db || !profile || !currentChallengeWord || challengeStatus !== "active") return;
    const correct = input === currentChallengeWord.kana;
    if (correct) {
      setChallengeResult("correct");
      setChallengeCorrect((count) => count + 1);
      await upsertProgress(db, profile.id, applyReview(currentChallengeWord.progress, "correct"));
      setTimeout(() => advanceChallenge(), 650);
      return;
    }

    const nextLives = Math.max(0, challengeLives - 1);
    setChallengeResult("wrong");
    setChallengeInput("");
    setChallengeWrong((count) => count + 1);
    setChallengeLives(nextLives);
    await upsertProgress(db, profile.id, applyReview(currentChallengeWord.progress, "wrong"));
    if (nextLives <= 0) {
      setChallengeStatus("failed");
      setChallengeEndedAt(Date.now());
    }
  }

  function revealChallengeAnswer() {
    if (!currentChallengeWord) return;
    Alert.alert("答案", currentChallengeWord.kana, [
      { text: "继续", onPress: () => void resolveChallengeAnswer("") }
    ]);
  }

  function advanceChallenge() {
    setChallengeInput("");
    setChallengeResult("");
    setChallengeIndex((index) => {
      if (index + 1 >= challengeWords.length) {
        setChallengeStatus("passed");
        setChallengeEndedAt(Date.now());
        return index;
      }
      return index + 1;
    });
  }

  function resetChallengeState() {
    setChallengeIndex(0);
    setChallengeInput("");
    setChallengeResult("");
    setChallengeLives(challengeLivesMax);
    setChallengeCorrect(0);
    setChallengeWrong(0);
    setChallengeStartedAt(Date.now());
    setChallengeEndedAt(0);
    setChallengeStatus("active");
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.muted}>正在准备本地词库</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>JpWords</Text>
          <Text style={styles.muted}>{profile?.nickname || "默认学习者"} · 离线学习档案</Text>
        </View>
        <View style={styles.entitlementBadge}>
          <Ionicons name={entitlementRecords.length ? "diamond" : "lock-closed"} size={16} color="#176d5f" />
          <Text style={styles.entitlementText}>{entitlementRecords.length ? "已解锁" : "免费版"}</Text>
        </View>
      </View>

      {!!notice && (
        <Pressable style={styles.notice} onPress={() => setNotice("")}>
          <Text style={styles.noticeText}>{notice}</Text>
        </Pressable>
      )}

      {!!busyMessage && (
        <View style={styles.busyBar}>
          <ActivityIndicator size="small" />
          <Text style={styles.muted}>{busyMessage}</Text>
        </View>
      )}

      {tab === "study" && (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.segmented}>
            <ModeButton active={studyMode === "autoplay"} icon="play-circle" label="自动播放" onPress={() => switchStudyMode("autoplay")} />
            <ModeButton active={studyMode === "challenge"} icon="game-controller" label="假名挑战" onPress={() => switchStudyMode("challenge")} />
          </View>

          <HorizontalPicker title="词库" items={lexicons} selectedId={selectedLexiconId} entitlement={entitlement} onSelect={selectLexicon} />
          <ChapterPicker chapters={chapters} selectedId={activeChapter?.id || ""} onSelect={selectChapter} />

          <View style={styles.statsRow}>
            <Metric label="本章" value={chapterWords.length} />
            <Metric label="可用词库" value={visibleLexiconCount} />
            <Metric label="待复习" value={dueWords.length} />
          </View>

          {studyMode === "autoplay" ? (
            <AutoplayCard
              word={currentAutoplayWord}
              index={autoplayIndex}
              total={chapterWords.length}
              playing={autoplayPlaying}
              speed={autoplaySpeed}
              onPrev={() => moveAutoplay(-1)}
              onNext={() => gradeCurrentWord("correct")}
              onToggle={() => setAutoplayPlaying((playing) => !playing)}
              onWrong={() => gradeCurrentWord("wrong")}
              onHard={() => gradeCurrentWord("hard")}
              onSpeed={setAutoplaySpeed}
            />
          ) : (
            <ChallengeCard
              word={currentChallengeWord}
              index={challengeIndex}
              total={challengeWords.length}
              input={challengeInput}
              result={challengeResult}
              lives={challengeLives}
              correct={challengeCorrect}
              wrong={challengeWrong}
              status={challengeStatus}
              startedAt={challengeStartedAt}
              endedAt={challengeEndedAt}
              onKana={appendChallengeKana}
              onReveal={revealChallengeAnswer}
              onRestart={resetChallengeState}
              onBackToAutoplay={() => switchStudyMode("autoplay")}
            />
          )}

          {entitlement.showAds && <AdPlaceholder />}
        </ScrollView>
      )}

      {tab === "library" && (
        <LibraryView
          lexicons={lexicons}
          entitlement={entitlement}
          selectedId={selectedLexiconId}
          productById={productById}
          busy={!!busyMessage}
          onSelect={selectLexicon}
          onPurchase={purchaseLexicon}
        />
      )}

      {tab === "settings" && (
        <SettingsView
          profile={profile}
          lexiconCount={builtInLexicons.length}
          entitlementCount={entitlementRecords.length}
          showAds={entitlement.showAds}
          busy={!!busyMessage}
          onRestore={restoreOwnedLexicons}
          onSync={syncPurchases}
        />
      )}

      <View style={styles.tabs}>
        <TabButton active={tab === "study"} icon="albums" label="学习" onPress={() => setTab("study")} />
        <TabButton active={tab === "library"} icon="book" label="词库" onPress={() => setTab("library")} />
        <TabButton active={tab === "settings"} icon="settings" label="设置" onPress={() => setTab("settings")} />
      </View>
    </SafeAreaView>
  );
}

function AutoplayCard({
  word,
  index,
  total,
  playing,
  speed,
  onPrev,
  onNext,
  onToggle,
  onWrong,
  onHard,
  onSpeed
}: {
  word?: WordWithProgress;
  index: number;
  total: number;
  playing: boolean;
  speed: AutoplaySpeed;
  onPrev: () => void;
  onNext: () => void;
  onToggle: () => void;
  onWrong: () => void;
  onHard: () => void;
  onSpeed: (speed: AutoplaySpeed) => void;
}) {
  if (!word) return <EmptyCard title="暂无可学习单词" copy="请选择免费词库，或购买并恢复付费词库。" />;
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.badge}>{word.level}</Text>
        <Text style={styles.muted}>{index + 1}/{total}</Text>
      </View>
      <Text style={styles.word}>{word.japanese}</Text>
      <Text style={styles.kana}>{word.kana}</Text>
      <View style={styles.answer}>
        <Text style={styles.meaning}>{word.meaning}</Text>
        <Text style={styles.partTag}>{word.part}</Text>
        {!!word.example && <Text style={styles.example}>{word.example}</Text>}
        {!!word.translation && <Text style={styles.muted}>{word.translation}</Text>}
      </View>
      <View style={styles.actions}>
        <Action label="没记住" tone="danger" onPress={onWrong} />
        <Action label="<" onPress={onPrev} />
        <Action label={playing ? "暂停" : "播放"} tone="primary" onPress={onToggle} />
        <Action label="记住" tone="primary" onPress={onNext} />
        <Action label="模糊" onPress={onHard} />
      </View>
      <View style={styles.speedRow}>
        {[3000, 5000, 8000].map((item) => (
          <Pressable key={item} style={[styles.speedButton, speed === item && styles.speedButtonActive]} onPress={() => onSpeed(item as AutoplaySpeed)}>
            <Text style={[styles.speedText, speed === item && styles.speedTextActive]}>{item / 1000} 秒</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function ChallengeCard({
  word,
  index,
  total,
  input,
  result,
  lives,
  correct,
  wrong,
  status,
  startedAt,
  endedAt,
  onKana,
  onReveal,
  onRestart,
  onBackToAutoplay
}: {
  word?: WordWithProgress;
  index: number;
  total: number;
  input: string;
  result: "" | "correct" | "wrong";
  lives: number;
  correct: number;
  wrong: number;
  status: ChallengeStatus;
  startedAt: number;
  endedAt: number;
  onKana: (kana: string) => void;
  onReveal: () => void;
  onRestart: () => void;
  onBackToAutoplay: () => void;
}) {
  if (!word) return <EmptyCard title="暂无挑战单词" copy="当前词库没有到期词，可以切回自动播放。" />;
  if (status !== "active") {
    const seconds = Math.max(0, Math.round(((endedAt || Date.now()) - startedAt) / 1000));
    const answered = correct + wrong;
    const accuracy = Math.round((correct / Math.max(answered, 1)) * 100);
    const score = Math.max(0, correct * 100 - wrong * 30 + lives * 50);
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{status === "passed" ? "挑战通过" : "挑战失败"}</Text>
        <View style={styles.statsRow}>
          <Metric label="正确率" value={`${accuracy}%`} />
          <Metric label="得分" value={score} />
          <Metric label="用时" value={`${seconds}s`} />
        </View>
        <Text style={styles.muted}>正确 {correct} / 错误 {wrong} / 总题 {total}</Text>
        <View style={styles.actions}>
          <Action label="重新开始" tone="primary" onPress={onRestart} />
          <Action label="返回播放" onPress={onBackToAutoplay} />
        </View>
      </View>
    );
  }

  const choices = buildKanaChoices(word.kana);
  const hintKana = result === "wrong" ? new Set(Array.from(word.kana)) : null;
  const resultIcon = result === "correct" ? "✓" : result === "wrong" ? "×" : "";

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.badge}>{word.level}</Text>
        <Text style={styles.muted}>{index + 1}/{total}</Text>
      </View>
      <View style={styles.lifeRow}>
        {Array.from({ length: challengeLivesMax }, (_, item) => (
          <Ionicons key={item} name="heart" size={18} color={item < lives ? "#d95032" : "#dfe5e0"} />
        ))}
      </View>
      <Text style={styles.word}>{word.japanese}</Text>
      <View style={styles.answer}>
        <Text style={styles.meaning}>{word.meaning}</Text>
        <Text style={styles.partTag}>{word.part}</Text>
      </View>
      <View style={[styles.challengeInput, result === "correct" && styles.challengeInputCorrect, result === "wrong" && styles.challengeInputWrong]}>
        <Text style={styles.challengeInputText}>{input || "点选下方假名输入读音"}</Text>
        {!!resultIcon && <Text style={[styles.challengeResultIcon, result === "correct" ? styles.okText : styles.dangerText]}>{resultIcon}</Text>}
      </View>
      <View style={styles.kanaPad}>
        {choices.map((kana, item) => (
          <Pressable key={`${kana}-${item}`} style={[styles.kanaKey, hintKana?.has(kana) && styles.kanaHint]} disabled={result === "correct"} onPress={() => onKana(kana)}>
            <Text style={styles.kanaKeyText}>{kana}</Text>
          </Pressable>
        ))}
        <Pressable style={[styles.kanaKey, styles.revealKey]} disabled={result === "correct"} onPress={onReveal}>
          <Text style={[styles.kanaKeyText, styles.revealKeyText]}>不会</Text>
        </Pressable>
      </View>
    </View>
  );
}

function HorizontalPicker({
  title,
  items,
  selectedId,
  entitlement,
  onSelect
}: {
  title: string;
  items: LexiconSummary[];
  selectedId: string;
  entitlement: Entitlement;
  onSelect: (item: LexiconSummary) => void;
}) {
  return (
    <View style={styles.pickerBlock}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pickerRow}>
        {items.map((item) => {
          const locked = !canAccessLexicon(item.access, item.id, entitlement);
          return (
            <Pressable key={item.id} style={[styles.pickButton, selectedId === item.id && styles.pickButtonActive, locked && styles.pickButtonLocked]} onPress={() => onSelect(item)}>
              <Text style={[styles.pickText, selectedId === item.id && styles.pickTextActive]}>{item.title}</Text>
              <Text style={styles.pickMeta}>{locked ? "未解锁" : `${item.wordCount} 词`}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function ChapterPicker({ chapters, selectedId, onSelect }: { chapters: StudyChapter[]; selectedId: string; onSelect: (id: string) => void }) {
  return (
    <View style={styles.pickerBlock}>
      <Text style={styles.sectionTitle}>章节</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pickerRow}>
        {chapters.map((chapter) => (
          <Pressable key={chapter.id} style={[styles.chapterButton, selectedId === chapter.id && styles.pickButtonActive]} onPress={() => onSelect(chapter.id)}>
            <Text style={[styles.pickText, selectedId === chapter.id && styles.pickTextActive]}>{chapter.label}</Text>
            <Text style={styles.pickMeta}>{chapter.words.length} 词</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

function LibraryView({
  lexicons,
  entitlement,
  selectedId,
  productById,
  busy,
  onSelect,
  onPurchase
}: {
  lexicons: LexiconSummary[];
  entitlement: Entitlement;
  selectedId: string;
  productById: Map<string, Product>;
  busy: boolean;
  onSelect: (lexicon: LexiconSummary) => void;
  onPurchase: (lexicon: LexiconSummary) => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {lexicons.map((lexicon) => {
        const locked = !canAccessLexicon(lexicon.access, lexicon.id, entitlement);
        const product = productForLexicon(lexicon.id);
        const storeProduct = product ? productById.get(product.productId) : undefined;
        return (
          <View key={lexicon.id} style={[styles.listItem, selectedId === lexicon.id && styles.listItemActive]}>
            <Pressable style={styles.itemCopy} onPress={() => onSelect(lexicon)}>
              <Text style={styles.itemTitle}>{lexicon.title}</Text>
              <Text style={styles.muted}>{lexicon.level} · {lexicon.wordCount} 词</Text>
              {!!storeProduct?.displayPrice && <Text style={styles.priceText}>{storeProduct.displayPrice}</Text>}
            </Pressable>
            {locked ? (
              <Pressable style={[styles.purchaseButton, busy && styles.disabledButton]} disabled={busy} onPress={() => onPurchase(lexicon)}>
                <Ionicons name="cart" size={14} color="#ffffff" />
                <Text style={styles.purchaseText}>购买</Text>
              </Pressable>
            ) : (
              <View style={[styles.lockBadge, lexicon.access === "free" ? styles.freeBadge : styles.unlockedBadge]}>
                <Ionicons name={lexicon.access === "free" ? "checkmark" : "diamond"} size={14} color="#277248" />
                <Text style={styles.lockText}>{lexicon.access === "free" ? "免费" : "已解锁"}</Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

function SettingsView({
  profile,
  lexiconCount,
  entitlementCount,
  showAds,
  busy,
  onRestore,
  onSync
}: {
  profile: Profile | null;
  lexiconCount: number;
  entitlementCount: number;
  showAds: boolean;
  busy: boolean;
  onRestore: () => void;
  onSync: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>本地账号</Text>
        <Metric label="档案" value={profile?.nickname || "默认学习者"} />
        <Metric label="本地词库" value={lexiconCount} />
        <Metric label="已解锁词库" value={entitlementCount} />
        <Metric label="广告状态" value={showAds ? "显示" : "隐藏"} />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>商店购买</Text>
        <Text style={styles.muted}>恢复购买只恢复已买词库，不恢复学习进度。</Text>
        <View style={styles.actions}>
          <Action label="恢复购买" tone="primary" onPress={onRestore} disabled={busy} />
          <Action label="同步已购" onPress={onSync} disabled={busy} />
        </View>
      </View>
    </ScrollView>
  );
}

function EmptyCard({ title, copy }: { title: string; copy: string }) {
  return (
    <View style={styles.card}>
      <Ionicons name="checkmark-circle" size={42} color="#277248" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.muted}>{copy}</Text>
    </View>
  );
}

function AdPlaceholder() {
  return (
    <View style={styles.adBox}>
      <Text style={styles.adText}>广告位</Text>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.muted}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function Action({ label, tone, onPress, disabled }: { label: string; tone?: "primary" | "danger"; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable style={[styles.actionButton, tone === "primary" && styles.primaryButton, tone === "danger" && styles.dangerButton, disabled && styles.disabledButton]} disabled={disabled} onPress={onPress}>
      <Text style={[styles.actionText, tone === "primary" && styles.primaryText]}>{label}</Text>
    </Pressable>
  );
}

function ModeButton({ active, icon, label, onPress }: { active: boolean; icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  return (
    <Pressable style={[styles.segment, active && styles.segmentActive]} onPress={onPress}>
      <Ionicons name={icon} size={16} color={active ? "#ffffff" : "#176d5f"} />
      <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{label}</Text>
    </Pressable>
  );
}

function TabButton({ active, icon, label, onPress }: { active: boolean; icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.tabButton} onPress={onPress}>
      <Ionicons name={icon} size={21} color={active ? "#176d5f" : "#6d766f"} />
      <Text style={[styles.tabLabel, active && styles.tabActive]}>{label}</Text>
    </Pressable>
  );
}

function buildChapters(words: WordWithProgress[]): StudyChapter[] {
  if (!words.length) return [];
  const size = 25;
  const chapters: StudyChapter[] = [];
  for (let index = 0; index < words.length; index += size) {
    const chapterWords = words.slice(index, index + size);
    chapters.push({
      id: `chapter-${chapters.length + 1}`,
      label: `${chapters.length + 1}. ${chapterWords[0]?.kana || "词组"}`,
      words: chapterWords
    });
  }
  return chapters;
}

function buildKanaChoices(kana: string) {
  const choices = new Set(Array.from(kana));
  kanaPool.forEach((item) => {
    if (choices.size < 20) choices.add(item);
  });
  return stableShuffle(Array.from(choices).slice(0, 24), kana);
}

function stableShuffle(items: string[], seed: string) {
  const values = [...items];
  let hash = 2166136261;
  Array.from(seed).forEach((char) => {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  });
  for (let index = values.length - 1; index > 0; index -= 1) {
    hash += 0x6d2b79f5;
    const swapIndex = Math.abs(hash) % (index + 1);
    const current = values[index];
    const swap = values[swapIndex];
    if (current === undefined || swap === undefined) continue;
    values[index] = swap;
    values[swapIndex] = current;
  }
  return values;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f6f7f9" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
    borderBottomColor: "#dfe5e0",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12
  },
  logo: { fontSize: 24, fontWeight: "800", color: "#16211c" },
  muted: { color: "#6d766f", fontSize: 13 },
  content: { padding: 18, gap: 14 },
  notice: { backgroundColor: "#e7f0e8", borderBottomColor: "#c9d8cd", borderBottomWidth: 1, paddingHorizontal: 18, paddingVertical: 10 },
  noticeText: { color: "#176d5f", fontWeight: "700" },
  busyBar: { paddingHorizontal: 18, paddingVertical: 8, backgroundColor: "#ffffff", flexDirection: "row", alignItems: "center", gap: 8 },
  segmented: { backgroundColor: "#ffffff", borderColor: "#dfe5e0", borderWidth: 1, borderRadius: 8, padding: 4, flexDirection: "row", gap: 4 },
  segment: { flex: 1, minHeight: 40, borderRadius: 6, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 6 },
  segmentActive: { backgroundColor: "#176d5f" },
  segmentText: { color: "#176d5f", fontWeight: "800" },
  segmentTextActive: { color: "#ffffff" },
  pickerBlock: { gap: 8 },
  sectionTitle: { color: "#16211c", fontWeight: "800" },
  pickerRow: { gap: 8 },
  pickButton: { minWidth: 132, minHeight: 58, borderRadius: 8, borderColor: "#dfe5e0", borderWidth: 1, backgroundColor: "#ffffff", paddingHorizontal: 12, paddingVertical: 9, justifyContent: "center" },
  chapterButton: { minWidth: 92, minHeight: 52, borderRadius: 8, borderColor: "#dfe5e0", borderWidth: 1, backgroundColor: "#ffffff", paddingHorizontal: 12, justifyContent: "center" },
  pickButtonActive: { borderColor: "#176d5f", backgroundColor: "#e7f0e8" },
  pickButtonLocked: { backgroundColor: "#fff7ea" },
  pickText: { color: "#16211c", fontWeight: "800" },
  pickTextActive: { color: "#176d5f" },
  pickMeta: { marginTop: 3, color: "#6d766f", fontSize: 12 },
  statsRow: { flexDirection: "row", gap: 10 },
  metric: { flex: 1, backgroundColor: "#ffffff", borderColor: "#dfe5e0", borderWidth: 1, borderRadius: 8, padding: 12 },
  metricValue: { marginTop: 4, fontSize: 20, fontWeight: "800", color: "#16211c" },
  card: { backgroundColor: "#ffffff", borderRadius: 8, borderColor: "#dfe5e0", borderWidth: 1, padding: 18, gap: 14 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  badge: { backgroundColor: "#e7f0e8", color: "#176d5f", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, fontWeight: "700" },
  word: { fontSize: 46, fontWeight: "800", color: "#16211c" },
  kana: { fontSize: 20, color: "#176d5f" },
  answer: { gap: 8, borderTopColor: "#dfe5e0", borderTopWidth: 1, paddingTop: 14 },
  meaning: { fontSize: 22, fontWeight: "800", color: "#16211c" },
  partTag: { alignSelf: "flex-start", color: "#176d5f", backgroundColor: "#e7f0e8", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, fontWeight: "800" },
  example: { fontSize: 16, color: "#16211c" },
  actions: { flexDirection: "row", gap: 8 },
  speedRow: { flexDirection: "row", gap: 8 },
  speedButton: { flex: 1, minHeight: 36, borderRadius: 8, borderColor: "#dfe5e0", borderWidth: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" },
  speedButtonActive: { borderColor: "#176d5f", backgroundColor: "#e7f0e8" },
  speedText: { color: "#6d766f", fontWeight: "800" },
  speedTextActive: { color: "#176d5f" },
  actionButton: { flex: 1, minHeight: 44, borderRadius: 8, backgroundColor: "#eef2ef", alignItems: "center", justifyContent: "center" },
  actionText: { color: "#16211c", fontWeight: "700" },
  primaryButton: { backgroundColor: "#176d5f" },
  primaryText: { color: "#ffffff", fontWeight: "800" },
  dangerButton: { backgroundColor: "#f6e8e4" },
  disabledButton: { opacity: 0.55 },
  lifeRow: { flexDirection: "row", gap: 4 },
  challengeInput: { minHeight: 56, borderRadius: 8, borderColor: "#dfe5e0", borderWidth: 2, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  challengeInputCorrect: { borderColor: "#277248", backgroundColor: "#eef8f1" },
  challengeInputWrong: { borderColor: "#e6e8ec", backgroundColor: "#ffffff" },
  challengeInputText: { flex: 1, color: "#176d5f", fontSize: 22, fontWeight: "900" },
  challengeResultIcon: { fontSize: 28, fontWeight: "900" },
  okText: { color: "#277248" },
  dangerText: { color: "#d95032" },
  kanaPad: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  kanaKey: { width: "15%", minWidth: 48, minHeight: 50, borderRadius: 8, borderColor: "#dfe5e0", borderWidth: 1, backgroundColor: "#f8faf8", alignItems: "center", justifyContent: "center" },
  kanaHint: { backgroundColor: "#d7f08f", borderColor: "#86bf42" },
  kanaKeyText: { fontSize: 20, fontWeight: "900", color: "#16211c" },
  revealKey: { marginLeft: "auto", backgroundColor: "#f6e8e4", borderColor: "#e8b19f" },
  revealKeyText: { color: "#d95032", fontSize: 15 },
  title: { fontSize: 22, fontWeight: "800", color: "#16211c" },
  entitlementBadge: { borderColor: "#176d5f", borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, flexDirection: "row", alignItems: "center", gap: 6 },
  entitlementText: { color: "#176d5f", fontWeight: "700" },
  listItem: { backgroundColor: "#ffffff", borderRadius: 8, borderColor: "#dfe5e0", borderWidth: 1, padding: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 12 },
  listItemActive: { borderColor: "#176d5f", backgroundColor: "#f4f8f6" },
  itemCopy: { flex: 1, gap: 4 },
  itemTitle: { fontSize: 17, fontWeight: "800", color: "#16211c" },
  priceText: { color: "#176d5f", fontWeight: "800" },
  lockBadge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "#fff3df", flexDirection: "row", gap: 4, alignItems: "center" },
  freeBadge: { backgroundColor: "#e7f0e8" },
  unlockedBadge: { backgroundColor: "#e7f0e8" },
  lockText: { fontWeight: "700", color: "#16211c" },
  purchaseButton: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#176d5f", flexDirection: "row", gap: 5, alignItems: "center" },
  purchaseText: { color: "#ffffff", fontWeight: "800" },
  adBox: { minHeight: 56, borderRadius: 8, borderWidth: 1, borderStyle: "dashed", borderColor: "#c9d2cc", alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff" },
  adText: { color: "#6d766f", fontWeight: "800" },
  tabs: { borderTopColor: "#dfe5e0", borderTopWidth: 1, backgroundColor: "#ffffff", flexDirection: "row", paddingTop: 8, paddingBottom: 10 },
  tabButton: { flex: 1, alignItems: "center", gap: 4 },
  tabLabel: { color: "#6d766f", fontWeight: "700" },
  tabActive: { color: "#176d5f" }
});
