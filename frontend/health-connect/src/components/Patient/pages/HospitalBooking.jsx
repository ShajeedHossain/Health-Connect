import { Link } from "react-router-dom";
import classes from "../../../styles/HospitalBooking.module.css";
import { useUpcomingReservation } from "../../../hooks/Patient/useUpcomingReservation";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { usePreviousReservation } from "../../../hooks/Patient/usePreviousReservation";

import { useEffect, useState } from "react";
import SingleReservation from "../SingleReservation";

export default function HospitalBooking() {
    const { user } = useAuthContext();
    console.log("user : ", user);
    const { upcomingData, upcomingLoading, upcomingError } =
        useUpcomingReservation(user);

    const { upcomingReservations } = upcomingData;

    const { previousData, previousLoading, previousError } =
        usePreviousReservation(user);
    const { previousReservations } = previousData;
    console.log("UPCOMING RESERVATION DATA, ", upcomingData);
    console.log("PREVIOUS RESERVATION DATA, ", previousData);
    return (
        <>
            <section
                className={classes["current-hospital-admission-check-part"]}
            >
                <div className={classes["hospital-admission-check-header"]}>
                    <div
                        className={classes["hospital-admission-check-heading"]}
                    >
                        <h2>Current Hospital Reservation</h2>
                    </div>
                    <div className={classes["book-hospital-seat-btn"]}>
                        <Link
                            // className={classes["book-seat-btn"]}
                            className={`btn`}
                            to="/dashboard/hospitalBooking/bookseat"
                        >
                            Book New Seat
                        </Link>
                    </div>
                </div>

                <div className={classes["hospital-admission-check-cards"]}>
                    {!upcomingLoading &&
                        !upcomingError &&
                        upcomingReservations.map((singleReservation) => (
                            <SingleReservation
                                key={singleReservation._id}
                                singleReservation={singleReservation}
                            />
                        ))}
                </div>
            </section>

            <section className={classes["hospital-prev-book-chk-part"]}>
                <div className={classes["hospital-prev-book-chk-heading"]}>
                    <h2>Hospital Admission History</h2>
                </div>

                <div className={classes["hospital-admission-check-cards"]}>
                    {!previousLoading &&
                        !previousError &&
                        previousReservations.map((singleReservation) => (
                            <SingleReservation
                                key={singleReservation._id}
                                singleReservation={singleReservation}
                            />
                        ))}
                </div>
            </section>
        </>
    );
}
