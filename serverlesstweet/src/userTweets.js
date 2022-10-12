import React, { useEffect, useState } from "react";
import AccountService from "./AuthService";
import { ToastError, ToastSuccess } from "./UI/ToastTweet";
import Skeleton from "./UI/Skeleton";
import { format } from "timeago.js";
import { AiOutlineLike, AiOutlineRetweet } from "react-icons/ai";
import { BsChatDotsFill } from "react-icons/bs";
import CircularProgress from "./UI/CircularProgress";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import PostTweet from "./PostTweet";
import Comments from "./Comments";

const UserTweets = () => {
  const [allData, setAllData] = useState([]);
  const [postLoading, setPostLoading] = useState([]);
  const accountpath = new AccountService();
  const [deleteId, setDeleteId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postLoader, setPostLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateContent, setUpdateContent] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateIndex, setUpdateIndex] = useState();
  const [postContent, setPostContent] = useState("");
  const [activeComments, setActiveComment] = useState();
  const [postCommentId, setPostCommentId] = useState("");

  const skelArr = [1, 2, 3, 4];

  const handleDataUpdate = (newpost) => {
    setAllData([newpost, ...allData]);
  };

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
      value: "12",
    },
    {
      key: "Following",
      value: "22",
    },
    {
      key: "Posts",
      value: allData.length,
    },
    {
      key: "Communities",
      value: "4",
    },
  ];

  // Fetch All posts
  useEffect(() => {
    async function fetchData() {
      setPostLoading(true);
      try {
        const output = await accountpath.getPostById(userid);

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

  // Update a new Tweet
  const updatePost = async (content) => {
    setPostLoader(true);
    const userData = {
      content,
    };
    try {
      const output = await accountpath.updatePost(updateId, userid, userData);
      if (output) {
        if (parseInt(output.status) === 200) {
          setAllData([
            ...allData.slice(0, updateIndex),
            output.data.data,
            ...allData.slice(updateIndex + 1),
          ]);
          setPostLoader(false);
          ToastSuccess(output.data.message);
          setShowModal(false);
        }
      }
    } catch (err) {
      ToastError(err);
    }
  };

  // Delete a Tweet
  const deletePost = async () => {
    setPostLoader(true);
    try {
      const output = await accountpath.deletePost(deleteId, userid);
      if (output) {
        if (parseInt(output.status) === 200) {
          setAllData([...allData.filter((item) => deleteId !== item.postId)]);
          setPostLoader(false);
          ToastSuccess(output.data.message);
          setShowDeleteModal(false);
        }
      }
    } catch (err) {
      ToastError(err);
    }
  };

  const handleModalState = (item, id, index) => {
    setShowModal(!showModal);
    setUpdateContent(item);
    setUpdateId(id);
    setUpdateIndex(index);
  };

  return (
    <div>
      {/* //Modal */}
      {showModal ? (
        <div
          id="defaultModal"
          tabindex="-1"
          aria-hidden="true"
          className="font-sora fixed z-50 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full mx-auto"
        >
          <div className="relative top-20 p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow ">
              {/* <!-- Modal header --> */}
              <div className="p-4 rounded-t border-b ">
                <div className="flex">
                  <h3 className="text-xl font-bold text-[#484c9c] text-center ">
                    Update Your Tweet
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
                  <p>Tweet something interesting !</p>
                  <textarea
                    defaultValue={updateContent}
                    rows={6}
                    className="w-[100%] border border-gray-400 rounded-md my-5 outline-none focus:border-2 focus:border-gray-400 p-4"
                    onChange={(event) => setPostContent(event.target.value)}
                  ></textarea>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex justify-end items-center p-6 rounded-b border-t border-gray-200 ">
                  <button
                    onClick={() => updatePost(postContent)}
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="w-[150px] text-white bg-[#353bc1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {postLoader ? (
                      <div className="text-white relative py-2">
                        <CircularProgress />
                      </div>
                    ) : (
                      "Update Tweet"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showDeleteModal ? (
        <div
          className="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          {" "}
          <div className="relative top-20 mx-auto p-5 border   sm:w-[500px] shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="text-[red] text-3xl mb-6"
                />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Confirm Delete Action
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this post ?
                </p>
              </div>
              <div className="flex justify-between px-4 py-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                  }}
                  id="ok-btn"
                  className="px-4 py-2 text-sm bg-[#353bc1] text-white font-medium rounded-md w-[150px] shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Decline
                </button>
                <button
                  onClick={() => deletePost()}
                  id="ok-btn"
                  className="px-4 py-2 text-sm bg-red-500 text-white font-medium rounded-md w-[150px] shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  {postLoader ? (
                    <div className="text-white relative py-2">
                      <CircularProgress />
                    </div>
                  ) : (
                    "Approve"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Navbar handleDataUpdate={(newpost) => handleDataUpdate(newpost)} />
      <div className="2xl:container mx-auto sm:px-10 lg:px-20 font-sora">
        <div className="flex mx-3 my-8">
          <div className=" border-2 border-[#353bc1] bg-white h-[80px] w-[100px] sm:h-[150px] sm:w-[230px] md:w-44 md:h-44 mt-5 sm:my-14 rounded-full flex justify-center items-center text-2xl sm:text-5xl text-[#353bc1] font-bold ">
            {firstname + lastname}
          </div>
          <div className="flex justify-center  flex-col">
            <h1 className="mx-8 md:mx-16 mt-4 text-3xl sm:text-4xl md:text-6xl font-montserrat">
              {username}
            </h1>
            <p className="mx-8 md:mx-16 mt-4 text-sm sm:text-2xl">
              {" "}
              I am a lover of the serverless community😍❤{" "}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 ">
          {data.map((item) => {
            return (
              <div className=" text-sm sm:text-md sm:h-36 cursor-pointer card font-sora  bg-white p-2  sm:p-4 mb-4 sm:mb-8  text-center rounded-lg hover:bg-[#d8daef] focus:outline-none focus:ring-2 focus:ring-[#d05a17]">
                <p>{item.key}</p>
                <p className="mt-2 m:mt-4 text-2xl sm:text-4xl font-montserrat font-bold text-[#353bc1]">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className=" flex ">
          <div className="container  overflow-auto sm:h-[800px] scrollbar-hide">
            <div>
              {postLoading ? (
                <div className="bg-white lg:mr-5 p-10">
                  {" "}
                  {skelArr.map((item) => (
                    <Skeleton />
                  ))}
                </div>
              ) : allData.length > 0 ? (
                allData.map((item, index) => {
                  return (
                    <div className=" bg-white hover:shadow-2xl   mt-0 mb-5 p-5 rounded-lg divide-y-[1px] divide-gray">
                      <div className="grid grid-cols-11 sm:grid-cols-9 mb-5">
                        <p className="grid col-span-2 sm:col-span-1 text-md p-2  bg-[rgba(0,0,0,0.08)] text-[#353bc1] font-bold rounded-full w-[40px] h-[40px] text-center  ">
                          {item.userName[0]}
                        </p>
                        <div className="relative col-span-8">
                          <div className="flex justify-between">
                            <p className="font-bold ">{item.userName}</p>
                            <div className="flex justify-between">
                              <FontAwesomeIcon
                                icon={faPen}
                                className="text-[#353bc1] mx-2 cursor-pointer"
                                onClick={() =>
                                  handleModalState(
                                    item.content,
                                    item.postId,
                                    index
                                  )
                                }
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-[#353bc1] mx-2 cursor-pointer"
                                onClick={() => {
                                  setDeleteId(item.postId);
                                  setShowDeleteModal(true);
                                }}
                              />
                            </div>
                          </div>
                          <i className="text-sm">
                            {format(item.date, "en_US")}
                          </i>
                          <div className="mb-6">
                            <p className="my-3 text-sm">{item.content}</p>
                          </div>
                          <div className="flex justify-end ">
                            <div className="w-[100%] sm:w-[40%] flex justify-between">
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
              ) : null}
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="md:hidden">
        <PostTweet handleDataUpdate={(newpost) => handleDataUpdate(newpost)} />
      </div>{" "}
      <ToastContainer />
    </div>
  );
};

export default UserTweets;
