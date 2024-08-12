import React from "react";

const Loader = () => {
  return (
    <div
      data-testid="loader"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
