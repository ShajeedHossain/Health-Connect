import classes from "../../../styles/DoctorViewAllAppointment.module.css";
import DoctorSingleAppointment from "../DoctorSingleApppointment";
export default function DoctorViewAllAppointment() {
    return (
        <>
            <section className={classes["view-allAppointments"]}>
                <div className={classes["doc-upcoming-apoint-check-header"]}>
                    <div className={classes["all-appointment-heading"]}>
                        <h2>All Appointments</h2>
                    </div>
                </div>

                {/* Upcoming Appointment Part  */}
                <div className={classes["appointment-cards"]}>
                    <DoctorSingleAppointment className="single-upappoint-card" />
                </div>
                {/* <div className={classes["appointment-cards"]}>
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
                </div> */}
            </section>
        </>
    );
}
