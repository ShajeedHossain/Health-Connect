import React from "react";
import Sidebar from "./Sidebar";
import HospitalSidebar from "./HospitalSidebar";

export default function HospitalDashboardBody({ activeState, children }) {
    return (
        <div className="dashboardBody">
            <HospitalSidebar activeState={activeState} />
            <main id="dashboard-main">{children}</main>
        </div>
    );
}
