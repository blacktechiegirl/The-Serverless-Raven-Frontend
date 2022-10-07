import React from "react";
import {BsChatDotsFill} from 'react-icons/bs'
import {AiOutlineLike, AiOutlineRetweet} from 'react-icons/ai'
import AccountService from "./AuthService";

const Tweets = () => {
  const messages = [
    {
      initials: "ST",
      username: "Serverless Tweets",
      time: "Two days ago",
      text: "A good architect makes a complex solution out of a complex problem. A great architect makes a simple solution out of a complex problem. Making the Move From Developer tomSolutions Architect | Ready, Set, Cloud ",
    },
    {
      initials: "AU",
      username: "Aminat Usman",
      time: "Few minutes ago",
      text: "Been Enjoying my time with stepfunction and dynamodb. Making the Move From Developer tomSolutions Architect | Ready, Set, Cloud",
    },
    {
      initials: "CL",
      username: "Clinton Lamid",
      time: "Few minutes ago",
      text: "Where have you been ?  Making the Move From Developer tomSolutions Architect | Ready, Set, Cloud",
    },
    {
      initials: "BB",
      username: "Toyosi Usman",
      time: "Few minutes ago",
      text: "Where have you been ?",
    },
    {
      initials: "CL",
      username: "Toyosi Usman",
      time: "Few minutes ago",
      text: "Where have you been ?",
    },
    {
      initials: "BB",
      username: "Toyosi Usman",
      time: "Few minutes ago",
      text: "Where have you been ?",
    },
  ];
  return (
    <div>
      {messages.map((item) => {
        return (
          <div className=" bg-white hover:shadow-2xl ml-5  mt-0 mb-5 p-5 rounded-lg">
            <div className="grid grid-cols-9">
              <p className="grid col-span-1 text-md p-2  bg-[rgba(0,0,0,0.08)] text-[#353bc1] font-bold rounded-full w-[40px] h-[40px] text-center  ">
                {item.initials}
              </p>
              <div className="relative col-span-8">
                <p className="font-bold ">{item.username}</p>
                <i className="text-sm">{item.time}</i>
                <div className="mb-6">
                  <p className="my-3 text-sm">{item.text}</p>
                </div>
                <div className="flex justify-end ">
                  <div className="w-[40%] flex justify-between">
                  <button className="bg-[rgb(0,0,0,0.04)] px-5 py-2 rounded-md text-sm flex justify-between items-center "><AiOutlineLike className="text-[#353bc1] "/><p></p></button>
                  <button className="bg-[rgb(0,0,0,0.04)] px-5 py-2 rounded-md text-sm flex justify-between items-center "><AiOutlineRetweet className="text-[#353bc1] "/><p></p></button>
                    <button className="bg-[rgb(0,0,0,0.04)] px-5 py-2 rounded-md text-sm flex justify-between items-center "><BsChatDotsFill className="text-[#353bc1] "/><p></p></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tweets;
