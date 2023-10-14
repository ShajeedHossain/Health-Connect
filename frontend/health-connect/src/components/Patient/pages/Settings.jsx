import { usePatientProfileInfo } from "../../../hooks/Patient/usePatientProfileInfo";
import classes from "../../../styles/Settings.module.css";

export default function Settings() {
    // Get Previous Data
    // const [data, loading, error] = usePatientProfileInfo();
    // console.log(data);

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
                    placeholder="Patient Name"
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
                    <input type="date" name="dob" id="dob" />
                    <select name="gender" id="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Address"
                />
                <input type="submit" value="Update Information" />
            </form>
        </div>
    );
}
