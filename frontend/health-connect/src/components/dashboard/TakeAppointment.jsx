import { useAuthContext } from "../../hooks/useAuthContext";
import { useTakeAppointment } from "../../hooks/useTakeAppointment";
import classes from "../../styles/TakeAppointment.module.css";
import SingleDoctor from "./singleDoctor";
export default function TakeAppointment() {
        const { user } = useAuthContext();
        const { data, loading, error } = useTakeAppointment(user);
        console.log("Take Appointment Data  from hook: ", data);
    return (
        <section className={classes["take-appointment-part"]}>
            <section className={classes["doc-upcoming-apoint-chk-part"]}>
                <div className={classes["doc-upcoming-apoint-check-heading"]}>
                    <h2>Available Doctor</h2>
                </div>

                <div className={classes["doc-upcoming-appoint-check-cards"]}>
                    <SingleDoctor />
                    <SingleDoctor />
                </div>
            </section>
        </section>
    );
}
