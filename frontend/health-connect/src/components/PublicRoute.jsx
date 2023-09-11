import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
export default function PublicRoute() {
    const { user } = useAuthContext();
    // console.log("IMAS");
    // console.log(!user);

    
    return <>{!user ? <Outlet /> : <Navigate to="/" />}</>;
}
