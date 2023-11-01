import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignup } from "../hooks/useSignup";
import useGetCurrentLatLng from "../hooks/useGetCurrentLatLng";

//                Sami123*

const IndividualDoctorSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const { signup, error: err, isLoading } = useSignup();
    const [error, setError] = useState();

    const navigate = useNavigate();

    const { currentLatitude, currentLongitude, town, district } =
        useGetCurrentLatLng();
    useEffect(() => {
        toast.onChange((payload) => {
            if (payload.status === "removed") {
                navigate("/login");
            }
        });
    }, [navigate]);

    const getAddress = (e) => {
        e.preventDefault();
        setAddress(`${town}, ${district}`);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);
    };
    return (
        <>
            <section className="login-signup">
                <div className="login-signup-form">
                    <h3 className="login-signup-title">Signup</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="full-name">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            id="fullname"
                            placeholder="
                            Doctor Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" name="dob" id="dob" />
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" id="gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <label htmlFor="doctor-education">Education</label>
                        <input
                            type="text"
                            name="education"
                            id="doctor-education"
                            placeholder="Educational Qualification"
                        />
                        <label htmlFor="bma">BMA</label>
                        <input
                            type="text"
                            name="bma_id"
                            id="bma"
                            placeholder="BMA ID"
                        />

                        <label htmlFor="specialization">Specialization</label>
                        <input
                            type="text"
                            name="specializations"
                            id="specialization"
                            placeholder="Specialization"
                        />
                        <label htmlFor="contact">Contact No.</label>
                        <input
                            type="text"
                            name="contact"
                            id="contact"
                            placeholder="Contact Number"
                        />
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            disabled
                        />
                        <button onClick={getAddress}>
                            Get Current Address
                        </button>
                        {(error || err) && (
                            <pre className="error">{error || err}</pre>
                        )}
                        {/* Display error message */}
                        <input
                            disabled={isLoading}
                            type="submit"
                            value="Signup"
                        />
                    </form>
                </div>
            </section>
            <ToastContainer position="top-right" />
        </>
    );
};
export default IndividualDoctorSignup;
