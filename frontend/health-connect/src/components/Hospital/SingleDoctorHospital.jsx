import { useState } from "react";
import PatientApi from "../../apis/PatientApi";
import classes from "../../styles/SingleDoctor.module.css";
import { formatDateAndTime } from "../../Utility/formateTime";
import { Link } from "react-router-dom";

export default function SingleDoctorHospital({ doctorData, user }) {
    const timeConverter = formatDateAndTime;
    console.log("Single doctor ", doctorData);
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

    /* Single Doctor Data object example
    
            {
            "_id": "652a2406feec4bcd7ea2b361",
            "fullName": "Tanvir Hossain Dihan",
            "hospitalName": "Dhaka Medical College",
            "hospitalId": "652a2377feec4bcd7ea2b34e",
            "education": "Not Applicable",
            "email": "ultimone4271@gmail.com",
            "dob": "1992-01-15T00:00:00.000Z",
            "gender": "Male",
            "contact": "01999999999",
            "specializations": [
                "Cardiologist",
                "Medicine"
            ],
            "location": "Some address",
            "bma_id": "002",
            "age": 31,
            "__v": 0
        }
    */

    return (
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
                        {timeConverter(morning_shift_time).time},{" "}
                        {timeConverter(evening_shift_time).time}
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Available Days: </b>
                    </td>
                    <td> {available_days?.map((day) => day).join(", ")}</td>
                </tr>
                <tr></tr>
            </table>
        </div>
    );
}
