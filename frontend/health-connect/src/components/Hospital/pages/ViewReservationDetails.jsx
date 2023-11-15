import { useLocation } from "react-router-dom";
import classes from "../../../styles/ViewReservationDetails.module.css";
export default function ViewReservationDetails() {
    const location = useLocation();
    const { reservation, patientData } = location.state;
    console.log("RESERVATION DETAILS PAGE");
    console.log(reservation, patientData);
    //     {
    //     "_id": "6554b24d5103bd22dd787c3d",
    //     "reservationType": "cabins",
    //     "reservationCategory": "Deluxe",
    //     "hospitalId": "653abe4770cbee356712c3a9",
    //     "patientId": "6543e3b6032a009ecb80eb89",
    //     "reservationDate": "2023-11-16T00:00:00.000Z",
    //     "additional_requirements": [
    //         "stretcher",
    //         "wheelchair",
    //         "oxygen"
    //     ],
    //     "ambulance_address": null,
    //     "dischargeStatus": false,
    //     "__v": 0
    // }
    // {
    //     "_id": "6543e3b6032a009ecb80eb89",
    //     "fullName": "Shajeed Hossain",
    //     "email": "shakun650@gmail.com",
    //     "weight": 88,
    //     "height": 1.6,
    //     "address": {
    //         "district": "Gazipur District",
    //         "town": "Kalmeshwar",
    //         "latitude": 23.9490678,
    //         "longitude": 90.3803104
    //     },
    //     "bmi": 343750,
    //     "age": 22,
    //     "__v": 0,
    //     "contact": "0171428888",
    //     "gender": "Male",
    //     "dob": "2001-08-08T00:00:00.000Z"
    // }

    const { fullName, email } = patientData;
    return (
        <div className={`${classes["reservation-details"]}`}>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>Patient Details</th>
                    </tr>
                </thead>

                <tr>
                    <td>Patient Name: </td>
                    <td>{fullName}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{email}</td>
                </tr>
            </table>
        </div>
    );
}
