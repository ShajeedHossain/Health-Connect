import { useEffect, useState } from "react";
import HospitalApi from "../../apis/HospitalApi";

export const useAllDoctorList = (user) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log("user : ", user);
    useEffect(() => {
        const fetchAppointmentList = async () => {
            try {
                /** Patient gets available appointments*/
                setLoading(true);
                const response = await HospitalApi.get("/get-doctors", {
                    headers: {
                        "Content-Type": "application/json",
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
