import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HospitalApi from "../../../apis/HospitalApi";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/HospitalCreateAccount.module.css";
export default function HospitalCreateAccount() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    toast.onChange((payload) => {
      if (payload.status === "removed") {
        navigate("/hospital-dashboard/create-reservation");
      }
    });
  }, [navigate]);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Form Data Object
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    console.log("Form Data Example : ", formDataObject);

    try {
      const response = await HospitalApi.post(
        "/create-patient-account",
        formDataObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success(
        "Account created successfully !! Navigating to previous page...",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
        }
      );
      setLoading(false);

      console.log("CREATE ACCOUNT RESPONSE: ", response.data);
    } catch (err) {
      setLoading(false);
      console.log("CREATE ACCOUNT ERROR: ", err);
      setError(err.response.data.error);
    }
  }
  return (
    <>
      <div className={`${classes["hospital-create-account-page"]}`}>
        <h2>Create Account for Patient</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName">Patient Name</label>
            <input
              type="text"
              name="fullname"
              id="fullName"
              placeholder="Patient Name"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" placeholder="Email" />
          </div>
          <div>
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              name="contact"
              id="contact"
              placeholder="Contact"
            />
          </div>
          {error && (
            <p
              style={{
                color: "red",
                marginLeft: "280px",
                marginBottom: "10px",
              }}
            >
              {error}
            </p>
          )}
          <div>
            <input
              disabled={loading}
              type="submit"
              value="Create Account"
              className={`btn`}
            />
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}
