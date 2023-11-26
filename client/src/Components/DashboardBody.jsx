import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const DashboardBody = ({ children, setActiveNavbar }) => {
    const { user, newUser, logout } = useAuthContext();
    const navigate = useNavigate();
    return (
        <div className={`dashboard-body`}>
            <div className={`dashboard-logo`}>
                <h2>Health Connect</h2>
            </div>
            <div className={`dashboard-header`}>
                <span
                    onClick={() => {
                        setActiveNavbar((prev) => !prev);
                    }}
                    className="material-symbols-outlined"
                >
                    menu_open
                </span>
                <div className={`user-info`}>
                    <p>{newUser?.fullname}</p>
                    <span
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                        className="material-symbols-outlined"
                    >
                        logout
                    </span>
                </div>
            </div>
            {children}
        </div>
    );
};
