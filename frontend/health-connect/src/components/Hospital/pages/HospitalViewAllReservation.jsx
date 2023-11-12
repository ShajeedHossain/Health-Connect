import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useDoctorList } from "../../../hooks/useDoctorList";
import classes from "../../../styles/TakeAppointment.module.css";
import SingleDoctorHospital from "../SingleDoctorHospital";
import HospitalApi from "../../../apis/HospitalApi";
import { useAllDoctorList } from "../../../hooks/Hospital/useAllDoctorList";
import HospitalSingleReservation from "../HospitalSingleReservation";
import { useAllReservation } from "../../../hooks/Hospital/useAllReservation";

export default function HospitalViewAllReservation() {
    const { user } = useAuthContext();
    console.log("user : ", user);

    const { reservationData, reservationLoading, reservationError } =
        useAllReservation(user);
    return (
        <section className={classes["take-appointment-part"]}>
            <section className={classes["doc-upcoming-apoint-chk-part"]}>
                <div className={classes["doc-upcoming-apoint-check-heading"]}>
                    <h2>All Reservation</h2>
                </div>

                <div className={classes["doctorList-cards"]}>
                    {!reservationError &&
                        !reservationLoading &&
                        reservationData?.map((reservation, index) => (
                            <HospitalSingleReservation
                                key={index}
                                reservation={reservation}
                            />
                        ))}

                    {/* {!doctorLoading &&
                        !doctorError &&
                        doctor.map((singleDoctor) => (
                            <SingleDoctorHospital
                                key={singleDoctor["_id"]}
                                user={user}
                                doctorData={singleDoctor}
                            />
                            // <SingleAppointment
                            //     key={singleAppointment["_id"]}
                            //     className="single-upappoint-card"
                            //     doctorDetails={singleAppointment}
                            //     loading={upcomingLoading}
                            // />
                        ))} */}
                </div>
            </section>
        </section>
    );
}
