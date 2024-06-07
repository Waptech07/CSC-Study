import React from "react";
import loadingGif from "../assets/loading.gif"

const Loading = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <img src={loadingGif} alt="Loading..." className="w-16 h-16" />
      </div>
    </>
  );
};

export default Loading;
