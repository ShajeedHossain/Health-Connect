import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../Style/Navbar.module.css";
export const Navbar = ({ activeNavbarState }) => {
    const { setActiveNavbar, activeNavbar } = activeNavbarState;
    const patientNavbar = [
        { text: "Dashboard", link: "/dashboard", icon: "space_dashboard" },
        {
            text: "Appointment",
            link: "/dashboard/all-appointment",
            icon: "clinical_notes",
        },
        {
            text: "Hospital Reservation",
            link: "/reservation",
            icon: "home_health",
        },
    ];
    return (
        <nav
            className={`${classes["navbar"]} sidebar-nav ${
                activeNavbar ? "active" : ""
            }`}
        >
            <div className={`${classes["sidebar-header"]}`}>
                <h2>Health Connect</h2>
                <span
                    onClick={() => {
                        setActiveNavbar((prev) => !prev);
                    }}
                    className={`${classes["close-btn"]} material-symbols-outlined`}
                >
                    close
                </span>
            </div>

            <ul>
                {patientNavbar?.map((navItem, index) => (
                    <li key={index}>
                        <Link to={navItem.link}>
                            <span className="material-symbols-outlined">
                                {navItem.icon}
                            </span>
                            <span>{navItem.text}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
