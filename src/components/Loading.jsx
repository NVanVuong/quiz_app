function Loading() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent text-[#087F5B]"></div>
      <span className="text-[#087F5B] mt-4 ml-2 drop-shadow-lg text-lg tracking-wide font-semibold">
        Loading...
      </span>
    </div>
  );
}

export default Loading;
