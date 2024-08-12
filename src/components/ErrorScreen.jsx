import React from "react";

const ErrorScreen = ({ message, retry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-purple-600">
        Something went wrong
      </h1>
      <p className="text-lg mt-4 text-gray-700">
        {message || "An unexpected error occurred."}
      </p>
      {retry && (
        <button
          onClick={retry}
          className="mt-6 px-4 py-2 bg-purple-500 text-white text-lg rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorScreen;
