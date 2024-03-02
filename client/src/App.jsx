import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
// import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/Register";
import { useEffect, useState, createContext } from "react";
import axios from "./api/axiosConfig";
import About from "./pages/About/About";
import Questions from "./pages/AllQuestion/AllQuestions";
import SingleQuestion from "./pages/SingleQuestion/SingleQuestion";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
export const AppState = createContext();
export const QuestionState = createContext();
function App() {
  const [user, setUser] = useState({});
  //const [question, setquestion] = useState({});
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
        <Route path="/login" element={<About />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/ask" element={<AskQuestion />} />

        <Route path="/home" element={<Questions />} />
        <Route path="/question/:questionid" element={<SingleQuestion />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
