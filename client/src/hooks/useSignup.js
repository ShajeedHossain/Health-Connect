import { useState } from "react";
import UserLog from "../apis/UserLog";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (
        email,
        password,
        fullname,
        currentLatitude,
        currentLongitude,
        town,
        district
    ) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await UserLog.post(
                "/signup",
                {
                    email,
                    password,
                    fullname,
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    town,
                    district,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("INNNN");
            const data = response.data;

            setIsLoading(false);
            return { data: data };
        } catch (err) {
            console.log(err.message);
            setError(err.response.data.error);
            setIsLoading(false);
            return { error: err.response.data.error };
        }
    };
    return { signup, isLoading, error };
};
