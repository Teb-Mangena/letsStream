import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (loginData) => loginUser(loginData),
    retry: false,

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error) => {
      let message;
      if (isAxiosError(error)) {
        message = error.response?.data?.message ?? "Failed to login";
      } else {
        message = "Error logging in";
      }

      toast.error(message);
    },
  });

  const signupMutation = useMutation({
    mutationFn: (signupData) => signupUser(signupData),
    retry: false,

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error) => {
      let message;
      if (isAxiosError(error)) {
        message = error.response?.data?.message ?? "Failed to sign up";
      } else {
        message = "Error signing up";
      }

      toast.error(message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    retry: false,

    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      queryClient.removeQueries({ queryKey: ["authUser"] });

      toast.success("Logged out successfully");
    },

    onError: (error) => {
      const message = isAxiosError(error)
        ? (error.response?.data?.message ?? "Failed to logout")
        : "Error logging out";

      toast.error(message);
    },
  });

  const onboardingMutation = useMutation({
    mutationFn: (onBoardingData) => onboarding(onBoardingData),

    retry: false,

    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        toast.success("Onboarding completed"));
    },
    onError: (error) => {
      let message;
      if (isAxiosError(error)) {
        message = error.response?.data?.message ?? "Onboarding failed";
      } else {
        message = "Error onboarding";
      }

      toast.error(message);
    },
  });

  const checkAuthQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: checkAuth,
    retry: false,
  });

  return {
    loginMutation,
    signupMutation,
    logoutMutation,
    onboardingMutation,
    checkAuthQuery,
  };
};

async function loginUser(loginData) {
  const res = await axiosInstance.post("/auth/login", loginData);

  return res.data;
}

async function signupUser(signupData) {
  const res = await axiosInstance.post("/auth/signup", signupData);

  return res.data;
}

async function onboarding(onBoardingData) {
  const res = await axiosInstance.patch("/auth/onboarding", onBoardingData);

  return res.data;
}

async function logoutUser() {
  const res = await axiosInstance.post("/auth/logout");

  return res.data;
}

async function checkAuth() {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
}
