import { useLocation } from "react-router-dom";
import PatientApi from "../../../apis/PatientApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/SeatBooking.module.css";
import { useState } from "react";

export default function AppointmentConfirmation() {
    const { user } = useAuthContext();
    console.log("APPOINTMENT CONFIRMATION PAGE");

    const location = useLocation();
    const { hospitalId, doctorId, doctorData } = location.state;
    console.log("HOSPITAL ID : ", hospitalId);
    console.log("Doctor Data : ", doctorData);

    const [error, setError] = useState(false);
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
            formDataObject["reservationTime"];
        try {
            const response = await PatientApi.post(
                "/add-appointment",
                {
                    doctorId,
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
        } catch (err) {
            // error
            setError(err.response.data.error);
            console.log("HANDLE APPOINTMENT FUNCTION RESPONSE: ERROR", err);
        }
    }

    //     {
    //     "_id": "652bd9e2f0f1c2211c8d289b",
    //     "fullName": "Tanvir Hossain Dihan",
    //     "hospitalName": "AMZ Hospital Ltd.",
    //     "hospitalId": "652bd8b2f0f1c2211c8d287e",
    //     "education": "Phd",
    //     "email": "ultimone4271@gmail.com",
    //     "dob": "1998-02-09T00:00:00.000Z",
    //     "gender": "Male",
    //     "contact": "01911111111",
    //     "specializations": [
    //         "Osteologist"
    //     ],
    //     "address": {
    //         "district": "Dhaka",
    //         "town": "Badda",
    //         "latitude": "23.78432",
    //         "longitude": "90.42605"
    //     },
    //     "bma_id": "001",
    //     "age": 25,
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
                        {/* // {doctorData.fullName} */}
                    </p>

                    <p>
                        <b>Availabe Days: </b>Must be an array
                        {/* // {doctorData.fullName} */}
                    </p>
                </div>
            )}

            <form
                action=""
                className={classes["seat-booking-form"]}
                onSubmit={handleAppointment}
            >
                <input type="date" name="reservationDate" id="" />
                {/* TIME MUST BE AUTOMATED  */}
                <select name="timeSlot" id="">
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
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
                <input type="submit" value="Confirm Reservation" />
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
