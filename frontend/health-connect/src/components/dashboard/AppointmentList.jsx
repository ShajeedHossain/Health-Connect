import { Link } from "react-router-dom";
import { useAppointmentList } from "../../hooks/useAppointmentList";
import { useAuthContext } from "../../hooks/useAuthContext";
import classes from "../../styles/AppointmentList.module.css";
import SingleAppointment from "./SingleAppointment";
export default function AppointmentList() {
    const {user} = useAuthContext();
    const {data, loading, error} = useAppointmentList(user);
    console.log("AppointmentList Data  from hook: ", data);
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
                    <SingleAppointment className="single-upappoint-card" />
                    <SingleAppointment className="single-upappoint-card" />
                </div>
            </section>

            <section className={classes["doc-previous-apoint-chk-part"]}>
                <div className={classes["doc-previous-apoint-check-heading"]}>
                    <h2>Previous Appointments</h2>
                </div>

                <div className={classes["doc-previous-appoint-check-cards"]}>
                    <SingleAppointment className="single-prevappoint-card" />
                    <SingleAppointment className="single-prevappoint-card" />
                    <SingleAppointment className="single-prevappoint-card" />
                </div>
            </section>
        </>
    );
}
