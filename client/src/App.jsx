import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/Register";
import { useEffect, useState, createContext } from "react";
import axios from "./api/axiosConfig";

export const AppState = createContext();
// export const QuestionState = createContext();
function App() {
  const [user, setUser] = useState({});
  // // const [question, setquestion] = useState({});
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
