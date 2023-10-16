import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserLog from "../../apis/UserLog";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Home = () => {
    const { logout } = useAuthContext();
    // const navigate = useNavigate();
    const { user, newUser } = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    console.log("From Home: user ", user, " NewUser ", newUser);
    return (
        <section className="login-signup">
            <main>
                <>
                    {/*  */}
                    {user && newUser && (
                        <div>
                            <h3>Welcome {newUser.fullname}</h3>
                            <div className="login-signup-buttons">
                                <Link className="btn" onClick={handleLogout}>
                                    Log Out
                                </Link>
                                {newUser.type === "hospital" ? (
                                    <Link
                                        className="btn"
                                        to="/hospital-dashboard/"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        className="btn"
                                        to="/dashboard/appointment"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                    {!user && (
                        <>
                            <h3>You are not logged in!!!</h3>
                            <div className="login-signup-buttons">
                                <Link className="btn" to="/login">
                                    <b>Login</b>
                                </Link>
                                <Link className="btn" to="/signup">
                                    <b>Signup</b>
                                </Link>
                            </div>
                        </>
                    )}
                </>
            </main>
        </section>
    );
};
export default Home;
