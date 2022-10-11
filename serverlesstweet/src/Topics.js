import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import iam from "./assets/IAM.svg";
import lambda1 from "./assets/lambda1.svg";
import stepfunction from "./assets/stepfunction.svg";
import apigateway from "./assets/apigateway.svg";
import dynamodb from "./assets/dynamodb.svg";
import codepipeline from "./assets/codepipeline.svg";

const Topics = () => {
  const navigate = useNavigate();
  const storiesRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const data = [
    {
      imgurl: lambda1,
      heading: "lambda",
      url: "/topic/0 ",
    },
    {
      imgurl: stepfunction,
      heading: "stepfunctions",
      url: "/topic/1",
    },
    {
      imgurl: apigateway,
      heading: "apigateway",
      url: "/topic/2",
    },
    {
      imgurl: dynamodb,
      heading: "dynamodb",
      url: "/topic/3",
    },
    {
      imgurl: codepipeline,
      heading: "sns",
      url: "/topic/4",
    },
    {
      imgurl: iam,
      heading: "appsync",
      url: "/topic/5",
    },
    {
      imgurl: stepfunction,
      heading: "s3",
      url: "/topic/6",
    },
    {
      imgurl: dynamodb,
      heading: "kinesis",
      url: "/topic/7",
    },
    {
      imgurl: codepipeline,
      heading: "aurora",
      url: "/topic/8",
    },
    {
      imgurl: iam,
      heading: "fargate",
      url: "/topic/9",
    },
    {
      imgurl: apigateway,
      heading: "eventbridge",
      url: "/topic/10",
    },
    {
      imgurl: lambda1,
      heading: "athena",
      url: "/topic/11",
    },
  ];

  const onScroll = () => {
    if (storiesRef.current.scrollLeft > 0) {
      setShowLeft(true);
    } else {
      setShowLeft(false);
    }

    if (
      (storiesRef.current.scrollLeft =
        storiesRef.current.scrollWidth - storiesRef.current.clientWidth)
    ) {
      setShowRight(true);
    } else {
      setShowRight(false);
    }
  };

  return (
    <div>
      <div
        id="default-carousel"
        class="relative m-5 md:hidden"
        data-carousel="static"
      >
        <p className="mb-5   text-xl font-bold  text-[#353bc1]">
          Get started with serverless Topics
        </p>
        <div className=" flex md:grid-cols-4 pt-4 mb-10 cursor-pointer text-sm overflow-x-auto scrollbar-hide ">
          {data.map((item) => {
            return (
              <div
                onClick={() => navigate(item.url)}
                className="min-w-[130px]  rounded-lg flex flex-col justify-center items-center hover:shadow-2xl relative h-32 "
              >
                <img
                  src={item.imgurl}
                  className=" w-20 hover:w-20 absolute top-1 ease-in duration-200"
                />
                <p className="absolute bottom-3"> {item.heading}</p>
              </div>
            );
          })}
        </div>
        <button type="button" class="absolute top-5 right-[-30px] z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
      </div>

      <div class=" hidden md:block ">
        <p className="mt-10 mb-5 text-xl font-bold  text-[#353bc1]">
          Get started with serverless Topics
        </p>
        <div className=" flex md:grid-cols-4 gap-10 mb-10 cursor-pointer text-sm overflow-x-auto scrollbar-hide">
          {data.map((item) => {
            return (
              <div
                onClick={() => navigate(item.url)}
                className="bg-white min-w-[250px] shadow-xl p-2 rounded-lg flex flex-col justify-center items-center hover:shadow-2xl relative h-32 "
              >
                {" "}
                <img
                  src={item.imgurl}
                  className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200"
                />
                <p className="absolute bottom-3"> {item.heading}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="hidden md:block">
        <p className="mt-10 mb-5 text-xl font-bold  text-[#353bc1]">
          Get started with serverless Topics
        </p> */}
        {/* <div className="relative  bg-white">
        <div
   
          className="flex  snap-x snap-mandatory flex-nowrap space-x-4 my-5 overflow-x-auto max-w-sm p-4 scroll-smooth "
        >
          {data.map((item) => {
            return (
              <div className=" w-40 h-20 p-5 bg-[#353bc1] ">
               {item.url}
              </div>
            );
          })}
          <div className="absolute top-0 py-4 w-full h-full flex justify-between items-center z-10">
            <button
              onClick={() =>
                (storiesRef.current.scrollLeft =
                  storiesRef.current.scrollLeft - 300)
              } 
            >
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                className={`text-[20px] text-gray-600 cursor-pointer ${
                  showLeft ? "visible" : "invisible"
                }`}
              />
            </button>
            <button
              onClick={() =>
                (storiesRef.current.scrollLeft =
                  storiesRef.current.scrollLeft + 300)
              }
            >
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                className={`text-[20px] text-gray-600 cursor-pointer  ${
                  showRight ? "visible" : "invisible"
                }`}
              />
            </button>
          </div>
        </div>
      </div> */}

        {/* <div className=" flex md:grid-cols-4 gap-10 mb-10 cursor-pointer text-sm overflow-x-auto scrollbar-hide">
          <div
            onClick={() => navigate("/topic/0")}
            className="bg-white min-w-[250px] shadow-xl p-2 rounded-lg flex flex-col justify-center items-center hover:shadow-2xl relative h-32 "
          >
            <img
              src={lambda1}
              className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200"
            />
            <p className="absolute bottom-3"> Lambda</p>
          </div>
          <div
            onClick={() => navigate("/topic/1")}
            className="bg-white min-w-[250px] shadow-xl p-2 rounded-lg flex flex-col justify-center items-center relative "
          >
            <img
              src={stepfunction}
              className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200"
            />
            <p className="absolute bottom-3"> Step Function</p>
          </div>
          <div
            onClick={() => navigate("/topic/2")}
            className="bg-white min-w-[250px] shadow-xl p-2 rounded-lg flex flex-col justify-center items-center relative "
          >
            <img
              src={apigateway}
              className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200"
            />
            <p className="absolute bottom-3"> Api Gateway</p>
          </div>
          <div
            onClick={() => navigate("/topic/3")}
            className="bg-white min-w-[250px] shadow-xl p-2 rounded-lg flex flex-col justify-center items-center relative"
          >
            <img
              src={dynamodb}
              className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200"
            />
            <p className="absolute bottom-3"> Dynamodb</p>
          </div>
          <div
            onClick={() => navigate("/topic/4")}
            className="bg-white min-w-[250px] shadow-xl p-2 rounded-lg flex flex-col justify-center items-center relative "
          >
            <img
              src={codepipeline}
              className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200"
            />
            <p className="absolute bottom-3"> SNS</p>
          </div>
          <div
            onClick={() => navigate("/topic/5")}
            className="bg-white min-w-[250px] shadow-xl p-2 rounded-lg  flex flex-col justify-center items-center relative"
          >
            <img
              src={iam}
              className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200 "
            />
            <p className="absolute bottom-3"> AppSync</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Topics;
