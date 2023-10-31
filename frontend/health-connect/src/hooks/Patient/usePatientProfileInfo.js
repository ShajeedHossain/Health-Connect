import { useEffect, useState } from "react";
import PatientApi from "../../apis/PatientApi";

export const usePatientProfileInfo = (user) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                setLoading(true);

                const response = await PatientApi.get("/get-patient", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                setLoading(false);
                setData(response.data.patient); // Uncomment this line
                console.log(
                    "RESPONSE FROM PATIENT API: ",
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

    return {
        data,
        loading,
        error,
    };
};
