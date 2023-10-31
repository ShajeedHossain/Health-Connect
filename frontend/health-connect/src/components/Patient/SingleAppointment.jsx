import { Link } from "react-router-dom";
import classes from "../../styles/SingleAppointment.module.css";
import { useEffect, useState } from "react";
import { formatDateAndTime } from "../../Utility/formateTime";

export default function SingleAppointment({ className, doctorDetails }) {
    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrentLatitude(position.coords.latitude);
            setCurrentLongitude(position.coords.longitude);
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }, []);

    console.log("SINGLE APPOINTMENT : Doctor details ", doctorDetails);
    const {
        serial,
        startTime,
        doctorName,
        specializations,
        address,
        hospitalName,
    } = doctorDetails;

    const { latitude, longitude, district, town } = address;
    console.log("LAT LNG : ", latitude, longitude);

    const { date, time } = formatDateAndTime(startTime);
    // console.log("Start Time:", startTime);
    // const date = new Date(startTime);
    // const day = date.getDate().toString().padStart(2, "0");
    // const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    // const year = date.getFullYear().toString();
    // console.log(`${day}-${month}-${year}`);
    // const dayTime = `${day}-${month}-${year}`;
    return (
        // [TODO] : CARD SYSTEM CSS
        <div className={classes[className]}>
            <div className={classes["single-appoint-card_1strow"]}>
                <p>
                    <b>Doctor name:</b> {doctorName}{" "}
                </p>
                <p>
                    <b>Address:</b>{" "}
                    <address>
                        {hospitalName}, {district}, {town}
                    </address>
                </p>
                <p>
                    <Link
                        style={{
                            color: "green",
                            verticalAlign: "center",
                            display: "flex",
                        }}
                        to={`https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${latitude},${longitude}`}
                        target="_blank"
                    >
                        <span className="material-symbols-outlined">
                            person_pin_circle
                        </span>{" "}
                        <span>Map</span>
                    </Link>
                </p>
            </div>
            <div className={classes["single-appoint-card_2ndrow"]}>
                {/* <p>Location: {`${address.town}, ${address.district}`}</p> */}
                <p>
                    <b>Serial:</b> {serial}
                </p>
                <p>
                    <b>Date:</b> {date}
                </p>
                <p>
                    <b>Time:</b> {time}
                </p>
            </div>
        </div>
    );
}
