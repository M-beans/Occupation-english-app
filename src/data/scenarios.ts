type Emotion =
  | "neutral"
  | "anxious"
  | "pain"
  | "relieved"
  | "confused"
  | "embarrassed";

export const scenarios = [
  {
    id: "nurse_greeting_a2",
    title: "患者へのあいさつ",
    description: "担当看護師として患者に最初の声かけをする練習",
    level: "A2",
    image: "👩‍⚕️",
    startNodeId: "T1",
    nodes: {
      T1: {
        nodeId: "T1",
        patientText: "Oh... Are you my nurse for today?",
        emotion: "neutral" ,
        patientJa: "今日、私の看護師さんですか？",
        familyInterrupt: "She just woke up from her nap.",
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
        emotion: "neutral",
        patientJa: "ありがとうございます。次に何があるのか少し不安です。",
        familyInterrupt: "",
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
        emotion: "anxious",
        patientJa: "検査結果が心配です。",
        familyInterrupt: "",
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
        emotion: "neutral",
        patientJa: "わかりました。それなら大丈夫そうです。",
        familyInterrupt: "",
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
        emotion: "anxious",
        patientJa: "予定が分からなくて不安です。",
        familyInterrupt: "",
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
        emotion: "relieved",
        patientJa: "ありがとうございます。少し安心しました。",
        familyInterrupt: "",
        choices: [
          {
            label: "A",
            type: "自分の情報を伝える",
            text: "I’ll come back as soon as I have more information.",
            ja: "新しい情報が分かり次第、すぐ戻りますね。",
            familyInterrupt: "",
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
        patientText: "Uh... The doctor said they would explain later.",
        emotion: "confused",
        patientJa: "医師は後で説明すると言っていました。",
        familyInterrupt: "",
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

  {
  id: "blood_sampling_a2",
  title: "採血",
  description: "患者に採血の説明をする練習",
  level: "A2",
  image: "💉",
  startNodeId: "T1",
  nodes: {
    T1: {
      nodeId: "T1",
      patientText: "Uh... What are you going to do?",
      emotion: "neutral",
      patientJa: "これから何をするんですか？",
      familyInterrupt: "So she can prepare herself for the procedure.",
      choices: [
        {
          label: "A",
          type: "リアクション＋説明",
          text: "Sure. I’m going to take a blood sample.",
          ja: "はい。これから採血をします。",
          nextNodeId: "T2A",
        },
        {
          label: "B",
          type: "リアクション＋確認",
          text: "Of course. Are you nervous about needles?",
          ja: "もちろんです。注射は苦手ですか？",
          nextNodeId: "T2B",
        },
      ],
    },

    T2A: {
      nodeId: "T2A",
      patientText: "Okay... Will it hurt? Sorry, I mean,how long will it take?",
      emotion: "neutral",
      patientJa: "わかりました。痛いですか？あ、間違えた、時間かかりますか？",
      familyInterrupt: "",
      choices: [
        {
          label: "A",
          type: "共感＋説明",
          text: "I understand. You may feel a small pinch.",
          ja: "わかります。少しチクっとするかもしれません。",
          nextNodeId: "T3AA",
        },
        {
          label: "B",
          type: "確認＋安心",
          text: "I see. Have you had blood tests before?",
          ja: "そうなんですね。以前採血を受けたことはありますか？",
          nextNodeId: "T3AB",
        },
      ],
    },

    T2B: {
      nodeId: "T2B",
      patientText: "Yes, a little...No! I'm NOT good at shots!",
      emotion: "anxious",
      patientJa: "はい、少し苦手です。",
      familyInterrupt: "",
      choices: [
        {
          label: "A",
          type: "共感＋次の行動",
          text: "That’s okay. I’ll try to make it quick.",
          ja: "大丈夫ですよ。できるだけ早く終わらせますね。",
          nextNodeId: "T3BA",
        },
        {
          label: "B",
          type: "共感＋確認",
          text: "I understand. Would you like to sit down first?",
          ja: "わかりました。先に座りますか？",
          nextNodeId: "T3BB",
        },
      ],
    },

    T3AA: {
      nodeId: "T3AA",
      patientText: "Okay, thank you.",
      emotion: "neutral",
      patientJa: "わかりました。ありがとうございます。",
      familyInterrupt: "",
      choices: [
        {
          label: "A",
          type: "反応＋指示",
          text: "No problem. Please relax your arm.",
          ja: "大丈夫ですよ。腕の力を抜いてください。",
          nextNodeId: "END",
        },
        {
          label: "B",
          type: "反応＋確認",
          text: "You’re welcome. Are you feeling okay?",
          ja: "どういたしまして。気分は大丈夫ですか？",
          nextNodeId: "END",
        },
      ],
    },

    T3AB: {
      nodeId: "T3AB",
      patientText: "Oh...Yes, but I still get nervous.",
      emotion: "anxious",
      patientJa: "はい。でもやっぱり緊張します。",
      familyInterrupt: "",
      choices: [
        {
          label: "A",
          type: "共感＋説明",
          text: "I understand. I’ll explain each step.",
          ja: "わかります。一つずつ説明しますね。",
          nextNodeId: "END",
        },
        {
          label: "B",
          type: "共感＋提案",
          text: "That’s okay. Would you like to look away?",
          ja: "大丈夫ですよ。針を見ないようにしますか？",
          nextNodeId: "END",
        },
      ],
    },

    T3BA: {
      nodeId: "T3BA",
      patientText: "Thank you. That helps.",
      emotion: "relieved",
      patientJa: "ありがとうございます。安心します。",
      familyInterrupt: "That’s good to hear. Haha,She seems more relaxed now.",
      choices: [
        {
          label: "A",
          type: "反応＋説明",
          text: "I’m glad to hear that. We’ll be finished soon.",
          ja: "そう言ってもらえてよかったです。もうすぐ終わります。",
          nextNodeId: "END",
        },
        {
          label: "B",
          type: "反応＋確認",
          text: "No problem. Would you like some water after?",
          ja: "大丈夫ですよ。終わった後、お水を飲みますか？",
          nextNodeId: "END",
        },
      ],
    },

    T3BB: {
      nodeId: "T3BB",
      patientText: "Yes, please.No, actually, I don't need any.",
      emotion: "confused",
      patientJa: "はい、お願いします。いえ、やっぱり要りません。",
      familyInterrupt: "",
      choices: [
        {
          label: "A",
          type: "反応＋次の行動",
          text: "Sure. I’ll begin in a moment.",
          ja: "わかりました。それではすぐ始めますね。",
          nextNodeId: "END",
        },
        {
          label: "B",
          type: "反応＋確認",
          text: "Of course. Are you comfortable now?",
          ja: "もちろんです。今は楽な姿勢ですか？",
          nextNodeId: "END",
        },
      ],
    },
  },
},

{
  id: "move_to_exam_room_a2",
  title: "病室から診察室への移動",
  description: "患者を診察室へ案内する練習",
  level: "A2",
  image: "🚶‍♀️",
  startNodeId: "T1",
  nodes: {
    T1: {
      nodeId: "T1",
      patientText: "Uh... Where are we going?",
      emotion: "neutral",
      patientJa: "どこへ行くんですか？",
      familyInterrupt: "",
      choices: [
        {
          label: "A",
          type: "リアクション＋説明",
          text: "Sure. We’re going to the examination room.",
          ja: "はい。診察室へ向かいます。",
          nextNodeId: "T2A",
        },
        {
          label: "B",
          type: "リアクション＋確認",
          text: "Of course. Can you walk by yourself?",
          ja: "もちろんです。ご自身で歩けますか？",
          nextNodeId: "T2B",
        },
      ],
    },

    T2A: {
      nodeId: "T2A",
      patientText: "Okay. Is it far from here?",
      emotion: "neutral",
      patientJa: "わかりました。ここから遠いですか？",
      familyInterrupt: "",
      choices: [
        {
          label: "A",
          type: "安心＋説明",
          text: "No, not far. It’s just down the hall.",
          ja: "いいえ、遠くありません。この廊下の先です。",
          nextNodeId: "T3AA",
        },
        {
          label: "B",
          type: "確認＋配慮",
          text: "It’s close. Do you feel okay to walk?",
          ja: "近いです。歩いても大丈夫そうですか？",
          nextNodeId: "T3AB",
        },
      ],
    },

    T2B: {
      nodeId: "T2B",
      patientText: "I can walk, but slowly.",
      emotion: "anxious",
      patientJa: "歩けますが、ゆっくりです。",
      familyInterrupt: "",
      choices: [
        {
          label: "A",
          type: "反応＋安心",
          text: "That’s okay. We can go slowly.",
          ja: "大丈夫です。ゆっくり行きましょう。",
          nextNodeId: "T3BA",
        },
        {
          label: "B",
          type: "反応＋提案",
          text: "I understand. Would you like a wheelchair?",
          ja: "わかりました。車椅子を使いますか？",
          nextNodeId: "T3BB",
        },
      ],
    },

    T3AA: {
      nodeId: "T3AA",
      patientText: "Uh... I got it. No, wait a moment. Okay, I'm ready.",
      emotion: "neutral",
      patientJa: "うーん、わかりました。ちょっと待ってください。わかった、準備できました。",
      familyInterrupt: "",
      choices: [
        {
          label: "A",
          type: "反応＋次の行動",
          text: "Great. Please follow me.",
          ja: "いいですね。私について来てください。",
          nextNodeId: "END",
        },
        {
          label: "B",
          type: "反応＋確認",
          text: "Good. Do you need any help standing up?",
          ja: "よかったです。立ち上がる時に手伝いが必要ですか？",
          nextNodeId: "END",
        },
      ],
    },

    T3AB: {
      nodeId: "T3AB",
      patientText: "Yes, Haha,I think I’m okay.",
      emotion: "confused",
      patientJa: "はい、大丈夫だと思います。",
      familyInterrupt: "",
      choices: [
        {
          label: "A",
          type: "反応＋見守り",
          text: "Alright. I’ll walk beside you.",
          ja: "わかりました。横について歩きますね。",
          nextNodeId: "END",
        },
        {
          label: "B",
          type: "反応＋確認",
          text: "Okay. Please tell me if you feel dizzy.",
          ja: "わかりました。めまいがしたら教えてください。",
          nextNodeId: "END",
        },
      ],
    },

    T3BA: {
      nodeId: "T3BA",
      patientText: "Thank you. That makes me feel safe.",
      emotion: "relieved",
      patientJa: "ありがとうございます。安心します。",
      familyInterrupt: "She’s still a little nervous about walking.",
      choices: [
        {
          label: "A",
          type: "反応＋次の行動",
          text: "You’re welcome. Let’s go together.",
          ja: "どういたしまして。一緒に行きましょう。",
          nextNodeId: "END",
        },
        {
          label: "B",
          type: "反応＋確認",
          text: "No problem. Do you want to hold the rail?",
          ja: "大丈夫ですよ。手すりにつかまりますか？",
          nextNodeId: "END",
        },
      ],
    },

    T3BB: {
      nodeId: "T3BB",
      patientText: "No, I think I can walk.",
      emotion: "confused",
      patientJa: "いいえ、歩けると思います。",
      familyInterrupt: "She wants to try walking on her own.",
      choices: [
        {
          label: "A",
          type: "反応＋見守り",
          text: "Okay. I’ll stay close to you.",
          ja: "わかりました。近くについていますね。",
          nextNodeId: "END",
        },
        {
          label: "B",
          type: "反応＋確認",
          text: "Alright. Please let me know if you need to stop.",
          ja: "わかりました。止まりたくなったら教えてください。",
          nextNodeId: "END",
        },
      ],
    },
  },
},
]; 
