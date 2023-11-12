import { useEffect, useState } from "react";
import DoctorApi from "../../apis/DoctorApi";
import PatientApi from "../../apis/PatientApi";

export const useDoctorAllPatientDetails = (
    user,
    doctorId,
    patientEmail,
    patientId
) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const [patientId, setPatientId] = useState();

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
                            id: doctorId,
                        },
                    }
                );
                setLoading(false);
                setData(response.data.appointments);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchDoctorDetails();
    }, []);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                setLoading(true);

                console.log("API BEGINING");
                const response = await PatientApi.get("/get-patient", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        email: patientEmail,
                        patientId: patientId,
                    },
                });

                setLoading(false);
                setData((prev) => ({ ...prev, ...response.data.patient })); // Uncomment this line
                console.log(
                    "RESPONSE FROM PATIENT API: ",
                    response.data.patient
                );
            } catch (err) {
                console.log("ERROR FROM PATIENT API");
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchPatientDetails();
    }, []);
    return {
        doctorAllAppointment: data,
        doctorAllAppointmentLoading: loading,
        doctorAllAppointmentError: error,
    };
};
