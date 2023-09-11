import { Link } from "react-router-dom";
import { useUpcomingAppointmentList } from "../../hooks/useUpcomingAppointmentList";
import { useAuthContext } from "../../hooks/useAuthContext";
import classes from "../../styles/AppointmentList.module.css";
import SingleAppointment from "./SingleAppointment";
import { usePreviousAppointment } from "../../hooks/usePreviousAppointment";
export default function AppointmentList() {
    const { user } = useAuthContext();
    console.log("user : ", user);
    const { upcomingData, upcomingLoading, upcomingError } =
        useUpcomingAppointmentList(user);
    const { upcomingAppointment } = upcomingData;

    const { previousData, previousLoading, previousError } =
        usePreviousAppointment(user);
    const { previousAppointment } = previousData;
    console.log("AppointmentList Data  from hook: ", upcomingAppointment);
    // if (!loading) console.log("length ", upcomingAppointment.length);
    return (
        <>
            <section className={classes["doc-upcoming-apoint-chk-part"]}>
                <div className={classes["doc-upcoming-apoint-check-header"]}>
                    <div
                        className={classes["doc-upcoming-apoint-check-heading"]}
                    >
                        <h2>Upcoming Appointments</h2>
                    </div>
                    <div className={classes["take-new-appointment-btn"]}>
                        <button className={classes["appoint-tek-btn"]}>
                            <Link to="/dashboard/takeAppointment">
                                <h3>Take New Appointment</h3>
                            </Link>
                        </button>
                    </div>
                </div>

                <div className={classes["doc-upcoming-appoint-check-cards"]}>
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
                    {/* <SingleAppointment className="single-upappoint-card" />
                    <SingleAppointment className="single-upappoint-card" /> */}
                </div>
            </section>

            <section className={classes["doc-previous-apoint-chk-part"]}>
                <div className={classes["doc-previous-apoint-check-heading"]}>
                    <h2>Previous Appointments</h2>
                </div>

                <div className={classes["doc-previous-appoint-check-cards"]}>
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
                    {/* <SingleAppointment className="single-prevappoint-card" />
                    <SingleAppointment className="single-prevappoint-card" />
                    <SingleAppointment className="single-prevappoint-card" /> */}
                </div>
            </section>
        </>
    );
}
