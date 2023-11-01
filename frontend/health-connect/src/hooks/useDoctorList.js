import { useEffect, useState } from "react";
import PatientApi from "../apis/PatientApi";

export const useDoctorList = (user) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log("user : ", user);
    const [specializationFilter, setSpecializationFilter] = useState("");
    const [districtFilter, setDistrictFilter] = useState("");
    const [sortByDistance, setSortByDistance] = useState(false);

    // [TODO] :  USE THOSE FILTER STATE
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
                console.log("Doctor List Response Data : ", response.data);
                // const { doctorList } = response.data;
                // sortByDistance(doctorList);

                // console.log("DOCTOR SORTED LIST ", doctorList);
                setData(response.data);
            } catch (err) {
                console.log("DOCTOR FETCH ERROR ", err);
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
        specializationFilter,
        districtFilter,
        sortByDistance,
        setSpecializationFilter,
        setDistrictFilter,
        setSortByDistance,
    };
};
