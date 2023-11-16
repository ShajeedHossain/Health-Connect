import { useState } from "react";
import classes from "../../styles/ChatBox.module.css";
export default function ChatBox() {
    const [active, setActive] = useState(false);
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
                        <div
                            className={`${classes["single-message"]} ${classes["own-message"]}`}
                        >
                            <p>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Amet minus assumenda ratione
                                quaerat consequuntur? Aliquam voluptas ipsam
                                amet voluptatum consequuntur?
                            </p>
                        </div>
                        <div
                            className={`${classes["single-message"]} ${classes["other-message"]}`}
                        >
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Labore, alias?
                            </p>
                        </div>
                    </div>
                    <div className={`${classes["message-text-box"]}`}>
                        <input type="text" name="text-box" id="" />
                        <span
                            onClick={handleSend}
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
