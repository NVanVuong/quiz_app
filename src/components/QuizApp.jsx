import { useState } from "react";
import StartScreen from "./StartScreen";
import QuestionScreen from "./QuestionScreen";
import ResultScreen from "./ResultScreen";

const QuizApp = () => {
  const [quizState, setQuizState] = useState("start");

  const handleQuizStateChange = (newState) => {
    setQuizState(newState);
  };

  const renderScreen = () => {
    switch (quizState) {
      case "start":
        return <StartScreen onNext={() => handleQuizStateChange("question")} />;
      case "question":
        return (
          <QuestionScreen
            onQuit={() => handleQuizStateChange("start")}
            onFinish={() => handleQuizStateChange("result")}
          />
        );
      case "result":
        return <ResultScreen onReplay={() => handleQuizStateChange("start")} />;
      default:
        return null;
    }
  };

  return <div className="w-full h-screen">{renderScreen()}</div>;
};
export default QuizApp;
