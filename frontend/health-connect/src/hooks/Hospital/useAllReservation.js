import { useEffect, useState } from "react";
import HospitalApi from "../../apis/HospitalApi";
import demoReservation from "../../components/demoData/demoReservation";

export const useAllReservation = (user) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log("user : ", user);
    useEffect(() => {
        const fetchAllReservation = async () => {
            try {
                /** Patient gets available appointments*/
                setLoading(true);
                // const response = await HospitalApi.get("/get-doctors", {
                //     headers: {
                //         "Content-Type": "application/json",
                //         Authorization: `Bearer ${user.token}`,
                //     },
                // });
                const response = demoReservation;
                setLoading(false);
                // setData(response.data);
                console.log("All Reservation: ", response);
                setData(response);
                // console.log("Doctor List Response Data : ", response.data);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchAllReservation();
    }, [user.token]);

    return {
        reservationData: data,
        reservationLoading: loading,
        reservationError: error,
    };
};
