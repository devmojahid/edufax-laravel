import { useState, useEffect } from "react";

export default function ChatLoadingAnimation() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "";
        }
        return prevDots + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-[18rem] overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              AI Assistant
            </h2>
            <p className="text-gray-600">Thinking{dots}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
