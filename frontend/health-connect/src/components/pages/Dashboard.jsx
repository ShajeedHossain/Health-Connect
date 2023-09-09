import DashboardBody from "../dashboard/DashboardBody";
import Navbar from "../dashboard/Navbar";

export default function Dashboard({ children }) {
    return (
        <div className="container">
            <Navbar className="navbar" />
            <DashboardBody children={children} />
        </div>
    );
}
