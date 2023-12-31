import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HospitalApi from "../../../apis/HospitalApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/AddDoctor.module.css";

export default function AddDoctorCSV() {
  const [csvData, setCsvData] = useState([]);
  const [editableData, setEditableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

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

  useEffect(() => {
    toast.onChange((payload) => {
      if (payload.status === "removed") {
        navigate("/hospital-dashboard");
      }
    });
  }, [navigate]);

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
          console.log(result.data);
          setEditableData(result.data);
        },
      });
    }
  };

  async function submitConfirmedData(e) {
    e.preventDefault();

    try {
      const response = await HospitalApi.post(
        "/add-many-doctor",
        editableData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(
        "File uploaded succesfully successfully !! Navigating to previous page...",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1200, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
        }
      );
      console.log("ADD MANY DOCTOR RESPONSE: ", response);
    } catch (err) {
      setError(err.response.data.failedEmails);
      setCsvData("");
      console.log("ADD MANY DOCTOR ERROR:  ", err.response.data.failedEmails);
    }

    // Editable data is the final data. Use this for entry in the api
    // console.log(editableData);
  }

  return (
    <>
      <div>
        <div className={classes["input-panal"]}>
          <div className={classes["file-input-container"]}>
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}

            {isEditing && <button onClick={handleCancel}>Cancel</button>}
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
            <Link
              className={classes["btn"]}
              to="https://drive.google.com/file/d/1hwTNkFCnbf33ofjTTtKVx0A2BxdM5sl6/view?usp=sharing"
              target="_blank"
            >
              CSV Format Example
            </Link>
          </div>
        </div>

        {csvData.length > 0 && (
          <div className={classes["input-data-table"]}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>Full Name</th>
                  <th style={{ width: "15%" }}>Email</th>
                  <th style={{ width: "10%" }}>Contact</th>
                  <th>BMA ID</th>
                  <th>Education</th>
                  <th style={{ width: "15%" }}>Specialization</th>
                  <th>Fees</th>
                  <th style={{ width: "15%" }}>Days</th>
                  <th>Morning Time</th>
                  <th>Evening Time</th>
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
                            handleDataChange(e, rowIndex, "fullName")
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
                            handleDataChange(e, rowIndex, "email")
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
                          value={row.contact}
                          onChange={(e) =>
                            handleDataChange(e, rowIndex, "contact")
                          }
                        />
                      ) : (
                        row.contact
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={row.bma_id}
                          onChange={(e) =>
                            handleDataChange(e, rowIndex, "bma_id")
                          }
                        />
                      ) : (
                        row.bma_id
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={row.education}
                          onChange={(e) =>
                            handleDataChange(e, rowIndex, "education")
                          }
                        />
                      ) : (
                        row.education
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={row.specializations}
                          onChange={(e) =>
                            handleDataChange(e, rowIndex, "specializations")
                          }
                        />
                      ) : (
                        row.specializations
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={row.appointment_fees}
                          onChange={(e) =>
                            handleDataChange(e, rowIndex, "appointment_fees")
                          }
                        />
                      ) : (
                        row.appointment_fees
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={row.available_days}
                          onChange={(e) =>
                            handleDataChange(e, rowIndex, "available_days")
                          }
                        />
                      ) : (
                        row.available_days
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={row.morning_shift_time}
                          onChange={(e) =>
                            handleDataChange(e, rowIndex, "morning_shift_time")
                          }
                        />
                      ) : (
                        row.morning_shift_time
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          value={row.evening_shift_time}
                          onChange={(e) =>
                            handleDataChange(e, rowIndex, "evening_shift_time")
                          }
                        />
                      ) : (
                        row.evening_shift_time
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className={classes["btn"]} onClick={submitConfirmedData}>
              Confirm Data
            </button>
          </div>
        )}

        {error.length > 0 && (
          <div className={classes["input-data-table"]}>
            <p style={{ color: "red" }}>Data Already Exists</p>
            <table>
              <tbody>
                {error.map((email, index) => (
                  <tr key={index}>
                    <td>{email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>{" "}
      <ToastContainer position="top-right" />
    </>
  );
}
