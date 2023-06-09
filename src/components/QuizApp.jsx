import { useState, useEffect } from "react";
import StartScreen from "./StartScreen";
import QuestionScreen from "./QuestionScreen";
import ResultScreen from "./ResultScreen";
import ReviewScreen from "./ReviewScreen";

const QuizApp = () => {
  const [quizState, setQuizState] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

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
            questions={questions}
            setQuestions={setQuestions}
            finishTest={finishTest}
            onQuit={() => handleQuizStateChange("start")}
            onFinish={() => handleQuizStateChange("result")}
            setCorrectAnswerCount={setCorrectAnswerCount}
            selectedAnswers={selectedAnswers}
            setSelectedAnswers={setSelectedAnswers}
          />
        );
      case "result":
        return (
          <ResultScreen
            startTest={startTest}
            elapsedTime={elapsedTime}
            correctAnswerCount={correctAnswerCount}
            setCorrectAnswerCount={setCorrectAnswerCount}
            onQuit={() => handleQuizStateChange("start")}
            onReplay={() => handleQuizStateChange("question")}
            onReview={() => handleQuizStateChange("review")}
          />
        );
      case "review":
        return (
          <ReviewScreen
            questions={questions}
            selectedAnswers={selectedAnswers}
            onQuit={() => handleQuizStateChange("start")}
            onFinish={() => handleQuizStateChange("result")}
          />
        );
      default:
        return null;
    }
  };

  return <div className="w-full h-screen">{renderScreen()}</div>;
};
export default QuizApp;
