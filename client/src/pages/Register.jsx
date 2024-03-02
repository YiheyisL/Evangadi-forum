import React, { useRef, useState, useContext } from "react";
// import classes from "./register.module.css";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

// import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa6";
import { AppState } from "../App";
import "./Register.css";
function Register() {
  const { setuser } = useContext(AppState);
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [alert, setalert] = useState("");
  const [error] = useState("");
  const [createdMessage, setCreatedMessage] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
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
      setalert("Please provide all required information ");
      setTimeout(() => {
        setalert("");
      }, 3000);
      return;
    }
    try {
      const { data } = await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      // alert("register successful. Please login");
      setuser(data);
      setCreatedMessage("user registered");
      setTimeout(() => {
        setCreatedMessage("");
      }, 3000);

      // setting the user's token on localStorage
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      setCatch("something went wrong, try again");
      console.log(error.response);
    }
  }
  return (
    <div>
      <div className="regiterWrapper">
        <form onSubmit={handleSubmit}>
          <section className="inputss">
            {/* alerting messages for users */}
            {alert && <div className="alerts">{alert}</div>}
            {error && <div className="alerts">{error}</div>}
            {createdMessage && <div className="alerts">{createdMessage}</div>}
            {errorCatch && <div className="alerts">{errorCatch}</div>}
            <input type="text" ref={userNameDom} placeholder="User name" />
            <div className="fifty">
              <input
                type="text"
                ref={firstNameDom}
                placeholder="First name"
                className="pr-0 mr-0"
              />

              <input
                className="p-r"
                type="text"
                name=""
                ref={lastNameDom}
                placeholder="Last name"
              />
            </div>

            <input type="email" ref={emailDom} placeholder="Email address" />

            <div className="password">
              <input type="password" ref={passwordDom} placeholder="password" />
              {/* <span onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <FaRegEye className="eye" />
                ) : (
                  <FaRegEyeSlash className="eye" />
                )}
              </span> */}
            </div>
            <div className="lastones">
              <span className="terms">
                I agree to the <a className="onhover">privacy policy</a> and
                <a className="onhover">terms of service</a>.
              </span>
              <button className="agree">Agree and Join</button>
            </div>
          </section>
        </form>
      </div>
    </div>
    // <section className={classes.upper_wrapper}>
    //   <h3>Join the network</h3>
    //   <h4>
    //     Already have an account? <Link to={"/login"}>Login</Link>
    //   </h4>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <div>
    //         {/* <span>username </span> */}
    //         <input ref={userNameDom} type="text" placeholder="username" />
    //       </div>
    //       <br />
    //       <div>
    //         {/* <span>First name </span> */}
    //         <input ref={firstNameDom} type="text" placeholder="first name" />
    //       </div>
    //       <br />
    //       <div>
    //         {/* <span>Last name </span> */}
    //         <input ref={lastNameDom} type="text" placeholder="last name" />
    //       </div>
    //       <br />
    //       <div>
    //         {/* <span>email </span> */}
    //         <input ref={emailDom} type="text" placeholder="email" />
    //       </div>
    //       <br />
    //       <div>
    //         {/* <span>password </span> */}
    //         <input ref={passwordDom} type="text" placeholder="password" />
    //       </div>
    //       <button type="submit">Register</button>
    //     </div>
    //   </form>
    // </section>
  );
}

export default Register;
