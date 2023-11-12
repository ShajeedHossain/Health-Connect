import { Link, useLocation } from "react-router-dom";
import classes from "../../../styles/DoctorPrescription.module.css";
import { useEffect, useState } from "react";
import { formatDateAndTime } from "../../../Utility/formateTime";

export default function DoctorPrescription() {
    const location = useLocation();
    const { patientData, allAppointment } = location.state;
    console.log("PATIENT DATA ", allAppointment);
    const { fullName, weight, height, bmi, age, _id } = patientData[0];

    const [specificProblem, setSpecificProblem] = useState([]);
    const [patientHistory, setPatientHistory] = useState();
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
                new Date(formatDateAndTime(appointment.startTime).date) -
                    new Date() && _id === appointment.patientId
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

    function handleComplete(e) {
        e.preventDefault();

        // Form Data Object
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);
    }
    return (
        <div className={`${classes["prescription"]}`}>
            <div
                className={`${classes["prescription-table"]} dashboard-card-full`}
            >
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
                        <td>{bmi}</td>
                    </tr>
                </table>

                <table className={`${classes["history-table"]}`}>
                    <tr>
                        <td colSpan={3} style={{ textAlign: "center" }}>
                            Previous History
                        </td>
                    </tr>
                    {patientHistory?.map((history, index) => (
                        <tr key={index}>
                            <td>Date :</td>
                            <td>
                                {formatDateAndTime(history.startTime).date}{" "}
                            </td>
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

                <div className={`${classes["prescription-data"]}`}>
                    <form onSubmit={handleComplete}>
                        <label htmlFor="">Problem Description</label>
                        <textarea
                            name="problem"
                            id=""
                            cols="30"
                            rows="10"
                        ></textarea>
                        <label htmlFor="">Medicine list</label>
                        <textarea
                            name="medicine"
                            id=""
                            cols="30"
                            rows="10"
                        ></textarea>
                        <label htmlFor="">Test List</label>
                        <textarea
                            name="test_list"
                            id=""
                            cols="30"
                            rows="10"
                        ></textarea>
                        <label htmlFor="">Next Appointment Date: </label>
                        <input type="date" name="next_appointment" id="" />

                        <button type="submit" className="btn">
                            Complete Appointment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
