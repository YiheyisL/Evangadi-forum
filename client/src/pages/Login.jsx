import { useRef, useContext } from "react";
import classes from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import { AppState } from "../App";
function Login() {
  const { user, setuser } = useContext(AppState);
  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!emailValue || !passValue) {
      alert("please provide all required information");
      return;
    }
    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      alert("login successful");
      localStorage.setItem("token", data.token);
      setuser(data);
      navigate("/");
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error.response);
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
          <span>password </span>
          <input ref={passwordDom} type="text" placeholder="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to={"/register"}>Register</Link>
    </section>
  );
}

export default Login;
