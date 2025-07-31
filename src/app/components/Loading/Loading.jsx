import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="fixed h-screen w-screen top-0 left-0 flex justify-center items-center backdrop-blur-2xl z-50">
      <div className="w-28 aspect-square space-y-2">
        <div className="h-1/2 flex gap-2">
          <div
            className="w-1/2 bg-accent h-full rounded relative -top-9 -left-9"
            id="block1"
          ></div>
          <div
            className="w-1/2 bg-amber-500 h-full rounded relative -top-9 -right-9"
            id="block2"
          ></div>
        </div>

        <div className="flex h-1/2 gap-2">
          <div
            className="h-full w-1/3 bg-amber-500 rounded relative -bottom-9 -left-9"
            id="block3"
          ></div>
          <div className="h-full w-1/3 space-y-2">
            <div
              className="w-full h-6 bg-accent rounded relative scale-0"
              id="block4"
            ></div>
            <div
              className="w-full h-6 bg-amber-500 rounded relative -bottom-9"
              id="block5"
            ></div>
          </div>
          <div
            className="h-full w-1/3 bg-accent rounded relative -bottom-9 -right-9"
            id="block6"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
