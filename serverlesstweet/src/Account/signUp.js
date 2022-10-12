import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userpool from "./userpool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import InputField from "../UI/InputField";
import CircularProgress from "../UI/CircularProgress";
import { ToastError, ToastSuccess } from "../UI/ToastTweet";

const SignUp = () => {
  const attributeList = [];
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const dataUsername = {
    Name: "name",
    Value: username,
  };

  var attributeUsername = new CognitoUserAttribute(dataUsername);
  attributeList.push(attributeUsername);

  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validEmail = emailRegex.test(email);
  const validPassword = passRegex.test(password);

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      username == "" ||
      email == "" ||
      password == "" ||
      confirmPassword === ""
    ) {
      ToastError("Please Enter all  fields");
    } else if (validEmail === false) {
      ToastError("Please Enter a valid email address !");
    } else if (validPassword === false) {
      ToastError(
        "Please enter a password with at least 8 characters, 1 uppercase, 1 number and 1 symbol"
      );
    } else {
      setLoading(true);
      try {
        if (password === confirmPassword) {
          userpool.signUp(
            email,
            password,
            attributeList,
            null,
            (err, result) => {
              if (result) {
                setLoading(false);
                setEmail("");
                setConfirmPassword("");
                setPassword("");
                ToastSuccess(
                  "You have signed up successfully. Kindly Verify your Email and sign in again"
                );
              }
            }
          );
        } else {
          ToastError("Password does not match");
          setLoading(false);
          setConfirmPassword("");
          setPassword("");
        }
      } catch (err) {
        setEmail("");
        setConfirmPassword("");
        setPassword("");
        setLoading(false);
        ToastError(err.message);
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 ">
      {/* Right hand pane of login page */}
      <div className="hidden sm:flex bg-[#646be2] justify-center items-center text-white flex-col h-96 lg:h-full">
        <h1 className="text-[40px] lg:text-[40px] md:text-[50px] xl:text-[50px] 2xl:text-[50px] font-montserrat font-bold text-center ">
          Hey Guys<br></br>Let's Tweet Serverless !
        </h1>

      </div>

      {/* Left hand pane of login page */}
      <div className="flex justify-center items-center h-[100vh] bg-white font-sora ">
        {/* Login Form */}
        <div className="relative  p-[40px] rounded-lg w-[90%] max-w-[600px]">
          <i>
            <p
              className="cursor-pointer  absolute bottom-0 right-10 text-[#949393] text-sm hover:text-[#363062] "
              onClick={() => navigate("/")}
            >
              <u>Return to Login</u>
            </p>
          </i>
          <form onSubmit={onSubmit}>
            <h3 className="mb-3 text-center text-3xl">Sign Up</h3>
            <p className="text-center mb-5 font-bold">
              Get Started Serverless Tweets !
            </p>

            <InputField
              name="fullname"
              placeholder="Enter  full name"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              font={faUser}
              label="Fullname"
            />
            <InputField
              name="email"
              placeholder="Enter  Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              font={faEnvelope}
              label="Email"
            />

            <InputField
              name="password"
              placeholder="Enter  Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
            />
            <InputField
              name="password"
              placeholder="Confirm  Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              label="Confirm Password"
            />

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
                  className="bg-[#353bc1] p-2 text-center text-white rounded-lg mt-4 relative w-full"
                >
                  Signup
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

export default SignUp;
