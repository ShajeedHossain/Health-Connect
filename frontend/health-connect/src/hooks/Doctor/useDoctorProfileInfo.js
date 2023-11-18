import { useEffect, useState } from "react";
import DoctorApi from "../../apis/DoctorApi";

export const useDoctorProfileInfo = (user, doctorId) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("INSIDE USE EFFECT DOCTOR ID", doctorId);
        const fetchDoctorDetails = async () => {
            try {
                setLoading(true);

                // API CALL to get doctor own details.
                const response = await DoctorApi.post(
                    "/get-doctor",
                    { doctorId },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );
                setLoading(false);
                setData(response.data); // Uncomment this line
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchDoctorDetails();
    }, []);

    return {
        doctorInfo: data,
        doctorLoading: loading,
        doctorError: error,
    };
};
