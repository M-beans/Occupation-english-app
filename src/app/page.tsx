"use client";

import { useState } from "react";
import { scenarios } from "@/data/scenarios";
import { generateScenario } from "@/lib/ai";
import { ConversationScreen } from "@/components/home/ConversationScreen";
import { FeedbackScreen } from "@/components/home/FeedbackScreen";
import { ScenarioSelectionScreen } from "@/components/home/ScenarioSelectionScreen";
import { SetupScreen } from "@/components/home/SetupScreen";
import { AiScenario, Profile } from "@/components/home/types";

export default function Home() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [aiScenario, setAiScenario] = useState<AiScenario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStartingScenario, setIsStartingScenario] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [turnCount, setTurnCount] = useState(1);
  const [firstSelectedReply, setFirstSelectedReply] = useState("");
  const [selectedReplyForFeedback, setSelectedReplyForFeedback] = useState("");
  const [profile, setProfile] = useState<Profile>({
    name: "Yuki",
    department: "循環器科",
    level: "A2",
    style: "Work",
   
  });

  const selectedScenario = scenarios.find((scenario) => scenario.id === selectedScenarioId);

  const currentNode =
    selectedScenario && currentNodeId
      ? selectedScenario.nodes[currentNodeId as keyof typeof selectedScenario.nodes]
      : null;

  async function startScenario(scenarioId: string) {
    const scenario = scenarios.find((item) => item.id === scenarioId);
    if (!scenario) return;

    setAiScenario(null);
    setIsLoading(true);
    setIsStartingScenario(true);

    try {
      const result = await generateScenario(profile, scenario.title);
      setAiScenario(result);
      console.log(result);

      setSelectedScenarioId(scenario.id);
      setCurrentNodeId(scenario.startNodeId);
      setIsFinished(false);
      setTurnCount(1);
    } catch (error) {
      console.error(error);
      alert("AI生成に失敗しました。もう一度試してください。");
    } finally {
      setIsLoading(false);
    }
  }

  function completeSetup() {
    setIsSetupComplete(true);
  }

  async function handleChoice(nextNodeId: string, selectedReply: string) {
    if (!selectedScenario || !currentNode) return;

    if (turnCount >= 3) {
      setIsFinished(true);
      return;
    }

    const previousPatient = aiScenario?.patient ?? currentNode.patientText;
    
      setSelectedReplyForFeedback(selectedReply);
    if (!firstSelectedReply) {
      setFirstSelectedReply(selectedReply);
}

    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const result = await generateScenario(profile, selectedScenario.title, {
        previousPatient,
        selectedReply,
      });

      setAiScenario(result);
      setTurnCount(turnCount + 1);
      setCurrentNodeId(nextNodeId);
      console.log(result);
    } catch (error) {
      console.error(error);
      alert("AI生成に失敗しました。");
    } finally {
      setIsLoading(false);
      setIsStartingScenario(false);
    }
  }

  function resetLesson() {
    setSelectedScenarioId(null);
    setCurrentNodeId(null);
    setIsFinished(false);
    setAiScenario(null);
    setTurnCount(1);
    setFirstSelectedReply("");
  }

  function backToProfile() {
    setIsSetupComplete(false);
    setSelectedScenarioId(null);
    setCurrentNodeId(null);
    setIsFinished(false);
    setAiScenario(null);
    setTurnCount(1);
  }

  if (!isSetupComplete) {
    return <SetupScreen profile={profile} onProfileChange={setProfile} onCompleteSetup={completeSetup} />;
  }

  if (selectedScenario && isFinished) {
    return (
      <FeedbackScreen
        onResetLesson={resetLesson}
        aiScenario={aiScenario}
        firstSelectedReply={firstSelectedReply}
      />
    );
  }

  if (selectedScenario && currentNode) {
  return (
    <ConversationScreen
      selectedScenario={selectedScenario}
      currentNode={currentNode}
      profile={profile}
      isLoading={isLoading}
      aiScenario={aiScenario}
      onResetLesson={resetLesson}
      onChoiceSelect={handleChoice}
    />
  );
}

  return (
    <ScenarioSelectionScreen
      onBackToProfile={backToProfile}
      onStartScenario={startScenario}
      isStartingScenario={isStartingScenario}
    />
  );
}
