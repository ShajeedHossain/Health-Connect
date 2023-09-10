import { useEffect, useRef, useState } from "react";
import DashboardBody from "../dashboard/DashboardBody";
import Navbar from "../dashboard/Navbar";

export default function Dashboard({ children }) {
    const [isActive, setIsActive] = useState(false);
    const handleActive = () => {
        setIsActive((current) => !current);
    };
    return (
        <div className="container">
            <Navbar
                activeState={{ isActive, handleActive }}
                className="navbar"
            />
            <DashboardBody activeState={isActive}>{children}</DashboardBody>
        </div>
    );
}
