import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/login";
import Home from "./components/pages/Home";
import Signup from "./components/signup";
import { AuthContextProvider } from "./context/AuthContext";

// Import from Patient Dashboard
import Dashboard from "./components/Dashboard";
import BookAHospitalSeat from "./components/Patient/BookAHospitalSeat";
import TakeAppointment from "./components/Patient/TakeAppointment";
import Appointment from "./components/Patient/pages/Appointment";
import HospitalBooking from "./components/Patient/pages/HospitalBooking";
import Settings from "./components/Patient/pages/Settings";
import SeatBooking from "./components/Patient/pages/SeatBooking";
import AppointmentConfirmation from "./components/Patient/pages/AppointmentConfirmation";

// Import from Hospital Dashboard
import AddDoctor from "./components/Hospital/pages/AddDoctor";
import ViewDoctorList from "./components/Hospital/pages/ViewDoctorsList";
import SettingsHospital from "./components/Hospital/pages/SettingsHospital";
import IndividualDoctorSignup from "./components/IndividualDoctorSignup";
import DoctorSettings from "./components/Doctor/pages/DoctorSettings";

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/*" element={<PrivateRoute />}>
                        <Route
                            path="dashboard/*"
                            element={<Dashboard userType="patient" />}
                        >
                            <Route
                                path="appointment"
                                element={<Appointment />}
                            />
                            <Route
                                path="takeAppointment"
                                element={<TakeAppointment />}
                            />

                            <Route
                                path="takeAppointment/confirm-appointment"
                                element={<AppointmentConfirmation />}
                            />
                            <Route
                                path="hospitalBooking"
                                element={<HospitalBooking />}
                            />
                            <Route
                                path="hospitalBooking/bookseat"
                                element={<BookAHospitalSeat />}
                            />
                            <Route
                                path="hospitalBooking/bookseat/complete-reservation"
                                element={<SeatBooking />}
                            />

                            <Route path="settings" element={<Settings />} />
                        </Route>

                        <Route
                            path="hospital-dashboard/*"
                            element={<Dashboard userType="hospital" />}
                        >
                            <Route path="add-doctor" element={<AddDoctor />} />
                            <Route
                                path="view-doctors"
                                element={<ViewDoctorList />}
                            />
                            <Route
                                path="settings"
                                element={<SettingsHospital />}
                            />
                        </Route>

                        <Route
                            path="doctor-dashboard/*"
                            element={<Dashboard userType="doctor" />}
                        >
                            <Route
                                path="settings"
                                element={<DoctorSettings />}
                            />
                        </Route>
                    </Route>

                    <Route path="/*" element={<PublicRoute />}>
                        <Route path="signup" element={<Signup />} />
                        <Route
                            path="individual-signup"
                            element={<IndividualDoctorSignup />}
                        />
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
