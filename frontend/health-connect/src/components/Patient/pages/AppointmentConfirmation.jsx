import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    convertDateToTime,
    formatDateAndTime,
} from "../../../Utility/formateTime";
import PatientApi from "../../../apis/PatientApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/SeatBooking.module.css";
import CustomDatePicker from "../../../Utility/CustomDatePicker";

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
    useEffect(() => {
        toast.onChange((payload) => {
            if (payload.status === "removed") {
                navigate("/dashboard/appointment");
            }
        });
    }, [navigate]);
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
            toast.success(
                "Appointment taken successfully !! Navigating to previous page...",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1200, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
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
        <>
            <div>
                {doctorData && (
                    <div
                        className={`${classes.doctorInfo} dashboard-card-full `}
                    >
                        <table>
                            <tr>
                                <td>
                                    <b>Doctor Name: </b>
                                </td>{" "}
                                <td>{doctorData.fullName}</td>
                            </tr>

                            <tr>
                                <td>
                                    <b>Specialization: </b>
                                </td>
                                <td>
                                    {doctorData.specializations
                                        ?.map((sp) => sp)
                                        .join(", ")}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Address: </b>
                                </td>
                                <td>
                                    {doctorData.hospitalName},{" "}
                                    {doctorData.address.town},{" "}
                                    {doctorData.address.district}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Appointment Fee: </b>
                                </td>
                                <td>{doctorData.appointment_fees}tk</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Availabe Days:</b>
                                </td>
                                <td>
                                    {doctorData.available_days
                                        ?.map((day) => day)
                                        .join(", ")}
                                </td>
                            </tr>
                        </table>
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
                    <CustomDatePicker
                        allowedWeekdays={doctorData.available_days}
                    />
                    <p style={{ color: "red" }}>
                        {selectedDate && !isWeekday(new Date(selectedDate))
                            ? "Doctor not available on that day"
                            : ""}
                    </p>
                    {/* TIME MUST BE AUTOMATED  */}
                    <select name="timeSlot" id="">
                        <option value={doctorData.morning_shift_time}>
                            {
                                formatDateAndTime(doctorData.morning_shift_time)
                                    .time
                            }
                        </option>
                        <option value={doctorData.evening_shift_time}>
                            {" "}
                            {
                                formatDateAndTime(doctorData.evening_shift_time)
                                    .time
                            }
                        </option>
                    </select>
                    <input
                        disabled={dateError}
                        type="submit"
                        value="Confirm Reservation"
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
            <ToastContainer position="top-right" />
        </>
    );
}
