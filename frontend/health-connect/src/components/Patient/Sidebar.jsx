import classes from "../../styles/Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Sidebar({ activeState, items }) {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };
    return (
        <aside className={activeState ? `${classes["aside-active"]}` : ``}>
            <div className={classes.sidebar}>
                {items?.map((item, index) => (
                    <Link key={index} to={item.link}>
                        <div className={`${classes["sidebar-option"]}`}>
                            <span className="material-symbols-outlined">
                                {item.icon}
                            </span>
                            <h3>{item.text}</h3>
                        </div>
                    </Link>
                ))}

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
