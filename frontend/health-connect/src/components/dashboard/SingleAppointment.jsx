import classes from "../../styles/SingleAppointment.module.css";
export default function SingleAppointment({ className, doctorDetails }) {
    console.log("Doctor details ", doctorDetails);
    const { serial, startTime } =
        doctorDetails;

    const {doctorName,specializations,address}=doctorDetails.doctorData;

    console.log(typeof startTime);
    const date = new Date(startTime);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear().toString();
    console.log(`${day}-${month}-${year}`);
    const dayTime = `${day}-${month}-${year}`;
    return (
        <div className={classes[className]}>
            <div className={classes["single-appoint-card_1strow"]}>
                <p>Doctor name: {doctorName} </p>
                <p>
                    Specialization: {specializations.map((sp) => sp).join(", ")}
                </p>
            </div>
            <div className={classes["single-appoint-card_2ndrow"]}>
                {/* <p>Location: {`${address.town}, ${address.district}`}</p> */}
                <p>Serial: {serial}</p>
                <p>Date : {dayTime}</p>
                <p>status: done</p>
            </div>
        </div>
    );
}
