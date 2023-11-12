import { useLoaderData, useLocation } from "react-router-dom";
import classes from "../../../styles/HospitalBill.module.css";
import { formatDateAndTime } from "../../../Utility/formateTime";
import { useEffect, useState } from "react";

export default function HospitalBill() {
    const location = useLocation();
    const { reservation, patientData } = location.state;
    const { fullName } = patientData;
    const { reservationDate, reservationFee } = reservation;

    const [bill, setBill] = useState({});
    const [editingMode, setEditingMode] = useState(false);

    useEffect(() => {
        const tempdata = { ...bill };
        tempdata["Patient Name"] = fullName;
        tempdata["Reservation Date"] = formatDateAndTime(reservationDate).date;
        tempdata["Discharge Date"] = formatDateAndTime(new Date()).date;
        tempdata["Reservation Bill"] =
            (new Date(reservationDate) - new Date()) * reservationFee;

        setBill(tempdata);
    }, [patientData]);
    const [newFieldKey, setNewFieldKey] = useState();
    const [newFieldValue, setNewFieldValue] = useState();

    useEffect(() => {
        const tempdata = { ...bill };
        console.log("USE EFFECT RUN EDITING MODE", editingMode);
        if (!editingMode && newFieldKey && newFieldValue) {
            console.log("Condition Also filled");
            setBill({ ...bill, [newFieldKey]: newFieldValue });
            setNewFieldKey("");
            setNewFieldValue("");
        }
    }, [editingMode]);

    function confirmBill(e) {
        console.log("BILL ", bill);
        // API MUST BE HERE
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

                {!editingMode && (
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
                {editingMode && (
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
