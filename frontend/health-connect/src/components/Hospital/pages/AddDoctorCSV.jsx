import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import classes from "../../../styles/AddDoctor.module.css";

export default function AddDoctorCSV() {
    const [csvData, setCsvData] = useState([]);
    const [editableData, setEditableData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const fileInputRef = React.createRef();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // You can save the updated data to your backend or update the state as needed.
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset the editable data back to the original data.
        setEditableData([...csvData]);
    };

    const handleDataChange = (e, rowIndex, field) => {
        const updatedData = [...editableData];
        updatedData[rowIndex][field] = e.target.value;
        setEditableData(updatedData);
    };

    const handleFileUpload = (e) => {
        console.log(fileInputRef.current);
        fileInputRef.current.innerText = "Upload Complete";
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: (result) => {
                    setCsvData(result.data);
                    setEditableData(result.data);
                },
            });
        }
    };

    return (
        <div>
            <div className={classes["input-panal"]}>
                <div className={classes["file-input-container"]}>
                    {isEditing ? (
                        <button onClick={handleSave}>Save</button>
                    ) : (
                        <button onClick={handleEdit}>Edit</button>
                    )}

                    {isEditing && (
                        <button onClick={handleCancel}>Cancel</button>
                    )}
                    <input
                        type="file"
                        id="file"
                        accept=".csv"
                        className={classes["file-input"]}
                        onChange={handleFileUpload}
                    />
                    <label
                        htmlFor="file"
                        className={classes["file-label"]}
                        ref={fileInputRef}
                    >
                        Choose a File
                    </label>
                    <span className={classes["file-name"]}></span>
                </div>
            </div>

            <div className={classes["input-data-table"]}>
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>BMA ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editableData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={row.fullName}
                                            onChange={(e) =>
                                                handleDataChange(
                                                    e,
                                                    rowIndex,
                                                    "fullName"
                                                )
                                            }
                                        />
                                    ) : (
                                        row.fullName
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={row.email}
                                            onChange={(e) =>
                                                handleDataChange(
                                                    e,
                                                    rowIndex,
                                                    "email"
                                                )
                                            }
                                        />
                                    ) : (
                                        row.email
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={row.bma_id}
                                            onChange={(e) =>
                                                handleDataChange(
                                                    e,
                                                    rowIndex,
                                                    "bma_id"
                                                )
                                            }
                                        />
                                    ) : (
                                        row.bma_id
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
