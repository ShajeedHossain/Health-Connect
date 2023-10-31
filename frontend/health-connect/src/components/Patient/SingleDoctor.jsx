import { useState } from "react";
import PatientApi from "../../apis/PatientApi";
import classes from "../../styles/SingleDoctor.module.css";
import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../Utility/formateTime";

export default function SingleDoctor({ doctorData, user }) {
    console.log("Single doctor ", doctorData);
    const timeConverter = formatDateAndTime;
    const {
        fullName,
        specializations,
        hospitalName,
        email,
        contact,
        hospitalId,
        _id,
        appointment_fees,
        morning_shift_time,
        evening_shift_time,
        available_days,
    } = doctorData;

    const [startTime, setStartTime] = useState(new Date());

    console.log(
        "DATE TIME CONVERT ",
        evening_shift_time,
        timeConverter(evening_shift_time).time
    );
    return (
        <div className={classes["single-bookappoint-card"]}>
            <div className={classes["single-bookappoint-card_1strow"]}>
                <p>
                    <b>Doctor name:</b> {fullName}
                </p>
                <p>
                    <b>Specialization:</b>{" "}
                    {specializations.map((sp) => sp).join(", ")}
                </p>
                <p>
                    <b>Hospital:</b> {hospitalName}
                </p>
            </div>

            {/* [TODO] : CSS MUST BE CHANGED */}
            <div className={classes["single-bookappoint-card_2ndrow"]}>
                <p>
                    <b>Fees:</b> {appointment_fees}tk
                </p>
                <p>
                    <b>Contact: </b> {contact}
                </p>
                <p>
                    <b>Time: </b> {timeConverter(morning_shift_time).time},{" "}
                    {timeConverter(evening_shift_time).time}
                </p>
            </div>
            <div className={classes["single-bookappoint-card_2ndrow"]}>
                <p>
                    <b>Available Days: </b>{" "}
                    {available_days?.map((day) => day).join(", ")}
                </p>
                <Link
                    state={{
                        doctorData,
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
