import classes from "../../styles/SingleDoctor.module.css";
export default function SingleDoctor() {
    return (
        <div className={classes["single-bookappoint-card"]}>
            <div className={classes["single-bookappoint-card_1strow"]}>
                <h3>Doctor name:abc</h3>
                <h3>Specialization:abc</h3>
            </div>
            <div className={classes["single-bookappoint-card_2ndrow"]}>
                <h3>location:abc</h3>
                <h3>date:08/09/2023</h3>
                <h3>Patient-Record:03</h3>
                <a
                    className={classes["appoint-book-btn"]}
                    href="./takeappointment.html"
                >
                    Book Appointment
                </a>
            </div>
        </div>
    );
}
