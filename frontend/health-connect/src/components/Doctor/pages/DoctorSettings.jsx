import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  convertDateToTime,
  formatDateAndTime,
} from "../../../Utility/formateTime";
import DoctorApi from "../../../apis/DoctorApi";
import { useDoctorProfileInfo } from "../../../hooks/Doctor/useDoctorProfileInfo";
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

  const { doctorInfo, doctorLoading, doctorError } = useDoctorProfileInfo(user);

  console.log("Doctor Settings: ", doctorInfo);
  // {
  //     "_id": "653a7c4d153cf2c3f9867b80",
  //     "fullName": "Zannatul Samarukh Elma",
  //     "hospitalName": "Dhaka Medical College",
  //     "hospitalId": "653abe4770cbee356712c3a9",
  //     "education": "Not Applicable",
  //     "email": "ultimone4272@gmail.com",
  //     "dob": "1992-01-15T00:00:00.000Z",
  //     "gender": "Female",
  //     "contact": "01999999999",
  //     "specializations": [
  //         "Cardiologist",
  //         "Medicine"
  //     ],
  //     "address": {
  //         "district": "Dhaka",
  //         "town": "Shahbagh",
  //         "latitude": "23.71653",
  //         "longitude": "90.39578"
  //     },
  //     "bma_id": "002",
  //     "appointment_fees": "1800",
  //     "available_days": [
  //         "Sunday",
  //         "Tuesday",
  //         "Friday"
  //     ],
  //     "morning_shift_time": "2023-10-26T09:00:00.681Z",
  //     "evening_shift_time": "2023-10-26T19:00:00.682Z",
  //     "availability": true,
  //     "age": 31,
  //     "__v": 0
  // }

  const [prevDoctorData, setPrevDoctorData] = useState();
  useEffect(() => {
    const tempData = {
      fullName: doctorInfo?.doctor?.fullName,
      email: doctorInfo?.doctor?.email,
      contact: doctorInfo?.doctor?.contact,
      dob: doctorInfo?.doctor?.dob,
      gender: doctorInfo?.doctor?.gender,
      education: doctorInfo?.doctor?.education,
      specializations: doctorInfo?.doctor?.specializations,
      appointment_fees: doctorInfo?.doctor?.appointment_fees,
      address: doctorInfo?.doctor?.address,
      bma_id: doctorInfo?.doctor?.bma_id,
      available_days: doctorInfo?.doctor?.available_days,
      morning_shift_time: doctorInfo?.doctor?.morning_shift_time,
      evening_shift_time: doctorInfo?.doctor?.evening_shift_time,
    };

    setPrevDoctorData(tempData);
    console.log("WORKED");
  }, [doctorInfo]);
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
    formDataObject["specializations"] = formDataObject[
      "specializations"
    ].replace(/\s*,\s*/g, ",");
    formDataObject["morning_shift_time"] = formDataObject[
      "morning_shift_time"
    ].substring(0, 5);
    formDataObject["evening_shift_time"] = formDataObject[
      "evening_shift_time"
    ].substring(0, 5);
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

  function handleChange(e) {
    const { name, value } = e.target;
    setPrevDoctorData({
      ...prevDoctorData,
      [name]: value,
    });
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
          <label htmlFor="doctor-name">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="doctor-name"
            placeholder={`Doctor Name:`}
            value={prevDoctorData?.fullName}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={`Email:`}
            value={prevDoctorData?.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label htmlFor="contact">Contact Number</label>
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="Contact Number"
            value={prevDoctorData?.contact}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div className={classes["date-gender"]}>
            <div>
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={formatDateAndTime(prevDoctorData?.dob).date}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div>
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                value={prevDoctorData?.gender}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <label htmlFor="education">Educational Qualification</label>
          <input
            type="text"
            name="education"
            id="education"
            placeholder="Educational Qualifications"
            value={prevDoctorData?.education}
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <label htmlFor="specializations">Specializations</label>
          <input
            type="text"
            name="specializations"
            id="specializations"
            placeholder="Specializations (e.g. Medicine,Cardiologist)"
            value={prevDoctorData?.specializations?.map((sp) => sp).join(", ")}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div className={classes["date-gender"]}>
            {/* <input type="text" name="bma" id="contact" placeholder="BMA ID" /> */}
            <div>
              <label htmlFor="availabe_days">
                Days available (e.g. Sunday,Monday)
              </label>
              <input
                type="text"
                name="availabe_days"
                id="availabe_days"
                placeholder="Days available (e.g. Sunday,Monday)"
                value={prevDoctorData?.available_days
                  ?.map((data) => data)
                  .join(", ")}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div>
              <label htmlFor="fees">Fees</label>
              <input
                type="text"
                name="fees"
                id="fees"
                placeholder="Fees (in taka e.g. 1800)"
                value={prevDoctorData?.appointment_fees}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div className={classes["date-gender"]}>
            {/* <input type="text" name="bma" id="contact" placeholder="BMA ID" /> */}
            <div>
              <label htmlFor="morning_shift_time">
                Morning Shift Time ( HH:MM ) format
              </label>
              <input
                type="time"
                name="morning_shift_time"
                id="morning_shift_time"
                placeholder="Morning Shift Time ( HH:MM ) format"
                value={convertDateToTime(prevDoctorData?.morning_shift_time)}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div>
              <label htmlFor="evening shift time">
                Evening Shift Time ( HH:MM ) format
              </label>
              <input
                type="time"
                name="evening_shift_time"
                id="evening_shift_time"
                placeholder="Evening Shift Time ( HH:MM ) format"
                value={convertDateToTime(prevDoctorData?.evening_shift_time)}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div className={classes["date-gender"]}>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                value={
                  addressField
                    ? addressField
                    : `${prevDoctorData?.address?.town}, ${prevDoctorData?.address?.district}`
                }
                disabled
              />
            </div>
            <div>
              <label style={{ visibility: "hidden" }} htmlFor="">
                TEMP BUTTON
              </label>
              <input
                type="button"
                value="Get Current Location"
                onClick={getAddress}
              />
            </div>
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
