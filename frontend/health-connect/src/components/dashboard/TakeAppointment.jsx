import classes from "../../styles/TakeAppointment.module.css";
import SingleDoctor from "./singleDoctor";
export default function TakeAppointment() {
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
