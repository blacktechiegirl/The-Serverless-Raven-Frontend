import React, { useEffect, useState } from "react";
import AccountService from "./AuthService";
import TextareaAutosize from "react-textarea-autosize";
import CircularProgress from "./UI/CircularProgress";
import { ToastError, ToastSuccess } from "./UI/ToastTweet";
import Skeleton from "./UI/Skeleton";
import { AiOutlineLike } from "react-icons/ai";

const Comments = ({ commentId }) => {
  const username = localStorage.getItem("userName");
  const userid = localStorage.getItem("userId");
  const accountpath = new AccountService();
  const skelArr = [1, 2, 3, 4];

  const [commnetLoading, setCommentLoading] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [postCommentId, setPostCommentId] = useState("");
  const [commentLoader, setCommentLoader] = useState(false);
  const [activeComments, setActiveComment] = useState();

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

  // View Comments
  useEffect(() => {
    async function fetchComment() {
      setActiveComment(true);
      setPostCommentId(commentId);
      try {
        setCommentLoading(true);
        const output = await accountpath.getComments(commentId);
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
    }
    fetchComment();
  }, []);

  return (
    <div>
      <div className="p-5">
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
                    <p className="font-bold mt-2 mb-2">{item.userName}</p>
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

      {/* <div className=" hidden container w-[30%] ml-5 bg-white shadow-lg mb-5 h-[800px] p-5 rounded-l overflow-auto">
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
                          <p className="font-bold mt-2 mb-2">{item.userName}</p>
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
          </div> */}
    </div>
  );
};

export default Comments;
