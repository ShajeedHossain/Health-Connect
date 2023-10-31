import { useLocation, useNavigate } from "react-router-dom";
import PatientApi from "../../../apis/PatientApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/SeatBooking.module.css";
import { useState } from "react";
import {
    formatDateAndTime,
    convertDateToTime,
} from "../../../Utility/formateTime";

export default function AppointmentConfirmation() {
    const { user } = useAuthContext();
    console.log("APPOINTMENT CONFIRMATION PAGE");

    const location = useLocation();
    const { hospitalId, doctorId, doctorData, shift } = location.state;
    const [selectedDate, setSelectedDate] = useState();
    console.log("HOSPITAL ID : ", hospitalId);
    console.log("Doctor Data : ", doctorData);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        if (isWeekday(new Date(e.target.value))) setDateError(false);
    };

    const dayValueMap = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Satuday",
    };
    function isWeekday(date) {
        const day = date.getDay();
        return doctorData.available_days.includes(dayValueMap[day]); // Return true for all days except Sunday (0) and Monday (1)
    }

    const [error, setError] = useState(false);
    const [dateError, setDateError] = useState(true);
    const navigate = useNavigate();
    async function handleAppointment(e) {
        e.preventDefault();
        setError(false);
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);

        //         {
        //     "reservationDate": "2023-10-10",
        //     "reservationTime": "23:38",
        //     "hospitalId": "652bd901f0f1c2211c8d2885",
        //     "doctorId": "652bda4af0f1c2211c8d28b2"
        // }

        const startTime =
            formDataObject["reservationDate"] +
            "T" +
            convertDateToTime(formDataObject["timeSlot"]);
        console.log(startTime);
        try {
            const response = await PatientApi.post(
                "/add-appointment",
                {
                    doctorId,
                    startTime,
                    hospitalId,
                    shift,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            navigate("/dashboard/appointment");
            console.log("HANDLE APPOINTMENT FUNCTION RESPONSE :", response);
        } catch (err) {
            // error
            setError(err.response.data.error);
            console.log("HANDLE APPOINTMENT FUNCTION RESPONSE: ERROR", err);
        }
    }

    // {
    //     "_id": "653a7c4d153cf2c3f9867b80",
    //     "fullName": "Zannatul Samarukh Elma",
    //     "hospitalName": "Dhaka Medical College",
    //     "hospitalId": "653abe4770cbee356712c3a9",
    //     "education": "Not Applicable",
    //     "email": "ultimone4272@gmail.com",
    //     "dob": "1992-01-15T00:00:00.000Z",
    //     "gender": "Female",
    //     "contact": "01999999999",
    //     "specializations": [
    //         "Cardiologist",
    //         "Medicine"
    //     ],
    //     "address": {
    //         "district": "Dhaka",
    //         "town": "Shahbagh",
    //         "latitude": "23.71653",
    //         "longitude": "90.39578"
    //     },
    //     "bma_id": "002",
    //     "appointment_fees": "1800",
    //     "available_days": [
    //         "Sunday",
    //         "Tuesday",
    //         "Friday"
    //     ],
    //     "morning_shift_time": "2023-10-26T09:00:00.681Z",
    //     "evening_shift_time": "2023-10-26T19:00:00.682Z",
    //     "availability": true,
    //     "age": 31,
    //     "__v": 0
    // }

    return (
        <div>
            {doctorData && (
                <div className={classes.doctorInfo}>
                    <p>
                        <b>Doctor Name: </b>
                        {doctorData.fullName}
                    </p>
                    <p>
                        <b>Specialization: </b>
                        {doctorData.specializations?.map((sp) => sp).join(", ")}
                    </p>
                    <p>
                        <b>Address: </b>
                        <address>
                            {doctorData.hospitalName}, {doctorData.address.town}
                            , {doctorData.address.district}
                        </address>
                    </p>

                    <p>
                        <b>Appointment Fee: </b>
                        {doctorData.appointment_fees}tk
                    </p>

                    <p>
                        <b>Availabe Days:</b>{" "}
                        {doctorData.available_days
                            ?.map((day) => day)
                            .join(", ")}
                    </p>
                </div>
            )}

            <form
                action=""
                className={classes["seat-booking-form"]}
                onSubmit={handleAppointment}
            >
                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    name="reservationDate"
                    min={new Date().toISOString().split("T")[0]} // Specify the minimum date if needed
                    // max="YYYY-MM-DD" // Specify the maximum date if needed
                    required
                />
                <p style={{ color: "red" }}>
                    {selectedDate && !isWeekday(new Date(selectedDate))
                        ? "Doctor not available on that day"
                        : ""}
                </p>
                {/* TIME MUST BE AUTOMATED  */}
                <select name="timeSlot" id="">
                    <option value={doctorData.morning_shift_time}>
                        {formatDateAndTime(doctorData.morning_shift_time).time}
                    </option>
                    <option value={doctorData.evening_shift_time}>
                        {" "}
                        {formatDateAndTime(doctorData.evening_shift_time).time}
                    </option>
                </select>
                {/* <input
                    type="time"
                    name="reservationTime"
                    id=""
                    style={{
                        width: "300px",
                        marginTop: "10px",
                        padding: "10px 0",
                    }}
                /> */}
                TIME MUST BE AUTOMATED
                <input
                    disabled={dateError}
                    type="submit"
                    value="Confirm Reservation"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
