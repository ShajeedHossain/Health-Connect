import { Link } from "react-router-dom";
import classes from "../../styles/SingleAppointment.module.css";
import { useEffect, useState } from "react";
import { formatDateAndTime } from "../../Utility/formateTime";
import useGetCurrentLatLng from "../../hooks/useGetCurrentLatLng";
import { useHospitalProfileInfo } from "../../hooks/Hospital/useHospitalProfileInfo";
import { useAuthContext } from "../../hooks/useAuthContext";
import HospitalApi from "../../apis/HospitalApi";

export default function SingleAppointment({
    className,
    doctorDetails,
    previousFlag,
    user,
}) {
    const { currentLatitude, currentLongitude } = useGetCurrentLatLng();
    const {
        serial,
        startTime,
        doctorName,
        specializations,
        address,
        hospitalName,
        isTaken,
        hospitalId,
    } = doctorDetails;

    console.log("FROM SINGLE APPOINTMENT PAGE: ", hospitalId);

    // console.log("HOSPITAL DATA SINGLE APPOINTMENT PAGE: ", data);

    const { latitude, longitude, district, town } = hospitalId.address;

    const { date, time } = formatDateAndTime(startTime);

    const { data, loading, error } = useHospitalProfileInfo(hospitalId);
    console.log("HOSPITAL DATA SINGLE APPOINTMENT PAGE: ", data);
    // useEffect(() => {
    //     const fetchHospitalDetails = async () => {
    //         console.log("SINGLE APPOINTMENT COMPONENT FUNCTION ENTER...");
    //         try {
    //             // setLoading(true);

    //             const response = await HospitalApi.get("/get-hospital", {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${user.token}`,
    //                 },
    //             });

    //             console.log("GET HOSPITAL HOOK", response.data);
    //             // setLoading(false);
    //             // setData(response.data); // Uncomment this line
    //         } catch (err) {
    //             console.log(err);
    //             // setLoading(false);
    //             // setError(true);
    //         }
    //     };

    //     fetchHospitalDetails();
    // });

    return (
        <div className={`dashboard-card ${classes.className}`}>
            <table>
                <tr>
                    <td>
                        <b>Doctor name: </b>
                    </td>
                    <td>{doctorName}</td>
                </tr>

                <tr>
                    <td>
                        <b>Address:</b>
                    </td>
                    <td>
                        {" "}
                        {hospitalName}, {town}, {district}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <Link
                            style={{
                                color: "green",
                            }}
                            to={`https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${latitude},${longitude}`}
                            target="_blank"
                        >
                            <span
                                style={{
                                    verticalAlign: "middle",
                                }}
                                className="material-symbols-outlined"
                            >
                                person_pin_circle
                            </span>
                            <span
                                style={{
                                    verticalAlign: "middle",
                                }}
                            >
                                Map
                            </span>
                        </Link>
                    </td>
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
                    <td>{date}</td>
                </tr>
                <tr>
                    <td>
                        <b>Time:</b>
                    </td>
                    <td> {time}</td>
                </tr>

                {isTaken && (
                    <tr>
                        <td></td>
                        <td>
                            <Link
                                state={{
                                    appointmentDetails: doctorDetails,
                                }}
                                className={"appoint-book-btn"}
                                to="/doctor-dashboard/previous-history"
                            >
                                View Details
                            </Link>
                        </td>
                    </tr>
                )}
            </table>
        </div>
    );
}
