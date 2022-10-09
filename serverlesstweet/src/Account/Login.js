import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userpool from "./userpool";
import { ToastContainer } from "react-toastify";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { ToastError, ToastSuccess } from "../UI/ToastTweet";
import InputField from "../UI/InputField";
import CircularProgress from "../UI/CircularProgress";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validEmail = emailRegex.test(email);
  const validPassword = passRegex.test(password);
  console.log(validEmail);
  console.log(validPassword);

  const handleClick = () => {
    navigate("/signup");
  };

  const user = new CognitoUser({
    Username: email,
    Pool: userpool,
  });

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });



  const loginUser = async (event) => {
    setLoading(true);
    event.preventDefault();
    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        setLoading(false);
        localStorage.setItem("usertoken", data.getAccessToken().getJwtToken());
        localStorage.setItem("idToken", data.getIdToken().getJwtToken());
        localStorage.setItem("refreshToken", data.getRefreshToken().getToken());
        navigate("/home");
        user.getUserAttributes(function (err, result) {
          if (err) {
            ToastError(err.message);
            return;
          }
          for (let i = 0; i < result.length; i++) {
            localStorage.setItem("userId", result[0].getValue());
            localStorage.setItem("userName", result[2].getValue());
          }
        });
        ToastSuccess("You have signed up successfully");
      },
      onFailure: (err) => {
        setLoading(false);
        ToastError(err.message);
      },
    });
  };

  // bg-[#646be2] sm:bg-[red] md:bg-[green] lg:bg-[blue] xl:bg-[yellow] 2xl:bg-[gray]
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1  ">
      {/* Right hand pane of login page */}
      <div className="bg-[#646be2] flex justify-center items-center text-white flex-col h-96 lg:h-full">
        <h1 className="text-[40px] lg:text-[40px] md:text-[50px] xl:text-[50px] 2xl:text-[50px] font-montserrat font-bold text-center ">
          Hey Guys<br></br>Let's Tweet Serverless !
        </h1>
   
      </div>

      {/* Left hand pane of login page */}
      <div className="flex justify-center items-center h-[100vh] bg-[rgb(0,0,0,0.04)] font-sora">
        {/* Login Form */}
        <div className=" bg-white  p-[70px] rounded-lg">
          <form onSubmit={loginUser}>
            <h4 className="mb-3 text-center text-2xl">
              Welcome to Serverless Tweets
            </h4>
            <p className="text-center mb-5">
              New to Serverless Tweet?{" "}
              <b
                className="text-[#353bc1] cursor-pointer"
                onClick={handleClick}
              >
                Create an account
              </b>{" "}
            </p>

            <InputField
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              font={faEnvelope}
              label="Email"
            />

            <InputField
              name="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
            />

            {/* Forgot Password */}
            <div
              className="flex justify-end mt-3 text-['#949393'] cursor-pointer text-['13px']"
              onClick={() => {
                navigate("/reset/password");
              }}
            >
              <i>
                <p style={{ margin: 0 }}>forgot password?</p>
              </i>
            </div>

            {/* Login Button */}
            {loading ? (
              <div>
                <button
                  type="submit"
                  className="bg-[#353bc1] p-2 py-6 text-center text-white rounded-lg mt-12 relative w-full"
                >
                  <CircularProgress />
                </button>
              </div>
            ) : (
              <div>
                <button
                  type="submit"
                  className="bg-[#353bc1] p-2 text-center text-white rounded-lg mt-12 relative w-full"
                >
                  Login
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
