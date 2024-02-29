import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppState } from "../App";

const Home = () => {
  const { user } = useContext(AppState);
  console.log(user);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!userData.user) navigate("/login");
  // }, [userData.user, navigate]);
  return (
    <div>
      <h1>WelCome</h1>
      <br />
      <br />
      <br />
      <h2>{user.username}</h2>
    </div>
  );
};

export default Home;
