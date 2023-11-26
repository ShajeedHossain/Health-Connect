import { Navigate, Outlet } from "react-router-dom";
export default function PrivateRoute() {
    const userBackup = JSON.parse(localStorage.getItem("user"));
    return <>{userBackup ? <Outlet /> : <Navigate to="/login" />}</>;
}
