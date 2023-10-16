import { useEffect, useState } from "react";
import PatientApi from "../../apis/PatientApi";

export const usePreviousReservation = (user) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    console.log("user : ", user);

    useEffect(() => {
        const fetchReservationList = async () => {
            try {
                /** Patient gets available appointments*/
                setLoading(true);
                const response = await PatientApi.get(
                    "/get-previous-reservation",
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                setLoading(false);
                setData(response.data);
                console.log("PREVIOUS RESERVATION : ", response.data);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchReservationList();
    }, []);

    return {
        previousData: data,
        previousLoading: loading,
        previousError: error,
    };
};
