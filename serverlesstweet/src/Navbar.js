import React from "react";
import { VscBell } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";


const Navbar = ({modalFunction, navbarFunction}) => {
  const navigate = useNavigate();


  const username = localStorage.getItem("userName");
  const userid = localStorage.getItem("userId");

  const firstname = username.split(" ")[0][0];
  let lastname;
  {
    username.split(" ")[1] == null
      ? (lastname = firstname)
      : (lastname = username.split(" ")[1][0]);
  }

  return (
    <nav className="  bg-white shadow-lg font-sora ">
      <div className="container mx-auto py-4 sm:px-10 lg:px-20 text-2xl text-[#353bc1]  flex justify-between ">
        <h1 className="font-smooch text-3xl cursor-pointer" onClick={() => navigate('/home')}>Serverless Tweet</h1>
        <ul className="flex justify-between items-center">
        <li className=" text-sm mx-2 text-[#353bc1] cursor-pointer hover:font-bold " onClick={() => navigate('/home')}  >Home</li>
          <li className=" text-sm mx-2 text-[#353bc1] cursor-pointer hover:font-bold " onClick={modalFunction} >Post Tweet</li>
          <li className=" text-sm mx-2 text-[#353bc1] cursor-pointer hover:font-bold " onClick={() => navigate('/user/tweets')}>My Tweet</li>
          <li className="w-[100px">
            <VscBell className="text-[30px] mx-5 mt-1 font-medium" />
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
