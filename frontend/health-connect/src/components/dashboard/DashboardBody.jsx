import Sidebar from "./Sidebar";

export default function DashboardBody({ children }) {
    return (
        <div className="dashboardBody">
            <Sidebar />
            <main id="dashboard-main">{children}</main>
        </div>
    );
}
