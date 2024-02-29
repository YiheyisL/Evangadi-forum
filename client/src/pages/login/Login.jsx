import { useRef } from "react";
import axios from "../../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

import classes from "../register.module.css";
// import { AppState } from "../../App";
function Login() {
  // const { user, setUser } = useContext(AppState);

  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  // function to handle the user login
  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!emailValue || !passValue) {
      alert("Please provide all requirs ");

      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("logged in successfuly");

      localStorage.setItem("token", data.token);
      console.log(data);
      navigate("/");
      // setUser(data);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }
  return (
    <section className={classes.upper_wrapper}>
      <form onSubmit={handleSubmit}>
        <div>
          <span>email </span>
          <input ref={emailDom} type="text" placeholder="email" />
        </div>
        <br />
        <div>
          <span>password</span>
          <input ref={passwordDom} type="text" placeholder="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to={"/register"}>Register</Link>
    </section>
  );
}

export default Login;
