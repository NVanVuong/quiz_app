import { useState } from "react";
import { FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ReviewScreen = ({ questions, selectedAnswers, onQuit, onFinish }) => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const onNext = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  const currentQuestion = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;
  const isCorrect =
    selectedAnswers[questionIndex] === currentQuestion.correct_answer;

  return (
    <div className="flex flex-col items-center h-full justify-center">
      <div className="relative text-center h-full max-w-md w-full md:w-2/5">
        <div className="pt-16 px-12">
          <span
            className="block absolute top-12 right-12 hover:scale-110 duration-100 text-lg cursor-pointer hover:text-[#087F5B]"
            onClick={onFinish}
          >
            <FaTimes />
          </span>
          <span className="block mt-6 text-[#087F5B] text-lg font-bold">
            Question {questionIndex + 1}
            <span className="text-sm font-medium">
              /{questions.length}
            </span>{" "}
          </span>
          <p className="mt-6 h-16 flex items-center justify-center">
            {currentQuestion.question}
          </p>
          <ul className={` my-8 h-60`}>
            {currentQuestion.answers.map((answer, index) => {
              const isSelected = selectedAnswers[questionIndex] === answer;
              const isCorrectAnswer = answer === currentQuestion.correct_answer;
              const isUserAnswerWrong = isSelected && !isCorrect;

              const liClassName = `text-left w-full py-2 px-4 border-2 border-[#087f58] rounded-full mb-4 hover:ring-4 focus:ring-4 hover:ring-[#63e6be] transition duration-200  ${
                isUserAnswerWrong ? "ring-4 ring-red-300 border-red-500" : ""
              } ${isCorrectAnswer ? "ring-4 ring-[#63e6be]" : ""}`;

              const inputClassName = `text-[#087f58] rounded-full ${
                isUserAnswerWrong ? "text-red-500" : ""
              } ${isCorrectAnswer ? "text-[#087f58]" : ""}`;

              const isCheckedAnswer = isCorrectAnswer;

              return (
                <li
                  onClick={() => onSelect(answer)}
                  className={liClassName}
                  key={index}
                >
                  <span className="flex justify-between items-center">
                    {answer}
                    <input
                      type="checkbox"
                      className={inputClassName}
                      checked={isCheckedAnswer}
                      onChange={() => {}}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={`bg-gray-200 ${
            isCorrect ? "text-[#087F5B]" : "text-red-500"
          } z-20 pt-4 rounded-t-2xl w-full px-12 absolute bottom-0 left-0 right-0`}
        >
          <div className={`rounded-lg h-20 min-h-fit font-extrabold`}>
            {isCorrect ? (
              <span className="flex mb-1 items-center text-lg">
                <FaCheckCircle className="mr-2" /> Correct
              </span>
            ) : (
              <span className="flex mb-1 items-center text-lg">
                <FaTimesCircle className="mr-2" /> Incorrect
              </span>
            )}
            <span className={` text-left mb-1 font-bold block`}>
              Correct answer:
            </span>
            <span className={` text-left block font-medium`}>
              {currentQuestion.correct_answer}
            </span>
          </div>
          <button
            className={` ${
              isCorrect
                ? "bg-[#087F5B]"
                : "bg-red-500 hover:bg-red-400 hover:ring-red-500"
            }  w-full active:scale-105 mb-6 mt-5 px-6 py-2 rounded-xl tracking-wider uppercase font-bold text-white hover:bg-[#0ca678] hover:ring-4 hover:ring-[#087F5B] transition duration-300`}
            onClick={isLastQuestion ? onFinish : onNext}
          >
            {isLastQuestion ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReviewScreen;
