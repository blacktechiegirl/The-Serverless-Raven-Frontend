import React, { useState } from "react";
import CircularProgress from "./CircularProgress";

const Modal = ({
  modalState,
  modalFunction,
  create,
  update,
  modalUpdate,
  loader,
}) => {
  const [content, setContent] = useState("");

  return (
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      className={
        modalState
          ? " overflow-y-auto overflow-x-hidden absolute top-24 left-[30%] z-50 w-[50%] "
          : " hidden overflow-y-auto overflow-x-hidden fixed top-24 right-[50%] z-50 "
      }
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow ">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-start p-4 rounded-t border-b ">
            <h3 className="text-xl font-bold text-[#484c9c] text-center ">
              {modalUpdate ? "Update Your Tweet" : "Post A Serverless Tweet ✨"}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={modalFunction}
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
              defaultValue={modalUpdate}
              rows={6}
              className="w-[100%] border border-gray-400 rounded-md my-5 outline-none focus:border-2 focus:border-gray-400 p-4"
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
            {modalUpdate ? null : (
              <div>
                <p>What did you talk about ?*</p>
                <input className="w-full border border-gray-400 rounded-md my-5 outline-none focus:border-2 focus:border-gray-400 p-2"></input>
              </div>
            )}
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex justify-end items-center p-6 rounded-b border-t border-gray-200 ">
            <button
              onClick={() => (modalUpdate ? update(content) : create(content))}
              data-modal-toggle="defaultModal"
              type="button"
              className="w-[150px] text-white bg-[#353bc1] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {loader ? <div className="text-white">
                <CircularProgress />
              </div> : modalUpdate ? "Update Tweet" : "Tweet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
