import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ResetPassword from "./components/ResetPassword";
import BookAHospitalSeat from "./components/dashboard/BookAHospitalSeat";
import TakeAppointment from "./components/dashboard/TakeAppointment";
import Appointment from "./components/dashboard/pages/Appointment";
import HospitalBooking from "./components/dashboard/pages/HospitalBooking";
import Login from "./components/login";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Signup from "./components/signup";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/*" element={<PrivateRoute />}>
                        <Route path="dashboard/*" element={<Dashboard />}>
                            <Route
                                path="appointment"
                                element={<Appointment />}
                            />
                            <Route
                                path="takeAppointment"
                                element={<TakeAppointment />}
                            />
                            <Route
                                path="hospitalBooking"
                                element={<HospitalBooking />}
                            />
                            <Route
                                path="hospitalBooking/bookseat"
                                element={<BookAHospitalSeat />}
                            />
                        </Route>
                    </Route>

                    <Route path="/*" element={<PublicRoute />}>
                        <Route path="signup" element={<Signup />} />
                        <Route path="login" element={<Login />} />
                        <Route
                            path="forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="reset-password/:id/:token"
                            element={<ResetPassword />}
                        />
                    </Route>
                </Routes>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
