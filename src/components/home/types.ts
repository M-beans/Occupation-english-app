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
};

export type Choice = {
  label: string;
  type: string;
  text: string;
  ja: string;
  nextNodeId: string;
};

export type ConversationNode = {
  nodeId: string;
  patientText: string;
  patientJa: string;
  choices: Choice[];
};