import { useEffect, useState } from "react";
import UserLog from "../../apis/UserLog";
import { useAuthContext } from "../../hooks/useAuthContext";
import DashboardBody from "../dashboard/DashboardBody";
import Navbar from "../dashboard/Navbar";

export default function Dashboard({ children }) {
    const { user } = useAuthContext();
    const [newUser, setNewUser] = useState(null);

    useEffect(() => {
        setNewUser(null);
        //This function is bound to change for the home page of the patients/doctors/admins
        const getUserDetails = async () => {
            const response = await UserLog.get("/", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log("response ", response.data.user);
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

    const [isActive, setIsActive] = useState(false);
    const handleActive = () => {
        setIsActive((current) => !current);
    };
    console.log("newUser  ", newUser);
    return (
        <div className="container">
            <Navbar
                newUser={newUser}
                activeState={{ isActive, handleActive }}
                className="navbar"
            />
            <DashboardBody activeState={isActive}>{children}</DashboardBody>
        </div>
    );
}
