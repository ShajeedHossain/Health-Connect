import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorApi from "../../../apis/DoctorApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useGetCurrentLatLng from "../../../hooks/useGetCurrentLatLng";
import classes from "../../../styles/Settings.module.css";

export default function DoctorSettings() {
  // Get Previous Data
  // const [data, loading, error] = usePatientProfileInfo();
  // console.log(data);

  const { user } = useAuthContext();

  const [fullNameField, setFullNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const { currentLatitude, currentLongitude, town, district } =
    useGetCurrentLatLng();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [addressField, setAddressField] = useState("");
  const getAddress = (e) => {
    e.preventDefault();
    setAddressField(`${town}, ${district}`);
  };

  useEffect(() => {
    toast.onChange((payload) => {
      if (payload.status === "removed") {
        navigate("/doctor-dashboard");
      }
    });
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    // Form Data Object
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    //TODO: Maybe need to check if town district is null
    formDataObject["town"] = town;
    formDataObject["district"] = district;
    formDataObject["latitude"] = currentLatitude;
    formDataObject["longitude"] = currentLongitude;
    console.log("Form Data Example : ", formDataObject);

    // [TODO] : API CALL HERE WITH FORMDATA
    try {
      const response = await DoctorApi.put("/update-doctor", formDataObject, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success(
        "Profile updated successfully !! Navigating to previous page...",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1200, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
        }
      );
      console.log("UPDATE API: RESPONSE ", response);
    } catch (err) {
      setError(err.response.data.error);
      setLoading(false);
      console.log("UPDATE API: ERROR ", err);
    }
  }
  return (
    <>
      {" "}
      <div>
        <form
          action=""
          className={classes["patient-profile-update-form"]}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="fullName"
            id="doctor-name"
            placeholder={`Doctor Name:`}
          />
          <input type="email" name="email" id="email" placeholder={`Email:`} />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="Contact Number"
          />
          <div className={classes["date-gender"]}>
            <input type="date" name="dob" id="dob" />
            <select name="gender" id="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <input
            type="text"
            name="education"
            id="contact"
            placeholder="Educational Qualifications"
          />

          <input
            type="text"
            name="specializations"
            id="contact"
            placeholder="Specializations (e.g. Medicine,Cardiologist)"
          />
          <div className={classes["date-gender"]}>
            {/* <input type="text" name="bma" id="contact" placeholder="BMA ID" /> */}
            <input
              type="text"
              name="availabe_days"
              id="contact"
              placeholder="Days available (e.g. Sunday,Monday)"
            />
            <input
              type="text"
              name="fees"
              id="contact"
              placeholder="Fees (in taka e.g. 1800)"
            />
          </div>
          <div className={classes["date-gender"]}>
            {/* <input type="text" name="bma" id="contact" placeholder="BMA ID" /> */}
            <input
              type="text"
              name="morning_shift_time"
              id="contact"
              placeholder="Morning Shift Time ( HH:MM ) format"
            />
            <input
              type="text"
              name="evening shift time"
              id="contact"
              placeholder="Evening Shift Time ( HH:MM ) format"
            />
          </div>
          <div className={classes["date-gender"]}>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              value={addressField ? addressField : ""}
              disabled
            />
            <input
              type="button"
              value="Get Current Location"
              onClick={getAddress}
            />
          </div>
          <label htmlFor="password">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            id="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Must provide to change password. Else keep empty"
          />
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Must provide to change password. Else keep empty"
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Must provide to change password. Else keep empty"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}

          <input disabled={loading} type="submit" value="Update Information" />
        </form>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
