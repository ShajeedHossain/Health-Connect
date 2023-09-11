import { useEffect, useState } from "react";
import PatientApi from "../apis/PatientApi";

export const useAppointmentList = (user) => {
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchAppointmentList = async () => {
            try{
                /** Patient gets available appointments*/
                setLoading(true);
                const response = await PatientApi.get(
                "/upcoming-appointment",
                    {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    }
                );
                
                setLoading(false);
                setData(response.data);
                console.log("Appointment List Response Data : ",response.data);
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