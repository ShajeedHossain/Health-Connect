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

    console.log("FROM SINGLE APPOINTMENT PAGE: ", appointmentDetails);

    // console.log("HOSPITAL DATA SINGLE APPOINTMENT PAGE: ", data);

    const { latitude, longitude, district, town } = hospitalId.address;

    const { date, time } = formatDateAndTime(startTime);

    const { data, loading, error } = useHospitalProfileInfo(user, hospitalId);
    console.log("HOSPITAL DATA SINGLE APPOINTMENT PAGE: ", data);

    const { doctorInfo, doctorLoading, doctorError } = useDoctorProfileInfo(
        user,
        doctorId
    );

    console.log("DOCTOR INFO", doctorInfo);
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

                <tr>
                    <td></td>
                    <td>
                        {" "}
                        {previousFlag && (
                            <Link
                                state={{
                                    appointmentDetails,
                                }}
                                className={"appoint-book-btn"}
                                to="/doctor-dashboard/previous-history"
                            >
                                View Details
                            </Link>
                        )}
                        <Link
                            state={{
                                doctor: doctorInfo.doctor,
                                appointmentDetails,
                                userDetails,
                            }}
                            className={"appoint-book-btn"}
                            to="/dashboard/chat-box"
                        >
                            Message
                        </Link>
                    </td>
                </tr>
            </table>
        </div>
    );
}
