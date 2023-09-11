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
                            <p>Hospital name:Ever Care Hospital</p>
                            <p>Specialized For:abc</p>
                        </div>
                        <div className={classes["BookHospitalCard2ndrow"]}>
                            <p>Cabin Type:Premium</p>
                            <p>Available Seat:10 </p>
                            <p>Location:Gulshan</p>
                            <a href="#" className={classes["BookHospitalBtn"]}>
                                Book Seat
                            </a>
                        </div>
                    </div>

                    <div className={classes["BookHospitalCard"]}>
                        <div className={classes["BookHospitalCard1strow"]}>
                            <p>Hospital name:Ever Care Hospital</p>
                            <p>Specialized For:abc</p>
                        </div>
                        <div className={classes["BookHospitalCard2ndrow"]}>
                            <p>Cabin Type:Premium</p>
                            <p>Available Seat:10 </p>
                            <p>Location:Gulshan</p>

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
