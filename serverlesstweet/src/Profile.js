import React from "react";
import userpool from "./Account/userpool";


const Profile = () => {
  const cognitoUser = userpool.getCurrentUser();

  const username = localStorage.getItem("userName");
  const firstname = username.split(" ")[0][0];
  let lastname;
  {
    username.split(" ")[1] == null
      ? (lastname = firstname)
      : (lastname = username.split(" ")[1][0]);
  }

  return (
    <div className="hidden lg:grid container w-[30%] shadow-lg bg-white mb-5 h-[500px] p-5 rounded-lg relative  grid-cols-1 divide-y ' ">
      <>
        <div className="flex justify-center items-center flex-col  ">
          <p className="text-[10px] sm:text-md p-4 m-4 mt-0 bg-[rgba(0,0,0,0.08)] text-[#353bc1] rounded-full font-bold h-12 w-12 flex justify-center items-center ">
            {firstname + lastname}
          </p>
          <p className="font-bold sm:text-md">{username} </p>
          <div className="text-sm text-center mt-4">
            I am a lover of the serverless community😍❤{" "}
          </div>
        </div>
      </>
      <div>
        <p className="text-center font font-bold m-2">My Interests</p>
        <div class="">
          <div className="text-center p-3">Lambda</div>
          <div className="text-center p-3">Dynamodb</div>
          <div className="text-center p-3 mb-2">Step Functions</div>
        </div>
      </div>
      <div className="text-[#353bc1] p-4 absolute bottom-0 text-center w-[250px] cursor-pointer   "
        onClick={ ()=> {
          cognitoUser.signOut()

        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Profile;
