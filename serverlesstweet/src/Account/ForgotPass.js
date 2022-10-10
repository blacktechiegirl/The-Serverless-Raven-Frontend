import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userpool from "./userpool";
import { toast } from "react-toastify";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { ToastContainer } from "react-toastify";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgress from "../UI/CircularProgress";
import InputField from "../UI/InputField";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1);
  const [code, setCode] = useState("");
  const [passToggle, setPassToggle] = useState(false);

  const toggleBtn = () => {
    setPassToggle((prevState) => !prevState);
  };

  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userpool,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (password == confirmPassword) {
      cognitoUser.confirmPassword(code, password, {
        onSuccess: function (data) {
          console.log("CodeDeliveryData from forgotPassword: " + data);
          toast.success("Password Reset Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/");
          setEmail("");
          setConfirmPassword("");
          setPassword("");
        },
        onFailure: function (err) {
          toast.error("Invalid verification code", {
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
          setEmail("");
          setConfirmPassword("");
          setPassword("");
        },
      });
    } else {
      toast.error("Password does not match", {
        position: toast.POSITION.TOP_CENTER,
      });
      setLoading(false);
      setEmail("");
      setConfirmPassword("");
      setPassword("");
    }
  };

  const sendCode = (event) => {
    setLoading(true);
    event.preventDefault();
    cognitoUser.forgotPassword({
      onSuccess: function (data) {
        // successfully initiated reset password request
        console.log("CodeDeliveryData from forgotPassword: " + data);
      },
      onFailure: function (err) {
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
        setEmail("");
      },
      //Optional automatic callback
      inputVerificationCode: function (data) {
        console.log("Code sent to: " + data);
        setLoading(false);
        setStage(2);

        // var verificationCode = document.getElementById('code').value;
        // var newPassword = password;
        // cognitoUser.confirmPassword(verificationCode, newPassword, {
        //     onSuccess() {
        //         setLoading(false)
        //         setStage(2)
        //         console.log('Password confirmed!');
        //     },
        //     onFailure(err) {
        //         console.log('Password not confirmed!');
        //     },
        // });
      },
    });
  };
  console.log(email, password);

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 ">
      {/* Right hand pane of login page */}
      <div className="hidden sm:flex bg-[#646be2]  justify-center items-center text-white flex-col h-96 lg:h-full">
        <h1 className="text-[40px] lg:text-[40px] md:text-[50px] xl:text-[50px] 2xl:text-[50px] font-montserrat font-bold text-center ">
          Hey Guys<br></br>Let's Tweet Serverless !
        </h1>
        <p className="text-[40px] font-smooch">
          welcome to www.serverlesstweet.com
        </p>
      </div>
      <div className="flex justify-center items-center h-[100vh] bg-[rgb(0,0,0,0.04)] font-sora">
        <ToastContainer />
        <div className=" bg-white  p-[40px] rounded-md relative w-[400px]">
          <i>
            <p
              className="cursor-pointer  absolute bottom-5 right-10 text-[#949393] text-sm"
              onClick={() => navigate("/")}
            >
              Return to Login
            </p>
          </i>
          {stage === 1 ? (
            <form onSubmit={sendCode}>
              <h4 className="text-center text-2xl mb-4">Reset Password</h4>
              <p className=" text-sm text-center mb-8">
                Forgot your password ? Enter your email to quickly recover your
                password
              </p>

              <InputField
                name="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                font={faEnvelope}
                label="Email"
              />

              {loading ? (
                <div className="bg-[#353bc1] relative p-2 text-center text-white rounded-lg mt-14 mb-8">
                  <button type="submit">
                    <CircularProgress />{" "}
                  </button>
                </div>
              ) : (
                <div className="bg-[#353bc1] p-2 text-center text-white rounded-lg mt-14 mb-8">
                  <button type="submit"> Send Verification Code</button>
                </div>
              )}
            </form>
          ) : (
            <div>
              <form onSubmit={onSubmit}>
              <h4 className="text-center text-2xl mb-6">Reset Password</h4>
                <InputField
                  name="vercode"
                  placeholder="Enter your verification code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  font={faEnvelope}
                  label="Verification Code"
                />

                <InputField
                  name="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  label="Password"
                />
                <InputField
                  name="password"
                  placeholder="Enter your Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  label="Confirm Password"
                />
                {loading ? (
                <div className="bg-[#353bc1] relative p-2 text-center text-white rounded-lg mt-14 mb-8">
                  <button type="submit">
                    <CircularProgress />{" "}
                  </button>
                </div>
              ) : (
                <div className="bg-[#353bc1] p-2 text-center text-white rounded-lg mt-14 mb-8">
                  <button type="submit"> Reset Password</button>
                </div>
              )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
