import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "https://news-blog-api.onrender.com/",
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      const tokenType = Cookies.get("tokenType") ?? "Bearer";
      config.headers.Authorization = `${tokenType} ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("axios interceptor error", error.response);
      Cookies.remove("token");
      Cookies.remove("tokenType");
      Cookies.remove("user");
    }
    return Promise.reject(error);
  },
);
export default API;
