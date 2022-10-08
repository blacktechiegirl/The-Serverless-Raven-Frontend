import React, { useEffect, useState } from "react";
import AccountService from "./AuthService";
import { ToastError, ToastSuccess } from "./UI/ToastTweet";
import Skeleton from "./UI/Skeleton";
import { format } from "timeago.js";
import { AiOutlineLike, AiOutlineRetweet } from "react-icons/ai";
import { BsChatDotsFill, BsChatDots } from "react-icons/bs";
import TextareaAutosize from "react-textarea-autosize";
import CircularProgress from "./UI/CircularProgress";
import lambda1 from "./assets/lambda1.svg";
import Navbar from "./Navbar";

const UserTweets = () => {
  const [allData, setAllData] = useState([]);
  const [postLoading, setPostLoading] = useState([]);
  const accountpath = new AccountService();
  const [commentData, setCommentData] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [postCommentId, setPostCommentId] = useState("");
  const skelArr = [1, 2, 3, 4];
  const [commnetLoading, setCommentLoading] = useState(false);
  const [commentLoader, setCommentLoader] = useState(false);

  const username = localStorage.getItem("userName");
  const userid = localStorage.getItem("userId");

  const firstname = username.split(" ")[0][0];
  let lastname;
  {
    username.split(" ")[1] == null
      ? (lastname = firstname)
      : (lastname = username.split(" ")[1][0]);
  }

  const data = [
    {
      key: "Followers",
      value: "12"
    },
    {
      key: "Following",
      value: "22"
    },
    {
      key: "Posts",
      value: allData.length
    },
    {
      key: "Communities",
      value: "4"
    },
 
  ];

  // Fetch All posts
  useEffect(() => {
    async function fetchData() {
      setPostLoading(true);
    try {
      const output = await accountpath.getPostById(userid);
      console.log(output);
      if (output) {
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

  // View Comments
  const viewComments = async (postid) => {
    setPostCommentId(postid);
    try {
      setCommentLoading(true);
      const output = await accountpath.getComments(postid);
      if (output) {
        console.log(output);
        if (parseInt(output.status) === 200) {
          setCommentData(output.data.data);
          setCommentLoading(false);
        }
      }
    } catch (err) {
      ToastError(err);
    }
  };

  //Post Comment
  const postComment = async () => {
    setCommentLoader(true);
    const userData = {
      postid: postCommentId,
      userid,
      username,
      comment: commentContent,
    };

    console.log(userData);
    const output = await accountpath.createComment(userData);
    console.log(output);
    try {
      if (output) {
        if (parseInt(output.status) === 200) {
          setCommentData([output.data.data, ...commentData]);
          ToastSuccess(output.data.message);
          setCommentContent("");
          setCommentLoader(false);
        }
      }
    } catch (err) {
      ToastError(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto sm:px-10 lg:px-20 font-sora">
        <div className="flex">
          <div className="bg-white h-44 my-14 rounded-full w-44 flex justify-center items-center text-5xl text-[#353bc1] font-bold ">
            {firstname + lastname}
          </div>
          <div className="flex justify-center  flex-col">
            <h1 className="mx-16 mt-4 text-6xl font-montserrat">
              {username}
            </h1>
            <p className="mx-16 mt-4 text-2xl">
              {" "}
              I am a lover of the serverless community😍❤{" "}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 ">
            {data.map((item) => {
              return (
              <div className="h-36 cursor-pointer card font-sora bg-white p-4 mb-8 mr-6 text-center rounded-lg hover:bg-[#d8daef] focus:outline-none focus:ring-2 focus:ring-[#d05a17]">
                <p>{item.key}</p>
                <p className="mt-4 text-4xl font-montserrat font-bold text-[#353bc1]">{item.value}</p>
                </div>)
            })}
          </div>
        <div className=" flex">
          <div className="container w-[65%] overflow-auto h-[800px]">
            <div>
              {postLoading ? (
                <div className="bg-white ml-10 mr-5 p-10">
                  {" "}
                  {skelArr.map((item) => (
                    <Skeleton />
                  ))}
                </div>
              ) : (
                allData.map((item, index) => {
                  return (
                    <div className=" bg-white hover:shadow-2xl   mt-0 mb-5 p-5 rounded-lg">
                      <div className="grid grid-cols-9">
                        <p className="grid col-span-1 text-md p-2  bg-[rgba(0,0,0,0.08)] text-[#353bc1] font-bold rounded-full w-[40px] h-[40px] text-center  ">
                          {item.userName[0]}
                        </p>
                        <div className="relative col-span-8">
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
                            <div className="w-[40%] flex justify-between">
                              <button className="bg-[rgb(0,0,0,0.04)] px-5 py-2 rounded-md text-sm flex justify-between items-center ">
                                <AiOutlineLike className="text-[#353bc1] " />
                                <p></p>
                              </button>
                              <button className="bg-[rgb(0,0,0,0.04)] px-5 py-2 rounded-md text-sm flex justify-between items-center ">
                                <AiOutlineRetweet className="text-[#353bc1] " />
                                <p></p>
                              </button>
                              <button
                                onClick={() => viewComments(item.postId)}
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
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="container w-[35%] ml-5 bg-white shadow-lg mb-5 h-[800px] p-5 rounded-l overflow-auto">
            {postCommentId ? (
              <div className=" grid grid-cols-1 0">
                <div>
                  <p className="font-sora font-semibold">
                    Hey {username.split(" ")[0]}, No comment yet ?
                  </p>
                  <div className="flex relative">
                    <p className="= top-3 left-4 grid col-span-1 text-md p-2  bg-[rgba(0,0,0,0.08)] text-[#353bc1] font-bold rounded-full w-[40px] h-[40px] text-center mr-3 my-4 ">
                      {username[0]}
                    </p>
                    <TextareaAutosize
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder={"Drop a comment"}
                      className="d-flex border-2 border-gray-300 rounded-3xl  w-full  focus:outline-none focus:border-[#353bc1] my-4 p-2 "
                    />
                  </div>
                  {commentContent.length > 0 ? (
                    commentLoader ? (
                      <div className="text-white relative py-2">
                        <CircularProgress />
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <button
                          onClick={() => postComment()}
                          className="bg-[#353bc1] px-4 py-1 mb-2 text-white text-[10px]  rounded-md "
                        >
                          Drop it
                        </button>
                      </div>
                    )
                  ) : null}
                </div>
                <div>
                  {commnetLoading ? (
                    skelArr.map((item) => {
                      return <Skeleton />;
                    })
                  ) : commentData.length === 0 ? (
                    <div className="text-center mt-12">
                      <p className="text-2xl font-bold ">oops 😏 !</p>
                      <p className="text-lg">No one has dropped a comment</p>
                    </div>
                  ) : (
                    commentData.map((item) => {
                      return (
                        <div className="flex bg-[rgba(0,0,0,0.08)] rounded-lg mt-4 p-4 grid grid-cols-8 ">
                          <p className=" col-span-1 w-[40px] h-[40px] flex justify-center items-center text-md p-4 mr-4 bg-white text-[#353bc1] rounded-full font-bold">
                            {item.userName[0]}
                          </p>
                          <div className="col-span-7 ml-3">
                            <p className="font-bold mt-2 mb-2">
                              {item.userName}
                            </p>
                            <p className="text-sm mb-3">{item.comment}</p>
                            <div className="flex justify-end">
                              <button className="bg-white px-5 py-2 rounded-md text-sm flex justify-between items-center ">
                                <AiOutlineLike className="text-[#353bc1] " />
                                <p></p>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center mt-2 bg-[rgba(0,0,0,0.04)] rounded-lg p-4">
                <p className="font-sora  text-[#353bc1] flex text-[14px] justify-between">
                  <p>Click on</p>{" "}
                  <p className="mx-3 my-1">
                    <BsChatDotsFill className="text-[#353bc1 mx-4] " />
                  </p>{" "}
                  <p>icon to view comments</p>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTweets;
