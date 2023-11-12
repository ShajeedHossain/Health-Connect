import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomDatePicker from "../../../Utility/CustomDatePicker";
import {
  convertDateToTime,
  formatDateAndTime,
} from "../../../Utility/formateTime";
import PatientApi from "../../../apis/PatientApi";
import { useDoctorAllAppointment } from "../../../hooks/Doctor/useDoctorAllAppointment";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/SeatBooking.module.css";

export default function AppointmentConfirmation() {
  const { user } = useAuthContext();
  console.log("APPOINTMENT CONFIRMATION PAGE");

  const location = useLocation();
  const { hospitalId, doctorId, doctorData, shift } = location.state;
  const [selectedDate, setSelectedDate] = useState();

  const dayValueMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Satuday",
  };

  const [error, setError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const {
    doctorAllAppointment,
    doctorAllAppointmentLoading,
    doctorAllAppointmentError,
  } = useDoctorAllAppointment();

  console.log("Doctor's all appointment : ", doctorAllAppointment);
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

    console.log("Date Picker Output: ", selectedDate);

    const startTime =
      formatDateAndTime(selectedDate).date +
      "T" +
      convertDateToTime(formDataObject["timeSlot"]);
    console.log("start time : ", startTime);
    try {
      const response = await PatientApi.post(
        "/add-appointment",
        {
          doctorId,
          startTime,
          hospitalId,
          shift,
          doctor_name: doctorData.fullName,
          contact: doctorData.contact,
          appointment_fees: doctorData.appointment_fees,
          address: doctorData.address,
          hospital_name: doctorData.hospitalName,
          specializations: doctorData.specializations,
          patient_email: user.email,
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
          <div className={`${classes.doctorInfo} dashboard-card-full `}>
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
                  {doctorData.specializations?.map((sp) => sp).join(", ")}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Address: </b>
                </td>
                <td>
                  {doctorData.hospitalName}, {doctorData.address.town},{" "}
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
                  {doctorData.available_days?.map((day) => day).join(", ")}
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
          {/* <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        name="reservationDate"
                        min={new Date().toISOString().split("T")[0]} // Specify the minimum date if needed
                        // max="YYYY-MM-DD" // Specify the maximum date if needed
                        required
                    /> */}
          <div className={`${classes["custom-date-picker"]}`}>
            <label htmlFor="">Pick a Date</label>
            <CustomDatePicker
              allowedWeekdays={doctorData.available_days}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>

          {/* <p style={{ color: "red" }}>
                        {selectedDate && !isWeekday(new Date(selectedDate))
                            ? "Doctor not available on that day"
                            : ""}
                    </p> */}
          {/* TIME MUST BE AUTOMATED  */}
          <div className={`${classes["time-slot-picker"]}`}>
            <label htmlFor="">Pick a Timeslot</label>
            <select name="timeSlot" id="">
              <option value={doctorData.morning_shift_time}>
                {formatDateAndTime(doctorData.morning_shift_time).time}
              </option>
              <option value={doctorData.evening_shift_time}>
                {" "}
                {formatDateAndTime(doctorData.evening_shift_time).time}
              </option>
            </select>
          </div>

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
