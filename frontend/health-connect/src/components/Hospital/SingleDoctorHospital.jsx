import { useState } from "react";
import PatientApi from "../../apis/PatientApi";
import classes from "../../styles/SingleDoctor.module.css";

export default function SingleDoctorHospital({ doctorData, user }) {
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
        <div className={classes["single-bookappoint-card"]}>
            <div className={classes["single-bookappoint-card_1strow"]}>
                <p>
                    <b>Doctor name:</b> {fullName}
                </p>
                <p>
                    <b>Specialization:</b>{" "}
                    {specializations.map((sp) => sp).join(", ")}
                </p>
            </div>
            <div className={classes["single-bookappoint-card_2ndrow"]}>
                <p>
                    <b>Hospital:</b> {hospitalName}
                </p>
                <p>
                    <b>Email:</b> {email}
                </p>
                <p>
                    <b>Contact: </b>
                    {contact}
                </p>
            </div>
        </div>
    );
}
