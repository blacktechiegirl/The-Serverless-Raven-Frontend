import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AiOutlineLike, AiOutlineRetweet } from "react-icons/ai";
import { BsChatDotsFill, BsChatDots } from "react-icons/bs";
import { ToastError, ToastSuccess } from "./UI/ToastTweet";
import AccountService from "./AuthService";
import { format } from "timeago.js";
import { ToastContainer } from "react-toastify";
import Topics from "./Topics";
import Profile from "./Profile";
import Skeleton from "./UI/Skeleton";
import PostTweet from "./PostTweet";
import Comments from "./Comments";

const HomePage = () => {
  const accountpath = new AccountService();
  const skelArr = [1, 2, 3, 4];

  const [postData, setPostData] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [postCommentId, setPostCommentId] = useState("");
  const [activeComments, setActiveComment] = useState();

  const handleDataUpdate = (newpost) => {
    setPostData([newpost, ...postData]);
  };

  // Fetch All posts
  useEffect(() => {
    async function fetchData() {
      setPostLoading(true);
      try {
        const output = await accountpath.getPosts();
        if (output) {
          if (parseInt(output.status) === 200) {
            setPostData(output.data.data);
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
    <div className=" w-full font-montserrat text-sm">
      <Navbar handleDataUpdate={(newpost) => handleDataUpdate(newpost)} />

      <div className="2xl:container mx-auto  md:px-10 lg:px-20">
        {/* <p className="my-5 text-3xl font-bold text-gray-600">Hey {username.split(' ')[0]},</p> */}
        <Topics />
        <div className="mx-5 md:mx-0 2xl:mx-0">
        <div className="flex">
          <p className="hidden lg:block mb-3 font-bold font-sora w-[28%] ml-2 text-[#353bc1]">
            Profile
          </p>
          <p className=" mb-3 font-bold font-sora text-[#353bc1]">
            Latest Serverless Trends
          </p>
          <p className="hidden mb-3 font-bold font-sora w-[30%] ml-8 text-[#353bc1]">
            Comments{" "}
          </p>
        </div>
        <div className=" flex">
          <Profile />
          <div className="overflow-auto sm:h-[800px] lg:w-[70%] scrollbar-hide">
            <div >
              {postLoading ? (
                <div className="bg-white lg:ml-10 lg:mr-5 p-10 w-full ">
                  {" "}
                  {skelArr.map((item) => (
                    <Skeleton />
                  ))}
                </div>
              ) : (
                postData.map((item, index) => {
                  return (
                    <div className=" bg-white hover:shadow-2xl  lg:mx-0 lg:ml-10   mt-0 mb-5 p-5 rounded-lg divide-y-[1px] divide-gray">
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
                                    : "bg-[rgb(0,0,0,0.04)] px-5 py-2 rounded-md text-sm flex justify-between items-center  border-2 border-[#353bc1] "
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
      <PostTweet handleDataUpdate={(newpost) => handleDataUpdate(newpost)} />
      <ToastContainer />
    </div>
  );
};

export default HomePage;
