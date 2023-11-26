import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/dev`,
});

/* To use the api, import this file as DevApi */
//just copy/paste the following functions inside try catch in the hooks
// will get the data in response.data if no error
//also must use useAuthContext hook in every page to check sessions
//start/end date time must be in format    YYYY-MM-DDT21:00:00   , then use new date(YYYY-MM-DDT21:00:00) before giving it in body

/** Adding appointment info (town optional)*/


/** Adding hospital (town optional)*/

// const response = await DevApi.post(
//     "/add-hospital",
//     {
    // hospitalName,
    // district,
    // town,
    //latitude,
    //longitude,
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