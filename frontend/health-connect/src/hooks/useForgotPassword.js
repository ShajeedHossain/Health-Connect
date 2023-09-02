import { useState } from "react";
import UserLog from "../apis/UserLog";

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const forgotPassword = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await UserLog.post(
        "/forgot-password",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      return { data: data };
    } catch (err) {
      console.log(err.response.data.error);
      setError(err.response.data.error);
      setIsLoading(false);
      return { error: err.response.data.error };
    }
  };
  return { forgotPassword, isLoading, error };
};
