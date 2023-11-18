import { useEffect, useState } from "react";
import io from "socket.io-client";
import classes from "../../../styles/ChatBox.module.css";
import { useLocation } from "react-router-dom";
const socket = io.connect(
    `http://localhost:${import.meta.env.VITE_SOCKET_PORT}`
);
export default function DoctorChatBox() {
    const location = useLocation();
    const { patientData, appointmentDetails, userDetails } = location.state;
    const patientDetails = patientData[0];
    const [appointmentId, setAppointmentId] = useState();
    const [senderId, setSenderId] = useState();
    const [senderName, setSenderName] = useState();
    const [receiverName, setReceiverName] = useState();
    const [receiverId, setReceiverId] = useState();

    // console.log(appointment_id);
    console.log("Patient INFO: ", patientDetails);
    console.log("PATIENT NAME: ", patientDetails.fullName);
    console.log("APPOINTMENT INFO: ", appointmentDetails);
    console.log("USER INFO: ", userDetails);
    const [active, setActive] = useState(false);
    //THESE WILL BE IN CHAT
    // const appointment_id = 123; ///here the appointment id needs to come from somewhere
    // const senderId = 112312;
    // const receiverId = 112312;
    // const senderName = "SAMI";
    // const receiverName = "Hossain";
    const [currentMessage, setCurrentMessage] = useState();
    const [prevMessage, setPrevMessage] = useState([]);

    //SOCKET RELATED FUNCTIONS (MAY NEED TO CHANGE LOCATION)
    const joinRoom = (appointment_id) => {
        if (appointment_id !== "" || appointment_id !== undefined) {
            socket.emit("join_room", appointment_id);
        }
    };
    const sendMessage = () => {
        if (currentMessage !== "") {
            console.log(currentMessage);
            const messageData = {
                appointment_id: appointmentId,
                senderId: receiverId,
                senderName: receiverName,
                receiverName: senderName,
                receiverId: senderId,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            // setPrevMessage((prev) => [...prev, messageData]);
            socket.emit("send_message", messageData);
        }
    };
    useEffect(() => {
        setAppointmentId(appointmentDetails._id);
        setSenderId(userDetails._id);
        setReceiverId(patientDetails._id);
        setSenderName(userDetails.fullname);
        setReceiverName(patientDetails.fullName);
    }, []);
    //for testing
    useEffect(() => {
        joinRoom(appointmentId);
        // sendMessage();
    }, [appointmentId]);

    useEffect(() => {
        const data = { senderId: receiverId, receiverId: senderId };
        console.log("DATA", data);
        socket.emit("prev_messages", data);
        socket.on("receive_prev_message", (data) => {
            console.log("PREV: ", data);

            setPrevMessage(data.reverse());
        });
    }, [receiverId, senderId]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("RECEIVED MESSAGE: ", data);
            setPrevMessage((prev) => [...prev, data]);
        });
    }, [socket]);

    //////////////////////////////////////////////////
    function activeSidebar() {
        setActive((prev) => !prev);
    }
    return (
        <div className={`${classes["chat-box"]}`}>
            <div className={`${classes["chat-header"]}`}>
                <div className={`${classes["header-icon"]}`}>
                    <span
                        onClick={activeSidebar}
                        className="material-symbols-outlined"
                    >
                        supervisor_account
                    </span>
                </div>
                <h2>Chat Box</h2>
            </div>

            <div className={`${classes["chat-body"]}`}>
                <div
                    className={`${classes["chat-sidebar"]} ${
                        active && classes["active"]
                    }`}
                >
                    {patientData && (
                        <div
                            onClick={activeSidebar}
                            className={`${classes["singleDoctor"]}`}
                        >
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                            <h3>{patientDetails?.fullName}</h3>
                        </div>
                    )}

                    <div
                        onClick={activeSidebar}
                        className={`${classes["singleDoctor"]}`}
                    >
                        <span className="material-symbols-outlined">
                            account_circle
                        </span>
                        <h3>ABCD</h3>
                    </div>
                    <div
                        onClick={activeSidebar}
                        className={`${classes["singleDoctor"]}`}
                    >
                        <span className="material-symbols-outlined">
                            account_circle
                        </span>
                        <h3>ABCD</h3>
                    </div>
                </div>
                <div className={`${classes["message-body"]}`}>
                    <div className={`${classes["message-box"]}`}>
                        {prevMessage?.map((message, index) => (
                            <div
                                key={index}
                                className={`${classes["single-message"]} ${
                                    message.senderId === userDetails._id
                                        ? classes["own-message"]
                                        : classes["other-message"]
                                }`}
                            >
                                <p>{message.message}</p>
                            </div>
                        ))}
                    </div>
                    <div className={`${classes["message-text-box"]}`}>
                        <input
                            type="text"
                            name="text-box"
                            id=""
                            value={currentMessage}
                            onChange={(e) => {
                                setCurrentMessage(e.target.value);
                            }}
                        />
                        <span
                            onClick={sendMessage}
                            className="material-symbols-outlined"
                        >
                            send
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
