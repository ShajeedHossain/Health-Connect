import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../Utility/formateTime";
import { useDoctorProfileInfo } from "../../hooks/Doctor/useDoctorProfileInfo";

export default function SinglePrescription({ user, prescription }) {
    const { doctorInfo, doctorLoading, doctorError } = useDoctorProfileInfo(
        user,
        prescription.doctorId
    );
    console.log("Doctor Data : ", doctorInfo.doctor);
    return (
        <tr>
            <td>{doctorInfo?.doctor?.fullName}</td>
            <td>{formatDateAndTime(prescription?.startTime).date}</td>
            <td>
                <Link
                    to="/doctor-dashboard/previous-history"
                    state={{ appointmentDetails: prescription }}
                    className={`btn`}
                >
                    View Prescription
                </Link>
            </td>
        </tr>
    );
}
