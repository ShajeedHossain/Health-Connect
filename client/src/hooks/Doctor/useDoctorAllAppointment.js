import { useEffect, useState } from "react";
import DoctorApi from "../../apis/DoctorApi";

export const useDoctorAllAppointment = (user, doctorId) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);

        // API CALL to get doctor own details.
        const response = await DoctorApi.get("/get-doctor-appointments", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
            id: doctorId,
          },
        });
        setLoading(false);
        setData(response.data.appointments);

        // setData([
        //     {
        //         _id: "655063e8babc4ffca044ce30",
        //         doctorId: "653a7c4d153cf2c3f9867b80",
        //         patientId: "6543e3b6032a009ecb80eb89",
        //         serial: 1,
        //         startTime: "2023-11-14T09:00:00",
        //         hospitalId: "653abe4770cbee356712c3a9",
        //         isTaken: false,
        //         __v: 0,
        //     },
        //     {
        //         _id: "65506420fd0c96f832f84256",
        //         doctorId: "653a7c4d153cf2c3f9867b80",
        //         patientId: "6543e3b6032a009ecb80eb89",
        //         serial: 1,
        //         startTime: "2023-11-17T09:00:00",
        //         hospitalId: "653abe4770cbee356712c3a9",
        //         isTaken: false,
        //         __v: 0,
        //     },
        // ]);
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
