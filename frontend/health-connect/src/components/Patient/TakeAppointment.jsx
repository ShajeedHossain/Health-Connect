import { useEffect, useState } from "react";
import PatientApi from "../../apis/PatientApi";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDoctorList } from "../../hooks/useDoctorList";
import classes from "../../styles/TakeAppointment.module.css";
import SingleDoctor from "./singleDoctor";

export default function TakeAppointment() {
    const { user } = useAuthContext();
    console.log("user : ", user);

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

                <div className={classes["doctorList-cards"]}>
                    {!doctorLoading &&
                        !doctorError &&
                        doctorList?.map((singleDoctor) => (
                            <SingleDoctor
                                key={singleDoctor["_id"]}
                                user={user}
                                doctorData={singleDoctor}
                            />
                        ))}
                </div>
            </section>
        </section>
    );
}
