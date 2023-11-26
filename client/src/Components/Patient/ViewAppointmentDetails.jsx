import { Link, useLocation } from "react-router-dom";
import { formatDateAndTime } from "../../Utility/formateTime";
import useGetCurrentLatLng from "../../hooks/useGetCurrentLatLng";

export const ViewAppointmentDetails = () => {
    const location = useLocation();
    const { singleAppointment } = location.state;
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
    } = singleAppointment;
    const { latitude, longitude, district, town } = hospitalId.address;
    const { currentLatitude, currentLongitude } = useGetCurrentLatLng();

    console.log("Single Appointment: ", singleAppointment);
    return (
        <div className={`dashboard-container`}>
            <div className={`container-body`}>
                <table className={`dashboard-details-table`}>
                    <tr className={`table-first-row`}>
                        <td>Doctor Name</td>
                        <td>{doctorId.fullName}</td>
                    </tr>
                    <tr>
                        <td>Appointment Date</td>
                        <td>{formatDateAndTime(startTime).date}</td>
                    </tr>
                    <tr>
                        <td>Appointment Time</td>
                        <td>{formatDateAndTime(startTime).time}</td>
                    </tr>
                    <tr>
                        <td>Serial</td>
                        <td>{serial}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            {town}, {district}
                        </td>
                    </tr>
                    <tr>
                        <td>View Map</td>
                        <td>
                            <Link
                                to={`https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${latitude},${longitude}`}
                                target="_blank"
                            >
                                View
                            </Link>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
};
