import { useContext, useRef, useState } from "react";
import axios from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

import "./login.css";
import { AppState } from "../../App";
function Login() {
  const { user, setUser } = useContext(AppState);

  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [alertMessages, setAlertMessages] = useState("");
  const [success, setSuccess] = useState("");
  // const [showPassword, setShowPassword] = useState(false);

  // function to handle the user login
  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (!emailValue || !passValue) {
      setAlertMessages("Please provide all requirs ");
      setTimeout(() => {
        setAlertMessages("");
      }, 3000);
      return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passValue,
      });
      setSuccess("logged in successfuly");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      localStorage.setItem("token", data.token);
      // console.log(data);
      setUser(data);
      navigate("/home");
      // setUser(data);
    } catch (error) {
      // alert(error?.response?.data?.msg);
      console.log(error.response.data);
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="mainRegisterWrapper">
            <section className="secondRegisterWrapper">
              {alertMessages && <div className="alerts">{alertMessages}</div>}
              {success && <div className="alerts">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="inputs">
                  <div>
                    <input type="email" ref={emailDom} placeholder="email" />
                  </div>
                  <div className="password">
                    <input
                      type="password"
                      ref={passwordDom}
                      placeholder="password"
                    />
                    {/* <span>
                      {showPassword ? (
                        <FaRegEye className="eyes" />
                      ) : (
                        <FaRegEyeSlash className="eyes" />
                      )}
                    </span> */}
                  </div>
                </div>
                <button className="toblue" type="submit">
                  login
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
    // <section className={classes.upper_wrapper}>
    //   <h3 className="fw-bold">Login to your account</h3>
    //   <p>
    //     Don’t have an account? <Link to={"/register"}>Create Account</Link>
    //   </p>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       {/* <span>email </span> */}
    //       <input ref={emailDom} type="text" placeholder="email" />
    //     </div>
    //     <br />
    //     <div>
    //       {/* <span>password</span> */}
    //       <input ref={passwordDom} type="text" placeholder="password" />
    //     </div>
    //     <button type="submit">Login</button>
    //   </form>
    // </section>
  );
}

export default Login;
