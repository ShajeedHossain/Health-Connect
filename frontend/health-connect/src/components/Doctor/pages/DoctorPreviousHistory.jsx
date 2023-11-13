import { useLocation } from "react-router-dom";
import classes from "../../../styles/DoctorPreviousHistory.module.css";
import { usePatientProfileInfo } from "../../../hooks/Patient/usePatientProfileInfo";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { formatDateAndTime } from "../../../Utility/formateTime";
export default function DoctorPreviousHistory() {
    const location = useLocation();
    const { user } = useAuthContext();
    const { appointmentDetails } = location.state;
    console.log("HISTORY PAGE : ", appointmentDetails);

    const { patientId, startTime, prescription } = appointmentDetails;
    const { patientData, patientLoading, patientError } = usePatientProfileInfo(
        patientId,
        user,
        ""
    );

    console.log("HISTORY PAGE PATIENT DATA: ", patientData);
    //     {
    //     "_id": "65506420fd0c96f832f84256",
    //     "doctorId": "653a7c4d153cf2c3f9867b80",
    //     "patientId": "6543e3b6032a009ecb80eb89",
    //     "serial": 1,
    //     "startTime": "2023-11-17T03:00:00.000Z",
    //     "hospitalId": "653abe4770cbee356712c3a9",
    //     "isTaken": true,
    //     "__v": 0,
    //     "prescription": {
    //         "diabetes": "Diabetes",
    //         "problem": "jhkjhk",
    //         "medicine": "hhjhk",
    //         "test_list": "jkjhjk",
    //         "next_appointment": "2023-11-18",
    //         "specific_disease": "Diabetes"
    //     }
    // }
    return (
        <div className={`${classes["previous-history"]} dashboard-card-full`}>
            <h2>Previous History</h2>

            <table>
                <tr>
                    <td>Patient Name: </td>
                    <td>{patientData[0]?.fullName}</td>
                </tr>
                <tr>
                    <td>Date </td>
                    <td>{formatDateAndTime(startTime).date}</td>
                </tr>
                <tr>
                    <td>Specific Problems</td>
                    <td>{prescription?.specific_disease}</td>
                </tr>
                <tr>
                    <td>Problem</td>
                    <td>{prescription?.problem}</td>
                </tr>

                <tr>
                    <td>Prescribed Medicines </td>
                    <td>
                        <ul>
                            {prescription?.medicine
                                .split(",")
                                .map((med, index) => (
                                    <li key={index}>{med}</li>
                                ))}
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Given Test </td>
                    <td>
                        <ul>
                            {prescription?.test_list
                                .split(",")
                                .map((test, index) => (
                                    <li key={index}>{test}</li>
                                ))}
                        </ul>
                    </td>
                </tr>

                <tr>
                    <td>Next Date: </td>
                    <td>{prescription?.next_appointment}</td>
                </tr>
            </table>
        </div>
    );
}
