import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://express-layered-architecture.vercel.app/api",
});
