import { useEffect, useState } from "react";
import PatientApi from "../apis/PatientApi";

export const useDoctorList = (user) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log("user : ", user);
    useEffect(() => {
        const fetchAppointmentList = async () => {
            try {
                /** Patient gets available appointments*/
                setLoading(true);
                const response = await PatientApi.get("/get-all-doctor", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                setLoading(false);
                setData(response.data);
                console.log("Doctor List Response Data : ", response.data);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchAppointmentList();
    }, [user.token]);

    return {
        doctorData: data,
        doctorLoading: loading,
        doctorError: error,
    };
};
