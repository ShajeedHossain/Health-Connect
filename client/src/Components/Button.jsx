import React from "react";
import classes from "../Style/Button.module.css";
export const Button = ({ text, type, btnClass }) => {
    return (
        <button
            type={type || ""}
            className={`${btnClass ? classes[btnClass] : classes["btn"]}`}
        >
            {text}
        </button>
    );
};
