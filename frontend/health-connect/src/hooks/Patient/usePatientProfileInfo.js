import { useEffect, useState } from "react";

export const usePatientProfileInfo = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                setLoading(true);

                // API CALL to get patient own details.
                const response = null;
                setLoading(false);
                // setData(response.data); // Uncomment this line
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchPatientDetails();
    }, []);

    return {
        data,
        loading,
        error,
    };
};
