import { useEffect, useState } from "react";
import io from "socket.io-client";
import classes from "../../styles/ChatBox.module.css";
const socket = io.connect(
  `http://localhost:${import.meta.env.VITE_SOCKET_PORT}`
);
export default function ChatBox() {
  const [active, setActive] = useState(false);
  //THESE WILL BE IN CHAT
  const appointment_id = 123; ///here the appointment id needs to come from somewhere
  const senderId = 112312;
  const receiverId = 112312;
  const senderName = "SAMI";
  const receiverName = "Hossain";
  const [currentMessage, setCurrentMessage] = useState("Hello");

  //SOCKET RELATED FUNCTIONS (MAY NEED TO CHANGE LOCATION)
  const joinRoom = () => {
    if (appointment_id !== "" || appointment_id !== undefined) {
      socket.emit("join_room", appointment_id);
    }
  };
  const sendMessage = async () => {
    if (currentMessage !== "") {
      console.log(currentMessage);
      const messageData = {
        appointment_id: appointment_id,
        senderId: senderId,
        senderName: senderName,
        receiverName: receiverName,
        receiverId: receiverId,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
    }
  };
  //for testing
  useEffect(() => {
    joinRoom();
    sendMessage();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("RECEIVED MESSAGE: ", data);
    });
  }, [socket]);

  useEffect(() => {
    const data = { senderId: senderId, receiverId: receiverId };
    socket.emit("prev_messages", data);
    socket.on("receive_prev_message", (data) => {
      console.log("PREV: ", data);
    });
  }, []);

  //////////////////////////////////////////////////
  function activeSidebar() {
    setActive((prev) => !prev);
  }

  function handleSend(e) {
    e.preventDefault();
    //
  }
  return (
    <div className={`${classes["chat-box"]}`}>
      <div className={`${classes["chat-header"]}`}>
        <div className={`${classes["header-icon"]}`}>
          <span onClick={activeSidebar} className="material-symbols-outlined">
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
          <div onClick={activeSidebar} className={`${classes["singleDoctor"]}`}>
            <span className="material-symbols-outlined">account_circle</span>
            <h3>ABCD</h3>
          </div>
          <div onClick={activeSidebar} className={`${classes["singleDoctor"]}`}>
            <span className="material-symbols-outlined">account_circle</span>
            <h3>ABCD</h3>
          </div>
        </div>
        <div className={`${classes["message-body"]}`}>
          <div className={`${classes["message-box"]}`}>
            <div
              className={`${classes["single-message"]} ${classes["own-message"]}`}
            >
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
                minus assumenda ratione quaerat consequuntur? Aliquam voluptas
                ipsam amet voluptatum consequuntur?
              </p>
            </div>
            <div
              className={`${classes["single-message"]} ${classes["other-message"]}`}
            >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
                alias?
              </p>
            </div>
          </div>
          <div className={`${classes["message-text-box"]}`}>
            <input type="text" name="text-box" id="" />
            <span onClick={handleSend} className="material-symbols-outlined">
              send
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
