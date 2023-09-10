import React from "react";
import Sidebar from "./Sidebar";

export default function DashboardBody({ activeState, children }) {
    return (
        <div className="dashboardBody">
            <Sidebar activeState={activeState} />
            <main id="dashboard-main">{children}</main>
        </div>
    );
}
