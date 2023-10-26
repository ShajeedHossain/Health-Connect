import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHospitalList } from "../../hooks/useHospitalList";
import classes from "../../styles/BookAHospitalSeat.module.css";
import { useEffect, useState } from "react";

export default function BookAHospitalSeat() {
    const { user } = useAuthContext();
    const { data, loading, error } = useHospitalList(user);
    const hospitalList = data.hospitalList;
    console.log("HOSPITAL DATA : ", hospitalList);

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
    return (
        <section className={classes["BookHospitalSeat"]}>
            <section className={classes["HospitalBookSeatPart"]}>
                <div className={classes["HospitalBookSeatPartHeading"]}>
                    <h2>Available Hospitals</h2>
                </div>

                <div className={classes["BookHospitalCards"]}>
                    {hospitalList &&
                        !loading &&
                        hospitalList.map((hospital) => (
                            <div
                                className={classes["BookHospitalCard"]}
                                key={hospital._id}
                            >
                                <div
                                    className={
                                        classes["BookHospitalCard1strow"]
                                    }
                                >
                                    <p>
                                        <b>Hospital name:</b>{" "}
                                        {hospital.hospitalName}
                                    </p>
                                    <p>
                                        <b>Email:</b> {hospital.email}
                                    </p>
                                    <p
                                        style={{
                                            display: "flex",
                                        }}
                                    >
                                        <b>Address:</b>&nbsp;
                                        {hospital.address.town}, &nbsp;
                                        {hospital.address.district}
                                        <Link
                                            style={{
                                                color: "green",
                                                verticalAlign: "baseline",
                                                display: "flex",
                                            }}
                                            to={`https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${hospital.address.latitude},${hospital.address.longitude}`}
                                            target="_blank"
                                        >
                                            <span
                                                style={{
                                                    color: "green",
                                                    verticalAlign: "baseline",
                                                }}
                                                className="material-symbols-outlined"
                                            >
                                                person_pin_circle
                                            </span>{" "}
                                            <span>Map</span>
                                        </Link>
                                    </p>
                                </div>
                                <div
                                    className={
                                        classes["BookHospitalCard2ndrow"]
                                    }
                                >
                                    <p>
                                        <b>Available Beds</b>{" "}
                                        {hospital.availableBeds}
                                    </p>
                                    <p>
                                        <b>Available Cabins:</b>{" "}
                                        {hospital.availableCabins}
                                    </p>
                                    <Link
                                        state={{
                                            hospitalId: hospital._id,
                                            hospital,
                                        }}
                                        to="/dashboard/hospitalBooking/bookseat/complete-reservation"
                                        className={classes["BookHospitalBtn"]}
                                    >
                                        Book Seat
                                    </Link>
                                </div>
                            </div>
                        ))}

                    {loading && <p>Loading...</p>}
                </div>
            </section>
        </section>
    );
}
