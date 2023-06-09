import { useState, useEffect } from "react";
import GoldMedal from "../assets/GoldMedal.png";
import SilverMedal from "../assets/SilverMedal.png";
import BronzeMedal from "../assets/BronzeMedal.png";

const ResultScreen = ({ elapsedTime, correctAnswerCount, onReplay }) => {
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

  return (
    <div className="flex flex-col justify-center items-center h-full w-max-2xl">
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
      <button
        onClick={onReplay}
        className="px-6 active:scale-105 py-1.5 text-lg rounded-full ring-2 ring-gray-950 font-bold text-white mt-8 bg-[#087F5B] hover:bg-[#0ca678] hover:ring-4 hover:ring-[#087F5B] transition duration-100 hover:border-0"
      >
        Play Again
      </button>
    </div>
  );
};
export default ResultScreen;