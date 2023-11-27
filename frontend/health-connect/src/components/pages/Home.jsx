import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserLog from "../../apis/UserLog";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import Header from "../Header";
import classes from ".././../styles/Home.module.css";

import img1 from "../../assets/images/medical_appointment.png";
import img2 from "../../assets/images/prescription.png";
import img3 from "../../assets/images/subscription-model.png";
import img4 from "../../assets/images/hospital-bed.png";
import img5 from "../../assets/images/diagnosis.png";

const Home = () => {
    const { logout } = useAuthContext();
    // const navigate = useNavigate();
    const { user, newUser } = useAuthContext();

    // const handleLogout = () => {
    //     logout();
    // };

    console.log("From Home: user ", user, " NewUser ", newUser);
    return (
        <>
            <Header />
            <div
                className={`${classes["feature-area"]} ${classes["container"]}`}
            >
                <h1>Services</h1>
                <div className={`${classes["cards"]}`}>
                    <Link
                        to={`/individual-signup`}
                        className={`${classes["card"]}`}
                    >
                        Be a registered doctor.
                    </Link>
                    <Link className={`${classes["card"]}`}>
                        Register as a hospital with doctors.
                    </Link>
                    <Link to={`signup`} className={`${classes["card"]}`}>
                        Get your patient account.
                    </Link>
                    <Link
                        to={`dashboard/takeAppointment`}
                        className={`${classes["card"]}`}
                    >
                        Get an Appointment with doctors
                    </Link>
                    <Link
                        to={`dashboard/hospitalBooking`}
                        className={`${classes["card"]}`}
                    >
                        Find your hospital.
                    </Link>
                </div>
            </div>
        </>
    );
};
export default Home;
