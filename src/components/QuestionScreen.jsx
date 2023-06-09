import { useEffect, useState } from "react";
import { FaTimes, FaCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import quizApi from "../api/quizApi";
import Loading from "./Loading";

const QuestionScreen = ({
  finishTest,
  onQuit,
  onFinish,
  setCorrectAnswerCount,
}) => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [correct, setCorrect] = useState();

  useEffect(() => {
    getQuestions();
  }, []);

  const currentQuestion = questions[questionIndex];

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
    setSelectedAnswer(answer);
  };

  const onNext = () => {
    setQuestionIndex((prev) => prev + 1);
    setIsChecked(false);
    setSelectedAnswer("");
    setCorrect();
  };

  const onCheck = () => {
    if (selectedAnswer === currentQuestion.correct_answer) {
      console.log("True");
      setCorrect(true);
      setCorrectAnswerCount((prev) => prev + 1);
    } else {
      console.log("False");
      setCorrect(false);
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
          className="block float-right text-lg cursor-pointer hover:text-[#087F5B]"
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
          {currentQuestion.answers.map((answer, index) => (
            <li
              onClick={() => onSelect(answer)}
              className={`text-left w-full py-2 px-4 border-2 border-[#087f58] rounded-full mb-4 hover:ring-4 focus:ring-4 hover:ring-[#63e6be] transition duration-200 ${
                selectedAnswer === answer ? "ring-4 ring-[#63e6be]" : ""
              }`}
              key={index}
            >
              <span className="flex justify-between items-center">
                {answer}
                <input
                  type="checkbox"
                  className="text-[#087f58] rounded-full"
                  checked={selectedAnswer === answer}
                  onChange={() => setSelectedAnswer(answer)}
                />
              </span>
            </li>
          ))}
        </ul>
        <div
          className={`${!isChecked ? "invisible" : "visible"} ${
            correct ? "bg-green-200" : "bg-red-200"
          } z-10 p-3 rounded-lg h-20 min-h-fit flex flex-col font-bold  items-center justify-center`}
        >
          {correct ? (
            <span className="flex items-center text-lg text-[#087F5B]">
              <FaCheckCircle className="mr-4" /> Correct
            </span>
          ) : (
            <span className="flex items-center text-lg text-red-500">
              <FaRegTimesCircle className="mr-4" /> Incorrect
            </span>
          )}
          <span
            className={`${
              correct && "hidden"
            } text-red-500 font-semibold block`}
          >
            Correct answer:{" "}
            <span className="font-bold">{currentQuestion.correct_answer}</span>
          </span>
        </div>
        <button
          className={`${
            selectedAnswer !== ""
              ? "bg-[#087F5B]"
              : "bg-gray-400 pointer-events-none"
          } w-full active:scale-105 px-6 py-2 rounded-full tracking-wider uppercase font-bold text-white mt-8 hover:bg-[#0ca678] hover:ring-4 hover:ring-[#087F5B] transition duration-300`}
          onClick={
            !isChecked
              ? onCheck
              : questionIndex + 1 === questions.length
              ? handleFinish
              : onNext
          }
        >
          {!isChecked
            ? "Check"
            : questionIndex + 1 === questions.length
            ? "Finish"
            : "Next"}
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
export default QuestionScreen;
