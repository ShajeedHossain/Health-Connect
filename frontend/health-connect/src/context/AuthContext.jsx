import { createContext, useEffect, useState } from "react";
import UserLog from "../apis/UserLog";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [newUser, setNewUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [state, dispatch] = useReducer(authReducer, {
  //     user: null,
  // });
  useEffect(() => {
    // if (user) {
    //     dispatch({ type: "LOGIN", payload: user });
    // }
    console.log("IMAS: ", user.token);
    const getUserDetails = async () => {
      const response = await UserLog.get("/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      //   console.log("Response from getUserDetails : ", response);
      setNewUser(response.data.user);
      // console.log("NewUser: ", newUser);
    };
    try {
      if (user) {
        getUserDetails();
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);
  // console.log("AuthContext State: ", state);

  const login = async (email, password) => {
    setLoading(true);
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
      // dispatch({ type: "LOGIN", payload: data });
      setUser(data);

      setLoading(false);
      return { data: data };
    } catch (err) {
      console.log(err);
      console.log(err.response.data.error);
      setError(err.response.data.error);
      setLoading(false);
      return { error: err.response.data.error };
    }
  };

  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");

    //dispatch logout action
    // dispatch({ type: "LOGOUT" });
    setUser(null);
    setNewUser(null);
  };
  const value = {
    user,
    setUser,
    newUser,
    setNewUser,
    login,
    loading,
    error,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
