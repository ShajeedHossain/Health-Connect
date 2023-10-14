import { useLocation } from "react-router-dom";
import PatientApi from "../../../apis/PatientApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/SeatBooking.module.css";

export default function SeatBooking() {
    const { user } = useAuthContext();
    console.log("SEAT BOOKING PAGE");
    const location = useLocation();
    const { hospitalId } = location.state;
    console.log(hospitalId);

    async function handleConfirmation(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        formDataObject["hospitalId"] = hospitalId;
        console.log("Form Data Example : ", formDataObject);

        try {
            const response = await PatientApi.post(
                "/add-reservation",
                { ...formDataObject },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("SEAT BOOKING API: RESPONSE ", response);
        } catch (err) {
            console.log("SEAT BOOKING API: ERROR ", err);
        }
    }
    return (
        <div>
            <form
                action=""
                className={classes["seat-booking-form"]}
                onSubmit={handleConfirmation}
            >
                <div className={classes["reservation-type"]}>
                    <label htmlFor="cabin">
                        <input
                            type="radio"
                            name="reservationType"
                            id="cabin"
                            value="cabin"
                        />
                        Cabin
                    </label>
                    <label htmlFor="beds">
                        <input
                            type="radio"
                            name="reservationType"
                            id="beds"
                            value="bed"
                        />
                        Beds
                    </label>
                </div>

                <input type="date" name="reservationDate" id="" />
                <input type="submit" value="Confirm Reservation" />
            </form>
        </div>
    );
}
