import classes from "../../styles/SingleDoctor.module.css";
export default function SingleDoctor({ doctorData }) {
    console.log("Single doctor ", doctorData);
    const { fullName, specializations, hospitalName, email, contact } =
        doctorData;
    return (
        <div className={classes["single-bookappoint-card"]}>
            <div className={classes["single-bookappoint-card_1strow"]}>
                <p>Doctor name: {fullName}</p>
                <p>
                    Specialization: {specializations.map((sp) => sp).join(", ")}
                </p>
            </div>
            <div className={classes["single-bookappoint-card_2ndrow"]}>
                <p>Hospital: {hospitalName}</p>
                <p>Email: {email}</p>
                <p>Contact: {contact}</p>
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
