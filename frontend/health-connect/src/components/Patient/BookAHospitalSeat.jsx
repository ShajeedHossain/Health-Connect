import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHospitalList } from "../../hooks/useHospitalList";
import classes from "../../styles/BookAHospitalSeat.module.css";

export default function BookAHospitalSeat() {
    const { user } = useAuthContext();
    const { data, loading, error } = useHospitalList(user);
    const hospitalList = data.hospitalList;
    console.log("HOSPITAL DATA : ", hospitalList);

    return (
        <section className={classes["BookHospitalSeat"]}>
            <section className={classes["HospitalBookSeatPart"]}>
                <div className={classes["HospitalBookSeatPartHeading"]}>
                    <h2>Available Hospitals</h2>
                </div>

                <div className={classes["BookHospitalCards"]}>
                    {hospitalList &&
                        !loading &&
                        hospitalList.map((hospital) => (
                            <div
                                className={classes["BookHospitalCard"]}
                                key={hospital._id}
                            >
                                <div
                                    className={
                                        classes["BookHospitalCard1strow"]
                                    }
                                >
                                    <p>
                                        Hospital name: {hospital.hospitalName}
                                    </p>
                                    <p>Email: {hospital.email}</p>
                                </div>
                                <div
                                    className={
                                        classes["BookHospitalCard2ndrow"]
                                    }
                                >
                                    <p>
                                        Address: {hospital.address.town},
                                        {hospital.address.district}
                                    </p>
                                    <p>
                                        Available Beds: {hospital.availableBeds}
                                    </p>
                                    <p>
                                        Available Cabins:{" "}
                                        {hospital.availableCabins}
                                    </p>
                                    <Link
                                        state={{
                                            hospitalId: hospital._id,
                                        }}
                                        to="/dashboard/hospitalBooking/bookseat/complete-reservation"
                                        className={classes["BookHospitalBtn"]}
                                    >
                                        Book Seat
                                    </Link>
                                </div>
                            </div>
                        ))}

                    {loading && <p>Loading...</p>}
                </div>
            </section>
        </section>
    );
}
