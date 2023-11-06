import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDoctorList } from "../../hooks/useDoctorList";
import classes from "../../styles/TakeAppointment.module.css";
import SingleDoctor from "./singleDoctor";

export default function TakeAppointment() {
    const [specializationList, setSpecializationList] = useState([]);
    const [distrcitList, setDistrictList] = useState([]);
    const { user } = useAuthContext();

    const {
        doctorData,
        doctorLoading,
        doctorError,
        specializationFilter,
        districtFilter,
        sortByDistance,
        setSpecializationFilter,
        setDistrictFilter,
        setSortByDistance,
    } = useDoctorList(user);
    const { doctorList } = doctorData;

    useEffect(() => {
        const allSpecialization = specializationList;
        const allDistrict = distrcitList;

        doctorList?.forEach((singleDoctor) => {
            singleDoctor.specializations.forEach((specialization) => {
                if (!allSpecialization.includes(specialization)) {
                    // Avoid duplicates
                    allSpecialization.push(specialization);
                }
            });
            if (!allDistrict.includes(singleDoctor.address.district)) {
                // Avoid duplicates
                allDistrict.push(singleDoctor.address.district);
            }
        });

        setSpecializationList(allSpecialization);
        setDistrictList(allDistrict);
    }, [doctorList, specializationList, distrcitList]);

    return (
        <section className={classes["take-appointment-part"]}>
            <div className="filter-field">
                <form>
                    <label htmlFor="filter-specialization">
                        Specializations :{" "}
                    </label>
                    <select
                        name="filter-specialization"
                        id="filter-specialization"
                        value={specializationFilter}
                        onChange={(e) => {
                            console.log(
                                "Specialization Value :",
                                e.target.value
                            );
                            setSpecializationFilter(e.target.value);
                        }}
                    >
                        {specializationList?.map((specialization) => (
                            <option key={specialization} value={specialization}>
                                {specialization}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="filter-district">District : </label>
                    <select
                        name="filter-district"
                        id="filter-district"
                        value={districtFilter}
                        onChange={(e) => {
                            console.log("District Value :", e.target.value);
                            setDistrictFilter(e.target.value);
                        }}
                    >
                        {distrcitList?.map((district) => (
                            <option key={district} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="filter-distance">Sort By Distance</label>
                    <input
                        type="checkbox"
                        name="filter-distance"
                        id="filter-distance"
                        checked={sortByDistance}
                        onChange={() => {
                            setSortByDistance((prev) => (prev ? 0 : 1));
                        }}
                    />
                </form>
            </div>

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
