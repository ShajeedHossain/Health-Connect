import classes from "../../styles/Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function HospitalSidebar({ activeState }) {
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
                <Link to="/hospital-dashboard/add-doctor">
                    <div className={classes["sidebar-option"]}>
                        <span className="material-symbols-outlined">
                            clinical_notes
                        </span>
                        <h3>Add Doctor</h3>
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
                <Link to="/hospital-dashboard/view-reservations">
                    <div className={classes["sidebar-option"]}>
                        <span className="material-symbols-outlined">
                            home_health
                        </span>
                        <h3>Reservation List</h3>
                    </div>
                </Link>
                <Link to="/hospital-dashboard/create-reservation">
                    <div className={classes["sidebar-option"]}>
                        <span className="material-symbols-outlined">
                            prescriptions
                        </span>
                        <h3>Reservation</h3>
                    </div>
                </Link>
                <Link to="/">
                    <div className={classes["sidebar-option"]}>
                        <span className="material-symbols-outlined">help</span>
                        <h3>Help & Support</h3>
                    </div>
                </Link>
                <Link to="/hospital-dashboard/settings">
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
