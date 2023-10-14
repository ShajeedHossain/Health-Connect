import { useState } from "react";
import PatientApi from "../../apis/PatientApi";
import classes from "../../styles/SingleDoctor.module.css";

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

    const [startTime, setStartTime] = useState(new Date());
    async function handleAppointment() {
        try {
            /** PROBLEM IN API: (
                SingleDoctor.jsx:40 
                POST http://localhost:5000/api/patient/add-appointment 401 (Unauthorized)) 
            */
            const response = await PatientApi.post(
                "/add-appointment",
                {
                    doctorId: _id,
                    startTime,
                    hospitalId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("HANDLE APPOINTMENT FUNCTION RESPONSE :", response);
        } catch {
            // error
            console.log("HANDLE APPOINTMENT FUNCTION RESPONSE: ERROR");
        }
    }
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
                <button
                    className={classes["appoint-book-btn"]}
                    onClick={handleAppointment}
                >
                    Book Appointment
                </button>
            </div>
        </div>
    );
}
