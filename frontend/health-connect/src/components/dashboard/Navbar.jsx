import image from "../../assets/images/user.jpg";
import classes from "../../styles/Navbar.module.css";
export default function Navbar(props) {
    const { className } = props;
    return (
        <div className={className}>
            <nav>
                <div className={classes.hamburgerMenu}>
                    <span className={classes.bar}></span>
                    <span className={classes.bar}></span>
                    <span className={classes.bar}></span>
                </div>
                <div className={classes.logo}>
                    <h2>Health Connect</h2>
                </div>
                <div className={classes.userprofile}>
                    <img src={image} className={classes.userProfilePic} />
                </div>
            </nav>
        </div>
    );
}
