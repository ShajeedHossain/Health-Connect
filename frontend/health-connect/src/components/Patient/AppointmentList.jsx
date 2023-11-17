import { Link } from "react-router-dom";
import { useUpcomingAppointmentList } from "../../hooks/useUpcomingAppointmentList";
import { useAuthContext } from "../../hooks/useAuthContext";
import classes from "../../styles/AppointmentList.module.css";
import SingleAppointment from "./SingleAppointment";
import { usePreviousAppointment } from "../../hooks/usePreviousAppointment";
import HospitalApi from "../../apis/HospitalApi";
import { useEffect } from "react";
export default function AppointmentList() {
    const { user } = useAuthContext();

    // Upcoming Appointment Information
    const { upcomingData, upcomingLoading, upcomingError } =
        useUpcomingAppointmentList(user);
    const { appointments } = upcomingData;
    console.log("UPCOMING APPOINTMENT: ", appointments);

    // Previous Appointment Information
    // const { previousData, previousLoading, previousError } =
    //     usePreviousAppointment(user);
    // const { previousAppointment } = previousData;

    // console.log("PREVIOUS DATA: ", previousAppointment);

    // useEffect(() => {
    //     console.log("INSIDE USE EFFECT");
    //     const fetchHospitalDetails = async () => {
    //         try {
    //             const response = await HospitalApi.get("/get-hospital", {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${user.token}`,
    //                     hospitalId: "",
    //                 },
    //             });

    //             console.log("GET HOSPITAL HOOK", response.data);
    //             // setLoading(false);
    //             // setData(response.data); // Uncomment this line
    //         } catch (err) {
    //             console.log(err);
    //             // setLoading(false);
    //             // setError(true);
    //         }
    //     };

    //     fetchHospitalDetails();
    // }, []);

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
                        appointments.map((singleAppointment) => (
                            <SingleAppointment
                                user={user}
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

                {/* <div className={classes["appointment-cards"]}>
                    {!previousLoading &&
                        !previousError &&
                        appointments.map((singleAppointment) => (
                            <SingleAppointment
                                key={singleAppointment["_id"]}
                                className="single-upappoint-card"
                                doctorDetails={singleAppointment}
                                loading={previousLoading}
                                previousFlag={true}
                            />
                        ))}
                </div> */}
            </section>
        </>
    );
}
