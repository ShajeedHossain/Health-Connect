import { useEffect, useState } from "react";
import PatientApi from "../apis/PatientApi";

export const useDoctorProfileInfo = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                setLoading(true);

                // API CALL to get doctor own details.
                const response = null;
                setLoading(false);
                // setData(response.data); // Uncomment this line
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchDoctorDetails();
    }, []);

    return {
        data,
        loading,
        error,
    };
};
