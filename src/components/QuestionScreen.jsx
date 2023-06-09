import { useEffect, useState } from "react";
import { FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import quizApi from "../api/quizApi";
import Loading from "./Loading";

const QuestionScreen = ({
  questions,
  setQuestions,
  finishTest,
  onQuit,
  onFinish,
  setCorrectAnswerCount,
  selectedAnswers,
  setSelectedAnswers,
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isChoiced, setIsChoiced] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState();

  useEffect(() => {
    getQuestions();
  }, []);

  const currentQuestion = questions[questionIndex];
  const isLastQuestion = questionIndex === questions.length - 1;

  const getQuestions = async () => {
    const response = await quizApi.getAll();
    const allQuestions = response.data.results;
    const shuffledQuestions = shuffleAnswers(allQuestions);
    setQuestions(shuffledQuestions);
    setIsLoading(false);
    console.log(shuffledQuestions);
  };

  const shuffleAnswers = (questions) => {
    return questions.map((question) => {
      const { correct_answer, incorrect_answers } = question;
      const allAnswers = [...incorrect_answers, correct_answer];
      const answers = shuffleArray(allAnswers);
      return { ...question, answers };
    });
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const onSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answer;
    setSelectedAnswers(newSelectedAnswers);
    setIsChoiced(true);
  };

  const onNext = () => {
    setQuestionIndex((prev) => prev + 1);
    setIsChecked(false);
    setIsChoiced(false);
    setIsCorrect();
  };

  const onCheck = () => {
    if (selectedAnswers[questionIndex] === currentQuestion.correct_answer) {
      setIsCorrect(true);
      setCorrectAnswerCount((prev) => prev + 1);
    } else {
      setIsCorrect(false);
    }
    setIsChecked(true);
  };

  const handleFinish = () => {
    onFinish();
    finishTest();
  };

  return !isLoading ? (
    <div className="flex flex-col items-center h-full justify-center">
      <div className="text-center py-16 px-12 h-full max-w-lg w-full">
        <span
          className="block absolute top-12 right-12 hover:scale-110 duration-100  text-lg cursor-pointer hover:text-[#087F5B]"
          onClick={onQuit}
        >
          <FaTimes />
        </span>
        <span className="block mt-6 text-[#087F5B] text-lg font-bold">
          Question {questionIndex + 1}
          <span className="text-sm font-medium">/{questions.length}</span>{" "}
        </span>
        <p className="mt-6 h-16 flex items-center justify-center">
          {currentQuestion.question}
        </p>
        <ul className={`${isChecked && "pointer-events-none"} my-8 h-60`}>
          {currentQuestion.answers.map((answer, index) => {
            const isSelected = selectedAnswers[questionIndex] === answer;
            const isCorrectAnswer = answer === currentQuestion.correct_answer;
            const isUserAnswerWrong = isChecked && isSelected && !isCorrect;

            const liClassName = `text-left w-full py-2 px-4 border-2 border-[#087f58] rounded-full mb-4 hover:ring-4 focus:ring-4 hover:ring-[#63e6be] transition ${
              isSelected ? "ring-4 ring-[#63e6be]" : ""
            } ${
              isUserAnswerWrong ? "ring-4 ring-red-300 border-red-500" : ""
            } ${isChecked && isCorrectAnswer ? "ring-4 ring-[#63e6be]" : ""}`;

            const inputClassName = `text-[#087f58] rounded-full ${
              isChecked && isUserAnswerWrong ? "text-red-500" : ""
            } ${isChecked && isCorrectAnswer ? "text-[#087f58]" : ""}`;

            const isCheckedAnswer = isChecked ? isCorrectAnswer : isSelected;

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
        <div
          className={`${!isChecked ? "bg-transparent" : "bg-gray-200"} ${
            isCorrect ? "text-[#087F5B]" : "text-red-500"
          } z-20 pt-4 rounded-t-2xl w-full px-12 absolute bottom-0 left-0 right-0`}
        >
          {isChecked ? (
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
          ) : null}
          <button
            className={`${
              isChoiced ? "bg-[#087F5B]" : "bg-gray-400 pointer-events-none"
            } ${
              isChecked && isCorrect
                ? "bg-[#087F5B]"
                : isChecked
                ? "bg-red-500 hover:bg-red-400 hover:ring-red-500"
                : ""
            }  w-full active:scale-105 mb-6 mt-5 px-6 py-2 rounded-xl tracking-wider uppercase font-bold text-white hover:bg-[#0ca678] hover:ring-4 hover:ring-[#087F5B] transition duration-300`}
            onClick={
              !isChecked ? onCheck : isLastQuestion ? handleFinish : onNext
            }
          >
            {!isChecked ? "Check" : isLastQuestion ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
export default QuestionScreen;
