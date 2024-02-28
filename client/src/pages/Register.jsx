import React, { useRef, useState, useContext } from "react";
import classes from "./register.module.css";
import axios from "../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";
function Register() {
  const { user, setuser } = useContext(AppState);
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [alert, setalert] = useState("");
  const [error, seterror] = useState("");
  const [createdMessage, setCreatedMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorCatch, setCatch] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstValue = firstNameDom.current.value;
    const lastValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("please provide all required information");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("register successful. Please login");
      navigate("/login");
    } catch (error) {
      alert("somthing wrong!");
      console.log(error.response);
    }
  }
  return (
    <section className={classes.upper_wrapper}>
      <form onSubmit={handleSubmit}>
        <div>
          {/* alerting messages for users */}
          {alert && <div className="alerts">{alert}</div>}
          {error && <div className="alerts">{error}</div>}
          {createdMessage && <div className="alerts">{createdMessage}</div>}
          {errorCatch && <div className="alerts">{errorCatch}</div>}
          <div>
            <span>username </span>
            <input ref={userNameDom} type="text" placeholder="username" />
          </div>
          <br />
          <div>
            <span>First name </span>
            <input ref={firstNameDom} type="text" placeholder="first name" />
          </div>
          <br />
          <div>
            <span>Last name </span>
            <input ref={lastNameDom} type="text" placeholder="last name" />
          </div>
          <br />
          <div>
            <span>email </span>
            <input ref={emailDom} type="text" placeholder="email" />
          </div>
          <br />
          <div>
            <span>password </span>
            <input ref={passwordDom} type="text" placeholder="password" />
          </div>
          <button type="submit">Register</button>
        </div>
      </form>
      <Link to={"/login"}>Login</Link>
    </section>
  );
}

export default Register;
