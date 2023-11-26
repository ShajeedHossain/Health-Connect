import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../Utility/formateTime";
import { useHospitalProfileInfo } from "../../hooks/Hospital/useHospitalProfileInfo";
import useGetCurrentLatLng from "../../hooks/useGetCurrentLatLng";
import classes from "../../styles/SingleAppointment.module.css";
import { useDoctorProfileInfo } from "../../hooks/Doctor/useDoctorProfileInfo";

export default function SingleAppointment({
    className,
    appointmentDetails,
    previousFlag,
    user,
    userDetails,
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
        doctorId,
    } = appointmentDetails;

    console.log("FROM SINGLE APPOINTMENT PAGE: ", appointmentDetails, doctorId);

    const { latitude, longitude, district, town } = hospitalId.address;

    const { date, time } = formatDateAndTime(startTime);

    return (
        <div className={`dashboard-card ${classes.className}`}>
            <table>
                <tr>
                    <td>
                        <b>Doctor name: </b>
                    </td>
                    <td>{doctorId?.fullName}</td>
                </tr>

                <tr>
                    <td>
                        <b>Address:</b>
                    </td>
                    <td>
                        {town}, {district}
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

                <tr>
                    <td></td>
                    <td className={`td-link`}>
                        {" "}
                        {previousFlag && (
                            <Link
                                state={{
                                    appointmentDetails,
                                }}
                                className={"btn"}
                                to="/doctor-dashboard/previous-history"
                            >
                                View Details
                            </Link>
                        )}
                    </td>
                </tr>
            </table>
        </div>
    );
}
