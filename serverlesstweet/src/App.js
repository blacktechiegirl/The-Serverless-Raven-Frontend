import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Tweets from "./Tweets";
import { AiOutlineLike, AiOutlineRetweet } from "react-icons/ai";
import { BsChatDotsFill, BsChatDots } from "react-icons/bs";
import Modal from "./UI/Modal";
import { ToastError, ToastSuccess } from "./UI/ToastTweet";
import AccountService from "./AuthService";
import { format } from "timeago.js";
import InputField from "./UI/InputField";
import TextareaAutosize from "react-textarea-autosize";
import { ToastContainer } from "react-toastify";
import {
  faPen,
  faTrash,
  faBars,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Topics from "./Topics";
import Profile from "./Profile";
import CircularProgress from "./UI/CircularProgress";
import Skeleton from "./UI/Skeleton";

const HomePage = () => {
  const username = localStorage.getItem("userName");
  const userid = localStorage.getItem("userId");
  const accountpath = new AccountService();
  const skelArr = [1, 2, 3, 4];

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postData, setPostData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [commnetLoading, setCommentLoading] = useState(false);
  const [userTweet, setUserTweet] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [postCommentId, setPostCommentId] = useState("");
  const [myTweets, setMyTweets] = useState(false);
  const [updateContent, setUpdateContent] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [postLoader, setPostLoader] = useState(false);
  const [commentLoader, setCommentLoader] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [updateIndex, setUpdateIndex] = useState();

  const handleModalState = (item, id, index) => {
    setShowModal(!showModal);
    setUpdateContent(item);
    setUpdateId(id);
    setUpdateIndex(index);
  };

  // Post a new Tweet
  const createPost = async (content) => {
    setPostLoader(true);
    const userData = {
      userid,
      username,
      content,
    };
    try {
      const output = await accountpath.createPost(userData);
      console.log(output);

      if (output) {
        if (parseInt(output.status) === 200) {
          setPostData([output.data.data, ...postData]);
          setPostLoader(false);
          setUserTweet("");
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

  // Update a new Tweet
  const updatePost = async (content) => {
    setPostLoader(true);
    const userData = {
      content,
    };

    console.log(updateIndex);
    try {
      const output = await accountpath.updatePost(updateId, userid, userData);
      if (output) {
        if (parseInt(output.status) === 200) {
          setPostData([
            ...postData.slice(0, updateIndex),
            output.data.data,
            ...postData.slice(updateIndex + 1),
          ]);
          setPostLoader(false);
          setUserTweet("");
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
   

    // console.log(deleteIndex);
    try {
      const output = await accountpath.deletePost(deleteId, userid);
      console.log(deleteId)
      if (output) {
        if (parseInt(output.status) === 200) {
          setPostData([
           ...postData.filter((item) => deleteId !== item.postId)
          ]);
          setPostLoader(false);
          setUserTweet("");
          ToastSuccess(output.data.message);
          setShowDeleteModal(false);
        }
      }
    } catch (err) {
      ToastError(err);
    }
  };
  //View all my tweets
  const viewMyTweets = async () => {
    setPostLoading(true);
    setMyTweets(true);
    try {
      const output = await accountpath.getPostById(userid);
      console.log(output);
      if (output) {
        if (parseInt(output.status) === 200) {
          setAllData(output.data.data);
          setPostData(output.data.data);
          setPostLoading(false);
        }
      }
    } catch (err) {
      ToastError(err);
    }
  };

  // Fetch All posts
  useEffect(() => {
    async function fetchData() {
      setPostLoading(true);
      try {
        const output = await accountpath.getPosts();
        if (output) {
          if (parseInt(output.status) === 200) {
            setAllData(output.data.data);
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
    <div className=" w-full font-montserrat text-sm">
      {showDeleteModal ? (
        <div
          class="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          {" "}
          <div class="relative top-20 mx-auto p-5 border w-[500px] shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
              <div class="mx-auto flex items-center justify-center">
                <FontAwesomeIcon icon={faTriangleExclamation} className="text-[red] text-3xl mb-6"/>
              </div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Confirm Delete Action
              </h3>
              <div class="mt-2 px-7 py-3">
                <p class="text-sm text-gray-500">
                  Are you sure you want to delete this post ?
                </p>
              </div>
              <div class="flex justify-between px-4 py-3">
                <button
                onClick={() => {
                  setShowDeleteModal(false)}}
                  id="ok-btn"
                  class="px-4 py-2 text-sm bg-[#353bc1] text-white font-medium rounded-md w-[150px] shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Decline
                </button>
                <button
                onClick={()=> deletePost()}
                  id="ok-btn"
                  class="px-4 py-2 text-sm bg-red-500 text-white font-medium rounded-md w-[150px] shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  {postLoader ? (
                      <div className="text-white relative py-2">
                        <CircularProgress />
                      </div>
                    ) :
                  'Approve'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Navbar
        modalFunction={() => handleModalState()}
        navbarFunction={viewMyTweets}
      />

      {/* //Modal */}
      {showModal ? (
        <div
          id="defaultModal"
          tabindex="-1"
          aria-hidden="true"
          class="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full mx-auto"
        >
          <div className="relative top-20 p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow ">
              {/* <!-- Modal header --> */}
              <div className="p-4 rounded-t border-b ">
                <div className="flex">
                  <h3 className="text-xl font-bold text-[#484c9c] text-center ">
                    {updateContent
                      ? "Update Your Tweet"
                      : "Post A Serverless Tweet ✨"}
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
                  Tweet something interesting !
                  <textarea
                    defaultValue={updateContent}
                    rows={6}
                    className="w-[100%] border border-gray-400 rounded-md my-5 outline-none focus:border-2 focus:border-gray-400 p-4"
                    onChange={(event) => setPostContent(event.target.value)}
                  ></textarea>
                  {updateContent ? null : (
                    <div>
                      <p>What did you talk about ?*</p>
                      <input className="w-full border border-gray-400 rounded-md my-5 outline-none focus:border-2 focus:border-gray-400 p-2"></input>
                    </div>
                  )}
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex justify-end items-center p-6 rounded-b border-t border-gray-200 ">
                  <button
                    onClick={() =>
                      updateContent
                        ? updatePost(postContent)
                        : createPost(postContent)
                    }
                    data-modal-toggle="defaultModal"
                    type="button"
                    className="w-[150px] text-white bg-[#353bc1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {postLoader ? (
                      <div className="text-white relative py-2">
                        <CircularProgress />
                      </div>
                    ) : updateContent ? (
                      "Update Tweet"
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

      <div className="container mx-auto sm:px-10 lg:px-20">
        {/* <p className="my-5 text-3xl font-bold text-gray-600">Hey {username.split(' ')[0]},</p> */}
        <Topics />
        <div className="flex ">
          <p className=" mb-3 font-bold font-sora w-[20%] text-[#353bc1]">
            Profile
          </p>
          <p className=" mb-3 font-bold font-sora w-[50%] ml-8 text-[#353bc1]">
            {myTweets ? "My Tweets" : "Latest Serverless Trends"}
          </p>
          <p className=" mb-3 font-bold font-sora w-[30%] ml-8 text-[#353bc1]">
            Comments{" "}
          </p>
        </div>
        <div className=" flex">
          <Profile />
          <div className="container w-[50%] overflow-auto h-[800px]">
            <div>
              {postLoading ? (
                <div className="bg-white ml-10 mr-5 p-10">
                  {" "}
                  {skelArr.map((item) => (
                    <Skeleton />
                  ))}
                </div>
              ) : (
                postData.map((item, index) => {
                  return (
                    <div className=" bg-white hover:shadow-2xl ml-5  mt-0 mb-5 p-5 rounded-lg">
                      <div className="grid grid-cols-9">
                        <p className="grid col-span-1 text-md p-2  bg-[rgba(0,0,0,0.08)] text-[#353bc1] font-bold rounded-full w-[40px] h-[40px] text-center  ">
                          {item.userName[0]}
                        </p>
                        <div className="relative col-span-8">
                          <div className="flex justify-between">
                            <p className="font-bold ">{item.userName}</p>
                            {myTweets ? (
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
                                    setDeleteId(item.postId)
                                    setShowDeleteModal(true)}}
                                />
                              </div>
                            ) : null}
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
                                {myTweets ? (
                                  <BsChatDots className="text-[#353bc1]" />
                                ) : (
                                  <BsChatDotsFill className="text-[#353bc1] " />
                                )}
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
          <div className="container w-[30%] ml-5 bg-white shadow-lg mb-5 h-[800px] p-5 rounded-l overflow-auto">
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
      <ToastContainer />
    </div>
  );
};

export default HomePage;
