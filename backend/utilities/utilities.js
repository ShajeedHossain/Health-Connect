const AppointmentTaken = require("../model/appointmentTakenModel");

//Utility function to formate date in (DD-MM-YYYY)
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0"); // Get the day with leading zeros
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month with leading zeros (Months are 0-indexed, so we add 1)
  const year = date.getFullYear(); // Get the year

  return `${day}-${month}-${year}`;
}

//Utility function to generate serial
const generateSerial = async (start, doctorId) => {
  const count = await AppointmentTaken.countDocuments({
    doctorId: doctorId,
    startTime: {
      $gte: new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        0,
        0,
        0
      ),
      $lt: new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + 1,
        0,
        0,
        0
      ),
    },
  });
  return count;
};

//Utility function to generate patient count
const generatePatientCount = async (doctorId) => {
  const count = await AppointmentTaken.countDocuments({
    doctorId: doctorId,
  });
  return count;
};

//to convert yyyy-mm-dd to date object
function convertToDateObject(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Month is 0-based, so subtract 1
}

//function to calculate BMI
function calculateBMI(height, weight) {
  if (weight && height) {
    // Calculate BMI if both weight and height are provided
    const heightInMeters = height / 100; // Convert height to meters
    return weight / (heightInMeters * heightInMeters);
  }
  return null; // BMI is not calculated if data is missing
}

//function to calculate age
function calculateAge(dob) {
  if (dob) {
    // Calculate age based on date of birth
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
  return null; // Age is not calculated if date of birth is missing
}

module.exports = {
  formatDate,
  generateSerial,
  generatePatientCount,
  convertToDateObject,
  calculateBMI,
  calculateAge,
};
