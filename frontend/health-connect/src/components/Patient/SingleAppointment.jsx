import { Link } from "react-router-dom";
import classes from "../../styles/SingleAppointment.module.css";
import { useEffect, useState } from "react";
import { formatDateAndTime } from "../../Utility/formateTime";
import useGetCurrentLatLng from "../../hooks/useGetCurrentLatLng";

export default function SingleAppointment({ className, doctorDetails }) {
    // const [currentLatitude, setCurrentLatitude] = useState();
    // const [currentLongitude, setCurrentLongitude] = useState();

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         setCurrentLatitude(position.coords.latitude);
    //         setCurrentLongitude(position.coords.longitude);
    //         console.log("Latitude is :", position.coords.latitude);
    //         console.log("Longitude is :", position.coords.longitude);
    //     });
    // }, []);

    const { currentLatitude, currentLongitude } = useGetCurrentLatLng();

    const {
        serial,
        startTime,
        doctorName,
        specializations,
        address,
        hospitalName,
    } = doctorDetails;

    const { latitude, longitude, district, town } = address;

    const { date, time } = formatDateAndTime(startTime);

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
            </table>
        </div>
    );
}
