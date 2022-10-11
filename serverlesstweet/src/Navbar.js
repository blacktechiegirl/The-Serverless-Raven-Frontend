import React from "react";
import { VscBell } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import PostTweet from "./PostTweet";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";


const Navbar = ({ handleDataUpdate }) => {
  const navigate = useNavigate();

  const username = localStorage.getItem("userName");
  const firstname = username.split(" ")[0][0];
  let lastname;
  {
    username.split(" ")[1] == null
      ? (lastname = firstname)
      : (lastname = username.split(" ")[1][0]);
  }

  return (
    <nav className="  bg-white shadow-lg font-sora ">
      <div className="flex justify-between py-4 sm:hidden mx-[10px] items-center">
       <AiFillHome   onClick={() => navigate("/home")} className="text-[30px] text-[#353bc1] ml-3" />
        <h3
          className="font-smooch text-[#353bc1] text-2xl cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Serverless Tweet
        </h3>
      
        <li 
        onClick={() => navigate("/user/tweets")}
         className="mr-3 text-sm p-2 border-2 font-bold border-[#d6a419] text-[#353bc1] rounded-full bold h-9 w-9 flex justify-center items-center ">
          {firstname + lastname}
        </li>        
      </div>
      <div className="hidden sm:flex  mx-auto py-4 sm:px-10 md:px-15 lg:px-20 xl:px-24 text-2xl justify-between ">
        <h1
          className="font-smooch text-3xl text-[#353bc1] cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Serverless Tweet
        </h1>
        <ul className="flex justify-between items-center">
          <li
            className=" text-sm mx-2 text-[#353bc1] cursor-pointer mr-3 "
            onClick={() => navigate("/home")}
          >
            Home
          </li>
          <li
            className="relative  text-sm mx-2  cursor-pointer "
          >
            <PostTweet handleDataUpdate={(newpost) => handleDataUpdate(newpost)}/>
          </li>
          <li
            className=" text-sm mx-2 text-[#353bc1] cursor-pointer hover:font-bold "
            onClick={() => navigate("/user/tweets")}
          >
            My Tweet
          </li>
          <li className="w-[100px">
            <VscBell className="text-[30px] mx-5 mt-1 font-medium text-[#353bc1]" />
          </li>
          <li className="text-sm p-2 bg-[#353bc1] text-white rounded-full bold h-9 w-9 flex justify-center items-center ">
            {firstname + lastname}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
