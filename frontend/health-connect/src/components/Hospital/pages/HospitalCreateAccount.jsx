import HospitalApi from "../../../apis/HospitalApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/HospitalCreateAccount.module.css";
export default function HospitalCreateAccount() {
    const { user } = useAuthContext();
    async function handleSubmit(e) {
        e.preventDefault();

        // Form Data Object
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);

        try {
            const response = await HospitalApi.post(
                "/create-patient-account",
                formDataObject,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            console.log("CREATE ACCOUNT RESPONSE: ", response.data);
        } catch (err) {
            //
            console.log("CREATE ACCOUNT ERROR: ", err);
        }
    }
    return (
        <div className={`${classes["hospital-create-account-page"]}`}>
            <h2>Create Account for Patient</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">Patient Name</label>
                    <input
                        type="text"
                        name="fullname"
                        id="fullName"
                        placeholder="Patient Name"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <label htmlFor="contact">Contact</label>
                    <input
                        type="text"
                        name="contact"
                        id="contact"
                        placeholder="Contact"
                    />
                </div>

                <div>
                    <input
                        type="submit"
                        value="Create Account"
                        className={`btn`}
                    />
                </div>
            </form>
        </div>
    );
}
