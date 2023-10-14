// // const jwt = require("jsonwebtoken");
// // const User = require("../model/userModel");
// const Doctor = require("../model/doctorModel");
// // const { formatDate } = require("../utilities/utilities.js");

// // fullName,
// // hospitalName, //given by admin of the hospital
// // hospitalId, //given by admin of the hospital
// // dob,
// // education,
// // gender,
// // contact

// const createDoctorSignup = async (req, res) => {
//   const {
//     email,
//     fullname,
//     dob,
//     hospitalId,
//     gender,
//     contact,
//     education,
//     specializations,
//     bma_id,
//     location,
//   } = req.body;
//   //   const { authorization } = req.headers;
//   //   const token = authorization.split(" ")[1];
//   const specializationsList = specializations.split(",");
//   try {
//     // const { _id } = jwt.verify(token, process.env.JWT_SECRET);

//     const doctor = await Doctor.addOneDoctor(
//       fullname,
//       hospitalId,
//       dob,
//       education,
//       gender,
//       contact,
//       email,
//       specializationsList,
//       bma_id,
//       location
//     );
//     console.log(doctor);
//     res.status(201).json({ doctor });
//   } catch (error) {
//     res.status(401).json({
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   createDoctorSignup,
// };
