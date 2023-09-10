import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserLog from "../../apis/UserLog";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Home = () => {
    const { logout } = useLogout();
    // const navigate = useNavigate();
    const { user } = useAuthContext();
    const [newUser, setNewUser] = useState();

    useEffect(() => {
        setNewUser(null);
        //This function is bound to change for the home page of the patients/doctors/admins
        const getUserDetails = async () => {
            const response = await UserLog.get("/", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log(response);
            setNewUser(response.data.user);
            console.log("newUser  ", newUser);
        };
        try {
            if (user) {
                getUserDetails();
            }
        } catch (error) {
            console.log(error);
        }
    }, [user]);

    const handleLogout = () => {
        logout();
    };

    console.log("newUser  ", newUser);
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
                                <Link
                                    className="btn"
                                    to="/dashboard/appointment"
                                >
                                    Dashboard
                                </Link>
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
