import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/login";
import Home from "./components/pages/Home";
import Signup from "./components/signup";
import { AuthContextProvider } from "./context/AuthContext";
import Dashboard from "./components/pages/Dashboard";
import Appointment from "./components/dashboard/pages/Appointment";
import TakeAppointment from "./components/dashboard/TakeAppointment";

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route
                        path="/dashboard/appointment"
                        element={
                            <Dashboard>
                                <Appointment />
                            </Dashboard>
                        }
                    />

                    <Route
                        path="/dashboard/takeAppointment"
                        element={
                            <Dashboard>
                                <TakeAppointment />
                            </Dashboard>
                        }
                    />
                    <Route path="signup" element={<Signup />} />
                    <Route path="login" element={<Login />} />
                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/reset-password/:id/:token"
                        element={<ResetPassword />}
                    />
                </Routes>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
