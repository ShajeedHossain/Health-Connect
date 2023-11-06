import { Link } from "react-router-dom";
import img1 from "../assets/images/baby-weight.png";
import img2 from "../assets/images/certificate.png";
import img3 from "../assets/images/mental-health.png";
import img4 from "../assets/images/report.png";
import { useAuthContext } from "../hooks/useAuthContext";
import classes from "../styles/Home.module.css";
export default function Header() {
    const { user, newUser, logout } = useAuthContext();
    return (
        <section className={classes["headerPart"]}>
            <div className={`${classes["navbar"]} ${classes["container"]}`}>
                <div className={classes["logoPart"]}>
                    <h1 className={classes["logoWrite"]}>Health-Connect</h1>
                </div>
                <div className={classes["navOptions"]}>
                    {newUser && (
                        <>
                            {newUser.type === "hospital" ? (
                                <Link
                                    to="/hospital-dashboard/"
                                    className={classes["option"]}
                                >
                                    <h3>Dashboard</h3>
                                </Link>
                            ) : newUser.type === "patient" ? (
                                <Link
                                    className={classes["option"]}
                                    to="/dashboard/appointment"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    className={classes["option"]}
                                    to="/doctor-dashboard"
                                >
                                    Dashboard
                                </Link>
                            )}

                            <Link
                                to="/dashboard/hospitalBooking/bookseat"
                                className={classes["option"]}
                            >
                                <h3>Reserve Hospital</h3>
                            </Link>
                            <Link
                                to="dashboard/takeAppointment"
                                className={classes["option"]}
                            >
                                <h3>Find a Doctor</h3>
                            </Link>
                        </>
                    )}

                    {!user && !newUser ? (
                        <>
                            {" "}
                            <Link to="/login" className={classes["optionBtn"]}>
                                <h3 className={classes["BookNowBtntext"]}>
                                    Login
                                </h3>
                            </Link>
                            <Link to="/signup" className={classes["optionBtn"]}>
                                <h3 className={classes["BookNowBtntext"]}>
                                    Signup
                                </h3>
                            </Link>
                        </>
                    ) : (
                        <Link onClick={logout} className={classes["optionBtn"]}>
                            <h3 className={classes["BookNowBtntext"]}>
                                Logout
                            </h3>
                        </Link>
                    )}

                    <a href="#" className={classes["menubutton"]}>
                        <img
                            src="/health-connect-frontend/images/menu.png"
                            alt=""
                        />
                    </a>
                </div>
            </div>
            <div
                className={`${classes["responsive_sidebar"]} ${classes["container"]}`}
            >
                {/* <!-- <div className={classes["logoPart"]}>
                <h1 className={classes["logoWrite"]}>Health-Connect</h1>
            </div> --> */}

                <a href="#" className={classes["closebutton"]}>
                    <img
                        src="/health-connect-frontend/images/close.png"
                        alt=""
                    />
                </a>
                <a href="#" className={classes["option"]}>
                    <h3>Home</h3>
                </a>
                <a href="#" className={classes["option"]}>
                    <h3>Services</h3>
                </a>
                <a href="#" className={classes["option"]}>
                    <h3>Find a Doctor</h3>
                </a>
                <a href="#" className={classes["optionBtn"]}>
                    <h3 className={classes["BookNowBtntext"]}>Book now</h3>
                </a>
            </div>
            <div className={classes["headBanner"]}>
                <div className={classes["bannerwrite"]}>
                    <span>
                        <h1 className={classes["bannerHeadtitle"]}>
                            Welcome To <br />
                            Health-Connect
                        </h1>
                        <h3 className={classes["bannertitle"]}>
                            A pioneering web application that seamlessly
                            connects patients and doctors,
                            <br />
                            revolutionizing healthcare access. Say goodbye to
                            overcrowded hospitals
                        </h3>
                    </span>
                    <a href="#" className={classes["bannerbtn"]}>
                        Contact Us
                    </a>
                </div>
                <div className={classes["bannerimg"]}>
                    <img src={img2} alt="" className={classes["singleimg"]} />
                    <img src={img1} alt="" className={classes["singleimg"]} />
                    <img src={img3} alt="" className={classes["singleimg"]} />
                    <img src={img4} alt="" className={classes["singleimg"]} />
                </div>
            </div>
        </section>
    );
}
