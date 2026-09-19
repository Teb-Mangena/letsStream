import { create } from "axios";

const isProduction = import.meta.env.MODE === "production";

let apiURL;

if (isProduction) {
  apiURL = "http://localhost:5050";
} else {
  apiURL = "https://letsstream-uarw.onrender.com";
}

export const axiosInstance = create({
  baseURL: `${apiURL}/api`,
  withCredentials: true,
});
