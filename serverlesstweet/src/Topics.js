import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import iam from "./assets/IAM.svg";
import lambda1 from "./assets/lambda1.svg";
import stepfunction from "./assets/stepfunction.svg";
import apigateway from "./assets/apigateway.svg";
import dynamodb from "./assets/dynamodb.svg";
import codepipeline from "./assets/codepipeline.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const Topics = () => {
  const navigate = useNavigate();
  const storiesRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const data = [
    {
      imgurl: lambda1,
      url: "lambda",
      heading: "AWS lambda function",
    },
    {
      imgurl: stepfunction,
      url: "stepfunctions",
      heading: "Step Functions",
    },
    {
      imgurl: apigateway,
      url: "apigateway",
      heading: "Api Gateway",
    },
    {
      imgurl: dynamodb,
      url: "dynamodb",
      heading: "Dynamodb",
    },
    {
      imgurl: lambda1,
      url: "lambda",
      heading: "AWS lambda function",
    },
    {
      imgurl: stepfunction,
      url: "stepfunctions",
      heading: "Step Functions",
    },
    {
      imgurl: apigateway,
      url: "apigateway",
      heading: "Api Gateway",
    },
    {
      imgurl: dynamodb,
      url: "dynamodb",
      heading: "Dynamodb",
    },
  ];

  const onScroll = () => {
    if (storiesRef.current.scrollLeft > 0) {
      setShowLeft(true);
    } else {
      setShowLeft(false);
    }

    if (storiesRef.current.scrollLeft =
      storiesRef.current.scrollWidth - storiesRef.current.clientWidth){
        setShowRight(true)
      }else{
        setShowRight(false)
      }
  };

  return (

 <div> 
<div id="default-carousel" class="relative m-5 md:hidden" data-carousel="static">
<p className="mb-5 text-xl font-bold  text-[#353bc1]">
        Get started with serverless Topics
      </p>
    {/* <!-- Carousel wrapper --> */}
    <div className=" flex md:grid-cols-4 pt-4 mb-10 cursor-pointer text-sm overflow-x-auto scrollbar-hide bg-white">
        <div
          onClick={() => navigate("/topic/0")}
          className="min-w-[130px]  rounded-lg flex flex-col justify-center items-center hover:shadow-2xl relative h-32 "
        >
          <img
            src={lambda1}
            className=" w-20 hover:w-20 absolute top-1 ease-in duration-200"
          />
          <p className="absolute bottom-3"> Lambda</p>
        </div>
        <div
          onClick={() => navigate("/topic/1")}
          className="min-w-[130px]   rounded-lg flex flex-col justify-center items-center relative "
        >
          <img
            src={stepfunction}
            className=" w-20 hover:w-20 absolute top-1 ease-in duration-200"
          />
          <p className="absolute bottom-3"> Step Function</p>
        </div>
        <div
          onClick={() => navigate("/topic/2")}
          className="min-w-[130px]  rounded-lg flex flex-col justify-center items-center relative "
        >
          <img
            src={apigateway}
            className=" w-20 hover:w-20 absolute top-1 ease-in duration-200"
          />
          <p className="absolute bottom-3"> Api Gateway</p>
        </div>
        <div
          onClick={() => navigate("/topic/3")}
          className="min-w-[130px]  rounded-lg flex flex-col justify-center items-center relative"
        >
          <img
            src={dynamodb}
            className=" w-20 hover:w-20 absolute top-1 ease-in duration-200"
          />
          <p className="absolute bottom-3"> Dynamodb</p>
        </div>
        <div
          onClick={() => navigate("/topic/4")}
          className="min-w-[130px]  rounded-lg flex flex-col justify-center items-center relative "
        >
          <img
            src={codepipeline}
            className=" w-20 hover:w-20 absolute top-1 ease-in duration-200"
          />
          <p className="absolute bottom-3"> SNS</p>
        </div>
        <div
          onClick={() => navigate("/topic/5")}
          className="min-w-[130px]  rounded-lg  flex flex-col justify-center items-center relative"
        >
          <img
            src={iam}
            className=" w-20 hover:w-20 absolute top-1 ease-in duration-200 "
          />
          <p className="absolute bottom-3"> AppSync</p>
        </div>
      </div>
</div>

    <div className="hidden md:block">
      <p className="mt-10 mb-5 text-xl font-bold  text-[#353bc1]">
        Get started with serverless Topics
      </p>
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

      <div className=" flex md:grid-cols-4 gap-10 mb-10 cursor-pointer text-sm overflow-x-auto scrollbar-hide">
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
    </div>
    </div>  
  );
};

export default Topics;
