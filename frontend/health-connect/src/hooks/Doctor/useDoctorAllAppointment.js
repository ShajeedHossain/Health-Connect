import { useEffect, useState } from "react";
import DoctorApi from "../../apis/DoctorApi";

export const useDoctorAllAppointment = (user) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                setLoading(true);

                // API CALL to get doctor own details.
                const response = await DoctorApi.get(
                    "/get-doctor-appointments",
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
        doctorAllAppointment: data,
        doctorAllAppointmentLoading: loading,
        doctorAllAppointmentError: error,
    };
};
