import React from "react";
import Sidebar from "./Patient/Sidebar";
import HospitalSidebar from "./Hospital/HospitalSidebar";

export default function DashboardBody({ activeState, children, userType }) {
    return (
        <div className="dashboardBody">
            {userType === "patient" && <Sidebar activeState={activeState} />}

            {userType === "hospital" && (
                <HospitalSidebar activeState={activeState} />
            )}

            <main id="dashboard-main">{children}</main>
        </div>
    );
}
