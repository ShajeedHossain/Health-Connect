import React from "react";

export const TextInput = ({ text, id, type, value, setFunction }) => {
    return (
        <div>
            <label htmlFor="">{text}</label>
            <input
                type={type}
                name={id}
                id={id}
                value={value}
                onChange={(e) => setFunction(e.target.value)}
            />
        </div>
    );
};
