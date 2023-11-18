import { useEffect, useState } from "react";
import { usePatientProfileInfo } from "../../hooks/Patient/usePatientProfileInfo";
import { useAuthContext } from "../../hooks/useAuthContext";
import PatientApi from "../../apis/PatientApi";
import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../Utility/formateTime";

export default function DoctorSingleAppointment({
    appointmentDetails,
    allAppointment,
    newUser,
}) {
    const { user } = useAuthContext();
    console.log("SINGLE NEW USER", newUser);
    console.log("Doctor Single Appointment", appointmentDetails);

    const { patientId, serial, startTime } = appointmentDetails;

    const { patientData, patientLoading, patientError } = usePatientProfileInfo(
        patientId,
        user,
        ""
    );

    console.log("PATIENT DATEAAA.", patientData);

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
    return (
        <div className={`dashboard-card `}>
            <table>
                <tr>
                    <td>
                        <b>Patient name: </b>
                    </td>
                    <td>{patientData[0]?.fullName}</td>
                </tr>

                <tr>
                    <td>
                        <b>Serial:</b>
                    </td>
                    <td>{serial}</td>
                </tr>
                <tr>
                    <td>
                        <b>Date:</b>
                    </td>
                    <td>{formatDateAndTime(startTime).date}</td>
                </tr>
                <tr>
                    <td>
                        <b>Time:</b>
                    </td>
                    <td>{formatDateAndTime(startTime).time}</td>
                </tr>
                <tr>
                    <td></td>
                    <td style={{ textAlign: "right" }}>
                        <Link
                            state={{
                                patientData,
                                appointmentDetails,
                                userDetails: newUser,
                            }}
                            className={"appoint-book-btn"}
                            to="/doctor-dashboard/chat-box"
                        >
                            Message
                        </Link>
                        {appointmentDetails.isTaken === false ? (
                            <Link
                                state={{
                                    patientData,
                                    allAppointment,
                                    appointmentDetails,
                                }}
                                className={"appoint-book-btn"}
                                to="/doctor-dashboard/prescription"
                            >
                                View Details
                            </Link>
                        ) : (
                            <Link
                                state={{
                                    patientData,
                                    allAppointment,
                                    appointmentDetails,
                                }}
                                className={"appoint-book-btn"}
                                to="/doctor-dashboard/previous-history"
                            >
                                View Details
                            </Link>
                        )}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    );
}
