import axios from "axios";

let ProductionURL = "https://housify-sever.onrender.com/api";
let DevelopmentURL = "http://localhost:5000/api";
const apiRequest = axios.create({
  baseURL: ProductionURL,
  withCredentials: true,
});

apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    // Dispatch global event
    window.dispatchEvent(new CustomEvent("api-error", { detail: message }));

    // if (error.response?.status === 401) {
    //   window.location.href = "/login";
    // }
    return Promise.reject(error);
  }
);

export default apiRequest;
