import HospitalApi from "../../../apis/HospitalApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/AddDoctor.module.css";
export default function AddDoctor() {
    const { user, newUser } = useAuthContext();
    console.log("ADD DOCTOR PAGE: USER", newUser);
    // Handle Submit Function
    async function handleSubmit(e) {
        e.preventDefault();

        // Form Data Object
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);

        /**
         * Problem:
         * Doctor Must be associated with hospital id,
         */
        try {
            const response = await HospitalApi.post(
                "/add-one-doctor",
                {
                    ...formDataObject,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            console.log("ADD DOCTOR API RESPONSE: ", response);
        } catch {
            console.log("ADD DOCTOR API: ERROR");
        }
    }
    return (
        <div>
            <form
                action=""
                className={classes["add-doctor-form"]}
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="fullname"
                    id="doctor-name"
                    placeholder="Doctor Name"
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
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <input
                    type="text"
                    name="hospitalName"
                    id="hospital-name"
                    placeholder="Hospital Name"
                />
                <input
                    type="text"
                    name="education"
                    id="doctor-education"
                    placeholder="Educational Qualification"
                />
                <input
                    type="text"
                    name="bma_id"
                    id="bma"
                    placeholder="BMA ID"
                />
                <input
                    type="text"
                    name="specializations"
                    id="specialization"
                    placeholder="Specialization"
                />
                <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Address"
                />
                <input type="submit" value="Add Doctor" />
            </form>
        </div>
    );
}
