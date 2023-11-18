import { useEffect, useState } from "react";
import { useDoctorAllAppointment } from "../../../hooks/Doctor/useDoctorAllAppointment";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/DoctorViewAllAppointment.module.css";
import DoctorSingleAppointment from "../DoctorSingleApppointment";
import { formatDateAndTime } from "../../../Utility/formateTime";
export default function DoctorViewAllAppointment() {
    const { user, newUser } = useAuthContext();

    console.log("NEW USERSSS", newUser);
    const {
        doctorAllAppointment,
        doctorAllAppointmentLoading,
        doctorAllAppointmentError,
    } = useDoctorAllAppointment(user);

    console.log("All Appointments : ", doctorAllAppointment);
    const [filteredAppointment, setFilteredAppointment] = useState();
    const [filterDate, setFilterDate] = useState(
        formatDateAndTime(new Date()).date
    );

    const [upcomingData, setUpcomingData] = useState();
    const [previousData, setPreviousData] = useState();

    // Filter Based on date
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

    // Filter Upcoming
    useEffect(() => {
        console.log("UPCOMING FILTER WORKING...");
        const tempAppointment = filteredAppointment?.filter(
            (singleAppointment) => {
                console.log(
                    formatDateAndTime(singleAppointment?.startTime).date,
                    " === ",
                    formatDateAndTime(new Date()).date,
                    "---",
                    formatDateAndTime(singleAppointment?.startTime).date >=
                        formatDateAndTime(new Date()).date
                );
                return (
                    formatDateAndTime(singleAppointment?.startTime).date >=
                        formatDateAndTime(new Date()).date &&
                    singleAppointment?.isTaken === false
                );
            }
        );
        setUpcomingData(tempAppointment);

        // console.log("Filtered Appointment", tempAppointment);
    }, [filteredAppointment]);

    // Previous Data
    useEffect(() => {
        console.log("PREVIOUS FILTER WORKING...");
        const tempAppointment = filteredAppointment?.filter(
            (singleAppointment) => {
                console.log(
                    formatDateAndTime(singleAppointment?.startTime).date,
                    " === ",
                    formatDateAndTime(new Date()).date,
                    "---",
                    formatDateAndTime(singleAppointment?.startTime).date >=
                        formatDateAndTime(new Date()).date
                );
                return (
                    formatDateAndTime(singleAppointment?.startTime).date <
                        formatDateAndTime(new Date()).date ||
                    singleAppointment?.isTaken === true
                );
            }
        );
        setPreviousData(tempAppointment);

        // console.log("Filtered Appointment", tempAppointment);
    }, [filteredAppointment]);

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
                        <h2>Upcoming Appointments</h2>
                    </div>
                </div>

                {/* Upcoming Appointment Part  */}
                <div className={classes["appointment-cards"]}>
                    {!doctorAllAppointmentLoading &&
                        !doctorAllAppointmentError &&
                        upcomingData?.map((singleAppointment) => (
                            <DoctorSingleAppointment
                                newUser={newUser}
                                key={singleAppointment["_id"]}
                                className="single-upappoint-card"
                                appointmentDetails={singleAppointment}
                                allAppointment={doctorAllAppointment}
                            />
                        ))}
                </div>
            </section>
            <section className={classes["view-allAppointments"]}>
                <div className={classes["doc-upcoming-apoint-check-header"]}>
                    <div className={classes["all-appointment-heading"]}>
                        <h2>Previous Appointments</h2>
                    </div>
                </div>

                {/* Upcoming Appointment Part  */}
                <div className={classes["appointment-cards"]}>
                    {!doctorAllAppointmentLoading &&
                        !doctorAllAppointmentError &&
                        previousData?.map((singleAppointment) => (
                            <DoctorSingleAppointment
                                newUser={newUser}
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
