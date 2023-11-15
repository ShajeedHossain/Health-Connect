import { useEffect, useState } from "react";
import HospitalApi from "../../apis/HospitalApi";

export const useHospitalProfileInfo = (user) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchHospitalDetails = async () => {
            try {
                setLoading(true);

                const response = await HospitalApi.get("/get-hospital", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                console.log("GET HOSPITAL HOOK", response.data);
                setLoading(false);
                setData(response.data); // Uncomment this line
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
