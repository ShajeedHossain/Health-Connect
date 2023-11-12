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

/** Get a doctors all appointment*/
//provide the doctor id in the id field in headers

// const response = await DoctorApi.get(
//     "/get-doctor-appointments",
//     {
//       headers: {
//         "Content-Type": "application/json",
// Authorization: `Bearer ${user.token}`,
// 'id': doctor.id,
//       },
//     }
//   );

//API: APPOINTMENT DONE API

// const response = await DoctorApi.put(
//   "/appointment-done",
//   { appointment_id, prescription },
//   {
//       headers: {
//           Authorization: `Bearer ${user.token}`,
//           "Content-Type": "application/json",
//       },
//   }
// );
