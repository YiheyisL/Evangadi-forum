import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState, createContext } from "react";
import axios from "./api/axiosConfig";
import Header from "./pages/Header/Header";

export const AppState = createContext();
// export const QuestionState = createContext();
function App() {
  const [user, setUser] = useState({});
  // const [question, setquestion] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: { Authorization: "Bearer " + token },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    //check if the user is logged in
    checkUser();
  }, []);
  return (
    <AppState.Provider value={{ user, setUser }}>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/ask" element={<AskQuestion />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/question/:questionid" element={<SingleQuestion />} /> */}
      </Routes>
    </AppState.Provider>
  );
}

export default App;
