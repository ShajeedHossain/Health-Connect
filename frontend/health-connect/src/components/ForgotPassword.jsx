import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForgotPassword } from "../hooks/useForgotPassword";
// import { useLogin } from "../hooks/useLogin";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { forgotPassword, error, isLoading } = useForgotPassword();

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

    const forgotResult = await forgotPassword(email);
    if (forgotResult && !forgotResult.error) {
      toast.success("Recovery link sent!! Going back to login page...", {
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
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {error && <p className="error">{error}</p>}

            <input
              type="submit"
              value="Recover"
              // onClick={handleSubmit}
              disabled={isLoading}
            />
            <center>
              <Link className="btn" to="/login">
                Back to login page
              </Link>
            </center>
          </form>
        </div>
      </section>
      <ToastContainer position="top-right" />
    </>
  );
};
export default ForgotPassword;
