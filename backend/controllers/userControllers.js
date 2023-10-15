const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const nodemailer = require("nodemailer");
const Patient = require("../model/patientModel");

//Get user data
const getUser = async (req, res) => {
  try {
    // console.log(req.user);
    const user = await User.findById(req.user).select("-password"); //excluding password
    // console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

//Token Generation
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//Signup Function
const checkSignup = async (req, res) => {
  const { email, fullname, password, district, town } = req.body;
  try {
    const patientExists = await Patient.findOne({ email });
    if (patientExists) {
      throw Error("Email already in use");
    }

    const address = { district: district, town: town };
    // console.log('User 1');
    const user = await User.signup(email, password, fullname, address); //here assume address is district
    const patient = await Patient.create({
      _id: user._id,
      email,
      fullName: fullname,
      address,
    });
    // console.log('User ');
    //create a token
    const token = generateToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

//Login Function
const checkLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create a token
    const token = generateToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

//Check email for verification
const checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.checkEmail(email);

    //create a token
    const token = generateToken(user._id);

    //sending the token
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_MAIL,
        pass: process.env.APP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: process.env.APP_MAIL,
      to: user.email,
      subject: "Health-Connect password recovery",
      text: `Click the link to continue recovery-  http://localhost:5173/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Email sending failed" });
      } else {
        return res.status(200).json({ status: "Success" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

//Update password
const updatePassword = async (req, res) => {
  const { password } = req.body;
  const { id, token } = req.params;

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(400).json({ status: err.message });
    } else {
      try {
        const user = await User.updatePassword(password, id);
        // console.log(user.email);

        res.status(201).json(user.email);
      } catch (error) {
        res.status(401).json({
          error: error.message,
        });
      }
    }
  });
};

module.exports = {
  checkLogin,
  getUser,
  checkSignup,
  //   getSignup,
  checkEmail,
  updatePassword,
};
