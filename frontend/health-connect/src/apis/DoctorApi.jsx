import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/doctor`,
});

/** Doctor upcoming appointments*/

// const response = await PatientApi.get(
//     "/get-upcoming-appointments",
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** Doctor previous appointments*/

// const response = await PatientApi.get(
//     "/get-previous-appointments",
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** Get Doctor*/

// const response = await DoctorApi.get(
//     "/get-doctor",
//     {
//       headers: {
//         "Content-Type": "application/json",
// Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );
