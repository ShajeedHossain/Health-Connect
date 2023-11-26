import { useEffect, useState } from "react";
import PatientApi from "../apis/PatientApi";

export const useHospitalList = (user) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [districtFilter, setDistrictFilter] = useState("");
  const [sortByDistance, setSortByDistance] = useState(0);

  console.log("useHospitalList USER : ", user);

  useEffect(() => {
    console.log("USEEFFECT CALLED: FETCHAPPOINTMENT CALLED");
    const fetchHospitalList = async () => {
      console.log("FETCHAPPOINTMENT CALLED");
      try {
        setLoading(true);
        /** Patient gets hospital list*/

        const response = await PatientApi.post(
          "/get-sorted-hospital-data",
          { districtFilter, sortByDistance },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

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
  }, [user.token, districtFilter, sortByDistance]);

  return {
    data,
    loading,
    error,
    districtFilter,
    sortByDistance,
    setDistrictFilter,
    setSortByDistance,
  };
};
