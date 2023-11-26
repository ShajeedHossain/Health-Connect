import { createContext, useEffect, useState } from "react";
import UserLog from "../apis/UserLog";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    // User Parse from token, if no user then empty string will be set
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || ""
    );

    // User Fetch states.
    const [newUser, setNewUser] = useState();
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    // Login states
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    // Use effect for fetching user information.
    useEffect(() => {
        const getUserDetails = async () => {
            const response = await UserLog.get("/", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setNewUser(response.data.user);
            setAuthLoading(false);
        };
        try {
            setAuthLoading(true);
            if (user) {
                getUserDetails();
            }
        } catch (error) {
            setAuthLoading(false);
            setAuthError(error);
            console.log(error);
        }
    }, [user]);

    // Login Function.
    const login = async (email, password) => {
        setLoginLoading(true);
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
            setUser(data);

            setLoginLoading(false);
            return { data: data };
        } catch (err) {
            setLoginError(err.response.data.error);
            setLoginLoading(false);
            return { error: err.response.data.error };
        }
    };

    // Logout Function.
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setNewUser(null);
    };

    // Auth Context Value.
    const value = {
        user,
        setUser,
        newUser,
        setNewUser,
        login,
        authLoading,
        authError,
        loginLoading,
        loginError,
        logout,
    };
    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};
