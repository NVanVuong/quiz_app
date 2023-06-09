import quizLogo from "../assets/quiz.svg";

const StartScreen = ({ startTest, onNext }) => {
  const handleStart = () => {
    onNext();
    startTest();
  };
  return (
    <div className="flex flex-col justify-center items-center h-full w-max-2xl">
      <h1 className="text-[#087F5B] text-4xl drop-shadow-lg tracking-wide uppercase mb-8 font-bold">
        Quiz App
      </h1>
      <img src={quizLogo} alt="quiz-logo" className="w-52" />
      <button
        onClick={handleStart}
        className="px-6 active:scale-105 py-1.5 text-lg rounded-full ring-2 ring-gray-950 font-bold text-white mt-12 bg-[#087F5B] hover:bg-[#0ca678] hover:ring-4 hover:ring-[#087F5B] transition duration-100 hover:border-0"
      >
        Start Quiz!
      </button>
    </div>
  );
};
export default StartScreen;
