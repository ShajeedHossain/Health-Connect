import axios from "axios";

export default axios.create({
    baseURL: `http://localhost:${
        import.meta.env.VITE_BACKEND_PORT
    }/api/patient`,
});

/* To use the api, import this file as PatientApi */
//just copy/paste the following functions inside try catch in the hooks
// will get the data in response.data if no error
//also must use useAuthContext hook in every page to check sessions
//start/end date time must be in format    YYYY-MM-DDT21:00:00   , then use new date(YYYY-MM-DDT21:00:00) before giving it in body

/** Updating patient information (height and weight optional)*/

// const response = await PatientApi.put(
//     "/update-patient",
//     {
//       email, fullname, dob, height, weight,gender, contact , district,
// town,
// latitude,
// longitude,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

/** Patient gets previous appointment*/

// const response = await PatientApi.get(
//     "/previous-appointment",
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** Patient gets upcoming appointments*/

// const response = await PatientApi.get(
//     "/upcoming-appointment",
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** Patient gets available appointments*/

// const response = await PatientApi.get(
//     "/get-all-appointment",
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** Patient gets hospital list*/

// const response = await PatientApi.get(
//     "/get-all-hospital",
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

// ******************************************
/** Patient adds appointment*/

// const response = await PatientApi.post(
//     "/add-appointment",
//     {
// doctorId,
// startTime,
// hospitalId,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

/** Patient add reservation*/

// HERE THE RESERVATION TYPE WILL BE "cabin" or "bed"
// HERE DATE WILL BE IN (YYYY-MM-DD) FORMAT CONVERSION IS DONE BACKEND

// const response = await PatientApi.post(
//     "/add-reservation",
//     {
// reservationType,
// reservationDate,
// hospitalId,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

/** Patient previous reservations*/

// const response = await PatientApi.get(
//     "/get-previous-reservation",
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** Patient upcoming reservations*/

// const response = await PatientApi.get(
//     "/get-upcoming-reservation",
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/** Update patient */
// const response = await PatientApi.post(
//     "/update-patient",
// { email, fullname, address, dob, height, weight, gender, contact }
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

/** Get patient data*/

// const response = await PatientApi.get(
//     "/get-patient",
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

/**Get the distance */
// const response = await PatientApi.post(
//     "/get-distance",
// {url},
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );
