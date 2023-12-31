import { useEffect, useState } from "react";
import PatientApi from "../apis/PatientApi";

export const useTakeAppointment = (user) => {
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchAppointmentList = async () => {
            try{
                /** Patient gets available appointments*/
                setLoading(true);
                const response = await PatientApi.get(
                    "/get-all-appointment",
                    {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    }
                );
                setLoading(false);
                setData(response.data);
                console.log("Take Appointment Response Data : ",response.data);
            } catch(err){
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }

        fetchAppointmentList();
    },[]);

    return {
        data, loading, error
    };
} 