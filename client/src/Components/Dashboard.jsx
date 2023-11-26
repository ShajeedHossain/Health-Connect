import React, { useState } from "react";
import { Navbar } from "./Navbar";
import classes from "../Style/Dashboard.module.css";
import { DashboardBody } from "./DashboardBody";
import { Outlet } from "react-router-dom";
import { DashboardHome } from "./Patient/DashboardHome";
import { AllAppointments } from "./Patient/AllAppointments";
import { ViewAppointmentDetails } from "./Patient/ViewAppointmentDetails";
import { useAuthContext } from "../hooks/useAuthContext";

export const Dashboard = () => {
    const [activeNavbar, setActiveNavbar] = useState(false);
    const { user, newUser } = useAuthContext();
    return (
        <div className={`dashboard`}>
            <Navbar activeNavbarState={{ setActiveNavbar, activeNavbar }} />
            <DashboardBody setActiveNavbar={setActiveNavbar}>
                <Outlet />
            </DashboardBody>
        </div>
    );
};
