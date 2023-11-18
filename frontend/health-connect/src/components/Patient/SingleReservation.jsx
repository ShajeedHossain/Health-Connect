import useGetCurrentLatLng from "../../hooks/useGetCurrentLatLng";
import classes from "../../styles/HospitalBooking.module.css";
import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../Utility/formateTime";
import _ from "lodash";
export default function SingleReservation({ singleReservation }) {
    const { hospitalId } = singleReservation;
    const { currentLatitude, currentLongitude } = useGetCurrentLatLng();

    return (
        <div
            className={`${classes["single-admissionchk-card1"]} dashboard-card`}
        >
            <table>
                <tr>
                    <td>
                        <b>Hospital Name:</b>
                    </td>
                    <td>{hospitalId.hospitalName}</td>
                </tr>
                <tr>
                    <td>
                        <b>Location</b>
                    </td>
                    <td>
                        {hospitalId.address.town}
                        ,&nbsp;
                        {hospitalId.address.district}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <Link
                            style={{
                                color: "green",
                                verticalAlign: "center",
                                display: "flex",
                            }}
                            to={`https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${hospitalId.address.latitude},${hospitalId.address.longitude}`}
                            target="_blank"
                        >
                            <span className="material-symbols-outlined">
                                person_pin_circle
                            </span>{" "}
                            <span>Map</span>
                        </Link>
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Reservation Type:</b>
                    </td>
                    <td>
                        {_.capitalize(singleReservation?.reservationType)} (
                        {singleReservation?.reservationCategory})
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Status:</b>
                    </td>
                    <td>
                        {singleReservation?.dischargeStatus
                            ? "Discharged"
                            : "Admitted"}
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Date:</b>
                    </td>
                    <td>
                        {
                            formatDateAndTime(singleReservation.reservationDate)
                                .date
                        }
                    </td>
                </tr>
            </table>
        </div>
    );
}
