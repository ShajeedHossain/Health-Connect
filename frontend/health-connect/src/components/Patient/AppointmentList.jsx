import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../Utility/formateTime";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpcomingAppointmentList } from "../../hooks/useUpcomingAppointmentList";
import classes from "../../styles/AppointmentList.module.css";
import SingleAppointment from "./SingleAppointment";
export default function AppointmentList() {
    const { user, newUser } = useAuthContext();

    // Upcoming Appointment Information
    const { upcomingData, upcomingLoading, upcomingError } =
        useUpcomingAppointmentList(user);
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
        <>
            <div className={classes["take-new-appointment-btn"]}>
                <Link className="btn" to="/dashboard/takeAppointment">
                    Take New Appointment
                </Link>
            </div>
            <section className={classes["doc-upcoming-apoint-chk-part"]}>
                <div className={classes["doc-upcoming-apoint-check-header"]}>
                    <div
                        className={classes["doc-upcoming-apoint-check-heading"]}
                    >
                        <h2>Upcoming Appointments</h2>
                    </div>
                </div>

                {/* Upcoming Appointment Part  */}
                <div className={classes["appointment-cards"]}>
                    {!upcomingLoading &&
                        !upcomingError &&
                        upcoming?.map((singleAppointment) => (
                            <SingleAppointment
                                user={user}
                                userDetails={newUser}
                                key={singleAppointment["_id"]}
                                className="single-upappoint-card"
                                appointmentDetails={singleAppointment}
                                loading={upcomingLoading}
                            />
                        ))}
                </div>
            </section>

            {/* Previous Appointment Part  */}
            <section className={classes["doc-previous-apoint-chk-part"]}>
                <div className={classes["doc-previous-apoint-check-heading"]}>
                    <h2>Previous Appointments</h2>
                </div>

                <div className={classes["appointment-cards"]}>
                    {!upcomingLoading &&
                        !upcomingError &&
                        previous?.map((singleAppointment) => (
                            <SingleAppointment
                                key={singleAppointment["_id"]}
                                className="single-upappoint-card"
                                appointmentDetails={singleAppointment}
                                loading={upcomingLoading}
                                previousFlag={true}
                            />
                        ))}
                </div>
            </section>
        </>
    );
}
