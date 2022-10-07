import React from "react";
import iam from "./assets/IAM.svg";
import lambda1 from "./assets/lambda1.svg";
import stepfunction from "./assets/stepfunction.svg";
import apigateway from "./assets/apigateway.svg";
import dynamodb from "./assets/dynamodb.svg";
import codepipeline from "./assets/codepipeline.svg";

const Topics = () => {
  return (
    <div>
      <p className="mt-10 mb-3 text-xl font-bold mb-4 text-[#353bc1]">
        Get started with serverless Topics
      </p>
      <div className=" grid lg:grid-cols-6 md:grid-cols-4 gap-10 mb-10 cursor-pointer text-sm">
        <div className="bg-white shadow-xl p-2 rounded-lg flex flex-col justify-center items-center hover:shadow-2xl relative h-32 ">
          <img
            src={lambda1}
            className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200"
          />
          <p className="absolute bottom-3"> Lambda</p>
        </div>
        <div className="bg-white shadow-xl p-2 rounded-lg flex flex-col justify-center items-center relative ">
          <img
            src={stepfunction}
            className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200"
          />
          <p className="absolute bottom-3"> Step Function</p>
        </div>
        <div className="bg-white shadow-xl p-2 rounded-lg flex flex-col justify-center items-center relative ">
          <img
            src={apigateway}
            className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200"
          />
          <p className="absolute bottom-3"> Api Gateway</p>
        </div>
        <div className="bg-white shadow-xl p-2 rounded-lg flex flex-col justify-center items-center relative">
          <img
            src={dynamodb}
            className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200"
          />
          <p className="absolute bottom-3"> Dynamodb</p>
        </div>
        <div className="bg-white shadow-xl p-2 rounded-lg flex flex-col justify-center items-center relative ">
          <img
            src={codepipeline}
            className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200"
          />
          <p className="absolute bottom-3"> SNS</p>
        </div>
        <div className="bg-white shadow-xl p-2 rounded-lg  flex flex-col justify-center items-center relative">
          <img
            src={iam}
            className="m-3 w-16 hover:w-20 absolute top-1 ease-in duration-200 "
          />
          <p className="absolute bottom-3"> AppSync</p>
        </div>
      </div>
    </div>
  );
};

export default Topics;
