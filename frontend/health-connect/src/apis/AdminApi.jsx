import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/admin`,
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

// const response = await AdminApi.post(
//     "/add-one-doctor",
// {
//     email,
//     fullname,
//     hospitalName,
//     dob,
//     hospitalId,
//     gender,
//     contact,
//     education,
//     specializations, //will be array
//     bma_id,
//     location,
//   } ,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );


/** Get previous reservations*/

// const response = await AdminApi.get(
//     "/get-previous-reservations",
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

/** Get upcoming reservations*/

// const response = await AdminApi.get(
//     "/get-upcoming-reservations",
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );





