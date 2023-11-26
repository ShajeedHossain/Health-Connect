import { useEffect, useState } from "react";
import PatientApi from "../apis/PatientApi";

export const useDoctorList = (user) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log("user : ", user);
    const [specializationFilter, setSpecializationFilter] = useState("");
    const [districtFilter, setDistrictFilter] = useState("");
    const [sortByDistance, setSortByDistance] = useState(0);

    // const [specializationList, setSpecializationList] = useState([]);
    // const [distrcitList, setDistrictList] = useState([]);

    // [TODO] :  USE THOSE FILTER STATE
    useEffect(() => {
        const fetchAppointmentList = async () => {
            try {
                /** Patient gets available appointments*/
                setLoading(true);
                console.log("LOGGER: ", user.token);

                const response = await PatientApi.post(
                    "/get-sorted-doctor-data",
                    { specializationFilter, districtFilter, sortByDistance },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );
                console.log("INN");

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
    }, [specializationFilter, districtFilter, sortByDistance]);

    // useEffect(() => {
    //     const allSpecialization = specializationList;
    //     const allDistrict = distrcitList;

    //     data.doctorList?.forEach((singleDoctor) => {
    //         singleDoctor.specializations.forEach((specialization) => {
    //             if (!allSpecialization.includes(specialization)) {
    //                 // Avoid duplicates
    //                 allSpecialization.push(specialization);
    //             }
    //         });
    //         if (!allDistrict.includes(singleDoctor.address.district)) {
    //             // Avoid duplicates
    //             allDistrict.push(singleDoctor.address.district);
    //         }
    //     });

    //     setSpecializationList(allSpecialization);
    //     setDistrictList(allDistrict);
    // }, [data.doctorList]);

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
