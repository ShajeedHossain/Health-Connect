import { useEffect, useState } from "react";
import { useDoctorAllAppointment } from "../../../hooks/Doctor/useDoctorAllAppointment";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/DoctorViewAllAppointment.module.css";
import DoctorSingleAppointment from "../DoctorSingleApppointment";
import { formatDateAndTime } from "../../../Utility/formateTime";
export default function DoctorViewAllAppointment() {
    const { user } = useAuthContext();
    const {
        doctorAllAppointment,
        doctorAllAppointmentLoading,
        doctorAllAppointmentError,
    } = useDoctorAllAppointment(user);

    const [filteredAppointment, setFilteredAppointment] = useState();
    const [filterDate, setFilterDate] = useState(
        formatDateAndTime(new Date()).date
    );

    useEffect(() => {
        console.log("Filter Date,", filterDate);
        if (filterDate) {
            const tempAppointment = doctorAllAppointment?.filter(
                (singleAppointment) => {
                    console.log(
                        filterDate,
                        " === ",
                        formatDateAndTime(singleAppointment?.startTime).date
                    );
                    return (
                        filterDate ===
                        formatDateAndTime(singleAppointment?.startTime).date
                    );
                }
            );
            setFilteredAppointment(tempAppointment);
        } else {
            setFilteredAppointment(doctorAllAppointment);
        }

        // console.log("Filtered Appointment", tempAppointment);
    }, [doctorAllAppointment, filterDate]);

    console.log("TODAY : ", formatDateAndTime(new Date()).date);
    return (
        <>
            <section className={classes["view-allAppointments"]}>
                <div>
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => {
                            setFilterDate(e.target.value);
                        }}
                        name=""
                        id=""
                    />
                </div>
                <div className={classes["doc-upcoming-apoint-check-header"]}>
                    <div className={classes["all-appointment-heading"]}>
                        <h2>All Appointments</h2>
                    </div>
                </div>

                {/* Upcoming Appointment Part  */}
                <div className={classes["appointment-cards"]}>
                    {!doctorAllAppointmentLoading &&
                        !doctorAllAppointmentError &&
                        filteredAppointment?.map((singleAppointment) => (
                            <DoctorSingleAppointment
                                key={singleAppointment["_id"]}
                                className="single-upappoint-card"
                                appointmentDetails={singleAppointment}
                                allAppointment={doctorAllAppointment}
                            />
                        ))}
                </div>
            </section>
        </>
    );
}
