import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../Utility/formateTime";
import classes from "../../styles/SingleDoctor.module.css";

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

  console.log("EVENING: ", evening_shift_time);

  return (
    // .dashboard-card
    <div className={`${classes["single-bookappoint-card"]} dashboard-card`}>
      <table>
        <tr>
          <td>
            <b>Doctor name:</b>
          </td>
          <td>{fullName}</td>
        </tr>
        <tr>
          <td>
            <b>Specialization:</b>
          </td>
          <td>{specializations.map((sp) => sp).join(", ")}</td>
        </tr>
        <tr>
          <td>
            <b>Hospital:</b>
          </td>
          <td>{hospitalName}</td>
        </tr>
        <tr>
          <td>
            <b>Fees:</b>
          </td>
          <td>{appointment_fees}tk</td>
        </tr>
        <tr>
          <td>
            <b>Contact: </b>
          </td>
          <td>{contact}</td>
        </tr>
        <tr>
          <td>
            <b>Time: </b>
          </td>
          <td>
            {morning_shift_time && timeConverter(morning_shift_time).time},{" "}
            {evening_shift_time && timeConverter(evening_shift_time).time}
          </td>
        </tr>
        <tr>
          <td>
            <b>Available Days: </b>
          </td>
          <td> {available_days?.map((day) => day).join(", ")}</td>
        </tr>
        <tr>
          <td></td>
          <td>
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
          </td>
        </tr>
      </table>
    </div>
  );
}
