import image from "../../assets/images/user.jpg";
import classes from "../../styles/Navbar.module.css";
import React from "react";
export default function Navbar(props) {
    const { className, activeState, newUser } = props;
    const { isActive, handleActive } = activeState;
    console.log("newUser navbar ", newUser);
    return (
        <div className={classes.className}>
            <nav>
                <div
                    className={
                        isActive
                            ? `${classes.hamburgerMenu} ${classes.active}`
                            : `${classes.hamburgerMenu}`
                    }
                    onClick={handleActive}
                >
                    <span className={classes.bar}></span>
                    <span className={classes.bar}></span>
                    <span className={classes.bar}></span>
                </div>
                <div className={classes.logo}>
                    <h2>Health Connect</h2>
                </div>
                <div className={classes.userprofile}>
                    <p>{newUser ? newUser.fullname : ""}</p>
                    <img src={image} className={classes.userProfilePic} />
                </div>
            </nav>
        </div>
    );
}
