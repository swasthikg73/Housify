import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://housify-sever.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
