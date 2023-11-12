import { useState } from "react";
import PatientApi from "../../apis/PatientApi";
import classes from "../../styles/SingleDoctor.module.css";
import { formatDateAndTime } from "../../Utility/formateTime";
import { Link } from "react-router-dom";

export default function HospitalSingleReservation({ doctorData, user }) {
    const timeConverter = formatDateAndTime;
    // console.log("Single doctor ", doctorData);
    // const {
    //     fullName,
    //     specializations,
    //     hospitalName,
    //     email,
    //     contact,
    //     hospitalId,
    //     _id,
    //     appointment_fees,
    //     morning_shift_time,
    //     evening_shift_time,
    //     available_days,
    // } = doctorData;

    return (
        <div className={`${classes["single-bookappoint-card"]} dashboard-card`}>
            <table>
                <tr>
                    <td>
                        <b>Doctor name:</b>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <b>Specialization:</b>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <b>Hospital:</b>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <b>Fees:</b>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <b>Contact: </b>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <b>Time: </b>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <b>Available Days: </b>
                    </td>
                    <td></td>
                </tr>
                <tr></tr>
            </table>
        </div>
    );
}
