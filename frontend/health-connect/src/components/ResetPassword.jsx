import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useResetPassword } from "../hooks/useResetPassword";
// import { useLogin } from "../hooks/useLogin";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { id, token } = useParams();

  const { resetPassword, error, isLoading } = useResetPassword();

  const navigate = useNavigate();

  useEffect(() => {
    toast.onChange((payload) => {
      if (payload.status === "removed") {
        navigate("/login");
      }
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const forgotResult = await resetPassword(password, id, token);
    if (forgotResult && !forgotResult.error) {
      toast.success("Password set successfully!! Going back to login page...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000, // Time in milliseconds to auto-close the toast (2 seconds in this case)
      });
    }
  };
  return (
    <>
      <section className="login-signup">
        <div className="login-signup-form">
          <h4 className="login-signup-title">Recover Password</h4>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="email">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
            {error && <p className="error">{error}</p>}
            <input
              type="submit"
              value="Update Password"
              // onClick={handleSubmit}
              disabled={isLoading}
            />
          </form>
        </div>
      </section>
      <ToastContainer position="top-right" />
    </>
  );
};
export default ResetPassword;
