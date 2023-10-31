import { useState } from "react";
import classes from "../../../styles/Settings.module.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useHospitalProfileInfo } from "../../../hooks/Hospital/useHospitalProfileInfo";
import useGetCurrentLatLng from "../../../hooks/useGetCurrentLatLng";

export default function SettingsHospital() {
    // Get Previous Data
    // const [data, loading, error] = useHospitalProfileInfo();
    // console.log(data);

    const { currentLatitude, currentLongitude, town, district } =
        useGetCurrentLatLng();
    const [addressField, setAddressField] = useState("");
    const getAddress = (e) => {
        e.preventDefault();
        setAddressField(`${town}, ${district}`);
    };

    function handleSubmit(e) {
        e.preventDefault();

        // Form Data Object
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);

        // [TODO] : API CALL
    }
    return (
        // Need to change here and add the loading check after previous two are complete
        <div>
            <form
                action=""
                className={classes["patient-profile-update-form"]}
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="fullname"
                    id="Hospital Name"
                    placeholder="Hospital Name"
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                />
                <input
                    type="text"
                    name="contact"
                    id="contact"
                    placeholder="Contact Number"
                />
                <div className={classes["date-gender"]}>
                    <input
                        type="text"
                        name="total-bed"
                        id="total-bed"
                        placeholder="Total Bed"
                    />
                    <input
                        type="text"
                        name="total-cabin"
                        id="total-cabin"
                        placeholder="Total Cabin"
                    />
                </div>
                <div className={classes["date-gender"]}>
                    <textarea
                        placeholder="Facilities with Beds"
                        name="beds-facilities"
                        id=""
                        cols="30"
                        rows="10"
                    ></textarea>
                    <textarea
                        placeholder="Facilities with Cabins"
                        name="cabins-facilities"
                        id=""
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>

                <div className={classes["date-gender"]}>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address"
                        value={addressField ? addressField : ""}
                        disabled
                    />
                    <input
                        type="button"
                        value="Get Current Location"
                        onClick={getAddress}
                    />
                </div>

                <input type="submit" value="Update Information" />
            </form>
        </div>
    );
}
