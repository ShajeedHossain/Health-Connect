import { useState } from "react";
import PatientApi from "../../apis/PatientApi";
import classes from "../../styles/SingleDoctor.module.css";
import { Link } from "react-router-dom";

export default function SingleDoctor({ doctorData, user }) {
    console.log("Single doctor ", doctorData);
    const {
        fullName,
        specializations,
        hospitalName,
        email,
        contact,
        hospitalId,
        _id,
    } = doctorData;

    const [startTime, setStartTime] = useState(new Date());

    return (
        <div className={classes["single-bookappoint-card"]}>
            <div className={classes["single-bookappoint-card_1strow"]}>
                <p>Doctor name: {fullName}</p>
                <p>
                    Specialization: {specializations.map((sp) => sp).join(", ")}
                </p>
            </div>
            <div className={classes["single-bookappoint-card_2ndrow"]}>
                <p>Hospital: {hospitalName}</p>
                <p>Email: {email}</p>
                <p>Contact: {contact}</p>
                <Link
                    state={{
                        hospitalId,
                        doctorId: _id,
                    }}
                    className={classes["appoint-book-btn"]}
                    to="/dashboard/takeAppointment/confirm-appointment"
                >
                    Book Appointment
                </Link>
            </div>
        </div>
    );
}
