import React, { useEffect, useState } from "react";
import Sidebar from "./Patient/Sidebar";
import HospitalSidebar from "./Hospital/HospitalSidebar";
import DoctorSidebar from "./Doctor/DoctorSidebar";
import { useAuthContext } from "../hooks/useAuthContext";

export default function DashboardBody({ activeState, children, userType }) {
    const { newUser } = useAuthContext();
    const [userTypesCheck, setUserTypesCheck] = useState(newUser?.type);
    useEffect(() => {
        setUserTypesCheck(newUser?.type);
    }, [newUser]);
    const patientSidebarItems = [
        {
            text: "Appointment",
            link: "/dashboard/appointment",
            icon: "clinical_notes",
        },
        {
            text: "Medical admission",
            link: "/dashboard/hospitalBooking",
            icon: "home_health",
        },
        {
            text: "Prescriptions",
            link: "/dashboard/view-prescriptions",
            icon: "prescriptions",
        },
        { text: "Chat Box", link: "/chat-box", icon: "help" },
        { text: "Settings", link: "/dashboard/settings", icon: "settings" },
    ];

    const doctorSidebarItems = [
        {
            text: "View Appointments",
            link: "/doctor-dashboard/view-appointments",
            icon: "clinical_notes",
        },
        {
            text: "Message",
            link: "/chat-box",
            icon: "help",
        },
        {
            text: "Settings",
            link: "/doctor-dashboard/settings",
            icon: "settings",
        },
    ];
    const hospitalSidebarItems = [
        {
            text: "Add Doctor",
            link: "/hospital-dashboard/add-doctor",
            icon: "clinical_notes",
        },
        {
            text: "Doctor List",
            link: "/hospital-dashboard/view-doctors",
            icon: "help",
        },
        {
            text: "Reservation List",
            link: "/hospital-dashboard/view-reservations",
            icon: "help",
        },
        {
            text: "Settings",
            link: "/hospital-dashboard/settings",
            icon: "settings",
        },
    ];
    return (
        <div className="dashboardBody">
            {userTypesCheck === "patient" && (
                <Sidebar
                    items={patientSidebarItems}
                    activeState={activeState}
                />
            )}

            {userTypesCheck === "hospital" && (
                <Sidebar
                    items={hospitalSidebarItems}
                    activeState={activeState}
                />
            )}

            {userTypesCheck === "doctor" && (
                <Sidebar items={doctorSidebarItems} activeState={activeState} />
            )}

            <main id="dashboard-main">{children}</main>
        </div>
    );
}
