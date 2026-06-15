import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import type { SQLiteDatabase } from "expo-sqlite";
import { builtInLexicons } from "./src/data/freeLexicons";
import { listDueWords, listLexicons, listStudyWords, openLocalDatabase, upsertProgress, type WordWithProgress } from "./src/db/localRepository";
import { applyReview, type ReviewGrade } from "./src/srs";

type Tab = "study" | "library" | "stats";
type StudyMode = "review" | "autoplay";
type AutoplaySpeed = 3000 | 5000 | 8000;

export default function App() {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [tab, setTab] = useState<Tab>("study");
  const [dueWords, setDueWords] = useState<WordWithProgress[]>([]);
  const [studyWords, setStudyWords] = useState<WordWithProgress[]>([]);
  const [studyMode, setStudyMode] = useState<StudyMode>("review");
  const [autoplayIndex, setAutoplayIndex] = useState(0);
  const [autoplayPlaying, setAutoplayPlaying] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState<AutoplaySpeed>(5000);
  const [showAutoplayKana, setShowAutoplayKana] = useState(true);
  const [showAutoplayMeaning, setShowAutoplayMeaning] = useState(true);
  const [showAutoplayExample, setShowAutoplayExample] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    openLocalDatabase().then(async (database) => {
      if (!mounted) return;
      setDb(database);
      setDueWords(await listDueWords(database, false));
      setStudyWords(await listStudyWords(database, false));
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (studyMode !== "autoplay" || !autoplayPlaying || studyWords.length <= 1) return;
    const timer = setInterval(() => {
      setAutoplayIndex((index) => (index + 1) % studyWords.length);
    }, autoplaySpeed);
    return () => clearInterval(timer);
  }, [autoplayPlaying, autoplaySpeed, studyMode, studyWords.length]);

  const currentWord = studyMode === "review" ? dueWords[0] : studyWords[autoplayIndex];
  const visibleLexiconCount = builtInLexicons.filter((lexicon) => isPaid || lexicon.access === "free").length;
  const masteredCount = useMemo(() => dueWords.filter((word) => word.progress.box >= 3).length, [dueWords]);

  async function refresh(nextPaid = isPaid) {
    if (!db) return;
    const [nextDueWords, nextStudyWords] = await Promise.all([
      listDueWords(db, nextPaid),
      listStudyWords(db, nextPaid)
    ]);
    setDueWords(nextDueWords);
    setStudyWords(nextStudyWords);
    setAutoplayIndex((index) => Math.min(index, Math.max(nextStudyWords.length - 1, 0)));
  }

  async function answer(grade: ReviewGrade) {
    if (!db || !currentWord || studyMode !== "review") return;
    const next = applyReview(currentWord.progress, grade);
    await upsertProgress(db, next);
    setRevealed(false);
    await refresh();
  }

  async function togglePaidPreview() {
    const next = !isPaid;
    setIsPaid(next);
    await refresh(next);
  }

  function switchStudyMode(nextMode: StudyMode) {
    setStudyMode(nextMode);
    setRevealed(false);
    if (nextMode === "review") setAutoplayPlaying(false);
  }

  function moveAutoplay(offset: number) {
    if (!studyWords.length) return;
    setAutoplayIndex((index) => (index + offset + studyWords.length) % studyWords.length);
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
          <Text style={styles.muted}>单机免费版</Text>
        </View>
        <Pressable style={[styles.pill, isPaid && styles.pillActive]} onPress={togglePaidPreview}>
          <Ionicons name={isPaid ? "diamond" : "lock-closed"} size={16} color={isPaid ? "#ffffff" : "#176d5f"} />
          <Text style={[styles.pillText, isPaid && styles.pillTextActive]}>{isPaid ? "付费预览" : "免费版"}</Text>
        </Pressable>
      </View>

      {tab === "study" && (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.segmented}>
            <Pressable style={[styles.segment, studyMode === "review" && styles.segmentActive]} onPress={() => switchStudyMode("review")}>
              <Ionicons name="repeat" size={16} color={studyMode === "review" ? "#ffffff" : "#176d5f"} />
              <Text style={[styles.segmentText, studyMode === "review" && styles.segmentTextActive]}>手动复习</Text>
            </Pressable>
            <Pressable style={[styles.segment, studyMode === "autoplay" && styles.segmentActive]} onPress={() => switchStudyMode("autoplay")}>
              <Ionicons name="play-circle" size={16} color={studyMode === "autoplay" ? "#ffffff" : "#176d5f"} />
              <Text style={[styles.segmentText, studyMode === "autoplay" && styles.segmentTextActive]}>自动播放</Text>
            </Pressable>
          </View>

          <View style={styles.statsRow}>
            <Metric label="待复习" value={dueWords.length} />
            <Metric label="可用词库" value={visibleLexiconCount} />
            <Metric label="高记忆盒" value={masteredCount} />
          </View>

          {currentWord ? (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.badge}>{currentWord.level}</Text>
                <Text style={styles.muted}>
                  {currentWord.lexiconTitle} · {studyMode === "review" ? `Box ${currentWord.progress.box}` : `${autoplayIndex + 1}/${studyWords.length}`}
                </Text>
              </View>
              <Text style={styles.word}>{currentWord.japanese}</Text>
              <Text style={styles.kana}>
                {studyMode === "autoplay"
                  ? showAutoplayKana ? currentWord.kana : "假名已隐藏"
                  : revealed ? currentWord.kana : "先回忆读音和意思"}
              </Text>
              {(studyMode === "autoplay" || revealed) && (
                <View style={styles.answer}>
                  {(studyMode === "review" || showAutoplayMeaning) && <Text style={styles.meaning}>{currentWord.meaning}</Text>}
                  {(studyMode === "review" || showAutoplayExample) && (
                    <>
                      <Text style={styles.example}>{currentWord.example}</Text>
                      <Text style={styles.muted}>{currentWord.translation}</Text>
                    </>
                  )}
                  {studyMode === "autoplay" && !showAutoplayMeaning && !showAutoplayExample && (
                    <Text style={styles.muted}>释义和例句已隐藏</Text>
                  )}
                </View>
              )}
              {studyMode === "review" && (
                revealed ? (
                  <View style={styles.actions}>
                    <Action label="不记得" tone="danger" onPress={() => answer("wrong")} />
                    <Action label="模糊" onPress={() => answer("hard")} />
                    <Action label="记得" tone="primary" onPress={() => answer("correct")} />
                  </View>
                ) : (
                  <Pressable style={styles.primaryButton} onPress={() => setRevealed(true)}>
                    <Text style={styles.primaryText}>显示答案</Text>
                  </Pressable>
                )
              )}
              {studyMode === "autoplay" && (
                <View style={styles.autoplayPanel}>
                  <View style={styles.actions}>
                    <Action label="上一词" onPress={() => moveAutoplay(-1)} />
                    <Action label={autoplayPlaying ? "暂停" : "播放"} tone="primary" onPress={() => setAutoplayPlaying((playing) => !playing)} />
                    <Action label="下一词" onPress={() => moveAutoplay(1)} />
                  </View>
                  <View style={styles.speedRow}>
                    {[3000, 5000, 8000].map((speed) => (
                      <Pressable key={speed} style={[styles.speedButton, autoplaySpeed === speed && styles.speedButtonActive]} onPress={() => setAutoplaySpeed(speed as AutoplaySpeed)}>
                        <Text style={[styles.speedText, autoplaySpeed === speed && styles.speedTextActive]}>{speed / 1000}秒</Text>
                      </Pressable>
                    ))}
                  </View>
                  <View style={styles.optionRow}>
                    <Toggle label="假名" value={showAutoplayKana} onPress={() => setShowAutoplayKana((value) => !value)} />
                    <Toggle label="释义" value={showAutoplayMeaning} onPress={() => setShowAutoplayMeaning((value) => !value)} />
                    <Toggle label="例句" value={showAutoplayExample} onPress={() => setShowAutoplayExample((value) => !value)} />
                  </View>
                  <Text style={styles.muted}>自动播放不会改变记忆盒、到期时间或错词记录。</Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.card}>
              <Ionicons name="checkmark-circle" size={42} color="#277248" />
              <Text style={styles.title}>{studyMode === "review" ? "今日复习完成" : "暂无可播放单词"}</Text>
              <Text style={styles.muted}>{studyMode === "review" ? "可以切到自动播放熟悉词库，或稍后再回来复习。" : "当前权限下没有可用词库。"}</Text>
            </View>
          )}

        </ScrollView>
      )}

      {tab === "library" && <LibraryView paid={isPaid} />}
      {tab === "stats" && (
        <View style={styles.content}>
          <Metric label="本地词库" value={builtInLexicons.length} />
          <Metric label="付费状态" value={isPaid ? "已解锁" : "未解锁"} />
        </View>
      )}

      <View style={styles.tabs}>
        <TabButton active={tab === "study"} icon="albums" label="学习" onPress={() => setTab("study")} />
        <TabButton active={tab === "library"} icon="book" label="词库" onPress={() => setTab("library")} />
        <TabButton active={tab === "stats"} icon="stats-chart" label="统计" onPress={() => setTab("stats")} />
      </View>
    </SafeAreaView>
  );
}

function LibraryView({ paid }: { paid: boolean }) {
  const [lexicons, setLexicons] = useState<Array<{ id: string; title: string; level: string; access: string; wordCount: number }>>([]);

  useEffect(() => {
    openLocalDatabase().then((database) => listLexicons(database).then(setLexicons));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {lexicons.map((lexicon) => {
        const locked = lexicon.access === "paid" && !paid;
        return (
          <View key={lexicon.id} style={styles.listItem}>
            <View style={styles.itemCopy}>
              <Text style={styles.itemTitle}>{lexicon.title}</Text>
              <Text style={styles.muted}>{lexicon.level} · {lexicon.wordCount} 词</Text>
            </View>
            <View style={[styles.lockBadge, !locked && styles.freeBadge]}>
              <Ionicons name={locked ? "lock-closed" : "checkmark"} size={14} color={locked ? "#a66910" : "#277248"} />
              <Text style={styles.lockText}>{locked ? "付费" : "可学"}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
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

function Action({ label, tone, onPress }: { label: string; tone?: "primary" | "danger"; onPress: () => void }) {
  return (
    <Pressable style={[styles.actionButton, tone === "primary" && styles.primaryButton, tone === "danger" && styles.dangerButton]} onPress={onPress}>
      <Text style={[styles.actionText, tone === "primary" && styles.primaryText]}>{label}</Text>
    </Pressable>
  );
}

function Toggle({ label, value, onPress }: { label: string; value: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.toggleButton, value && styles.toggleButtonActive]} onPress={onPress}>
      <Ionicons name={value ? "checkbox" : "square-outline"} size={16} color={value ? "#176d5f" : "#6d766f"} />
      <Text style={styles.toggleText}>{label}</Text>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f7f9"
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#ffffff",
    borderBottomColor: "#dfe5e0",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    fontSize: 24,
    fontWeight: "800",
    color: "#16211c"
  },
  muted: {
    color: "#6d766f",
    fontSize: 13
  },
  content: {
    padding: 18,
    gap: 14
  },
  statsRow: {
    flexDirection: "row",
    gap: 10
  },
  segmented: {
    backgroundColor: "#ffffff",
    borderColor: "#dfe5e0",
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    flexDirection: "row",
    gap: 4
  },
  segment: {
    flex: 1,
    minHeight: 40,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6
  },
  segmentActive: {
    backgroundColor: "#176d5f"
  },
  segmentText: {
    color: "#176d5f",
    fontWeight: "800"
  },
  segmentTextActive: {
    color: "#ffffff"
  },
  metric: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderColor: "#dfe5e0",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12
  },
  metricValue: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: "800",
    color: "#16211c"
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#dfe5e0",
    borderWidth: 1,
    padding: 18,
    gap: 14
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  },
  badge: {
    backgroundColor: "#e7f0e8",
    color: "#176d5f",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontWeight: "700"
  },
  word: {
    fontSize: 46,
    fontWeight: "800",
    color: "#16211c"
  },
  kana: {
    fontSize: 20,
    color: "#176d5f"
  },
  answer: {
    gap: 8,
    borderTopColor: "#dfe5e0",
    borderTopWidth: 1,
    paddingTop: 14
  },
  meaning: {
    fontSize: 22,
    fontWeight: "800",
    color: "#16211c"
  },
  example: {
    fontSize: 16,
    color: "#16211c"
  },
  actions: {
    flexDirection: "row",
    gap: 8
  },
  autoplayPanel: {
    gap: 12
  },
  speedRow: {
    flexDirection: "row",
    gap: 8
  },
  speedButton: {
    flex: 1,
    minHeight: 36,
    borderRadius: 8,
    borderColor: "#dfe5e0",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  speedButtonActive: {
    borderColor: "#176d5f",
    backgroundColor: "#e7f0e8"
  },
  speedText: {
    color: "#6d766f",
    fontWeight: "800"
  },
  speedTextActive: {
    color: "#176d5f"
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  toggleButton: {
    minHeight: 36,
    borderRadius: 8,
    borderColor: "#dfe5e0",
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#ffffff"
  },
  toggleButtonActive: {
    backgroundColor: "#f1f5f2",
    borderColor: "#b8c9c1"
  },
  toggleText: {
    color: "#16211c",
    fontWeight: "700"
  },
  actionButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: "#eef2ef",
    alignItems: "center",
    justifyContent: "center"
  },
  actionText: {
    color: "#16211c",
    fontWeight: "700"
  },
  primaryButton: {
    minHeight: 46,
    borderRadius: 8,
    backgroundColor: "#176d5f",
    alignItems: "center",
    justifyContent: "center"
  },
  primaryText: {
    color: "#ffffff",
    fontWeight: "800"
  },
  dangerButton: {
    backgroundColor: "#f6e8e4"
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#16211c"
  },
  pill: {
    borderColor: "#176d5f",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  pillActive: {
    backgroundColor: "#176d5f"
  },
  pillText: {
    color: "#176d5f",
    fontWeight: "700"
  },
  pillTextActive: {
    color: "#ffffff"
  },
  listItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#dfe5e0",
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12
  },
  itemCopy: {
    flex: 1,
    gap: 4
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#16211c"
  },
  lockBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#fff3df",
    flexDirection: "row",
    gap: 4,
    alignItems: "center"
  },
  freeBadge: {
    backgroundColor: "#e7f0e8"
  },
  lockText: {
    fontWeight: "700",
    color: "#16211c"
  },
  tabs: {
    borderTopColor: "#dfe5e0",
    borderTopWidth: 1,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 10
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    gap: 4
  },
  tabLabel: {
    color: "#6d766f",
    fontWeight: "700"
  },
  tabActive: {
    color: "#176d5f"
  }
});
