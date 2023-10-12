import UserLog from "../../../apis/UserLog";
import classes from "../../../styles/AddDoctor.module.css";
export default function AddDoctor() {
    // Handle Submit Function
    async function handleSubmit(e) {
        e.preventDefault();

        // Form Data Object
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);
        // formDataObject Example
        // {
        //     "doctor-name": "ABCD",
        //     "email": "tanvirh.dihan@gmail.com",
        //     "contact": "01714289841",
        //     "dob": "2023-10-12",
        //     "gender": "male",
        //     "doctor-education": "MBBS",
        //     "bma": "1234",
        //     "specialization": "Heart"
        // }

        // FIX HERE...
        try {
            const response = await UserLog.post("/signup", formDataObject, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = response.data;
            return { data: data };
        } catch (err) {
            console.log(err.response.data.error);
            return { error: err.response.data.error };
        }
        // FIX ...
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
                    name="doctor-name"
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
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <input
                    type="text"
                    name="doctor-education"
                    id="doctor-education"
                    placeholder="Educational Qualification"
                />
                <input type="text" name="bma" id="bma" placeholder="BMA ID" />
                <input
                    type="text"
                    name="specialization"
                    id="specialization"
                    placeholder="Specialization"
                />
                <input type="submit" value="Add Doctor" />
            </form>
        </div>
    );
}
