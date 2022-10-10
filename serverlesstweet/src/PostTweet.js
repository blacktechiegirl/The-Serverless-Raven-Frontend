import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";
import Select from "react-select";
import AccountService from "./AuthService";
import { ToastError, ToastSuccess } from "./UI/ToastTweet";
import CircularProgress from "./UI/CircularProgress";

const PostTweet = ({ handleDataUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [postContent, setPostContent] = useState("");
  const [postLoader, setPostLoader] = useState(false);

  const username = localStorage.getItem("userName");
  const userid = localStorage.getItem("userId");
  const accountpath = new AccountService();

  const options = [
    { value: "lambda", label: "Lambda" },
    { value: "stepfunctions", label: "Step Functions" },
    { value: "apigateway", label: "Api Gateway" },
    { value: "dynamodb", label: "Dynamodb" },
    { value: "sns", label: "SNS" },
    { value: "sqs", label: "Amazon SQS" },
    { value: "appsync", label: "AppSync" },
    { value: "s3", label: "Amazon S3" },
    { value: "kinesis", label: "Amazon Kinesis" },
    { value: "aurora", label: "Amazon Aurora" },
    { value: "fargate", label: "AWS Fargate" },
    { value: "eventbridge", label: "Amazon EventBridge" },
    { value: "athena", label: "Amazon Athena" },
  ];

  const handleModalState = () => {
    setShowModal(!showModal);
  };

  // Post a new Tweet
  const createPost = async (content) => {
    let topics = [];
    selectedOption.map((item) => topics.push(item.value));
    setPostLoader(true);
    const userData = {
      userid,
      username,
      content,
      topics,
    };
    try {
      const output = await accountpath.createPost(userData);
      console.log(output);

      if (output) {
        if (parseInt(output.status) === 200) {
          handleDataUpdate(output.data.data);
          setPostLoader(false);
          ToastSuccess(output.data.message);
          setShowModal(false);
          setPostContent("");
        } else if (parseInt(output.status) === 400) {
          console.log("An error occured");
        }
      } else {
        console.log("error");
      }
    } catch (err) {
      ToastError(err);
    }
  };

  return (
    <div>
      <div className=" sm:hidden  fixed bottom-0 right-0 p-2 px-5">
        <div
          className="h-12 w-12 rounded-full bg-[#353bc1] flex justify-center items-center "
          onClick={() => handleModalState()}
        >
          <RiAddFill className="text-white text-3xl ring-3 ring-[#9296e9] " />
        </div>
      </div>

      {/* //Modal */}
      {showModal ? (
        <div
          id="defaultModal"
          tabindex="-1"
          aria-hidden="true"
          class="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full mx-auto"
        >
          <div className="relative top-20 p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="p-4 rounded-t border-b ">
                <div className="flex">
                  <h3 className="text-xl font-bold text-[#484c9c] text-center ">
                    "Post A Serverless Tweet ✨"
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal"
                    onClick={() => handleModalState()}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6">
                  <div>
                    <p className="mb-4">What do you want to talk about ?*</p>
                    <Select
                      options={options}
                      isSearchable={true}
                      isMulti={true}
                      value={selectedOption}
                      onChange={setSelectedOption}
                    />
                  </div>

                  <p>Tweet something interesting !</p>
                  <textarea
                    rows={6}
                    className="w-[100%] border border-gray-400 rounded-md my-5 outline-none focus:border-2 focus:border-gray-400 p-4"
                    onChange={(event) => setPostContent(event.target.value)}
                  ></textarea>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex justify-end items-center p-6 rounded-b border-t border-gray-200 ">
                  <button
                    onClick={() => createPost(postContent)}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="w-[150px] text-white bg-[#353bc1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {postLoader ? (
                      <div className="text-white relative py-2">
                        <CircularProgress />
                      </div>
                    ) : (
                      "Tweet"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PostTweet;
