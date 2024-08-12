import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 text-center">
      <div className="relative flex flex-col items-center justify-center bg-white p-8 shadow-lg rounded-lg">
        <img
          src="/images/404.png"
          alt="404 illustration"
          className="w-full h-64 mb-4"
        />
        {/* <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1> */}
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={() => history.push("/home")}
          className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-800 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
