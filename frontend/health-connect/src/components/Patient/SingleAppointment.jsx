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
    const { serial, startTime, doctorName, specializations, address } =
        doctorDetails;

    const { latitude, longitude } = address;
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
        <div className={classes[className]}>
            <div className={classes["single-appoint-card_1strow"]}>
                <p>Doctor name: {doctorName} </p>
                <p>
                    Specialization: {specializations.map((sp) => sp).join(", ")}
                </p>
            </div>
            <div className={classes["single-appoint-card_2ndrow"]}>
                {/* <p>Location: {`${address.town}, ${address.district}`}</p> */}
                <p>Serial: {serial}</p>
                <p>
                    Date: {date}, {time}
                </p>
                <p>
                    <Link
                        to={`https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${latitude},${longitude}`}
                        target="_blank"
                    >
                        View Map
                    </Link>
                </p>
            </div>
        </div>
    );
}
