import { useLocation } from "react-router-dom";
import classes from "../../../styles/DoctorPreviousHistory.module.css";
import { usePatientProfileInfo } from "../../../hooks/Patient/usePatientProfileInfo";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { formatDateAndTime } from "../../../Utility/formateTime";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function DoctorPreviousHistory() {
    const location = useLocation();
    const { user } = useAuthContext();
    const { appointmentDetails } = location.state;
    console.log("HISTORY PAGE : ", appointmentDetails);

    const { patientId, startTime, prescription, doctorId } = appointmentDetails;
    const { patientData, patientLoading, patientError } = usePatientProfileInfo(
        patientId,
        user,
        ""
    );

    console.log("HISTORY PAGE PATIENT DATA: ", patientData);

    const exportPdf = async () => {
        const doc = new jsPDF("p", "mm", [297, 210]);

        // doc.save("mypdf.pdf");
        doc.setFontSize(18);
        doc.text(
            `Doctor Name : ${doctorId.fullName}`,
            doc.internal.pageSize.width / 2,
            10,
            "center"
        );

        // Add the table
        doc.autoTable({
            html: "#my-table",
        });

        // Save the PDF
        doc.save("hospital_report.pdf");
    };
    return (
        <div className={`${classes["previous-history"]} dashboard-card-full`}>
            <h2>Previous History</h2>

            <table id="my-table">
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

            <button className={`btn`} onClick={exportPdf}>
                Download
            </button>
        </div>
    );
}
