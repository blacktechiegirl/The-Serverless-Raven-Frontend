import React from "react";

const CircularProgress = () => {
  return (
    <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
      <div class="border-t-transparent border-solid animate-spin  rounded-full border-red border-4 h-8 w-8"></div>
    </div>
  );
};

export default CircularProgress;
