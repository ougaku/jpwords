export type ReviewGrade = "wrong" | "hard" | "correct";

export type ProgressRecord = {
  wordId: string;
  box: number;
  correctCount: number;
  wrongCount: number;
  dueAt: string;
  lastResult: ReviewGrade | "";
  updatedAt: string;
};

const boxIntervalsInDays = [0, 1, 3, 7, 14, 30];

export function createInitialProgress(wordId: string, now = new Date()): ProgressRecord {
  return {
    wordId,
    box: 0,
    correctCount: 0,
    wrongCount: 0,
    dueAt: now.toISOString(),
    lastResult: "",
    updatedAt: now.toISOString()
  };
}

export function applyReview(record: ProgressRecord, grade: ReviewGrade, now = new Date()): ProgressRecord {
  const nextBox = grade === "correct"
    ? Math.min(record.box + 1, boxIntervalsInDays.length - 1)
    : grade === "hard"
      ? Math.max(record.box, 1)
      : 0;
  const interval = grade === "wrong" ? 0 : boxIntervalsInDays[nextBox] ?? 0;
  const dueAt = new Date(now);
  dueAt.setDate(dueAt.getDate() + interval);

  return {
    ...record,
    box: nextBox,
    correctCount: record.correctCount + (grade === "wrong" ? 0 : 1),
    wrongCount: record.wrongCount + (grade === "wrong" ? 1 : 0),
    dueAt: dueAt.toISOString(),
    lastResult: grade,
    updatedAt: now.toISOString()
  };
}

export function isDue(record: Pick<ProgressRecord, "dueAt">, now = new Date()): boolean {
  return new Date(record.dueAt).getTime() <= now.getTime();
}

