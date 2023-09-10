import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  console.log("Context " + context);
  if (!context) {
    throw Error("useAuthContext must be inside an AuthContextProvider");
  }
  return context;
};
