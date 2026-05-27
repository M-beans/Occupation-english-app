export type Profile = {
  name: string;
  department: string;
  level: string;
  style: string;
};

export type AiScenario = {
  patient: string;
  patientJa: string;
  choiceA: string;
  choiceAJa: string;
  choiceB: string;
  choiceBJa: string;
  patientName: string;

  listeningKeywords: string[];
  clinicalMeaning: string;

  alternativePhrase: string;
  alternativePhraseJa: string;
};

export type Choice = {
  label: string;
  type: string;
  text: string;
  ja: string;
  nextNodeId: string;
};

export type Emotion =
  | "neutral"
  | "anxious"
  | "pain"
  | "relieved"
  | "confused"
  | "embarrassed";

export type ConversationChoice = {
  label: "A" | "B";
  type: string;
  text: string;
  ja: string;
  nextNodeId: string;
};

export type ConversationNode = {
  nodeId: string;
  patientText: string;
  emotion: Emotion;
  patientJa: string;
  familyInterrupt: string;
  choices: ConversationChoice[];
};