import { useEffect, useState } from "react";
import { usePatientProfileInfo } from "../../hooks/Patient/usePatientProfileInfo";
import { useAuthContext } from "../../hooks/useAuthContext";
import PatientApi from "../../apis/PatientApi";

export default function DoctorSingleAppointment({ appointmentDetails }) {
    const { user } = useAuthContext();
    console.log("Doctor Single Appointment", appointmentDetails);

    const { patientId } = appointmentDetails;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    //     {
    //     "_id": "655063e8babc4ffca044ce30",
    //     "doctorId": "653a7c4d153cf2c3f9867b80",
    //     "patientId": "6543e3b6032a009ecb80eb89",
    //     "serial": 1,
    //     "startTime": "2023-11-14T03:00:00.000Z",
    //     "hospitalId": "653abe4770cbee356712c3a9",
    //     "isTaken": false,
    //     "__v": 0
    // }

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                setLoading(true);

                console.log("API BEGINING", patientId);
                const response = await PatientApi.post("/get-patient", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        email: "avb",
                        patientId: patientId,
                    },
                });

                setLoading(false);
                setData(response.data.patient); // Uncomment this line
                console.log(
                    "RESPONSE FROM PATIENT SINGLE API: ",
                    response.data.patient
                );
            } catch (err) {
                console.log("ERROR FROM PATIENT API");
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchPatientDetails();
    }, []);

    return (
        <div className={`dashboard-card `}>
            <table>
                <tr>
                    <td>
                        <b>Patient name: </b>
                    </td>
                    <td>abcd</td>
                </tr>

                <tr>
                    <td>
                        <b>Address:</b>
                    </td>
                    <td>Dhanmondi, Dhaka</td>
                </tr>
                <tr>
                    <td>
                        <b>Serial:</b>
                    </td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>
                        <b>Date:</b>
                    </td>
                    <td>15 November,2023</td>
                </tr>
                <tr>
                    <td>
                        <b>Time:</b>
                    </td>
                    <td> 7:00 AM</td>
                </tr>
            </table>
        </div>
    );
}
