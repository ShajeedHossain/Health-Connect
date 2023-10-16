import { useEffect, useState } from "react";
import PatientApi from "../apis/PatientApi";

export const useDoctorList = (user) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    console.log("user : ", user);

    const { doctorList } = data;
    function bubbleSort(doctorDistance, doctorData) {
        console.log(doctorData, " dfdfs ", doctorDistance);
        const n = doctorDistance.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                const distanceA = parseFloat(doctorDistance[j].distance);
                const distanceB = parseFloat(doctorDistance[j + 1].distance);
                if (
                    isNaN(distanceA) ||
                    isNaN(distanceB) ||
                    distanceA > distanceB
                ) {
                    // Swap the elements
                    let temp = doctorDistance[j];
                    doctorDistance[j] = doctorDistance[j + 1];
                    doctorDistance[j + 1] = temp;

                    temp = doctorData[j];
                    doctorData[j] = doctorData[j + 1];
                    doctorData[j + 1] = temp;
                }
            }
        }
    }

    useEffect(() => {
        async function sortByDistance() {
            const doctorDistance = [];
            let destination = "destinations=";
            doctorList.forEach((doctor) => {
                doctorDistance.push({
                    id: doctor._id,
                    lat: doctor.address.latitude,
                    lng: doctor.address.longitude,
                });
                destination +=
                    doctor.address.latitude +
                    "%2C" +
                    doctor.address.longitude +
                    "%7C";
            });
            destination = destination.slice(0, -3);
            console.log(destination);
            console.log(doctorDistance);
            try {
                /**Get the distance */
                const response = await PatientApi.post(
                    "/get-distance",
                    {
                        url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=23.94821289164638%2C90.37926469346104&key=AIzaSyCw9Xz5vT5x6m8DTutXNygenRnDX8jIYXs`,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );
                console.log(response.data.data.rows[0].elements);
                for (
                    let i = 0;
                    i < response.data.data.rows[0].elements.length;
                    i++
                ) {
                    console.log(response.data.data.rows[0].elements[i]);
                    doctorDistance[i]["distance"] =
                        response.data.data.rows[0].elements[i].status === "OK"
                            ? response.data.data.rows[0].elements[i].distance
                                  .text
                            : "9999999 km";
                }
                console.log(doctorDistance);
                bubbleSort(doctorDistance, doctorList);
                console.log("AFTER SORT ", doctorDistance, doctorList);
                setData(doctorList);
                // setSortedDoctorList(doctorList);
            } catch (err) {
                //
            }
        }
        const fetchAppointmentList = async () => {
            try {
                /** Patient gets available appointments*/
                setLoading(true);
                const response = await PatientApi.get("/get-all-doctor", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                setLoading(false);
                setData(response.data);
                console.log("Doctor List Response Data : ", response.data);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        };

        fetchAppointmentList();

        sortByDistance();
    }, [user.token]);

    return {
        doctorData: data,
        doctorLoading: loading,
        doctorError: error,
    };
};
