import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppState } from "../App";

const Home = ({ logout }) => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);
  return (
    <div>
      {/* show username in homepage */}
      <h1>WelCome {userData.user?.display_name}</h1>

      {/* logout when the button clicked in which the function comes from app.js */}
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Home;
