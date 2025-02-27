import React from "react";

export default function Background() {
  return (
    <div className="md:mx-auto w-full flex justify-center md:mt-12 mt-8  md:max-w-[1280px]">
      <div>
        <img
          src="/Assets/shopping.png"
          alt="shopping"
          className="md:w-full w-[90%] md:h-[800px] h-full"
        />
      </div>
      <div className="md:mt-56 mt-36">
        <h1 aria-label="Welcome To EazyBuy">
          <span className="typewriter"></span>
        </h1>
        <h4 className="dark:text-white text-slate-950 text-center mt-12 md:text-[22px] text-lg">
          Where Quality Meets{" "}
          <span className="dark:text-orange-400 text-yellow-500">
            Convenience!
          </span>{" "}
          <span className="dark:text-red-500 text-orange-700">
            Shop Smart,{" "}
          </span>{" "}
          Shop Easy!
        </h4>
      </div>
    </div>
  );
}
