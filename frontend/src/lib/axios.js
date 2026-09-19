import { create } from "axios";

const isProduction = import.meta.env.MODE === "production";

let apiURL;

if (isProduction) {
  apiURL = "https://letsstream-uarw.onrender.com";
} else {
  apiURL = "http://localhost:5050";
}

export const callURL = apiURL;

export const axiosInstance = create({
  baseURL: `${apiURL}/api`,
  withCredentials: true,
});
