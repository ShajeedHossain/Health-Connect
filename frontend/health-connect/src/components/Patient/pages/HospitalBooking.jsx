import { Link } from "react-router-dom";
import classes from "../../../styles/HospitalBooking.module.css";
import { useUpcomingReservation } from "../../../hooks/Patient/useUpcomingReservation";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { usePreviousReservation } from "../../../hooks/Patient/usePreviousReservation";
import { formatDateAndTime } from "../../../Utility/formateTime";

export default function HospitalBooking() {
    const { user } = useAuthContext();
    console.log("user : ", user);
    const { upcomingData, upcomingLoading, upcomingError } =
        useUpcomingReservation(user);
    console.log("UPCOMING RESERVATION DATA, ", upcomingData);

    const { upcomingReservations } = upcomingData;

    const { previousData, previousLoading, previousError } =
        usePreviousReservation(user);
    const { previousReservations } = previousData;
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
                            className={classes["book-seat-btn"]}
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
                            <div
                                key={singleReservation._id}
                                className={classes["single-admissionchk-card1"]}
                            >
                                <div
                                    className={
                                        classes[
                                            "single-admissionchk-card_1strow"
                                        ]
                                    }
                                >
                                    <p>
                                        Hospital Name:{" "}
                                        {
                                            singleReservation.hospitalId
                                                .hospitalName
                                        }
                                    </p>
                                    <p>Location: Dhanmondi,Dhaka</p>
                                </div>
                                <div
                                    className={
                                        classes[
                                            "single-admissionchk-card_2ndrow"
                                        ]
                                    }
                                >
                                    <p style={{ textTransform: "capitalize" }}>
                                        Reservation Type:{" "}
                                        {singleReservation.reservationType}
                                    </p>
                                    <p>Room number:03</p>
                                    <p>Status:Not Done Yet</p>
                                    {/* Date Must Be processed */}
                                    <p>
                                        Date: &nbsp;
                                        {
                                            formatDateAndTime(
                                                singleReservation.reservationDate
                                            ).date
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            <section className={classes["hospital-prev-book-chk-part"]}>
                <div className={classes["hospital-prev-book-chk-heading"]}>
                    <h2>Hospital Admission History</h2>
                </div>
                {/* {
    "_id": "652bdad3f0f1c2211c8d28c6",
    "reservationType": "cabin",
    "hospitalId": {
        "_id": "652bd860f0f1c2211c8d2877",
        "hospitalName": "Dhaka Medical College"
    },
    "patientId": {
        "_id": "652bd708f0f1c2211c8d2870",
        "fullName": "Shajeed Hossain"
    },
    "reservationDate": "2024-12-11T18:00:00.000Z",
    "__v": 0
} */}

                <div className={classes["hospital-prev-book-chk-cards"]}>
                    {!previousLoading &&
                        !previousError &&
                        previousReservations.map((singleReservation) => (
                            <div
                                key={singleReservation._id}
                                className={
                                    classes["single-prev-hospbook-card1"]
                                }
                            >
                                <div
                                    className={
                                        classes[
                                            "single-prev-hospbook-card_1strow"
                                        ]
                                    }
                                >
                                    <p>
                                        Hospital Name:{" "}
                                        {
                                            singleReservation.hospitalId
                                                .hospitalName
                                        }
                                    </p>
                                    <p>Location: Dhanmondi,Dhaka</p>
                                </div>
                                <div
                                    className={
                                        classes[
                                            "single-prev-hospbook-card_2ndrow"
                                        ]
                                    }
                                >
                                    <p style={{ textTransform: "capitalize" }}>
                                        Reservation Type:{" "}
                                        {singleReservation.reservationType}
                                    </p>
                                    <p>Room number:03</p>
                                    <p>Status:Not Done Yet</p>
                                    {/* Date Must Be processed */}
                                    <p>
                                        Date: &nbsp;
                                        {
                                            formatDateAndTime(
                                                singleReservation.reservationDate
                                            ).date
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </>
    );
}
