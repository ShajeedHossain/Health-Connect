import React from "react";
import Sidebar from "./Patient/Sidebar";
import HospitalSidebar from "./Hospital/HospitalSidebar";
import DoctorSidebar from "./Doctor/DoctorSidebar";

export default function DashboardBody({ activeState, children, userType }) {
    return (
        <div className="dashboardBody">
            {userType === "patient" && <Sidebar activeState={activeState} />}

            {userType === "hospital" && (
                <HospitalSidebar activeState={activeState} />
            )}

            {userType === "doctor" && (
                <DoctorSidebar activeState={activeState} />
            )}

            <main id="dashboard-main">{children}</main>
        </div>
    );
}
