import "./App.css";
import { Dashboard } from "./Components/Dashboard";
import { Login } from "./Components/Login";
import { AllAppointments } from "./Components/Patient/AllAppointments";
import { ViewAppointmentDetails } from "./Components/Patient/ViewAppointmentDetails";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthContextProvider } from "./Context/AuthContext";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom";

function App() {
    return (
        <div className={`App`}>
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<PrivateRoute />}>
                            <Route
                                path="dashboard/*"
                                element={<Dashboard userType="patient" />}
                            >
                                <Route
                                    path="all-appointment"
                                    element={<AllAppointments />}
                                ></Route>
                                <Route
                                    path="appointment-details"
                                    element={<ViewAppointmentDetails />}
                                ></Route>
                            </Route>
                        </Route>
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </div>
    );
}

export default App;
