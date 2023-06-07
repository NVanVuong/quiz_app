import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import quizApi from "../api/quizApi";
import Loading from "./Loading";

const QuestionScreen = ({ onQuit, onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState();

  useEffect(() => {
    getQuestions();
  }, []);

  const currentQuestion = questions[questionIndex];

  const getQuestions = async () => {
    const response = await quizApi.getAll();
    const allQuestions = response.data.results;
    const shuffledQuestions = shuffleAnswers(allQuestions);
    setQuestions(shuffledQuestions);
    setTotalQuestions(shuffledQuestions.length);
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

  const onNext = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  return !isLoading ? (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-80 text-center">
        <span
          className="block float-right cursor-pointer hover:text-[#087F5B]"
          onClick={onQuit}
        >
          <FaTimes />
        </span>
        <span className="text-[#087F5B] text-lg font-bold">
          Question {questionIndex + 1}
          <span className="text-sm font-medium">/{totalQuestions}</span>{" "}
        </span>
        <p className="mt-6">{currentQuestion.question}</p>
        <ul className="mt-8">
          {currentQuestion.answers.map((answer, index) => (
            <li
              onClick={() => setSelectedAnswer(answer)}
              className={`text-left w-full py-2 px-4 border-2 border-[#087f58] rounded-full my-4 hover:ring-4 focus:ring-4 hover:ring-[#63e6be] transition duration-200 ${
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
                />
              </span>
            </li>
          ))}
        </ul>
        <button
          className="w-full px-6 py-1.5 text-lg rounded-full ring-2 ring-gray-950 font-bold text-white mt-6 bg-[#087F5B] hover:bg-[#0ca678] hover:ring-4 hover:ring-[#087F5B] transition duration-300 hover:border-0"
          onClick={questionIndex + 1 === totalQuestions ? onFinish : onNext}
        >
          {questionIndex + 1 === totalQuestions ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
export default QuestionScreen;
