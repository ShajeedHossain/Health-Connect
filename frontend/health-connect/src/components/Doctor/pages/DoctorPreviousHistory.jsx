import classes from "../../../styles/DoctorPreviousHistory.module.css";
export default function DoctorPreviousHistory() {
    return (
        <div className={`${classes["previous-history"]} dashboard-card-full`}>
            <h2>Previous History</h2>

            <table>
                <tr>
                    <td>Patient Name: </td>
                    <td>ABCD</td>
                </tr>
                <tr>
                    <td>Date </td>
                    <td>12-12-2023</td>
                </tr>
                <tr>
                    <td>Prescribed Medicines </td>
                    <td>
                        <ul>
                            <li>Amoxicillin 5mg 1-1-1</li>
                            <li>Omeprazole 100mg 1-0-0</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Given Test </td>
                    <td>
                        <ul>
                            <li>Blood Test : Hemoglobin</li>
                            <li>X-ray </li>
                            <li>Ultrasonograph</li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
    );
}
