import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/hospital`,
});

/* To use the api, import this file as AdminApi */
//just copy/paste the following functions inside try catch in the hooks
// will get the data in response.data if no error
//also must use useAuthContext hook in every page to check sessions
//start/end date time must be in format    YYYY-MM-DDT21:00:00   , then use new date(YYYY-MM-DDT21:00:00) before giving it in body

/** Adding appointment info (town optional)*/

/** Adding hospital (town optional)*/

// const response = await AdminApi.post(
//     "/add-hospital",
//     {
// hospitalName,
// district,
// town,
// totalBeds,
// totalCabins,
// availableBeds,
// availableCabins,
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

/** Adding one doctor*/

// const response = await HospitalApi.post(
//     "/add-one-doctor",
// {
//     email,
//     fullname,
//     dob,
//     gender,
//     contact,
//     education,
//     specializations, //will be array
//     bma_id,
// district,
//   town,
//   latitude,
//   longitude,
// appointment_fees,
// morning_shift_time,
// evening_shift_time,
// available_days,
//   } ,
//     {
//       headers: {
//         "Content-Type": "application/json",
// Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** Get previous reservations*/

// const response = await AdminApi.get(
//     "/get-previous-reservations",
//     {
//       headers: {
//         "Content-Type": "application/json",
// Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** Get upcoming reservations*/

// const response = await AdminApi.get(
//     "/get-upcoming-reservations",
//     {
//       headers: {
//         "Content-Type": "application/json",
// Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** Get hospital doctor list*/

// const response = await HospitalApi.get(
//     "/get-doctors",
//     {
//       headers: {
//         "Content-Type": "application/json",
// Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** Get hospital*/

// const response = await HospitalApi.get(
//     "/get-hospital",
//     {
//       headers: {
//         "Content-Type": "application/json",
// Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** RESERVATION DONE API */

// const response = await HospitalApi.put(
//     "/discharge-patient",
// {    reservationId,
//     reservationType,
//     reservationCategory,
//     bill,
//     patient_email}
//     {
//       headers: {
//         "Content-Type": "application/json",
// Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** CREATING PATIENT ACCOUNT FOR PHYSICAL RESERVATION API */

// const response = await HospitalApi.post(
//     "/create-patient-account",
// { email, fullname, contact },
//     {
//       headers: {
//         "Content-Type": "application/json",
// Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );
