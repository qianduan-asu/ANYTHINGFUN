// src/axiosInstance.ts
import axios from "axios";

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // 设置基础 URL
  timeout: 10000, // 设置请求超时
  headers: {
    "Content-Type": "application/json",
    // 可以在这里设置其他默认头部
  },
});

// 请求拦截器（可选）
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做些什么，比如添加认证 token
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器（可选）
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 对响应错误做些什么
    console.error("请求错误:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
