import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientApi from "../../../apis/PatientApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useGetCurrentLatLng from "../../../hooks/useGetCurrentLatLng";
import classes from "../../../styles/Settings.module.css";
import { usePatientProfileInfo } from "../../../hooks/Patient/usePatientProfileInfo";

export default function Settings() {
    // Get Previous Data
    // const [data, loading, error] = usePatientProfileInfo();
    // console.log(data);

    const { user } = useAuthContext();
    const navigate = useNavigate();

    const { patientData, patientLoading, patientError } =
        usePatientProfileInfo(user);
    const [fullNameField, setFullNameField] = useState("");
    const [emailField, setEmailField] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { currentLatitude, currentLongitude, town, district } =
        useGetCurrentLatLng();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [prevPatientData, SetPrevPatientData] = useState();

    console.log("Patient Previous Data ", patientData);

    useEffect(() => {
        const tempData = {
            fullName: patientData?.fullName,
            email: patientData?.email,
            contact: patientData?.contact,
            dob: patientData?.dob,
            gender: patientData?.gender,
            weight: patientData?.weight,
            height: patientData?.height,
            age: patientData?.age,
            address: patientData?.address,
        };

        SetPrevPatientData(tempData);
        console.log("WORKED");
    }, [patientData]);
    const [addressField, setAddressField] = useState("");
    const getAddress = (e) => {
        e.preventDefault();
        setAddressField(`${town}, ${district}`);
    };

    useEffect(() => {
        toast.onChange((payload) => {
            if (payload.status === "removed") {
                navigate("/dashboard/appointment");
            }
        });
    }, [navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(false);
        setLoading(true);

        // Form Data Object
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        formDataObject["town"] = town;
        formDataObject["district"] = district;
        formDataObject["latitude"] = currentLatitude;
        formDataObject["longitude"] = currentLongitude;
        console.log("Form Data Example : ", formDataObject);

        try {
            const response = await PatientApi.put(
                "/update-patient",
                formDataObject,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success(
                "Profile updated successfully !! Navigating to previous page...",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
                }
            );
            console.log("UPDATE API: RESPONSE ", response);
        } catch (err) {
            setError(err.response.data.error);
            setLoading(false);
            console.log("UPDATE API: ERROR ", err);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        SetPrevPatientData({
            ...prevPatientData,
            [name]: value,
        });
    }
    return (
        <>
            <div>
                <form
                    action=""
                    className={classes["patient-profile-update-form"]}
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="full-name">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        id="full-name"
                        placeholder={`Full Name:`}
                        value={prevPatientData?.fullName}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={`Email:`}
                        value={prevPatientData?.email}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />
                    <label htmlFor="contact">Contact</label>
                    <input
                        type="text"
                        name="contact"
                        id="contact"
                        placeholder="Contact Number"
                        value={prevPatientData?.contact}
                        onChange={(e) => {
                            handleChange(e);
                        }}
                    />

                    <div className={classes["date-gender"]}>
                        <div>
                            <label htmlFor="dob">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                id="dob"
                                value={prevPatientData?.dob}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="gender">Gender</label>
                            <select
                                name="gender"
                                id="gender"
                                value={prevPatientData?.gender}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className={classes["date-gender"]}>
                        <div>
                            <label htmlFor="height">Height (in meters)</label>
                            <input
                                type="text"
                                name="height"
                                id="height"
                                placeholder="Height (in meters)"
                                value={prevPatientData?.height}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>

                        <div>
                            <label htmlFor="weight">
                                Weight (in kilograms)
                            </label>
                            <input
                                type="text"
                                name="weight"
                                id="weight"
                                placeholder="Weight (in kilograms)"
                                value={prevPatientData?.weight}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            />
                        </div>
                    </div>

                    <div className={classes["date-gender"]}>
                        <div>
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Address"
                                value={
                                    addressField
                                        ? addressField
                                        : `${prevPatientData?.address?.town}, ${prevPatientData?.address?.district}`
                                }
                                disabled
                            />
                        </div>

                        <div>
                            <label style={{ visibility: "hidden" }} htmlFor="">
                                TEMP BUTTON
                            </label>
                            <input
                                type="button"
                                value="Get Current Location"
                                onClick={getAddress}
                            />
                        </div>
                    </div>
                    <label htmlFor="password">Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        id="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Must provide to change password. Else keep empty"
                    />
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        id="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Must provide to change password. Else keep empty"
                    />
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Must provide to change password. Else keep empty"
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <input
                        disabled={loading}
                        type="submit"
                        value="Update Information"
                    />
                </form>
            </div>
            <ToastContainer position="top-right" />
        </>
    );
}
