import { Link } from "react-router-dom";
import { useUpcomingAppointmentList } from "../../hooks/useUpcomingAppointmentList";
import { useAuthContext } from "../../hooks/useAuthContext";
import classes from "../../styles/AppointmentList.module.css";
import SingleAppointment from "./SingleAppointment";
import { usePreviousAppointment } from "../../hooks/usePreviousAppointment";
export default function AppointmentList() {
    const { user } = useAuthContext();

    // Upcoming Appointment Information
    const { upcomingData, upcomingLoading, upcomingError } =
        useUpcomingAppointmentList(user);
    const { upcomingAppointment } = upcomingData;

    // Previous Appointment Information
    const { previousData, previousLoading, previousError } =
        usePreviousAppointment(user);
    const { previousAppointment } = previousData;

    return (
        <>
            <div className={classes["take-new-appointment-btn"]}>
                <button className={classes["appoint-tek-btn"]}>
                    <Link to="/dashboard/takeAppointment">
                        <h3>Take New Appointment</h3>
                    </Link>
                </button>
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
                        upcomingAppointment.map((singleAppointment) => (
                            <SingleAppointment
                                key={singleAppointment["_id"]}
                                className="single-upappoint-card"
                                doctorDetails={singleAppointment}
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
                    {!previousLoading &&
                        !previousError &&
                        previousAppointment.map((singleAppointment) => (
                            <SingleAppointment
                                key={singleAppointment["_id"]}
                                className="single-upappoint-card"
                                doctorDetails={singleAppointment}
                                loading={previousLoading}
                            />
                        ))}
                </div>
            </section>
        </>
    );
}
