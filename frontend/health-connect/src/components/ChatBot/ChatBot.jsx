import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Input from "./Input";
import Img1 from "../../assets/images/img1.jpg";
import tutorialsdev from "../../assets/images/tutorialsdev.png";
import { useDoctorAllAppointment } from "../../hooks/Doctor/useDoctorAllAppointment";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpcomingAppointmentList } from "../../hooks/useUpcomingAppointmentList";
import classes from "./ChatBot.module.css";

const ChatBot = () => {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState({});
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const messageRef = useRef(null);

    const { user, newUser } = useAuthContext();
    useEffect(() => {
        setSocket(io("http://localhost:3000"));
    }, []);

    useEffect(() => {
        console.log("CHAT NEW USER: ", newUser?._id);
        socket?.emit("addUser", newUser?._id);
        console.log("WORKED 100");
        socket?.on("getUsers", (users) => {
            console.log("activeUsers :>> ", users);
        });
        socket?.on("getMessage", (data) => {
            console.log("DATA FROM GET MESSAGE", data);
            setMessages((prev) => ({
                ...prev,
                messages: [
                    ...prev.messages,
                    { user: data.user, message: data.message },
                ],
            }));
        });
    }, [newUser]);

    useEffect(() => {
        messageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages?.messages]);

    useEffect(() => {
        // const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
        const fetchConversations = async () => {
            const res = await fetch(
                // `http://localhost:8000/api/conversations/${loggedInUser?.id}`,
                `http://localhost:${
                    import.meta.env.VITE_BACKEND_PORT
                }/api/user/conversations/${newUser?._id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            const resData = await res.json();
            console.log("RESDATA", resData);
            setConversations(resData);
        };
        fetchConversations();
    }, [newUser, user]);

    const { upcomingData, upcomingLoading, upcomingError } =
        useUpcomingAppointmentList(user);

    const {
        doctorAllAppointment,
        doctorAllAppointmentLoading,
        doctorAllAppointmentError,
    } = useDoctorAllAppointment(user);

    console.log("NewUser: ", newUser);
    console.log("DOCTOR ALL APPOINTMENT: ", doctorAllAppointment);
    const swapUserType = { doctor: "patientId", patient: "doctorId" };

    useEffect(() => {
        const haveSameId = (obj1, obj2) => {
            if (newUser?.type === "patient")
                return obj1.doctorId._id === obj2.doctorId._id;
            return obj1.patientId._id === obj2.patientId._id;
        };

        // Function to filter the array based on the doctorId
        const filterArrayById = (array) => {
            const filteredArray = [];

            array.forEach((currentObj, currentIndex) => {
                // Check if this object's doctorId is the same as any previous objects
                const hasSameDoctorId = filteredArray.some((filteredObj) =>
                    haveSameId(currentObj, filteredObj)
                );

                // If not, add it to the filtered array
                if (!hasSameDoctorId) {
                    filteredArray.push(currentObj);
                }
            });

            return filteredArray;
        };
        if (newUser?.type === "patient") {
            const appointments = upcomingData?.appointments || [];
            const temp = filterArrayById(appointments);
            setUsers(temp);
        } else {
            const temp = filterArrayById(doctorAllAppointment);
            setUsers(temp);
        }
    }, [upcomingData, doctorAllAppointment, newUser]);

    const fetchMessages = async (conversationId, receiver) => {
        console.log("RECEIVER FROM FETCH MESS", receiver);
        const receiverId = receiver?._id;
        console.log(
            "RECEIVER ID FROM FETCH MESSAGE: ",
            receiver,
            "\nreceiver: ",
            receiverId,
            "\nsender: ",
            newUser?._id,
            "\nUserType:",
            newUser?.type
        );
        const res = await fetch(
            //   `http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/api/user/message/${conversationId}?senderId=${
                newUser?._id
            }&&receiverId=${receiverId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );
        const resData = await res.json();
        console.log("MSG RES DATA: ", resData);
        console.log(resData ? "HELLO" : "BYTE", resData);
        console.log("RECEIVER : ", receiver);
        setMessages({ messages: resData, receiver, conversationId });
    };

    const sendMessage = async (e) => {
        setMessage("");
        console.log("SEND MESSAGE", newUser?._id, messages?.receiver, messages);
        socket?.emit("sendMessage", {
            senderId: newUser?._id,
            receiverId: messages?.receiver?._id,
            message,
            conversationId: messages?.conversationId,
        });
        const res = await fetch(
            `http://localhost:${
                import.meta.env.VITE_BACKEND_PORT
            }/api/user/message`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    conversationId: messages?.conversationId,
                    senderId: newUser?._id,
                    message,
                    receiverId: messages?.receiver?._id,
                }),
            }
        );
        console.log("RESPONSE FROM SEND MESSAGE API", res);
    };

    return (
        <div className={`${classes["chat-bot"]}`}>
            <div className={`${classes["left-sidebar"]}`}>
                <div className={`${classes["account-area"]}`}>
                    <div className="ml-8">
                        <h2>{newUser?.fullname}</h2>
                        <p className="text-lg font-light">My Account</p>
                    </div>
                </div>
                <hr />
                <div className="mx-14 mt-10">
                    <div className={`${classes["chat-sidebar-header"]}`}>
                        Messages
                    </div>
                    <div>
                        {conversations?.length > 0 ? (
                            conversations.map(
                                ({ conversationId, singleUser }, index) => {
                                    console.log(
                                        "CONVO ID , USER",
                                        conversationId,
                                        singleUser
                                    );
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center py-8 border-b border-b-gray-300"
                                        >
                                            <div
                                                className={`${classes["single-user"]}`}
                                                onClick={() =>
                                                    fetchMessages(
                                                        conversationId,
                                                        singleUser
                                                    )
                                                }
                                            >
                                                <div>
                                                    <img src={Img1} />
                                                </div>
                                                <div className="ml-6">
                                                    <h3 className="text-lg font-semibold">
                                                        {singleUser?.fullName}
                                                    </h3>
                                                    <p className="text-sm font-light text-gray-600">
                                                        {singleUser?.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )
                        ) : (
                            <div className="text-center text-lg font-semibold mt-24">
                                No Conversations
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={`${classes["chatbox"]}`}>
                {messages?.receiver?.fullName && (
                    <div className="w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 py-2">
                        <div className={`${classes["profile-area"]}`}>
                            <h3 className="text-lg">
                                {messages?.receiver?.fullName}
                            </h3>
                            <p className="text-sm font-light text-gray-600">
                                {messages?.receiver?.email}
                            </p>
                        </div>
                    </div>
                )}
                <div className="h-[75%] w-full overflow-scroll shadow-sm">
                    <div className="p-14">
                        {messages?.messages?.length > 0 ? (
                            messages.messages.map(
                                ({ message, user: { id } = {} }) => {
                                    return (
                                        <>
                                            <div
                                                className={`${
                                                    classes["message"]
                                                } ${
                                                    id === newUser?._id
                                                        ? classes["own-message"]
                                                        : classes[
                                                              "other-message"
                                                          ]
                                                } `}
                                            >
                                                <p>{message}</p>
                                            </div>
                                            <div ref={messageRef}></div>
                                        </>
                                    );
                                }
                            )
                        ) : (
                            <div className="text-center text-lg font-semibold mt-24">
                                No Messages or No Conversation Selected
                            </div>
                        )}
                    </div>
                </div>
                {messages?.receiver?.fullName && (
                    <div className={`${classes["message-input"]}`}>
                        <Input
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div
                            className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                                !message && "pointer-events-none"
                            }`}
                            onClick={() => sendMessage()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-send"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#2c3e50"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <line x1="10" y1="14" x2="21" y2="3" />
                                <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                            </svg>
                        </div>
                        <div
                            className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                                !message && "pointer-events-none"
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-circle-plus"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#2c3e50"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <circle cx="12" cy="12" r="9" />
                                <line x1="9" y1="12" x2="15" y2="12" />
                                <line x1="12" y1="9" x2="12" y2="15" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
            <div className={`${classes["right-sidebar"]}`}>
                <div className={`${classes["chat-sidebar-header"]}`}>
                    People
                </div>
                <div>
                    {users?.length > 0 ? (
                        users.map((singleUser, index) => {
                            console.log("SINGLE USER: ", singleUser);
                            return (
                                <div
                                    key={index}
                                    className="flex items-center py-8 border-b border-b-gray-300"
                                >
                                    <div
                                        className={`${classes["single-user"]}`}
                                        onClick={() =>
                                            fetchMessages(
                                                "new",
                                                singleUser?.[
                                                    `${
                                                        swapUserType[
                                                            newUser?.type
                                                        ]
                                                    }`
                                                ]
                                            )
                                        }
                                    >
                                        <div>
                                            <img
                                                src={Img1}
                                                className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary"
                                            />
                                        </div>
                                        <div className="ml-6">
                                            <h3 className="text-lg font-semibold">
                                                {
                                                    singleUser?.[
                                                        `${
                                                            swapUserType[
                                                                newUser?.type
                                                            ]
                                                        }`
                                                    ]?.fullName
                                                }
                                            </h3>
                                            <p className="text-sm font-light text-gray-600">
                                                {
                                                    singleUser?.[
                                                        `${
                                                            swapUserType[
                                                                newUser?.type
                                                            ]
                                                        }`
                                                    ]?.email
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-lg font-semibold mt-24">
                            No Conversations
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
