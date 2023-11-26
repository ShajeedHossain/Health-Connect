import { useEffect, useState } from "react";
import { json } from "react-router-dom";

export default function useGetCurrentLatLng() {
    const [currentLatitude, setCurrentLatitude] = useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const [currentAddress, setCurrentAddress] = useState();
    const [town, setTown] = useState();
    const [district, setDistrict] = useState();
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrentLatitude(position.coords.latitude);
            setCurrentLongitude(position.coords.longitude);
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
    }, []);
    useEffect(() => {
        function getCurrentAddress() {
            // "https://maps.googleapis.com/maps/api/geocode/json?latlng=23.726219186299577, 90.39759139842515&key=AIzaSyDnYnaEjyElEltKLbjQIDgWX90bRWrL_LI";
            console.log("GET LOCATION");
            fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLatitude},${currentLongitude}&key=AIzaSyDnYnaEjyElEltKLbjQIDgWX90bRWrL_LI`
            )
                .then((data) => data.json())
                .then((data) => {
                    data?.results[0]?.address_components.forEach(
                        (singleAddress) => {
                            if (singleAddress.types[0] === "political")
                                setTown(singleAddress.long_name);
                            if (
                                singleAddress.types.includes(
                                    "administrative_area_level_2"
                                )
                            )
                                setDistrict(singleAddress.long_name);
                        }
                    );
                });
        }
        getCurrentAddress();
    }, [currentLatitude, currentLongitude]);

    return { currentLatitude, currentLongitude, town, district };
}
