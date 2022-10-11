import React, { useEffect, useState } from "react";
import AccountService from "./AuthService";
import { ToastError, ToastSuccess } from "./UI/ToastTweet";
import Skeleton from "./UI/Skeleton";
import { format } from "timeago.js";
import { AiOutlineLike, AiOutlineRetweet } from "react-icons/ai";
import { BsChatDotsFill, BsChatDots } from "react-icons/bs";
import lambda1 from "./assets/lambda1.svg";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import iam from "./assets/IAM.svg";
import stepfunction from "./assets/stepfunction.svg";
import apigateway from "./assets/apigateway.svg";
import dynamodb from "./assets/dynamodb.svg";
import codepipeline from "./assets/codepipeline.svg";
import Comments from "./Comments";


const NewTopic = () => {
  const [allData, setAllData] = useState([]);
  const [postLoading, setPostLoading] = useState([]);
  const accountpath = new AccountService();
  const [postCommentId, setPostCommentId] = useState("");
  const [activeComments, setActiveComment] = useState();

  const { topicid } = useParams();
  const skelArr = [1, 2, 3, 4];
  const data = [
    {
      key: "#Documents",
    },
    {
      key: "#Videos",
    },
    {
      key: "#Resources",
    },
    {
      key: "#Articles",
    },
    {
      key: "#Events",
    },
    {
      key: "#Communities",
    },
  ];

  const topics = [
    {
      imgurl: lambda1,
      url: "lambda",
      heading: "lambda function",
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
      imgurl: codepipeline,
      url: "sns",
      heading: "Simple Notification Service",
    },
    {
      imgurl: iam,
      url: "appsync",
      heading: "AppSync",
    },
    {
      imgurl: stepfunction,
      heading: "s3",
      url: "s3",
    },
    {
      imgurl: dynamodb,
      url: "kinesis",
      heading: "Amazon Kinesis",
    },
    {
      imgurl: codepipeline,
      url: "aurora",
      heading: "Amazon Aurora",
    },
    {
      imgurl: iam,
      url: "fargate",
      heading: "AWS fargate",
    },
    {
      imgurl: apigateway,
      url: "eventbridge",
      heading: "Event Bridge",
    },
    {
      imgurl: lambda1,
      url: "athena",
      heading: "Amazon Athena",
    },
  ];

  const handleDataUpdate = (newpost) => {
    return null;
  };

  // Fetch All posts
  useEffect(() => {
    async function fetchData() {
      setPostLoading(true);
      try {
        const output = await accountpath.getTopic(topics[topicid].url);
        if (output) {
          console.log(output);
          if (parseInt(output.status) === 200) {
            setAllData(output.data.data);
            setPostLoading(false);
          }
        }
      } catch (err) {
        ToastError(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar handleDataUpdate={(newpost) => handleDataUpdate(newpost)} />
      <div className="container sm:px-10 lg:px-20 font-sora">
        <div className="ml-5">
          <div className="flex  my-8 sm:mt-16 mb-8">
            <img src={topics[topicid].imgurl} className="w-[60%] sm:w-40 " />
            <div className="flex justify-center  flex-col">
              <h1 className=" mx-10 sm:mx-16 mt-4 text-2xl sm:text-5xl font-montserrat">
                {topics[topicid].heading.toUpperCase()}
              </h1>
              <p className="mx-10 sm:mx-16 my-4 text-sm sm:text-2xl">
                {" "}
                Find here the latest tweets, discussions and threads on{" "}
                {topics[topicid].heading} !
              </p>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 sm:grid-cols-6">
            {data.map((item) => {
              return (
              <div className="cursor-pointer card font-sora bg-white p-4 my-8 mr-6 text-center rounded-lg hover:bg-[#f7d7bc] focus:outline-none focus:ring-2 focus:ring-[#d05a17]">{item.key}</div>)
            })}
          </div>
        </div>
        <h3 className="my-6 mx-5 font-bold sm:font-light sm:text-3xl">
          {" "}
          Latest Tweets on {topics[topicid].heading}
        </h3>
        <div className=" flex">
          <div className="container sm:w-[70%] overflow-auto sm:h-[800px] scrollbar-hide">
            <div>
              {postLoading ? (
                <div className="bg-white  mr-5 p-10">
                  {" "}
                  {skelArr.map((item) => (
                    <Skeleton />
                  ))}
                </div>
              ) : (
                allData.map((item) => {
                  return (
                    <div className="  bg-white hover:shadow-2xl mx-5  sm:ml-10 sm:mx-0 mt-0 mb-5 p-5 rounded-lg divide-y-[1px] divide-gray">
                      <div className="grid grid-cols-11 sm:grid-cols-9">
                        <p className="grid col-span-2 sm:col-span-1 text-md p-2  bg-[rgba(0,0,0,0.08)] text-[#353bc1] font-bold rounded-full w-[40px] h-[40px] text-center  ">
                          {item.userName[0]}
                        </p>
                        <div className="relative col-span-9 sm:col-span-8 mb-5">
                          <div className="flex justify-between">
                            <p className="font-bold ">{item.userName}</p>
                          </div>
                          <i className="text-sm">
                            {format(item.date, "en_US")}
                          </i>
                          <div className="mb-6">
                            <p className="my-3 text-sm">{item.content}</p>
                          </div>
                          <div className="flex justify-end ">
                            <div className=" w-[100%] sm:w-[40%] flex justify-between">
                              <button className="bg-[rgb(0,0,0,0.04)] px-5 py-2 rounded-md text-sm flex justify-between items-center ">
                                <AiOutlineLike className="text-[#353bc1] " />
                                <p></p>
                              </button>
                              <button className="bg-[rgb(0,0,0,0.04)] px-5 py-2 rounded-md text-sm flex justify-between items-center ">
                                <AiOutlineRetweet className="text-[#353bc1] " />
                                <p></p>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveComment(true);
                                  setPostCommentId(item.postId);
                                }}
                                className={
                                  postCommentId !== item.postId
                                    ? "bg-[rgb(0,0,0,0.04)] px-5 py-2 rounded-md text-sm flex justify-between items-center "
                                    : "bg-[rgb(0,0,0,0.04)] px-5 py-2 rounded-md text-sm flex justify-between items-center border border-2 border-[#353bc1] "
                                }
                              >
                                <BsChatDotsFill className="text-[#353bc1] " />
                                <p></p>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {postCommentId === item.postId && activeComments ? (
                        <Comments commentId={postCommentId} />
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTopic;
