import { useState } from "react";
import { usePatientProfileInfo } from "../../../hooks/Patient/usePatientProfileInfo";
import classes from "../../../styles/Settings.module.css";
import useGetCurrentLatLng from "../../../hooks/useGetCurrentLatLng";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function DoctorSettings() {
    // Get Previous Data
    // const [data, loading, error] = usePatientProfileInfo();
    // console.log(data);

    const { user } = useAuthContext();
    const { data, loading, error } = usePatientProfileInfo(user);

    const { fullName, email, weight, height, address, gender, contact } = data;

    const [fullNameField, setFullNameField] = useState("");
    const [emailField, setEmailField] = useState("");
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
        formDataObject["town"] = town;
        formDataObject["district"] = district;
        console.log("Form Data Example : ", formDataObject);

        // [TODO] : API CALL HERE WITH FORMDATA
    }
    return (
        <div>
            <form
                action=""
                className={classes["patient-profile-update-form"]}
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="fullname"
                    id="doctor-name"
                    placeholder={`Doctor Name:`}
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={`Email:`}
                />
                <input
                    type="text"
                    name="contact"
                    id="contact"
                    placeholder="Contact Number"
                />
                <div className={classes["date-gender"]}>
                    <input type="date" name="dob" id="dob" />
                    <select name="gender" id="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <input
                    type="text"
                    name="education"
                    id="contact"
                    placeholder="Educational Qualifications"
                />

                <input
                    type="text"
                    name="specialization"
                    id="contact"
                    placeholder="Specializations"
                />
                <div className={classes["date-gender"]}>
                    <input
                        type="text"
                        name="bma"
                        id="contact"
                        placeholder="BMA ID"
                    />
                    <input
                        type="text"
                        name="fees"
                        id="contact"
                        placeholder="Fees"
                    />
                </div>
                <div className={classes["date-gender"]}>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address"
                        value={addressField ? addressField : address}
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
