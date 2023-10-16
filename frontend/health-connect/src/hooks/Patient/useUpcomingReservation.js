import { useEffect, useState } from "react";
import PatientApi from "../../apis/PatientApi";

export const useUpcomingReservation = (user) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    console.log("USE UPCOMING RESERVATION HOOK : USER", user);

    useEffect(() => {
        const fetchReservationList = async () => {
            try {
                /** Patient gets available appointments*/
                setLoading(true);
                const response = await PatientApi.get(
                    "/get-upcoming-reservation",
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );
                setLoading(false);
                setData(response.data);
                console.log("Reservation List Response Data : ", response.data);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchReservationList();
    }, [user.token]);

    return {
        upcomingData: data,
        upcomingLoading: loading,
        upcomingError: error,
    };
};
