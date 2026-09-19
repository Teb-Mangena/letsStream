import { create } from "axios";

const apiURL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = create({
  baseURL: `${apiURL}/api`,
  withCredentials: true,
});
