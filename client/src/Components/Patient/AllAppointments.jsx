import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import classes from "../../Style/Patient/AllAppointments.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAppointmentList } from "../../hooks/Patient/useUpcomingAppointmentList";
import { formatDateAndTime } from "../../Utility/formateTime";
import { SingleAppointment } from "../../Style/Patient/SingleAppointment";
export const AllAppointments = () => {
    const { user } = useAuthContext();

    // Upcoming Appointment Information Hook
    const { upcomingData, upcomingLoading, upcomingError } =
        useAppointmentList(user);
    const { appointments } = upcomingData;
    console.log("UPCOMING APPOINTMENT: ", appointments);

    const [upcoming, setUpcoming] = useState([]);
    const [previous, setPrevious] = useState([]);
    useEffect(() => {
        const tempData = appointments?.filter((data) => {
            return (
                !data.isTaken &&
                new Date(formatDateAndTime(data.startTime).date) >= new Date()
            );
        });
        console.log("UPCOMING DATA :", tempData);
        setUpcoming(tempData);
    }, [appointments]);

    useEffect(() => {
        const tempData = appointments?.filter((data) => {
            return (
                data.isTaken ||
                new Date(formatDateAndTime(data.startTime).date) < new Date()
            );
        });

        console.log("PREVIOUS DATA :", tempData);
        setPrevious(tempData);
    }, [appointments]);

    return (
        <div className={`dashboard-container`}>
            <div className={`container-header`}>
                <h3>All Appointments</h3>
                <Button text={`Take New Appointment`} />
            </div>
            <div className={`container-body`}>
                <table className={`dashboard-table`}>
                    <caption>Upcoming Appointment</caption>
                    <tr>
                        <th>Doctor Name</th>
                        <th>Appointment Date</th>
                        <th>Appointment Time</th>
                        <th>Appointment Details</th>
                    </tr>
                    {!upcomingLoading &&
                        upcoming?.map((singleAppointment, index) => (
                            <SingleAppointment
                                key={index}
                                singleAppointment={singleAppointment}
                            />
                        ))}
                </table>
                <table className={`dashboard-table`}>
                    <caption>Previous Appointment</caption>
                    <tr>
                        <th>Doctor Name</th>
                        <th>Appointment Date</th>
                        <th>Appointment Time</th>
                        <th>Appointment Details</th>
                    </tr>
                    {!upcomingLoading &&
                        previous?.map((singleAppointment, index) => (
                            <SingleAppointment
                                key={index}
                                singleAppointment={singleAppointment}
                            />
                        ))}
                </table>
            </div>
        </div>
    );
};
