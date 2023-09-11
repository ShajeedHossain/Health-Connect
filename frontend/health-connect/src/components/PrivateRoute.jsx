import { Navigate, Outlet } from "react-router-dom";
export default function PrivateRoute (){
    // const {user} = useAuthContext();
    const userBackup = JSON.parse(localStorage.getItem("user"));
    // console.log(user + " hello");
    // console.log(JSON.parse(localStorage.getItem("user")));
    // console.log("PRIVATE");
    // console.log(userBackup);
    return <>
        {userBackup ? <Outlet/> : <Navigate to="/login" />}
    </>;
}