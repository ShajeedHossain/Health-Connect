import React from "react";
import { Button } from "../Button";

export const DashboardHome = () => {
    return (
        <div className={`dashboard-container`}>
            <div className={`container-header`}>
                <h3>Appointments</h3>
                <Button text={`Take New Appointment`} />
            </div>
            <div></div>
        </div>
    );
};
