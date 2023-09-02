import { useState } from "react";
import UserLog from "../apis/UserLog";

export const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const resetPassword = async (password, id, token) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await UserLog.post(
        `/reset-password/${id}/${token}`,
        {
          password,
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
  return { resetPassword, isLoading, error };
};
