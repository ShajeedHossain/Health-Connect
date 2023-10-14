import { useEffect, useState } from "react";
import PatientApi from "../apis/PatientApi";

export const useHospitalList = (user) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    console.log("useHospitalList USER : ", user);

    useEffect(() => {
        console.log("USEEFFECT CALLED: FETCHAPPOINTMENT CALLED");
        const fetchHospitalList = async () => {
            console.log("FETCHAPPOINTMENT CALLED");
            try {
                setLoading(true);
                /** Patient gets hospital list*/

                const response = await PatientApi.get("/get-all-hospital", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                setLoading(false);
                setData(response.data);
                console.log("Hospital List Response Data : ", response.data);
            } catch (err) {
                console.log("FETCH HOSPITAL LIST: ERROR");
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchHospitalList();
    }, []);

    return {
        data,
        loading,
        error,
    };
};
