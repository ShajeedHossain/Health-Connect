const User = require("../model/userModel");
const Doctor = require("../model/doctorModel");
const jwt = require("jsonwebtoken");
const {
  convertTimeToDateTime,
  calculateAge,
  isHHMMFormat,
  isCommaSeparatedWithoutSpaces,
  containsValidNumber,
} = require("../utilities/utilities");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const updateDoctor = async (req, res) => {
  let emailFlag = false;
  let passwordFlag = false;
  let newToken = null;
  let hashedPassword;
  const {
    email,
    fullName,
    dob,
    education,
    specializations,
    appointment_fees,
    available_days,
    morning_shift_time,
    evening_shift_time,
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
    if (morning_shift_time && !isHHMMFormat(morning_shift_time)) {
      throw Error("Shift time must be in ( HH:MM ) format ");
    }
    if (evening_shift_time && !isHHMMFormat(evening_shift_time)) {
      throw Error("Shift time must be in ( HH:MM ) format ");
    }
    if (email && !validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    if (appointment_fees && !containsValidNumber(appointment_fees)) {
      throw Error("Please provide valid fees value");
    }
    console.log(isCommaSeparatedWithoutSpaces(specializations));
    if (specializations && !isCommaSeparatedWithoutSpaces(specializations)) {
      throw Error("Specializations must be comma seperated");
    }
    if (available_days && !isCommaSeparatedWithoutSpaces(available_days)) {
      throw Error("Available days must be comma seperated");
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

    const currentDoctor = await Doctor.findById(_id);
    const currentUser = await User.findById(_id);

    if (passwordFlag) {
      const match = await bcrypt.compare(currentPassword, currentUser.password);

      if (!match) {
        throw Error("Invalid password");
      }
    }

    if (email && currentDoctor.email !== email && currentUser.email !== email) {
      const doctorExist = await Doctor.findOne({
        email,
      });
      const userExist = await User.findOne({ email });
      if (doctorExist || userExist) {
        throw Error("Email already in use");
      }
      emailFlag = true;
    }

    const updateData = {
      $set: {},
    };

    if (education) {
      updateData.$set.education = education;
    }
    if (appointment_fees) {
      updateData.$set.appointment_fees = appointment_fees;
    }

    if (available_days) {
      updateData.$set.available_days = available_days.split(",");
    }

    if (specializations) {
      console.log(specializations.split(","));
      updateData.$set.specializations = specializations.split(",");
    }

    if (fullName) {
      updateData.$set.fullName = fullName;
    }

    if (morning_shift_time) {
      updateData.$set.morning_shift_time =
        convertTimeToDateTime(morning_shift_time);
    }
    if (evening_shift_time) {
      updateData.$set.evening_shift_time =
        convertTimeToDateTime(evening_shift_time);
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

    if (district || town || latitude || longitude) {
      updateData.$set.address = address;
    }

    const result = await Doctor.findByIdAndUpdate(
      new mongoose.Types.ObjectId(_id),
      updateData,
      { new: true } // Return the updated document
    );

    result.save();

    //Updating the user schema if new email or password provided
    console.log("DOCTOR RESULT: ", result);
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
    if (district || town || latitude || longitude) {
      userUpdateData.$set.address = address;
    }
    if (fullName) {
      userUpdateData.$set.fullname = fullName;
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

module.exports = {
  updateDoctor,
};
