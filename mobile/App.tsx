import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import type { SQLiteDatabase } from "expo-sqlite";
import { builtInLexicons } from "./src/data/freeLexicons";
import { listDueWords, listLexicons, openLocalDatabase, upsertProgress, type WordWithProgress } from "./src/db/localRepository";
import { applyReview, type ReviewGrade } from "./src/srs";

type Tab = "study" | "library" | "stats";

export default function App() {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [tab, setTab] = useState<Tab>("study");
  const [dueWords, setDueWords] = useState<WordWithProgress[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    openLocalDatabase().then(async (database) => {
      if (!mounted) return;
      setDb(database);
      setDueWords(await listDueWords(database, false));
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const currentWord = dueWords[0];
  const visibleLexiconCount = builtInLexicons.filter((lexicon) => isPaid || lexicon.access === "free").length;
  const masteredCount = useMemo(() => dueWords.filter((word) => word.progress.box >= 3).length, [dueWords]);

  async function refresh(nextPaid = isPaid) {
    if (!db) return;
    setDueWords(await listDueWords(db, nextPaid));
  }

  async function answer(grade: ReviewGrade) {
    if (!db || !currentWord) return;
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
          <View style={styles.statsRow}>
            <Metric label="待复习" value={dueWords.length} />
            <Metric label="可用词库" value={visibleLexiconCount} />
            <Metric label="高记忆盒" value={masteredCount} />
          </View>

          {currentWord ? (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.badge}>{currentWord.level}</Text>
                <Text style={styles.muted}>{currentWord.lexiconTitle} · Box {currentWord.progress.box}</Text>
              </View>
              <Text style={styles.word}>{currentWord.japanese}</Text>
              <Text style={styles.kana}>{revealed ? currentWord.kana : "先回忆读音和意思"}</Text>
              {revealed && (
                <View style={styles.answer}>
                  <Text style={styles.meaning}>{currentWord.meaning}</Text>
                  <Text style={styles.example}>{currentWord.example}</Text>
                  <Text style={styles.muted}>{currentWord.translation}</Text>
                </View>
              )}
              {revealed ? (
                <View style={styles.actions}>
                  <Action label="不记得" tone="danger" onPress={() => answer("wrong")} />
                  <Action label="模糊" onPress={() => answer("hard")} />
                  <Action label="记得" tone="primary" onPress={() => answer("correct")} />
                </View>
              ) : (
                <Pressable style={styles.primaryButton} onPress={() => setRevealed(true)}>
                  <Text style={styles.primaryText}>显示答案</Text>
                </Pressable>
              )}
            </View>
          ) : (
            <View style={styles.card}>
              <Ionicons name="checkmark-circle" size={42} color="#277248" />
              <Text style={styles.title}>今日复习完成</Text>
              <Text style={styles.muted}>可以去词库看看下一批内容，或稍后再回来复习。</Text>
            </View>
          )}

          {!isPaid && <AdPlaceholder />}
        </ScrollView>
      )}

      {tab === "library" && <LibraryView paid={isPaid} />}
      {tab === "stats" && (
        <View style={styles.content}>
          <Metric label="本地词库" value={builtInLexicons.length} />
          <Metric label="付费状态" value={isPaid ? "已解锁" : "未解锁"} />
          {!isPaid && <AdPlaceholder />}
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
      {!paid && <AdPlaceholder />}
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

function TabButton({ active, icon, label, onPress }: { active: boolean; icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.tabButton} onPress={onPress}>
      <Ionicons name={icon} size={21} color={active ? "#176d5f" : "#6d766f"} />
      <Text style={[styles.tabLabel, active && styles.tabActive]}>{label}</Text>
    </Pressable>
  );
}

function AdPlaceholder() {
  return (
    <View style={styles.ad}>
      <Text style={styles.muted}>广告位</Text>
      <Text style={styles.adText}>付费版将移除广告并解锁更多词库</Text>
    </View>
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
  ad: {
    minHeight: 72,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dfe5e0",
    backgroundColor: "#f1f5f2",
    alignItems: "center",
    justifyContent: "center",
    gap: 4
  },
  adText: {
    color: "#315f8f",
    fontWeight: "700"
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
