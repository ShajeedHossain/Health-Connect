import { useLocation } from "react-router-dom";
import PatientApi from "../../../apis/PatientApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/SeatBooking.module.css";
import { useState } from "react";

export default function AppointmentConfirmation() {
    const { user } = useAuthContext();
    console.log("APPOINTMENT CONFIRMATION PAGE");

    const location = useLocation();
    const { hospitalId, doctorId } = location.state;
    console.log("HOSPITAL ID : ", hospitalId);

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
    return (
        <div>
            <form
                action=""
                className={classes["seat-booking-form"]}
                onSubmit={handleAppointment}
            >
                <input type="date" name="reservationDate" id="" />

                {/* TIME MUST BE AUTOMATED  */}
                <input type="time" name="reservationTime" id="" />
                <input type="submit" value="Confirm Reservation" />

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
