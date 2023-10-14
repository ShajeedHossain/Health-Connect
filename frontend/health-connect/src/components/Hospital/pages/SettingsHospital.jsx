import { useState } from "react";
import classes from "../../../styles/Settings.module.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useHospitalProfileInfo } from "../../../hooks/Hospital/useHospitalProfileInfo";

export default function SettingsHospital() {
    // Get Previous Data
    const [data, loading, error] = useHospitalProfileInfo();
    console.log(data);

    function handleSubmit(e) {
        e.preventDefault();

        // Form Data Object
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);

        // UPDATE PROFILE API START...
        // Add Update Profile API here

        // UPDATE PROFILE API END....
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
                    <input
                        type="text"
                        name="district"
                        id="district"
                        placeholder="District"
                    />
                    <input
                        type="text"
                        name="town"
                        id="town"
                        placeholder="Town"
                    />
                </div>

                <input type="submit" value="Update Information" />
            </form>
        </div>
    );
}
