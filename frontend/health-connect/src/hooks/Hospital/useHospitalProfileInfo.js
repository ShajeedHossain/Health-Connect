import { useEffect, useState } from "react";
import HospitalApi from "../../apis/HospitalApi";

export const useHospitalProfileInfo = (user, hospitalId) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("SINGLE APPOINTMENT COMPONENT LOADED...");
    const fetchHospitalDetails = async () => {
      try {
        setLoading(true);
        console.log("SINGLE APPOINTMENT COMPONENT TRY CATCH...", user.token);
        const response = await HospitalApi.post(
          "/get-hospital",
          {
            hospitalId: hospitalId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        console.log("GET HOSPITAL HOOK", response.data);
        setLoading(false);
        setData(response.data); // Uncomment this line
      } catch (err) {
        console.log("--GET HOSPITAL HOOK ERROR--");
        console.log(err);
        setLoading(false);
        setError(true);
      }
    };

    fetchHospitalDetails();
  }, []);

  console.log("HELLO");
  return {
    data,
    loading,
    error,
  };
};
