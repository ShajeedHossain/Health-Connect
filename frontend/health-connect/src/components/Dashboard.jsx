import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserLog from "../apis/UserLog";
import { useAuthContext } from "../hooks/useAuthContext";
import DashboardBody from "./DashboardBody";
import Navbar from "./Navbar";

export default function Dashboard({ children, userType }) {
    const { user, newUser } = useAuthContext();

    const [isActive, setIsActive] = useState(false);
    const handleActive = () => {
        setIsActive((current) => !current);
    };

    return (
        <div className="container-custom">
            <Navbar
                newUser={newUser}
                activeState={{ isActive, handleActive }}
                className="navbar"
            />
            <DashboardBody activeState={isActive} userType={userType}>
                <Outlet />
            </DashboardBody>
        </div>
    );
}
