import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatDateAndTime } from "../../../Utility/formateTime";
import DoctorApi from "../../../apis/DoctorApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/DoctorPrescription.module.css";

export default function DoctorPrescription() {
  const { user } = useAuthContext();
  const location = useLocation();
  const { patientData, allAppointment, appointmentDetails } = location.state;
  console.log("PATIENT DATA ", allAppointment);
  console.log("PATIENT INFO: ", patientData[0]);
  const { fullName, weight, height, bmi, age, _id } = patientData[0];

  const [specificProblem, setSpecificProblem] = useState([]);
  const [patientHistory, setPatientHistory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // const tempData = allAppointment?.filter(
    //     (appointment) =>
    //         new Date() - new Date(formatDateAndTime(appointment.startTime).date)
    // );
    const tempData = allAppointment?.filter((appointment) => {
      console.log(
        _id,
        " === ",
        appointment.patientId,
        "--",
        _id === appointment.patientId
      );
      return (
        new Date(formatDateAndTime(appointment.startTime).date) < new Date() &&
        _id === appointment.patientId
      );
    });
    console.log("TEMP DATA,", tempData);
    setPatientHistory(tempData);
  }, []);
  //     {
  //     "_id": "6543e3b6032a009ecb80eb89",
  //     "fullName": "Shajeed Hossain",
  //     "email": "shakun650@gmail.com",
  //     "weight": null,
  //     "height": null,
  //     "address": {
  //         "district": "Dhaka District",
  //         "town": "Badda",
  //         "latitude": 23.7767362,
  //         "longitude": 90.4228836
  //     },
  //     "bmi": null,
  //     "age": null,
  //     "__v": 0
  // }
  //     {
  //     "_id": "65506420fd0c96f832f84256",
  //     "doctorId": "653a7c4d153cf2c3f9867b80",
  //     "patientId": "6543e3b6032a009ecb80eb89",
  //     "serial": 1,
  //     "startTime": "2023-11-17T03:00:00.000Z",
  //     "hospitalId": "653abe4770cbee356712c3a9",
  //     "isTaken": false,
  //     "__v": 0
  // }

  useEffect(() => {
    toast.onChange((payload) => {
      if (payload.status === "removed") {
        navigate("/doctor-dashboard");
      }
    });
  }, [navigate]);

  async function handleComplete(e) {
    e.preventDefault();

    // Form Data Object
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);

    formDataObject["specific_disease"] = specificProblem
      ?.map((problem) => problem)
      .join(",");

    console.log("Form Data Example : ", formDataObject);
    console.log("appointmentID", appointmentDetails._id);
    try {
      const response = await DoctorApi.put(
        "/appointment-done",
        {
          appointment_id: appointmentDetails._id,
          prescription: formDataObject,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(
        "Appointment Completed successfully !! Navigating to previous page...",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1200, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
        }
      );

      console.log("PRESCRIPTION UPDATE RESPONSE, ", response);
    } catch (err) {
      console.log("PRESCRIPTION UPDATE ERROR", err);
    }
  }

  function handleSpecificProblem(e) {
    const tempData = [...specificProblem];
    console.log("Target Data: ", e.target.value);
    if (tempData.includes(e.target.value)) {
      const index = tempData.indexOf(e.target.value);
      console.log("index of ", e.target.value, index);
      tempData.splice(index, 1);
    } else tempData.push(e.target.value);
    console.log(tempData);
    setSpecificProblem(tempData);
  }

  return (
    <>
      <div className={`${classes["prescription"]}`}>
        <div className={`${classes["prescription-table"]} dashboard-card-full`}>
          <table>
            <tr>
              <td>Patient Name: </td>
              <td>{fullName}</td>
            </tr>
            <tr>
              <td>Age: </td>
              <td>{age}</td>
            </tr>
            <tr>
              <td>Height: </td>
              <td>{height}</td>
            </tr>
            <tr>
              <td>Weight: </td>
              <td>{weight}</td>
            </tr>
            <tr>
              <td>BMI: </td>
              <td>{bmi?.toFixed(2)}</td>
            </tr>
          </table>

          {patientHistory.length > 0 && (
            <table className={`${classes["history-table"]}`}>
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  Previous History
                </td>
              </tr>
              {patientHistory?.map((history, index) => (
                <tr key={index}>
                  <td>Date :</td>
                  <td>{formatDateAndTime(history.startTime).date} </td>
                  <td>
                    <Link
                      state={{
                        patientData,
                        allAppointment,
                        appointmentDetails: history,
                      }}
                      className={"appoint-book-btn"}
                      to="/doctor-dashboard/previous-history"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </table>
          )}

          <div className={`${classes["prescription-data"]}`}>
            <form onSubmit={handleComplete}>
              <div className={`${classes["specific-problem"]}`}>
                <label htmlFor="">
                  <b>Specific Problem</b>
                </label>
                <div>
                  <label htmlFor="diabetes">
                    <input
                      type="checkbox"
                      name="diabetes"
                      id="diabetes"
                      value={"Diabetes"}
                      onChange={handleSpecificProblem}
                    />{" "}
                    Diabetes
                  </label>
                </div>
                <div>
                  <label htmlFor="allergy">
                    <input
                      type="checkbox"
                      name="allergy"
                      id="allergy"
                      value={`Allergies`}
                      onChange={handleSpecificProblem}
                    />{" "}
                    Allergies
                  </label>
                </div>
              </div>
              <label htmlFor="">
                <b>Problem Description</b>
              </label>
              <textarea name="problem" id="" cols="30" rows="10"></textarea>
              <label htmlFor="">
                <b>Medicine list</b>
              </label>
              <textarea name="medicine" id="" cols="30" rows="10"></textarea>
              <label htmlFor="">
                <b>Test List</b>
              </label>
              <textarea name="test_list" id="" cols="30" rows="10"></textarea>
              <label htmlFor="">
                <b>Next Appointment Date:</b>{" "}
              </label>
              <input type="date" name="next_appointment" id="" />

              <button type="submit" className="btn">
                Complete Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
