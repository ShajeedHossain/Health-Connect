import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserLog from "../../apis/UserLog";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../dashboard/Navbar";
import HospitalDashboardBody from "../dashboard/HospitalDashboardBody";

export default function HospitalDashboard({ children }) {
    const { user } = useAuthContext();
    const [newUser, setNewUser] = useState(null);
    // console.log("SAMI");

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
            <HospitalDashboardBody activeState={isActive}>
                <Outlet />
            </HospitalDashboardBody>
        </div>
    );
}
