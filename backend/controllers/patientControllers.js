const jwt = require("jsonwebtoken");
const Patient = require("../model/patientModel");
const Doctor = require("../model/doctorModel");
const Hospital = require("../model/hospitalModel");
const fetchs = require("node-fetch");
const validator = require("validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const {
  generateSerial,
  generatePatientCount,
  calculateAge,
  calculateBMI,
} = require("../utilities/utilities");
const User = require("../model/userModel");
// const { formatDate } = require("../utilities/utilities.js");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const updatePatient = async (req, res) => {
  let emailFlag = false;
  let passwordFlag = false;
  let newToken = null;
  let hashedPassword;
  const {
    email,
    fullName,
    dob,
    height,
    weight,
    gender,
    contact,
    district,
    town,
    latitude,
    longitude,
    currentPassword,
    newPassword,
    confirmPassword,
  } = req.body;
  const address = {
    district,
    town,
    latitude,
    longitude,
  };
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    if (email && !validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    if (!currentPassword && (newPassword || confirmPassword)) {
      throw Error("Must provide current password to update password");
    } else if (currentPassword) {
      if (!newPassword) {
        throw Error("Provide the new password");
      }
      if (!confirmPassword) {
        throw Error("Provide the confirm password");
      }
      if (newPassword !== confirmPassword) {
        throw Error("Passwords don't match");
      }
      if (!validator.isStrongPassword(newPassword)) {
        throw Error("Password not strong enough");
      }
      passwordFlag = true;
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newPassword, salt);
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const currentPatient = await Patient.findById(_id);
    const currentUser = await User.findById(_id);

    if (passwordFlag) {
      const match = await bcrypt.compare(currentPassword, currentUser.password);

      if (!match) {
        throw Error("Invalid password");
      }
    }

    if (currentPatient.email !== email && currentUser.email !== email) {
      const patientExist = await Patient.findOne({
        email,
      });
      const userExist = await User.findOne({ email });
      if (patientExist || userExist) {
        throw Error("Email already in use");
      }
      emailFlag = true;
    }

    const updateData = {
      $set: {},
    };

    if (height) {
      updateData.$set.height = height;
    }

    if (weight) {
      updateData.$set.weight = weight;
    }

    if (fullName) {
      updateData.$set.fullName = fullName;
    }

    if (height && weight) {
      console.log(height, weight);
      updateData.$set.bmi = calculateBMI(height, weight);
    }

    if (email) {
      updateData.$set.email = email;
    }

    if (dob) {
      updateData.$set.dob = dob;
      updateData.$set.age = calculateAge(dob);
    }

    if (gender) {
      updateData.$set.gender = gender;
    }

    if (contact) {
      updateData.$set.contact = contact;
      console.log(contact);
    }

    if (address) {
      updateData.$set.address = address;
    }

    const result = await Patient.findByIdAndUpdate(
      new mongoose.Types.ObjectId(_id),
      updateData,
      { new: true } // Return the updated document
    );

    result.save();
    //Updating the user schema if new email or password provided
    console.log("PATIENT RESULT: ", result);
    const userUpdateData = {
      $set: {},
    };

    if (emailFlag) {
      userUpdateData.$set.email = email;
    }
    if (passwordFlag) {
      userUpdateData.$set.password = hashedPassword;
      newToken = generateToken(_id);
    }

    const userResult = await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(_id),
      userUpdateData,
      { new: true }
    );
    userResult.save();

    console.log("USER RESULT: ", userResult);

    res.status(200).json({ result, token: newToken });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// const getAllDoctor = async (req, res) => {
//   try {
//     const doctorList = await Doctor.getAllDoctor();
//     console.log(doctorList);

//     res.status(200).json({ doctorList });
//   } catch (error) {
//     res.status(400).json({
//       error: error.message,
//     });
//   }
// };

// const getSortedDoctorList = async (req, res) => {
//   try {
//     const doctorList = await Doctor.getAllDoctor();

//     for (const doctor of doctorList) {
//       const patientCount = await generatePatientCount(doctor._id); // May need to use generate serial for specific date
//       doctor.patientCount = patientCount;
//       Object.assign(doctor, { patientCount: patientCount });
//       console.log("DOCTOR", doctor);
//     }

//     doctorList.sort((a, b) => b.patientCount - a.patientCount); //reverse to get ascending sort

//     res.status(200).json({ doctorList });
//   } catch (error) {
//     res.status(400).json({
//       error: error.message,
//     });
//   }
// };

const getPatient = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const patient = await Patient.findById({ _id });
    console.log(patient);

    res.status(200).json({ patient });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const receiveMapUrl = async (req, res) => {
  const { url } = req.body;
  try {
    const response = await fetchs(url);
    const data = await response.json();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

async function calculateDistances(dataList, userLatitude, userLongitude) {
  const apiKey = "AIzaSyCw9Xz5vT5x6m8DTutXNygenRnDX8jIYXs"; // Replace with your API key

  try {
    // const dataList = await Doctor.getAllDoctor();
    const destinations = dataList
      .map((coord) => `${coord.address.latitude},${coord.address.longitude}`)
      .join("|");

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLatitude},${userLongitude}&destinations=${destinations}&key=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    //adding the distance in the dataList as property
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows[0].elements.length; i++) {
        const element = data.rows[0].elements[i];
        if (element.distance) {
          dataList[i].distance = element.distance.text.split(" ")[0];
        } else {
          dataList[i].distance = "Distance not available";
        }
      }
      // Sort the dataList by distance in ascending order
      dataList.sort((a, b) => {
        // Parse the distance text to compare numeric values
        const distanceA = parseFloat(a.distance);
        const distanceB = parseFloat(b.distance);

        // If both distances are valid numbers, compare them
        if (!isNaN(distanceA) && !isNaN(distanceB)) {
          return distanceA - distanceB;
        }

        // If one or both distances are not valid, move them to the end
        if (isNaN(distanceA) && isNaN(distanceB)) {
          return 0; // Preserve the order
        } else if (isNaN(distanceA)) {
          return 1; // Move a to the end
        } else {
          return -1; // Move b to the end
        }
      });
      return dataList;
    } else {
      console.log("No distance data available.");
    }

    // console.log(coordinatesArray);
  } catch (error) {
    console.error("Error:", error);
  }
}

const getSortedDoctorData = async (req, res) => {
  const { specializationFilter, districtFilter, sortByDistance } = req.body;
  const { authorization } = req.headers;
  console.log(req.body);

  const token = authorization.split(" ")[1];

  const query = {};

  // Check if district is provided and add it to the query
  if (districtFilter) {
    query["address.district"] = districtFilter;
  }

  // Check if a single specialization is provided and add it to the query
  if (specializationFilter) {
    query.specializations = specializationFilter;
  }
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const doctorData = await Doctor.find(query).lean();
    const patient = await Patient.findById({ _id });
    if (parseInt(sortByDistance)) {
      const doctorList = await calculateDistances(
        doctorData,
        patient.address.latitude,
        patient.address.longitude
      );
      //   console.log(doctorList);
      res.status(200).json({ doctorList }); //sorting on distance
      return;
    }

    res.status(200).json({ doctorList: doctorData }); //without sorting on distance
    return;
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getSortedHospitalData = async (req, res) => {
  const { districtFilter, sortByDistance } = req.body;
  const { authorization } = req.headers;
  console.log(req.body);
  const token = authorization.split(" ")[1];

  const query = {};

  // Check if district is provided and add it to the query
  if (districtFilter) {
    query["address.district"] = districtFilter;
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const hospitalData = await Hospital.find(query).lean();
    const patient = await Patient.findById({ _id });
    if (parseInt(sortByDistance)) {
      const hospitalList = await calculateDistances(
        hospitalData,
        patient.address.latitude,
        patient.address.longitude
      );
      //   console.log(hospitalList);
      res.status(200).json({ hospitalList }); //sorting on distance
      return;
    }

    res.status(200).json({ hospitalList: hospitalData }); //without sorting on distance
    return;
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  updatePatient,
  //   getAllDoctor,
  //   getSortedDoctorList,
  getPatient,
  receiveMapUrl,
  getSortedDoctorData,
  getSortedHospitalData,
};
