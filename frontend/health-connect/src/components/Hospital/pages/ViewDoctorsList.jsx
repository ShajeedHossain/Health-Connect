import { useAuthContext } from "../../../hooks/useAuthContext";
import { useDoctorList } from "../../../hooks/useDoctorList";
import classes from "../../../styles/TakeAppointment.module.css";
import SingleDoctorHospital from "../SingleDoctorHospital";

export default function ViewDoctorList() {
    const { user } = useAuthContext();
    console.log("user : ", user);

    /**
     *  Problem : Doctors list are not getting based on hospital
     *  Suggested Change: Must be pass parameter from here to hook useDoctorList that will make query based on that parameter, for patient side the parameter maybe blank and get every doctor list.
     */
    const { doctorData, doctorLoading, doctorError } = useDoctorList(user);
    console.log("TAKE APPOINTMENT PAGE : DOCTOR DATA", doctorData);
    const { doctorList } = doctorData;

    console.log("Take Appointment Data  from hook: ", doctorData);
    return (
        <section className={classes["take-appointment-part"]}>
            <section className={classes["doc-upcoming-apoint-chk-part"]}>
                <div className={classes["doc-upcoming-apoint-check-heading"]}>
                    <h2>Available Doctor</h2>
                </div>

                <div className={classes["doc-upcoming-appoint-check-cards"]}>
                    {!doctorLoading &&
                        !doctorError &&
                        doctorList.map((singleDoctor) => (
                            <SingleDoctorHospital
                                key={singleDoctor["_id"]}
                                user={user}
                                doctorData={singleDoctor}
                            />
                            // <SingleAppointment
                            //     key={singleAppointment["_id"]}
                            //     className="single-upappoint-card"
                            //     doctorDetails={singleAppointment}
                            //     loading={upcomingLoading}
                            // />
                        ))}
                </div>
            </section>
        </section>
    );
}
