import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HospitalApi from "../../../apis/HospitalApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/AddDoctor.module.css";
export default function AddDoctor() {
  const { user, newUser } = useAuthContext();
  console.log("ADD DOCTOR PAGE: USER", newUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    dob: "",
    gender: "Male",
    education: "",
    bma_id: "",
    specializations: "",
  });

  //   useEffect(() => {
  //     toast.onChange((payload) => {
  //       if (payload.status === "removed") {
  //         navigate("/hospital-dashboard/view-doctors");
  //       }
  //     });
  //   }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Handle Submit Function
  async function handleSubmit(e) {
    setLoading(true);
    setError(false);
    e.preventDefault();

    // Form Data Object
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    console.log("Form Data Example : ", formDataObject);
    if (formDataObject["dob"] == "") {
      setLoading(false);
      setError("Date of birth can't be empty");
      return;
    }

    try {
      console.log("TRY ENTERED");
      const response = await HospitalApi.post(
        "/add-one-doctor",
        {
          ...formDataObject,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("ADD DOCTOR API RESPONSE: ", response);
      setLoading(false);
      toast.success("Doctor added successfully successfully !! ", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1200, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
      });

      setFormData({
        fullname: "",
        email: "",
        contact: "",
        dob: "",
        gender: "Male",
        education: "",
        bma_id: "",
        specializations: "",
      });
    } catch (error) {
      setError(error.response.data.error);
      console.log("ADD DOCTOR API: ERROR", error.response.data.error);
      setLoading(false);
      setFormData({
        fullname: "",
        email: "",
        contact: "",
        dob: "",
        gender: "Male",
        education: "",
        bma_id: "",
        specializations: "",
      });
    }
  }
  return (
    <>
      {" "}
      <div>
        <div className={classes["add-from-csv"]}>
          <Link
            className={classes["add-from-csv-btn"]}
            to="/hospital-dashboard/add-doctor/add-csv"
          >
            Add From CSV
          </Link>
        </div>
        <form
          action=""
          className={classes["add-doctor-form"]}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="fullname"
            id="doctor-name"
            placeholder="Doctor Name"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <div className={classes["date-gender"]}>
            <input
              type="date"
              name="dob"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <input
            type="text"
            name="education"
            value={formData.education}
            onChange={handleChange}
            id="doctor-education"
            placeholder="Educational Qualification"
            required
          />
          <input
            type="text"
            name="bma_id"
            value={formData.bma_id}
            onChange={handleChange}
            id="bma"
            placeholder="BMA ID"
            required
          />
          <input
            type="text"
            name="specializations"
            value={formData.specializations}
            onChange={handleChange}
            id="specialization"
            placeholder="Specialization"
            required
          />

          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
          )}

          <input type="submit" value="Add Doctor" disabled={loading} />
        </form>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
