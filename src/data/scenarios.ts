export const scenarios = [
  {
    id: "nurse_greeting_a2",
    title: "患者へのあいさつ",
    description: "担当看護師として患者に最初の声かけをする練習",
    level: "A2",
    startNodeId: "T1",
    nodes: {
      T1: {
        nodeId: "T1",
        patientText: "Are you my nurse for today?",
        patientJa: "今日、私の看護師さんですか？",
        choices: [
          {
            label: "A",
            type: "自分の情報を伝える",
            text: "Yes, I am. My name is [Name], and I'll be looking after you until 5 PM.",
            ja: "はい、そうです。名前は[名前]です。午後5時まで担当しますね。",
            nextNodeId: "T2A",
          },
          {
            label: "B",
            type: "相手の情報を聞く",
            text: "Yes, I am. Is there anything you're worried about right now?",
            ja: "はい、そうです。今、何か心配なことはありますか？",
            nextNodeId: "T2B",
          },
        ],
      },

      T2A: {
        nodeId: "T2A",
        patientText: "Thank you. I’m not sure what will happen next.",
        patientJa: "ありがとうございます。次に何があるのか少し不安です。",
        choices: [
          {
            label: "A",
            type: "自分の情報を伝える",
            text: "I’ll check your temperature and blood pressure first.",
            ja: "まず体温と血圧を確認しますね。",
            nextNodeId: "T3AA",
          },
          {
            label: "B",
            type: "相手の情報を聞く",
            text: "What are you most worried about?",
            ja: "一番心配なことは何ですか？",
            nextNodeId: "T3AB",
          },
        ],
      },

      T2B: {
        nodeId: "T2B",
        patientText: "I’m worried about my test results.",
        patientJa: "検査結果が心配です。",
        choices: [
          {
            label: "A",
            type: "自分の情報を伝える",
            text: "I’ll ask the doctor and let you know when I can.",
            ja: "医師に確認して、分かり次第お伝えしますね。",
            nextNodeId: "T3BA",
          },
          {
            label: "B",
            type: "相手の情報を聞く",
            text: "What did the doctor tell you so far?",
            ja: "これまで医師から何と説明を受けましたか？",
            nextNodeId: "T3BB",
          },
        ],
      },

      T3AA: {
        nodeId: "T3AA",
        patientText: "Okay. That sounds fine.",
        patientJa: "わかりました。それなら大丈夫そうです。",
        choices: [
          {
            label: "A",
            type: "自分の情報を伝える",
            text: "Please relax. I’ll explain each step as we go.",
            ja: "リラックスしてください。一つずつ説明しながら進めますね。",
            nextNodeId: "END",
          },
          {
            label: "B",
            type: "相手の情報を聞く",
            text: "Do you have any pain right now?",
            ja: "今、痛みはありますか？",
            nextNodeId: "END",
          },
        ],
      },

      T3AB: {
        nodeId: "T3AB",
        patientText: "I’m worried because I don’t understand the schedule.",
        patientJa: "予定が分からなくて不安です。",
        choices: [
          {
            label: "A",
            type: "自分の情報を伝える",
            text: "I’ll write down today’s schedule for you.",
            ja: "今日の予定を書いてお渡ししますね。",
            nextNodeId: "END",
          },
          {
            label: "B",
            type: "相手の情報を聞く",
            text: "Would you like me to explain it slowly?",
            ja: "ゆっくり説明しましょうか？",
            nextNodeId: "END",
          },
        ],
      },

      T3BA: {
        nodeId: "T3BA",
        patientText: "Thank you. I feel a little better.",
        patientJa: "ありがとうございます。少し安心しました。",
        choices: [
          {
            label: "A",
            type: "自分の情報を伝える",
            text: "I’ll come back as soon as I have more information.",
            ja: "新しい情報が分かり次第、すぐ戻りますね。",
            nextNodeId: "END",
          },
          {
            label: "B",
            type: "相手の情報を聞く",
            text: "Is there anything else you need right now?",
            ja: "今ほかに必要なことはありますか？",
            nextNodeId: "END",
          },
        ],
      },

      T3BB: {
        nodeId: "T3BB",
        patientText: "The doctor said they would explain later.",
        patientJa: "医師は後で説明すると言っていました。",
        choices: [
          {
            label: "A",
            type: "自分の情報を伝える",
            text: "I’ll make sure the doctor knows you are waiting.",
            ja: "医師に、あなたが説明を待っていることを伝えますね。",
            nextNodeId: "END",
          },
          {
            label: "B",
            type: "相手の情報を聞く",
            text: "Would you like me to stay with you for a moment?",
            ja: "少しそばにいましょうか？",
            nextNodeId: "END",
          },
        ],
      },
    },
  },
];