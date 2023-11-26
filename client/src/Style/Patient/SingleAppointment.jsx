import React from "react";
import { formatDateAndTime } from "../../Utility/formateTime";
import useGetCurrentLatLng from "../../hooks/useGetCurrentLatLng";
import { useDoctorProfileInfo } from "../../hooks/Doctor/useDoctorProfileInfo";
import { useHospitalProfileInfo } from "../../hooks/Hospital/useHospitalProfileInfo";
import { Link } from "react-router-dom";

export const SingleAppointment = ({ singleAppointment, user }) => {
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
    } = singleAppointment;

    console.log("DOCTOR ID: ", doctorId._id);
    const { latitude, longitude, district, town } = hospitalId.address;

    const { date, time } = formatDateAndTime(startTime);

    console.log("DOCTOR INFO", doctorId);
    return (
        <tr>
            <td>{doctorId?.fullName}</td>
            <td>{formatDateAndTime(singleAppointment?.startTime).date}</td>
            <td>{formatDateAndTime(singleAppointment?.startTime).time}</td>
            <td>
                <Link
                    to="/dashboard/appointment-details"
                    state={{ singleAppointment }}
                >
                    View Details
                </Link>
            </td>
        </tr>
    );
};
