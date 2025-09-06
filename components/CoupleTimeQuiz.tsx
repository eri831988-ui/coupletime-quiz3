"use client";

import { useMemo, useState } from "react";

const QUESTIONS = [
  { id: 1, text: "最近の夫婦の雰囲気は？",
    options: [{key:"A",label:"会話が少なく気まずい"},{key:"B",label:"仲はいいけど盛り上がらない"},{key:"C",label:"忙しくてほぼ時間が取れない"},{key:"D",label:"仲良いけどマンネリ気味"}]},
  { id: 2, text: "夫婦時間に求めるものは？",
    options: [{key:"A",label:"会話したい"},{key:"B",label:"一緒に楽しみたい"},{key:"C",label:"癒しやリラックス"},{key:"D",label:"外出して気分転換"}]},
  { id: 3, text: "相手のタイプに近いのは？",
    options: [{key:"A",label:"無口であまり話さない"},{key:"B",label:"ノリはいいけどすぐ飽きる"},{key:"C",label:"まったり系でのんびりしたい"},{key:"D",label:"行動派で外に出たい"}]},
  { id: 4, text: "夫婦時間の理想は？",
    options: [{key:"A",label:"短時間でいいから毎日続けたい"},{key:"B",label:"休日にまとまった時間を過ごしたい"},{key:"C",label:"特別なイベントを楽しみたい"},{key:"D",label:"思いついた時に気軽にやりたい"}]},
  { id: 5, text: "もし理想の夫婦時間が叶ったら？",
    options: [{key:"A",label:"今より気楽に話せそう"},{key:"B",label:"一緒に笑える時間が増えそう"},{key:"C",label:"落ち着いて安心できそう"},{key:"D",label:"新鮮でドキドキしそう"}]},
  { id: 6, text: "休日の過ごし方は？",
    options: [{key:"A",label:"家でまったりするのが好き"},{key:"B",label:"ちょっとした作業や遊びをしたい"},{key:"C",label:"昼寝やリラックスを大事にしたい"},{key:"D",label:"外に出かけて気分を変えたい"}]},
  { id: 7, text: "会話のスタイルは？",
    options: [{key:"A",label:"ゆっくりじっくり話したい"},{key:"B",label:"ふざけ合ったり盛り上がりたい"},{key:"C",label:"会話少なめで穏やかに過ごしたい"},{key:"D",label:"会話より行動・体験重視"}]},
  { id: 8, text: "一緒にやってみたいことは？",
    options: [{key:"A",label:"お互いのことをもっと知るような話"},{key:"B",label:"ゲームや料理など共通体験"},{key:"C",label:"リラックスできる習慣"},{key:"D",label:"旅行や新しい場所探検"}]},
  { id: 9, text: "夫婦時間の長さの理想は？",
    options: [{key:"A",label:"10分くらいでOK"},{key:"B",label:"30分〜1時間しっかり"},{key:"C",label:"気分次第でゆるく長め"},{key:"D",label:"半日〜1日がっつり"}]},
  { id: 10, text: "今いちばん欲しいのは？",
    options: [{key:"A",label:"安心して話せる空気"},{key:"B",label:"笑い合える楽しい時間"},{key:"C",label:"一緒に癒される落ち着き"},{key:"D",label:"新鮮な刺激や冒険感"}]}
] as const;

const RESULT_MAP = {
  A: {
    title: "🌸 タイプA：会話派",
    subtitle: "とにかく自然に話がしたい！人向け",
    items: [
      "今日のハイライトを1つずつ話す",
      "相手の趣味について教えてもらう",
      "昔の写真を見て思い出話",
      "『もし◯◯だったら？』妄想トーク",
      "今度やりたいことリストを一緒に書く",
      "子どもの頃の話を聞き合う",
      "週末に『1週間の振り返りトーク』",
      "ニュースや本を読んで感想を話す",
      "お互いの『今日の学び』をシェア",
      "未来の旅行プランを語り合う"
    ]
  },
  B: {
    title: "🎲 タイプB：体験派",
    subtitle: "一緒に何かやって盛り上がりたい！人向け",
    items: [
      "一緒に料理して晩酌",
      "短時間のボードゲーム（UNOなど）",
      "パズルやレゴを一緒に作る",
      "DIYや模様替えを一緒にする",
      "YouTubeの筋トレを一緒にやる",
      "TikTokの簡単ダンスに挑戦",
      "新しいお菓子やお酒を一緒に試す",
      "簡単なお菓子作り",
      "一緒に朝活（散歩・カフェ・勉強）",
      "シリーズもののドラマを一緒に観る"
    ]
  },
  C: {
    title: "☁️ タイプC：癒し派",
    subtitle: "とにかく一緒にリラックスしたい！人向け",
    items: [
      "一緒にヨガ",
      "お風呂に一緒に入る（抵抗なければ）",
      "部屋を暗くしてキャンドルやアロマタイム",
      "ハンドマッサージし合う",
      "一緒に瞑想",
      "猫カフェに行く",
      "星を眺めながらおしゃべり",
      "庭やベランダで日向ぼっこ",
      "お互いに『頑張ってるなー』って思うことを伝える",
      "ペアストレッチに挑戦"
    ]
  },
  D: {
    title: "🚗 タイプD：アクティブ派",
    subtitle: "外に出て新鮮な時間を楽しみたい！人向け",
    items: [
      "ドライブに行く",
      "季節イベント（花火・紅葉・桜）に行く",
      "まだ行ったことのないスーパーへ行って冒険気分",
      "新しいカフェでモーニング",
      "美術館や博物館を巡る",
      "夜のお散歩デート",
      "ピクニックランチ",
      "サイクリング",
      "スーパーで『今夜のごはんを一緒に決める』",
      "映画館で映画鑑賞"
    ]
  }
} as const;

export default function CoupleTimeQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Array<"A"|"B"|"C"|"D"|null>>(Array(QUESTIONS.length).fill(null));
  const progress = step === 0 ? 0 : Math.round((step / QUESTIONS.length) * 100);

  const scores = useMemo(() => {
    const base = { A: 0, B: 0, C: 0, D: 0 };
    answers.forEach(a => { if (a) (base as any)[a]++; });
    return base as Record<"A"|"B"|"C"|"D", number>;
  }, [answers]);

  const topKeys = useMemo(() => {
    const max = Math.max(...Object.values(scores));
    if (max === 0) return [];
    return (Object.keys(scores) as Array<"A"|"B"|"C"|"D">).filter(k => scores[k] === max);
  }, [scores]);

  const selectOption = (qIndex: number, key: "A"|"B"|"C"|"D") => {
    const next = [...answers];
    next[qIndex] = key;
    setAnswers(next);
    if (step < QUESTIONS.length) setStep(step + 1);
  };

  return (
    <div className="w-full rounded-2xl bg-white shadow-xl border p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">夫婦時間 診断ツール</h1>
      <p className="text-gray-500 mb-6">10問に答えると、あなたに合ったタイプと具体アイデア（10個）が表示されます。</p>

      {step === 0 && (
        <button className="px-5 py-3 rounded-xl bg-rose-500 text-white" onClick={() => setStep(1)}>
          診断をはじめる
        </button>
      )}

      {step > 0 && step <= QUESTIONS.length && (
        <>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <span>Q{step} / {QUESTIONS.length}</span>
            <span>進捗 {progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded mb-4">
            <div className="h-2 bg-rose-500 rounded" style={{ width: `${progress}%` }} />
          </div>

          <h2 className="text-xl font-medium mb-4">{QUESTIONS[step-1].text}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {QUESTIONS[step-1].options.map(opt => (
              <button
                key={opt.key}
                className={`text-left p-4 rounded-xl border transition ${
                  answers[step-1] === opt.key ? "border-rose-500 bg-rose-50" : "border-gray-200"
                }`}
                onClick={() => selectOption(step-1, opt.key as any)}
              >
                <span className="mr-2 text-xs inline-flex w-5 h-5 items-center justify-center rounded-full border">{opt.key}</span>
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            {step === QUESTIONS.length ? (
              <button
                className="px-5 py-3 rounded-xl bg-rose-500 text-white disabled:opacity-50"
                onClick={() => setStep(QUESTIONS.length + 1)}
                disabled={answers.includes(null)}
              >
                診断結果を見る
              </button>
            ) : null}
          </div>
        </>
      )}

      {step === QUESTIONS.length + 1 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">診断結果</h2>
            <button className="text-rose-600 underline" onClick={() => { setStep(0); setAnswers(Array(QUESTIONS.length).fill(null)); }}>
              もう一度
            </button>
          </div>

          {topKeys.map(k => (
            <div key={k} className="p-5 rounded-xl border">
              <h3 className="text-xl font-semibold mb-1">{(RESULT_MAP as any)[k].title}</h3>
              <p className="text-sm text-gray-500 mb-3">{(RESULT_MAP as any)[k].subtitle}</p>
              <ul className="list-disc pl-6 space-y-2">
                {(RESULT_MAP as any)[k].items.map((it: string, i: number) => <li key={i}>{it}</li>)}
              </ul>
            </div>
          ))}

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-sm">
            もっと具体的に落とし込みたい人は「うちの状況で何から始めればいい？」とDMください。あなた専用の一歩を一緒に作ります。
          </div>
        </div>
      )}
    </div>
  );
}
