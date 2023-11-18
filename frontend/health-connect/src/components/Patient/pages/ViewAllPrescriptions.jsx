import { useEffect, useState } from "react";
import { useUpcomingAppointmentList } from "../../../hooks/useUpcomingAppointmentList";
import classes from "../../../styles/ViewAllPrescriptions.module.css";
import { formatDateAndTime } from "../../../Utility/formateTime";
import { useAuthContext } from "../../../hooks/useAuthContext";
import SinglePrescription from "../SinglePrescription";

export default function ViewAllPrescriptions() {
    const { user } = useAuthContext();
    const { upcomingData, upcomingLoading, upcomingError } =
        useUpcomingAppointmentList(user);
    const { appointments } = upcomingData;
    console.log("UPCOMING APPOINTMENT: ", appointments);

    const [previous, setPrevious] = useState([]);
    useEffect(() => {
        const tempData = appointments?.filter((data) => {
            return (
                data.isTaken ||
                new Date(formatDateAndTime(data.startTime).date) < new Date()
            );
        });

        console.log("PREVIOUS DATA :", tempData);
        setPrevious(tempData);
    }, [appointments]);
    return (
        <div className={`${classes["viewPrescriptionsPage"]}`}>
            <h2>All Prescriptions</h2>

            <div className={`${classes["prescription-list"]}`}>
                <table>
                    <tr>
                        <th>Doctor Name</th>
                        <th>Date</th>
                        <th>View Details</th>
                    </tr>
                    {previous &&
                        previous?.map((data, index) => (
                            <SinglePrescription
                                key={index}
                                user={user}
                                prescription={data}
                            />
                        ))}
                </table>
            </div>
        </div>
    );
}
