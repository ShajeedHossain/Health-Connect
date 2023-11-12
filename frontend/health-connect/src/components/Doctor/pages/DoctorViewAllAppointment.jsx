import { useEffect } from "react";
import { useDoctorAllAppointment } from "../../../hooks/Doctor/useDoctorAllAppointment";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/DoctorViewAllAppointment.module.css";
import DoctorSingleAppointment from "../DoctorSingleApppointment";
export default function DoctorViewAllAppointment() {
    const { user } = useAuthContext();
    const {
        doctorAllAppointment,
        doctorAllAppointmentLoading,
        doctorAllAppointmentError,
    } = useDoctorAllAppointment(user);

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
                    {!doctorAllAppointmentLoading &&
                        !doctorAllAppointmentError &&
                        doctorAllAppointment.map((singleAppointment) => (
                            <DoctorSingleAppointment
                                key={singleAppointment["_id"]}
                                className="single-upappoint-card"
                                appointmentDetails={singleAppointment}
                            />
                        ))}
                </div>
            </section>
        </>
    );
}
