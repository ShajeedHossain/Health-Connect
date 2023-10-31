import { Link, useLocation, useNavigate } from "react-router-dom";
import PatientApi from "../../../apis/PatientApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/SeatBooking.module.css";
import useGetCurrentLatLng from "../../../hooks/useGetCurrentLatLng";
import { useState } from "react";

export default function SeatBooking() {
    const { currentLatitude, currentLongitude } = useGetCurrentLatLng();
    const { user } = useAuthContext();
    // Use Location to get state from Link
    const location = useLocation();
    const { hospitalId, hospital } = location.state;

    const [reservationType, setReservationType] = useState("");
    const [ambulance, setAmbulance] = useState(null);

    const navigate = useNavigate();
    const [error, setError] = useState(false);

    console.log("HOSPITAL ", hospital);
    async function handleConfirmation(e) {
        e.preventDefault();
        setError(false);
        console.log(ambulance);
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);

        formDataObject["hospitalId"] = hospitalId;
        formDataObject["additional_requirements"] = `${
            formDataObject["ambulance"] ? formDataObject["ambulance"] + "," : ""
        }${
            formDataObject["stretcher"] ? formDataObject["stretcher"] + "," : ""
        }${
            formDataObject["wheelchair"]
                ? formDataObject["wheelchair"] + ","
                : ""
        }${formDataObject["oxygen"] ? formDataObject["oxygen"] : ""}`;
        console.log("Form Data Example : ", formDataObject);

        //         {
        //     "reservationType": "cabins",
        //     "reservationCategory": "normal",
        //     "reservationDate": "2023-10-30",
        //     "wheelchair": "wheelchair",
        //     "oxygen": "oxygen",
        //     "ambulance": "ambulance",
        //     "ambulance_address": "Chattogram",
        //     "hospitalId": "653abb6034fe6e11f367ba18",
        //     "additional_requirements": "ambulance,wheelchair,oxygen"
        // }

        try {
            const response = await PatientApi.post(
                "/add-reservation",
                formDataObject,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("SEAT BOOKING API: RESPONSE ", response);
            navigate("/dashboard/hospitalBooking/");
        } catch (err) {
            setError(err.response.data.error);

            console.log("SEAT BOOKING API: ERROR ", err);
        }
    }

    return (
        <div>
            {hospital && (
                <div className={classes.doctorInfo}>
                    <p>
                        <b>Hospital Name: </b>
                        {hospital.hospitalName}
                    </p>
                    <p>
                        <b>Address: </b>
                        <Link
                            style={{
                                color: "green",
                            }}
                            to={`https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${hospital.address.latitude},${hospital.address.longitude}`}
                            target="_blank"
                        >
                            <span
                                className="material-symbols-outlined"
                                style={{ verticalAlign: "middle" }}
                            >
                                person_pin_circle
                            </span>{" "}
                            <span>Map</span>
                        </Link>
                        <address>
                            {hospital.hospitalName}, {hospital.address.town},{" "}
                            {hospital.address.district}
                        </address>
                    </p>
                    <p>
                        <b>Facilities: </b> must be a array from where table
                        will be created
                        {/* // {doctorData.fullName} */}
                    </p>
                </div>
            )}
            <form
                action=""
                className={classes["seat-booking-form"]}
                onSubmit={handleConfirmation}
            >
                {/* Reservation Type Radio Button  */}
                <div className={classes["reservation-type"]}>
                    <label htmlFor="cabin">
                        <input
                            type="radio"
                            name="reservationType"
                            id="cabin"
                            value="cabins"
                            checked={reservationType === "cabins"}
                            onChange={(e) => setReservationType(e.target.value)}
                        />
                        Cabin
                    </label>
                    <label htmlFor="beds">
                        <input
                            type="radio"
                            name="reservationType"
                            id="beds"
                            value="beds"
                            checked={reservationType === "beds"}
                            onChange={(e) => setReservationType(e.target.value)}
                        />
                        Beds
                    </label>
                </div>

                {reservationType && (
                    <table
                        border="1"
                        cellPadding="10px"
                        className={classes.reservationCateroyTable}
                    >
                        <tr>
                            <th>Category:</th>
                            <th>Price</th>
                            <th>Available</th>
                        </tr>

                        {reservationType &&
                            hospital[reservationType].map((rsType, index) => (
                                <tr key={`${index}_${rsType.category}`}>
                                    <td>
                                        <input
                                            type="radio"
                                            name="reservationCategory"
                                            id=""
                                            value={rsType.category}
                                        />{" "}
                                        {rsType.category}
                                    </td>

                                    <td>{rsType.price}/night</td>
                                    <td>{rsType.remaining}</td>
                                </tr>
                            ))}
                    </table>
                )}

                <input
                    type="date"
                    name="reservationDate"
                    id=""
                    min={new Date().toISOString().split("T")[0]}
                />

                <div className={classes.additional_req}>
                    <p>
                        <b>Additional Requirement</b>
                    </p>
                    <label htmlFor="wheelchair">
                        <input
                            type="checkbox"
                            name="wheelchair"
                            id="wheelchair"
                            value="wheelchair"
                        />
                        Wheel Chair
                    </label>
                    <label htmlFor="stretcher">
                        <input
                            type="checkbox"
                            name="stretcher"
                            id="stretcher"
                            value="stretcher"
                        />
                        Stretcher
                    </label>
                    <label htmlFor="oxygen">
                        <input
                            type="checkbox"
                            name="oxygen"
                            id="oxygen"
                            value="oxygen"
                        />
                        Oxygen
                    </label>
                    <label htmlFor="ambulance">
                        <input
                            name="ambulance"
                            type="checkbox"
                            htmlFor="ambulance"
                            id="ambulance"
                            value="ambulance"
                            onChange={(e) => setAmbulance(e.target.value)}
                        />
                        Ambulance
                    </label>
                </div>

                {ambulance && (
                    <div className={classes["address-field"]}>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="ambulance_address"
                            placeholder="Address"
                        />
                    </div>
                )}

                {error && <p style={{ color: "red" }}>{error}</p>}
                <input type="submit" value="Confirm Reservation" />
            </form>
        </div>
    );
}
