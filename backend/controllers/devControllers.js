const Admin = require("../model/adminModel");

const addAdmin = async (req, res) => {
  const { email, fullname, hospitalId } = req.body;
  try {
    const admin = await Admin.addAdmin(email, hospitalId, fullname);

    res.status(201).json({ admin });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = {
  addAdmin,
};
