import axios from "axios";
const axiosBase = axios.create({ baseURL: "http://localhost:5100/api" });
export default axiosBase;
