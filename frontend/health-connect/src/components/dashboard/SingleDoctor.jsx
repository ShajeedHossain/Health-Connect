import classes from "../../styles/SingleDoctor.module.css";
export default function SingleDoctor() {
    return (
        <div className={classes["single-bookappoint-card"]}>
            <div className={classes["single-bookappoint-card_1strow"]}>
                <p>Doctor name:abc</p>
                <p>Specialization:abc</p>
            </div>
            <div className={classes["single-bookappoint-card_2ndrow"]}>
                <p>location:abc</p>
                <p>date:08/09/2023</p>
                <p>Patient-Record:03</p>
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
