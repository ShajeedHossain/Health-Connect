import classes from "../../styles/SingleAppointment.module.css";
export default function SingleAppointment({ className }) {
    return (
        <div className={classes[className]}>
            <div className={classes["single-appoint-card_1strow"]}>
                <p>Doctor name:abc</p>
                <p>Specialization:abc</p>
            </div>
            <div className={classes["single-appoint-card_2ndrow"]}>
                <p>location:abc</p>
                <p>serial:03</p>
                <p>date:08/09/2023</p>
                <p>status:done</p>
            </div>
        </div>
    );
}
