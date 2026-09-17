import { create } from "axios";

const apiURL = "http://localhost:5050";

export const axiosInstance = create({
  baseURL: `${apiURL}/api`,
  withCredentials: true,
});
