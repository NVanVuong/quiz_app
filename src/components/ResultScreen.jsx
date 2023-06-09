import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { SiCodereview } from "react-icons/si";
import GoldMedal from "../assets/GoldMedal.png";
import SilverMedal from "../assets/SilverMedal.png";
import BronzeMedal from "../assets/BronzeMedal.png";

const ResultScreen = ({
  elapsedTime,
  correctAnswerCount,
  setCorrectAnswerCount,
  startTest,
  onReplay,
  onQuit,
  onReview,
}) => {
  const [result, setResult] = useState();

  const testResults = [
    {
      message: "Congratulations!!",
      medal: GoldMedal,
      greeting: "You are amazing!",
    },
    {
      message: "Well done!!",
      medal: SilverMedal,
      greeting: "Keep up the good work!",
    },
    {
      message: "Completed!",
      medal: BronzeMedal,
      greeting: "Better luck next time!",
    },
  ];

  useEffect(() => {
    if (correctAnswerCount >= 9) {
      setResult(testResults[0]);
    } else if (correctAnswerCount >= 7) {
      setResult(testResults[1]);
    } else {
      setResult(testResults[2]);
    }
  }, [correctAnswerCount]);

  const handleQuit = () => {
    onQuit();
    setCorrectAnswerCount(0);
  };

  const handleReplay = () => {
    startTest();
    onReplay();
    setCorrectAnswerCount(0);
  };

  const handleReview = () => {
    onReview();
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-max-2xl">
      <span
        className="absolute top-12 right-12 hover:scale-110 duration-100 text-lg cursor-pointer hover:text-[#087F5B]"
        onClick={handleQuit}
      >
        <FaTimes />
      </span>
      {result && (
        <>
          <img src={result.medal} alt="quiz-logo" className="w-32 rounded-lg" />
          <h2
            className={`mb-2 text-2xl tracking-wide font-bold ${
              result.message === "Congratulations!!"
                ? "text-yellow-500"
                : result.message === "Well done!!"
                ? "text-[#A6A6A6]"
                : "text-[#E5956C]"
            }`}
          >
            {result.message}
          </h2>
          <span className="text-[#087F5B] drop-shadow-lg text-lg tracking-wide font-semibold">
            {result.greeting}
          </span>
        </>
      )}
      <span className="text-[#087F5B] drop-shadow-lg text-lg tracking-wide font-semibold">
        {correctAnswerCount}/10 correct answers in {elapsedTime} minutes
      </span>
      <div className="flex gap-4">
        <button
          onClick={handleReplay}
          className="px-6 active:scale-105 py-1.5 text-lg rounded-full ring-2 ring-gray-950 font-bold text-white mt-8 bg-[#087F5B] hover:bg-[#0ca678] hover:ring-4 hover:ring-[#087F5B] transition duration-100 hover:border-0"
        >
          Play Again!
        </button>
        <button
          onClick={handleReview}
          className="px-6 flex items-center active:scale-105 py-1.5 text-lg rounded-full ring-2 ring-[#0ca678] font-bold mt-8 text-[#0ca678] hover:ring-4 hover:ring-[#087F5B] transition duration-100 hover:border-0"
        >
          <SiCodereview className="mr-2" />
          Review
        </button>
      </div>
    </div>
  );
};
export default ResultScreen;
