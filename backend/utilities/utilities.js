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

module.exports = {
  formatDate,
  generateSerial,
  generatePatientCount,
  convertToDateObject,
};
