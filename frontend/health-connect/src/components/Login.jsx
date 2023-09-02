import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const navigate = useNavigate();

  useEffect(() => {
    toast.onChange((payload) => {
      if (payload.status === "removed") {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginResult = await login(email, password);
    if (loginResult && !loginResult.error) {
      toast.success("Login Successful !! Navigating to home page...", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500, // Time in milliseconds to auto-close the toast (0.5 seconds in this case)
      });
    }
  };

  return (
    <>
      <section className="login-signup">
        <div className="login-signup-form">
          <h3 className="login-signup-title">Login</h3>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link to="/forgot-password" className="link-with-hover">
              Forgot Password? Click here
            </Link>
            {error && <p className="error">{error}</p>}
            <input type="submit" value="Login" disabled={isLoading} />
          </form>
        </div>
      </section>
      <ToastContainer position="top-right" />
    </>
  );
};
export default Login;
