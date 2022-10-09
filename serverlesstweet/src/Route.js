import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Account/Login.js";
import SignUp from "./Account/signUp";
import ForgotPass from "./Account/ForgotPass.js";
import HomePage from "./App.js";
import NewTopic from "./NewTopic.js";
import UserTweets from "./userTweets.js";
import userpool from "./Account/userpool";

const App = () => {
//   const cognitoUser = userpool.getCurrentUser();
//   cognitoUser.getSession(function (err, data) {
//     if (err) {
//         console.log(err)
//         } else {
//       const cognitoUserSession = data;
//       localStorage.setItem("idToken", cognitoUserSession.getIdToken().jwtToken);
//       localStorage.setItem(
//         "usertoken",
//         cognitoUserSession.getAccessToken().jwtToken
//       );
//     }
//   });
  return (
    <Router>
      <Routes>
        <Route path="/home" exact element={<HomePage />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/reset/password" exact element={<ForgotPass />} />
        <Route path="/topic/:topicid" exact element={<NewTopic />} />
        <Route path="/user/tweets" exact element={<UserTweets />} />
      </Routes>
    </Router>
  );
};

export default App;
