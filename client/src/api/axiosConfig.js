import axios from "axios";
const axiosBase = axios.create({ baseURL: "http://localhost:5100/api" });
// const axiosBase = axios.create({
//   // baseURL: "https://evangadi-forum-deploy-2.onrender.com/",
// });
export default axiosBase;
