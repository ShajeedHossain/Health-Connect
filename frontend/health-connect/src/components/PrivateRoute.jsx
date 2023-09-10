import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
export default function PrivateRoute (){
    const {user} = useAuthContext();

    console.log(user + " hello");
    return <>
        {user ? <Outlet/> : <Navigate to="/login" />}
    </>;
}