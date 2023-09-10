import classes from "../../styles/BookAHospitalSeat.module.css";
export default function BookAHospitalSeat() {
    return (
        <section className={classes["BookHospitalSeat"]}>
            <section className={classes["HospitalBookSeatPart"]}>
                <div className={classes["HospitalBookSeatPartHeading"]}>
                    <h2>Available Hospitals</h2>
                </div>

                <div className={classes["BookHospitalCards"]}>
                    <div className={classes["BookHospitalCard"]}>
                        <div className={classes["BookHospitalCard1strow"]}>
                            <h3>Hospital name:Ever Care Hospital</h3>
                            <h3>Specialized For:abc</h3>
                        </div>
                        <div className={classes["BookHospitalCard2ndrow"]}>
                            <h3>Cabin Type:Premium</h3>
                            <h3>Available Seat:10 </h3>
                            <h3>Location:Gulshan</h3>
                            <a href="#" className={classes["BookHospitalBtn"]}>
                                Book Seat
                            </a>
                        </div>
                    </div>

                    <div className={classes["BookHospitalCard"]}>
                        <div className={classes["BookHospitalCard1strow"]}>
                            <h3>Hospital name:Ever Care Hospital</h3>
                            <h3>Specialized For:abc</h3>
                        </div>
                        <div className={classes["BookHospitalCard2ndrow"]}>
                            <h3>Cabin Type:Premium</h3>
                            <h3>Available Seat:10 </h3>
                            <h3>Location:Gulshan</h3>

                            <a href="#" className={classes["BookHospitalBtn"]}>
                                Book Seat
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
