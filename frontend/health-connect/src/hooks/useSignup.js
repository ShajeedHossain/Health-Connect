import { useState } from "react";
import UserLog from "../apis/UserLog";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (email, password, fullname, address) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await UserLog.post(
        "/signup",
        {
          email,
          password,
          fullname,
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      setIsLoading(false);
      return { data: data };
    } catch (err) {
      console.log(err.response.data.error);
      setError(err.response.data.error);
      setIsLoading(false);
      return { error: err.response.data.error };
    }
  };
  return { signup, isLoading, error };
};
