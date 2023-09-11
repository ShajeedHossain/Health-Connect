import { Link } from "react-router-dom";
import classes from "../../../styles/HospitalBooking.module.css";
export default function HospitalBooking() {
    return (
        <>
            <section
                className={classes["current-hospital-admission-check-part"]}
            >
                <div className={classes["hospital-admission-check-header"]}>
                    <div
                        className={classes["hospital-admission-check-heading"]}
                    >
                        <h2>Current Hospital Admission</h2>
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
                    <div className={classes["single-admissionchk-card1"]}>
                        <div
                            className={
                                classes["single-admissionchk-card_1strow"]
                            }
                        >
                            <p>Hospital Name:Popular Hospital</p>
                            <p>Location:Dhanmondi,Dhaka</p>
                        </div>
                        <div
                            className={
                                classes["single-admissionchk-card_2ndrow"]
                            }
                        >
                            <p>Specialization:abc</p>
                            <p>Room number:03</p>
                            <p>Status:Not Done Yet</p>
                            <p>Date:08/09/2023</p>
                        </div>
                    </div>
                    <div className={classes["single-admissionchk-card2"]}>
                        <div
                            className={
                                classes["single-admissionchk-card_1strow"]
                            }
                        >
                            <p>Hospital Name:Popular Hospital</p>
                            <p>Location:Dhanmondi,Dhaka</p>
                        </div>
                        <div
                            className={
                                classes["single-admissionchk-card_2ndrow"]
                            }
                        >
                            <p>Specialization:abc</p>
                            <p>Room number:03</p>
                            <p>Status:Not Done Yet</p>
                            <p>Date:08/09/2023</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes["hospital-prev-book-chk-part"]}>
                <div className={classes["hospital-prev-book-chk-heading"]}>
                    <h2>Hospital Admission History</h2>
                </div>

                <div className={classes["hospital-prev-book-chk-cards"]}>
                    <div className={classes["single-prev-hospbook-card1"]}>
                        <div
                            className={
                                classes["single-prev-hospbook-card_1strow"]
                            }
                        >
                            <h3>Hospital Name:Popular Hospital</h3>
                            <h3>Location:Dhanmondi,Dhaka</h3>
                        </div>
                        <div
                            className={
                                classes["single-prev-hospbook-card_2ndrow"]
                            }
                        >
                            <h3>Specialization:abc</h3>
                            <h3>Room number:03</h3>
                            <h3>Date:08/09/2023</h3>
                            <h3>Status:Done</h3>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
