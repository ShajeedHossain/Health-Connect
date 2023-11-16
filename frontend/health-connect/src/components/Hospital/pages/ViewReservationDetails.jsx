import { useLocation } from "react-router-dom";
import classes from "../../../styles/ViewReservationDetails.module.css";
import _ from "lodash";
import { useHospitalProfileInfo } from "../../../hooks/Hospital/useHospitalProfileInfo";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useState } from "react";
import { formatDateAndTime } from "../../../Utility/formateTime";
export default function ViewReservationDetails() {
    const location = useLocation();
    const { user } = useAuthContext();
    const { reservation, patientData } = location.state;
    console.log("RESERVATION DETAILS PAGE");
    console.log(reservation, patientData);
    const { data, loading, error } = useHospitalProfileInfo(user);
    const [enableEdit, setEnableEdit] = useState(false);
    const hospital = data.hospital;
    const [editableData, setEditableData] = useState({});

    const [editedReservationType, setEditedReservationType] = useState();
    const [editedReservationDate, setEditedReservationDate] = useState();
    const [editedReservationCategory, setEditedReservationCategory] =
        useState();

    useState(() => {
        setEditedReservationType(reservation.reservationType);
        setEditedReservationCategory(reservation.reservationCategory);
        setEditedReservationDate(reservation.reservationDate);
    }, [reservation]);
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

    const { fullName, email, address, height, weight, bmi, gender } =
        patientData;

    function handleUpdate(e) {
        e.preventDefault();

        const tempObj = {
            ...reservation,
            reservationType: editedReservationType,
            reservationCategory: editedReservationCategory,
            reservationDate: editedReservationDate,
        };
        console.log("Edited Datea", tempObj);

        // api must be here
        setEnableEdit((prev) => !prev);
    }
    return (
        <div className={`${classes["reservation-details"]}`}>
            <table border={1} className={`${classes["details-info-table"]}`}>
                <thead>
                    <tr>
                        <th colSpan={2}>Patient Details</th>
                    </tr>
                </thead>

                <tr>
                    <td>Patient Name :</td>
                    <td>{fullName}</td>
                </tr>
                <tr>
                    <td>Email :</td>
                    <td>{email}</td>
                </tr>
                <tr>
                    <td>Address :</td>
                    <td>
                        {address.town}, {address.district}
                    </td>
                </tr>
                <tr>
                    <td>Height</td>
                    <td>{height}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>{weight}</td>
                </tr>
                <tr>
                    <td>BMI</td>
                    <td>{bmi}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>{gender}</td>
                </tr>
            </table>

            <form action="" onSubmit={handleUpdate}>
                <table
                    border={1}
                    className={`${classes["details-info-table"]}`}
                >
                    <thead>
                        <tr>
                            <th colSpan={2}>Reservation Details</th>
                        </tr>
                    </thead>

                    <tr>
                        <td>
                            <b>Reservation Type</b>
                        </td>
                        <td>
                            {enableEdit ? (
                                <select
                                    name="reservationType"
                                    id=""
                                    value={editedReservationType}
                                    onChange={(e) => {
                                        setEditedReservationType(
                                            e.target.value
                                        );
                                    }}
                                >
                                    <option value="cabins">Cabins</option>
                                    <option value="beds">Beds</option>
                                </select>
                            ) : (
                                _.capitalize(editedReservationType)
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Reservation Category</b>
                        </td>
                        <td>
                            {enableEdit && editedReservationType ? (
                                <select
                                    name="reservationType"
                                    id=""
                                    value={editedReservationType}
                                    onChange={(e) => {
                                        setEditedReservationCategory(
                                            e.target.value
                                        );
                                    }}
                                >
                                    {hospital?.[editedReservationType]?.map(
                                        (category, index) => (
                                            <option
                                                key={index}
                                                value={category.category}
                                            >
                                                {_.capitalize(
                                                    category.category
                                                )}
                                            </option>
                                        )
                                    )}
                                </select>
                            ) : (
                                _.capitalize(editedReservationCategory)
                            )}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <b>Reservation Date :</b>
                        </td>
                        <td>
                            {enableEdit ? (
                                <input
                                    type="date"
                                    name="reservationDate"
                                    id=""
                                    value={editedReservationDate}
                                    onChange={(e) => {
                                        setEditedReservationDate(
                                            new Date(e.target.value)
                                        );
                                    }}
                                />
                            ) : (
                                formatDateAndTime(reservation.reservationDate)
                                    .date
                            )}
                        </td>
                    </tr>
                </table>
                {enableEdit ? (
                    <input
                        className={`btn`}
                        type="submit"
                        value="Confirm Edit"
                    />
                ) : (
                    <button
                        className={`btn`}
                        onClick={() => setEnableEdit((prev) => !prev)}
                    >
                        Edit Data
                    </button>
                )}
            </form>
        </div>
    );
}
