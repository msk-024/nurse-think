import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client/extension";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const USER_IDS = {
  mochi: "00000000-0000-4000-8000-000000000001",
  anonymousPeer: "00000000-0000-4000-8000-000000000002",
} as const;

async function seedUsers() {
  await prisma.user.upsert({
    where: { id: USER_IDS.anonymousPeer },
    update: {},
    create: { id: USER_IDS.anonymousPeer, email: "peer@example.com" },
  });
}

async function seedReviewers() {
  await prisma.reviewer.upset({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "ユウタ先輩",
      imageUrl: "/avaters/yuuta-senpai.webp",
      roleInstruction:
        "You are Yuuta-senpai, a warm and encouraging senior nurse.Praise" +
        "what the learner noticed first, then gently point out one " +
        "observation they missed. End with a question that invites deeper" +
        "assessment, Tone: supportive, casual senpai speech.",
    },
  });
  await prisma.reviewer.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "江角さん",
      imageUrl: "/avatars/esumi-senpai.webp",
      roleInstruction:
        "You are Esumi-senpai, a sharp and logical senior nurse. Evaluate " +
        "the learner's assessment strictly against the SOAP framework: " +
        "missing data, unsupported conclusions, gaps between subjective " +
        "and objective findings. Tone: concise, no flattery.",
    },
  });
  await prisma.reviewer.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: "鬼塚先生",
      imageUrl: "/avatars/onizuka-dr.webp",
      roleInstruction:
        "You are Dr. Onizuka, a strict but fair physician. Challenge the " +
        "learner's clinical reasoning: differential diagnoses, red flags, " +
        "escalation criteria. Do not sugarcoat, but always explain why.",
    },
  });
}

async function seedCases() {
  await prisma.case.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      status: "published",
      mode: "clinical",
      level: 2,
      title: "術後1日目、突然の呼吸困難",
      situation:
        "人工股関節置換術後1日目の68歳男性。突然の息苦しさを訴えた。" +
        "SpO2 88%（room air）、HR 112、BP 96/60、RR 28。不安そうな表情で、" +
        "右下腿に腫脹を認める。あなたのアセスメントと直後の対応を述べよ。",
      hiddenAnswer:
        "肺血栓塞栓症（PE）を第一に疑う。術後の不動・片側下腿腫脹・低酸素・" +
        "頻脈が根拠。酸素投与を開始し直ちに医師へ報告、造影CT・心エコーの" +
        "準備。Wellsスコアで検証し、抗凝固禁忌の確認まで含めれば満点。",
      commentary:
        "術後PEの典型例。DVT徴候（片側性腫脹）と急性の低酸素血症の組み合わせ" +
        "を見た瞬間にPEを想起できるかが評価の分水嶺。SpO2低下時の初動" +
        "（酸素・報告・モニタリング）の言語化も重視する。",
    },
  });
  await prisma.case.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      status: "published",
      mode: "occupational",
      level: 3,
      title: "製造業エンジニアの長時間残業と不眠",
      situation:
        "42歳男性エンジニアが健康相談室に来室。残業が3か月連続で月80時間を" +
        "超えている。寝つきの悪さ、朝の頭痛、ケアレスミスの増加を訴える。" +
        "産業看護職としてのアセスメントとフォローアップ計画を述べよ。",
      hiddenAnswer:
        "過重労働による健康障害リスクの高い状態。長時間労働面接指導の対象で" +
        "あり、産業医面談を最優先で調整する。睡眠障害・抑うつのスクリーニング" +
        "（アテネ不眠尺度等）、時間外労働の制限提案、1か月以内の再面談設定" +
        "まで含めれば満点。",
      afterStory:
        "産業医面談の結果、就業制限（残業月45時間以内）が発令された。" +
        "1か月後のフォローで睡眠は改善傾向、抑うつエピソードは認めず。" +
        "3か月後に就業制限は解除された。",
      commentary:
        "長時間労働の面接指導スキーム（労働安全衛生法66条の8）に沿って行動" +
        "できるかを問う。個人へのケアと事業場への働きかけ（労務管理）の両輪を" +
        "言語化できているかが評価ポイント。",
    },
  });
  await prisma.case.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      status: "draft",
      mode: "clinical",
      level: 1,
      title: "（下書き）夜勤帯の低血糖",
      situation: "糖尿病患者が夜勤帯に発汗と意識混濁を呈した…（作成中）",
      hiddenAnswer: "（作成中）低血糖対応の初動を問う予定。",
      commentary: "（作成中）",
    },
  });
  await prisma.case.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      status: "published",
      mode: "clinical",
      level: 1,
      title: "（廃止）旧プロトコル準拠の急変対応",
      situation: "旧版の急変時プロトコルに基づく症例。現在は使用しない。",
      hiddenAnswer: "旧プロトコルに沿った初動対応。",
      commentary: "プロトコル改訂に伴い廃止。履歴保護のため論理削除。",
      // Soft-deleted: must never appear in listings, but the Result below
      // still references it (history protection rule in README).
      deletedAt: new Date("2026-06-01T00:00:00Z"),
    },
  });
}

async function seedResults() {
  // Logged-in user's history covering each evaluation level.
  await prisma.result.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      userId: USER_IDS.mochi,
      caseId: 1,
      reviewerId: 3,
      userAnswer:
        "術後の不動、片側の下腿腫脹、低酸素と頻脈から肺血栓塞栓症を第一に" +
        "疑う。酸素投与を開始し、直ちに医師へ報告。造影CTの準備を行う。",
      aiEvaluation:
        "PEの想起は正しい。不動・片側腫脹・低酸素の3点を結びつけた点は" +
        "評価できる。次はWellsスコアで定量化し、抗凝固禁忌の確認と" +
        "ベッドサイド心エコーまで言及できるとより良い。",
      score: 82,
    },
  });
  await prisma.result.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      userId: USER_IDS.mochi,
      caseId: 2,
      reviewerId: 2,
      userAnswer:
        "S: 寝つきの悪さ、朝の頭痛。O: 残業80時間超が3か月、ミス増加。" +
        "A: 過重労働による健康障害リスクが高い。P: 産業医面談を調整し、" +
        "残業制限を提案する。",
      aiEvaluation:
        "SOAPの枠組みは守れている。面接指導の法的根拠（安衛法66条の8）と" +
        "再面談の期日設定が欠けている。スクリーニング尺度の名前を挙げると" +
        "説得力が増す。",
      score: 74,
    },
  });
  await prisma.result.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      userId: USER_IDS.mochi,
      caseId: 4, // soft-deleted case: history must survive
      reviewerId: 1,
      userAnswer: "旧プロトコルに従いバイタル確認、リーダー看護師へ報告した。",
      aiEvaluation:
        "報告までの流れは確実。プロトコルはその後改訂されたが、" +
        "エスカレーションの習慣は今も有効。",
      score: 70,
    },
  });
  // Anonymous attempt: user_id is null by design (ER: NULL許容).
  await prisma.result.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      userId: null,
      caseId: 1,
      reviewerId: 1,
      userAnswer: "息苦しそうなので酸素を上げて様子を見る。",
      aiEvaluation:
        "初動として酸素投与は正しい。ただし「様子を見る」は危険。" +
        "片側の下腿腫脹に気づけると、報告の緊急度が変わるはず。",
      score: 45,
    },
  });
}

async function seedFeedbacks() {
  const feedbacks = [
    {
      id: 1,
      resultId: 1,
      evaluationLevel: "good",
      feedbackText:
        "鬼塚先生「PEを最初に挙げたのは及第点だ。だが定量評価がない。" +
        "Wellsスコアを使え。根拠を数字で語れるようになれ」",
    },
    {
      id: 2,
      resultId: 2,
      evaluationLevel: "good",
      feedbackText:
        "江角さん「SOAPは崩れていない。ただしPに期日がない計画は計画では" +
        "ない。1か月後の再面談をその場で設定すること」",
    },
    {
      id: 3,
      resultId: 3,
      evaluationLevel: "excellent",
      feedbackText:
        "ユウタ先輩「報告までの動きが早い！プロトコルが変わっても、" +
        "この習慣は絶対に武器になるよ」",
    },
    {
      id: 4,
      resultId: 4,
      evaluationLevel: "check",
      feedbackText:
        "ユウタ先輩「酸素はOK！でも『様子を見る』はちょっと待って。" +
        "右足のふくらはぎ、見てみた？何か気づかない？」",
    },
  ] as const;

  for (const feedback of feedbacks) {
    await prisma.reviewerFeedback.upsert({
      where: { id: feedback.id },
      update: {},
      create: feedback,
    });
  }
}

async function syncSequences() {
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"reviewers"', 'id'), (SELECT MAX(id) FROM "reviewers"))`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"cases"', 'id'), (SELECT MAX(id) FROM "cases"))`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"results"', 'id'), (SELECT MAX(id) FROM "results"))`,
  );
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"reviewer_feedbacks"', 'id'), (SELECT MAX(id) FROM "reviewer_feedbacks"))`,
  );
}

async function main() {
  await seedUsers();
  await seedReviewers();
  await seedCases();
  await seedResults();
  await seedFeedbacks();
  await syncSequences();
  console.info(
    "Seed completed: 2 users, 3 reviewers, 4 cases, 4 results, 4 feedbacks",
  );
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
