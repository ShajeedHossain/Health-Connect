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
import AppointmentConfirmation from "./components/Patient/pages/AppointmentConfirmation";
import HospitalBooking from "./components/Patient/pages/HospitalBooking";
import SeatBooking from "./components/Patient/pages/SeatBooking";
import Settings from "./components/Patient/pages/Settings";

// Import from Hospital Dashboard
import DoctorPrescription from "./components/Doctor/pages/DoctorPrescription";
import DoctorPreviousHistory from "./components/Doctor/pages/DoctorPreviousHistory";
import DoctorSettings from "./components/Doctor/pages/DoctorSettings";
import DoctorViewAllAppointment from "./components/Doctor/pages/DoctorViewAllAppointment";
import AddDoctor from "./components/Hospital/pages/AddDoctor";
import AddDoctorCSV from "./components/Hospital/pages/AddDoctorCSV";
import HospitalBill from "./components/Hospital/pages/HospitalBill";
import HospitalViewAllReservation from "./components/Hospital/pages/HospitalViewAllReservation";
import SettingsHospital from "./components/Hospital/pages/SettingsHospital";
import ViewDoctorList from "./components/Hospital/pages/ViewDoctorsList";
import ViewReservationDetails from "./components/Hospital/pages/ViewReservationDetails";
import IndividualDoctorSignup from "./components/IndividualDoctorSignup";
import ChatBox from "./components/pages/ChatBox";
import DoctorChatBox from "./components/Doctor/pages/DoctorChatBox";
import ViewAllPrescriptions from "./components/Patient/pages/ViewAllPrescriptions";

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
                            <Route path="chat-box" element={<ChatBox />} />
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
                                path="view-prescriptions"
                                element={<ViewAllPrescriptions />}
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
                                path="view-reservations"
                                element={<HospitalViewAllReservation />}
                            />
                            <Route
                                path="settings"
                                element={<SettingsHospital />}
                            />
                            <Route
                                path="prepare-bill"
                                element={<HospitalBill />}
                            />
                            <Route
                                path="reservation-details"
                                element={<ViewReservationDetails />}
                            />
                            <Route
                                path="add-doctor/add-csv"
                                element={<AddDoctorCSV />}
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
                            <Route
                                path="chat-box"
                                element={<DoctorChatBox />}
                            />
                            <Route
                                path="view-appointments"
                                element={<DoctorViewAllAppointment />}
                            />
                            <Route
                                path="prescription"
                                element={<DoctorPrescription />}
                            />
                            <Route
                                path="previous-history"
                                element={<DoctorPreviousHistory />}
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
