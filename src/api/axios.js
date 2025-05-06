
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000", // Backend URL
});

// Add the interceptor HERE
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach JWT to every request
  }
  return config;
});

export default axiosInstance;