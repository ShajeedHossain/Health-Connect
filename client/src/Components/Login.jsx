import { TextInput } from "./FormComponent/TextInput";
import classes from "../Style/Login.module.css";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        toast.onChange((payload) => {
            if (payload.status === "removed") {
                navigate("/all-appointment");
            }
        });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("LOGIN: ", email, password);
        const loginResult = await login(email, password);
        console.log("Login Result", loginResult);
        navigate("/dashboard/all-appointment");
        // if (loginResult && !loginResult.error) {
        //     toast.success("Login Successful !! Navigating to home page...", {
        //         position: toast.POSITION.TOP_RIGHT,
        //         autoClose: 500, // Time in milliseconds to auto-close the toast (0.5 seconds in this case)
        //     });
        // }
    };
    return (
        <div className={`${classes["login-container"]}`}>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type={`text`}
                    text={`Email`}
                    id={`email`}
                    value={email}
                    setFunction={setEmail}
                />
                <TextInput
                    type={`password`}
                    text={`Password`}
                    id={`password`}
                    value={password}
                    setFunction={setPassword}
                />
                <Button type={`submit`} text={`Login`} btnClass={`btn-full`} />
            </form>
        </div>
    );
};
