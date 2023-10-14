import { useEffect, useState } from "react";

export const useHospitalProfileInfo = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchHospitalDetails = async () => {
            try {
                setLoading(true);

                // API CALL to get hospital own details.
                const response = null;
                setLoading(false);
                // setData(response.data); // Uncomment this line
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchHospitalDetails();
    }, []);

    return {
        data,
        loading,
        error,
    };
};
