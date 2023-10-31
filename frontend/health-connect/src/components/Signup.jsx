import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignup } from "../hooks/useSignup";
import useGetCurrentLatLng from "../hooks/useGetCurrentLatLng";

//                Sami123*

const Signup = () => {
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
    console.log(town, district);
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
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords don't match");
        } else {
            const signupResult = await signup(
                email,
                password,
                fullName,
                currentLatitude,
                currentLongitude,
                town,
                district
            );
            if (signupResult && !signupResult.error) {
                toast.success(
                    "Signup Successful !! Navigating to login page...",
                    {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1500, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
                    }
                );
            }
        }
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
                            name="full-name"
                            id="full-name"
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
export default Signup;
