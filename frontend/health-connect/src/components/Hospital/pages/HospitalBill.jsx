import { useLoaderData, useLocation } from "react-router-dom";
import classes from "../../../styles/HospitalBill.module.css";
import { formatDateAndTime } from "../../../Utility/formateTime";
import { useEffect, useState } from "react";

import { useAuthContext } from "../../../hooks/useAuthContext";
import HospitalApi from "../../../apis/HospitalApi";
export default function HospitalBill() {
    const { user } = useAuthContext();
    const location = useLocation();
    const { reservation, patientData } = location.state;
    const { fullName } = patientData;
    const { reservationDate, reservationFee } = reservation;

    const [bill, setBill] = useState({});
    const [editingMode, setEditingMode] = useState(false);

    const [reservationDone, setReservationDone] = useState(
        reservation.dischargeStatus
    );

    useEffect(() => {
        const tempdata = { ...bill };
        tempdata["Patient Name"] = fullName;
        tempdata["Reservation Date"] = formatDateAndTime(reservationDate).date;
        tempdata["Discharge Date"] = formatDateAndTime(new Date()).date;
        tempdata["Reservation Bill"] =
            (new Date(reservationDate) - new Date()) * reservationFee || 0;

        setBill(tempdata);
    }, [patientData]);

    const [newFieldKey, setNewFieldKey] = useState();
    const [newFieldValue, setNewFieldValue] = useState();

    useEffect(() => {
        console.log("USE EFFECT RUN EDITING MODE", editingMode);
        if (!editingMode && newFieldKey && newFieldValue) {
            console.log("Condition Also filled");
            setBill({ ...bill, [newFieldKey]: newFieldValue });
            setNewFieldKey("");
            setNewFieldValue("");
        }
    }, [editingMode]);

    async function confirmBill(e) {
        console.log("BILL :", bill);
        console.log("Reservation: ", reservation);
        console.log("Patient Details: ", patientData);
        // API MUST BE HERE

        try {
            //
            const response = await HospitalApi.put(
                "/discharge-patient",
                {
                    reservationId: reservation._id,
                    reservationType: reservation.reservationType,
                    reservationCategory: reservation.reservationCategory,
                    bill,
                    patient_email: patientData.email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            console.log("Response from Bill update api", response);
            setReservationDone(true);
        } catch (err) {
            //
            console.log("Response from Bill Error ", err);
        }
    }
    return (
        <div className={`${classes["bill-page"]}`}>
            <div className={`${classes["bill-header"]}`}>
                <h2 style={{ textAlign: "center" }}>Hospital Bill</h2>

                <table>
                    {bill &&
                        Object.keys(bill)?.map((key, index) => (
                            <tr key={index}>
                                <td>
                                    <b>{key}</b>
                                </td>
                                <td>{`${bill[key]}`}</td>
                            </tr>
                        ))}
                    {editingMode && (
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="fieldName"
                                    id=""
                                    value={newFieldKey}
                                    onChange={(e) => {
                                        setNewFieldKey(e.target.value);
                                    }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="fieldValue"
                                    id=""
                                    value={newFieldValue}
                                    onChange={(e) => {
                                        setNewFieldValue(e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                    )}
                </table>

                {!editingMode && !reservationDone && (
                    <>
                        <button
                            className={`btn`}
                            onClick={() => {
                                setEditingMode(true);
                            }}
                        >
                            Add Field
                        </button>
                        <button className={`btn`} onClick={confirmBill}>
                            Confirm Bill
                        </button>
                    </>
                )}
                {editingMode && !reservationDone && (
                    <button
                        className={`btn`}
                        onClick={() => {
                            setEditingMode(false);
                        }}
                    >
                        Confirm Field
                    </button>
                )}
            </div>
        </div>
    );
}
