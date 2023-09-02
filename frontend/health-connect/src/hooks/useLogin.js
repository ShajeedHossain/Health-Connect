import { useState } from "react";
import UserLog from "../apis/UserLog";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await UserLog.post(
        "/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);
      return { data: data };
    } catch (err) {
      console.log(err);
      console.log(err.response.data.error);
      setError(err.response.data.error);
      setIsLoading(false);
      return { error: err.response.data.error };
    }
  };
  return { login, isLoading, error };
};
