import classes from "../../styles/SingleAppointment.module.css";
export default function SingleAppointment({ className }) {
    return (
        <div className={classes[className]}>
            <div className={classes["single-appoint-card_1strow"]}>
                <h3>Doctor name:abc</h3>
                <h3>Specialization:abc</h3>
                <h3>serial:03</h3>
            </div>
            <div className={classes["single-appoint-card_2ndrow"]}>
                <h3>location:abc</h3>
                <h3>date:08/09/2023</h3>
                <h3>status:done</h3>
            </div>
        </div>
    );
}
