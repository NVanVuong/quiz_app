import { useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import QuestionScreen from "./QuestionScreen";
import ResultScreen from "./ResultScreen";

const QuizApp = () => {
  const [quizState, setQuizState] = useState("start");
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const startTest = () => {
    const startTime = Date.now();
    setStartTime(startTime);
  };

  const finishTest = () => {
    const endTime = Date.now();
    setEndTime(endTime);
  };

  useEffect(() => {
    if (startTime && endTime) {
      const elapsedTimeInSeconds = Math.floor((endTime - startTime) / 1000);
      const time = formatTime(elapsedTimeInSeconds);
      setElapsedTime(time);
    }
  }, [startTime, endTime]);

  const handleQuizStateChange = (newState) => {
    setQuizState(newState);
  };

  const renderScreen = () => {
    switch (quizState) {
      case "start":
        return (
          <StartScreen
            startTest={startTest}
            onNext={() => handleQuizStateChange("question")}
          />
        );
      case "question":
        return (
          <QuestionScreen
            finishTest={finishTest}
            onQuit={() => handleQuizStateChange("start")}
            onFinish={() => handleQuizStateChange("result")}
            setCorrectAnswerCount={setCorrectAnswerCount}
          />
        );
      case "result":
        return (
          <ResultScreen
            elapsedTime={elapsedTime}
            correctAnswerCount={correctAnswerCount}
            onReplay={() => handleQuizStateChange("start")}
          />
        );
      default:
        return null;
    }
  };

  return <div className="w-full h-screen">{renderScreen()}</div>;
};
export default QuizApp;
