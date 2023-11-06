import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserLog from "../../apis/UserLog";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import Header from "../Header";
import classes from ".././../styles/Home.module.css";

import img1 from "../../assets/medical-appointment.png";
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

            <section className={classes["middlepart"]}>
                <div className={classes["middlepartTitle"]}>
                    Why You Should Choose Us?
                </div>
                <div className={classes["featureCard"]}>
                    <div className={classes["featureCardrow1"]}>
                        <div className={classes["featureSingleCard"]}>
                            <img
                                src="/health-connect-frontend/images/subscription-model.png"
                                className={classes["featureCardImg"]}
                                alt=""
                            />
                            <span className={classes["featureCardtitle"]}>
                                Unified Subscription Model
                            </span>
                            <span className={classes["featurecardContent"]}>
                                A subscription based model for different
                                hospitals, doctors and diagnosis centers in a
                                single place.
                            </span>
                        </div>
                        <div className={classes["featureSingleCard"]}>
                            <img
                                src={img1}
                                className={classes["featureCardImg"]}
                                alt=""
                            />
                            <span className={classes["featureCardtitle"]}>
                                Effortless Doctor Appointments
                            </span>{" "}
                            <span className={classes["featurecardContent"]}>
                                Patients can search for nearest available
                                doctors, check how many appointments they have
                                and filter based on criteria.
                            </span>
                        </div>
                        <div className={classes["featureSingleCard"]}>
                            <img
                                src="/health-connect-frontend/images/hospital-bed.png"
                                className={classes["featureCardImg"]}
                                alt=""
                            />
                            <span className={classes["featureCardtitle"]}>
                                Hospital Seat Reservation
                            </span>
                            <span className={classes["featurecardContent"]}>
                                Patients can search for available seats in
                                different hospitals based on specific
                                facilities. They can reserve seats if necessary.
                            </span>
                        </div>
                    </div>
                    <div className={classes["featureCardrow2"]}>
                        <div className={classes["featureSingleCard"]}>
                            <img
                                src="/health-connect-frontend/images/diagnosis.png"
                                className={classes["featureCardImg"]}
                                alt=""
                            />
                            <span className={classes["featureCardtitle"]}>
                                Secure Diagnosis Reports
                            </span>{" "}
                            <span className={classes["featurecardContent"]}>
                                Patients can make a reservation in a Diagnostic
                                center with doctor's references. Diagnosis
                                reports will be directly sent to doctors.
                            </span>
                        </div>
                        <div className={classes["featureSingleCard"]}>
                            {" "}
                            <img
                                src="/health-connect-frontend/images/prescription.png"
                                className={classes["featureCardImg"]}
                                alt=""
                            />
                            <span className={classes["featureCardtitle"]}>
                                Encrypted Medical Guidance
                            </span>
                            <span className={classes["featurecardContent"]}>
                                Doctors can give medicine and advice from the
                                application. In that case it will be encrypted
                                and available only for patients.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={classes["ratingbanner"]}>
                    <span className={classes["ratingTitle"]}>
                        <h1>100+</h1>
                        <h3>Renowned Hospitals are registered</h3>
                    </span>
                    <span className={classes["ratingTitle"]}>
                        <h1>500+</h1>
                        <h3>Certified Doctors are available</h3>
                    </span>
                    <span className={classes["ratingTitle"]}>
                        <h1>1.5k+</h1>
                        <h3>Users are booking hospital-seat just in a click</h3>
                    </span>
                </div>
            </section>
        </>
        // <section className={classes["login-signup"]}>
        //     <main>
        //         <>
        //             {/*  */}
        //             {user && newUser && (
        //                 <div>
        //                     <h3>Welcome {newUser.fullname}</h3>
        //                     <div className={classes["login-signup-buttons"]}>
        //                         <Link className={classes["btn"]} onClick={handleLogout}>
        //                             Log Out
        //                         </Link>
        //                         {newUser.type === "hospital" ? (
        //                             <Link
        //                                 className={classes["btn"]}
        //                                 to="/hospital-dashboard/"
        //                             >
        //                                 Dashboard
        //                             </Link>
        //                         ) : newUser.type === "patient" ? (
        //                             <Link
        //                                 className={classes["btn"]}
        //                                 to="/dashboard/appointment"
        //                             >
        //                                 Dashboard
        //                             </Link>
        //                         ) : (
        //                             <Link
        //                                 className={classes["btn"]}
        //                                 to="/doctor-dashboard"
        //                             >
        //                                 Dashboard
        //                             </Link>
        //                         )}
        //                     </div>
        //                 </div>
        //             )}
        //             {!user && (
        //                 <>
        //                     <h3>You are not logged in!!!</h3>
        //                     <div className={classes["login-signup-buttons"]}>
        //                         <Link className={classes["btn"]} to="/login">
        //                             <b>Login</b>
        //                         </Link>
        //                         <Link className={classes["btn"]} to="/signup">
        //                             <b>Signup</b>
        //                         </Link>
        //                     </div>
        //                 </>
        //             )}
        //         </>
        //     </main>
        // </section>
    );
};
export default Home;
