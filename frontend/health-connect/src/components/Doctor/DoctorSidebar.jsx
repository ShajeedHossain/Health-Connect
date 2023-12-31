import classes from "../../styles/Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function DoctorSidebar({ activeState }) {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <aside className={activeState ? `${classes["aside-active"]}` : ``}>
            <div className={classes.sidebar}>
                <Link to="/hospital-dashboard">
                    <div
                        className={`${classes["sidebar-option"]} ${classes["active"]}`}
                    >
                        <span className="material-symbols-outlined">
                            space_dashboard
                        </span>
                        <h3>Dashboard</h3>
                    </div>
                </Link>
                <Link to="/doctor-dashboard/view-appointments">
                    <div className={classes["sidebar-option"]}>
                        <span className="material-symbols-outlined">
                            clinical_notes
                        </span>
                        <h3>View Appointments</h3>
                    </div>
                </Link>
                <Link to="/hospital-dashboard/view-doctors">
                    <div className={classes["sidebar-option"]}>
                        <span className="material-symbols-outlined">
                            stethoscope
                        </span>
                        <h3>Doctor List</h3>
                    </div>
                </Link>
                <Link to="/dashboard/hospitalBooking">
                    <div className={classes["sidebar-option"]}>
                        <span className="material-symbols-outlined">
                            home_health
                        </span>
                        <h3>Medical admission</h3>
                    </div>
                </Link>
                <Link to="/">
                    <div className={classes["sidebar-option"]}>
                        <span className="material-symbols-outlined">
                            prescriptions
                        </span>
                        <h3>Report</h3>
                    </div>
                </Link>
                <Link to="/doctor-dashboard/chat-box">
                    <div className={classes["sidebar-option"]}>
                        <span className="material-symbols-outlined">help</span>
                        <h3>Help & Support</h3>
                    </div>
                </Link>
                <Link to="/doctor-dashboard/settings">
                    <div className={classes["sidebar-option"]}>
                        <span className="material-symbols-outlined">
                            settings
                        </span>
                        <h3>Settings</h3>
                    </div>
                </Link>

                <div
                    onClick={handleLogout}
                    className={`${classes["sidebar-option"]} ${classes["logout"]}`}
                >
                    <span className="material-symbols-outlined">logout</span>
                    <h3>Logout</h3>
                </div>
            </div>
        </aside>
    );
}
