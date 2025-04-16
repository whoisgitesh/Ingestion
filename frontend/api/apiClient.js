import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Adjust to your backend URL
  timeout: 10000,
});

export default apiClient;
