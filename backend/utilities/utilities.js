const AppointmentTaken = require("../model/appointmentTakenModel");

//Utility function to formate date in (DD-MM-YYYY)
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0"); // Get the day with leading zeros
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month with leading zeros (Months are 0-indexed, so we add 1)
  const year = date.getFullYear(); // Get the year

  return `${day}-${month}-${year}`;
}

// //Utility function to generate serial
// const generateSerial = async (start, doctorId) => {
//   const count = await AppointmentTaken.countDocuments({
//     doctorId: doctorId,
//     startTime: {
//       $gte: new Date(
//         start.getFullYear(),
//         start.getMonth(),
//         start.getDate(),
//         0,
//         0,
//         0
//       ),
//       $lt: new Date(
//         start.getFullYear(),
//         start.getMonth(),
//         start.getDate() + 1,
//         0,
//         0,
//         0
//       ),
//     },
//   });
//   return count;
// };

//Utility function to generate serial
const generateSerial = async (start, doctorId) => {
  const count = await AppointmentTaken.countDocuments({
    doctorId: doctorId,
    startTime: start,
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
  const date = new Date(year, month - 1, day);
  date.setHours(date.getHours() + 6);
  return date; // Month is 0-based, so subtract 1
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

function convertTimeToDateTime(timeString) {
  // Ensure timeStrings is an array
  const [hours, minutes] = timeString.split(":").map(Number);

  // Create a new Date object and set the time components
  const date = new Date();
  date.setHours(hours + 6);
  date.setMinutes(minutes);
  date.setSeconds(0); // You may set seconds and milliseconds to 0 if needed

  return date;
}

function isCommaSeparatedWithoutSpaces(inputString) {
  // Use a regular expression to check if the string matches the pattern
  return /^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/.test(inputString);
}

function isHHMMFormat(inputString) {
  // Use a regular expression to check if the string matches the "HH:MM" format
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(inputString);
}

function containsValidNumber(inputString) {
  const number = parseFloat(inputString);
  return !isNaN(number) && isFinite(number);
}

function convertTimeToHHMM(timeString) {
  // Extract hours and minutes using regular expressions
  const match = timeString.match(/(\d+):(\d+) (\w{2})/);

  if (!match) {
    return "Invalid time format";
  }

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const period = match[3].toLowerCase();

  // Adjust hours for AM/PM
  if (period === "pm" && hours !== 12) {
    hours += 12;
  } else if (period === "am" && hours === 12) {
    hours = 0;
  }

  // Convert hours and minutes to two-digit format
  const hoursString = hours.toString().padStart(2, "0");
  const minutesString = minutes.toString().padStart(2, "0");

  // Combine hours and minutes
  const result = `${hoursString}:${minutesString}`;

  return result;
}

module.exports = {
  formatDate,
  generateSerial,
  generatePatientCount,
  convertToDateObject,
  calculateBMI,
  calculateAge,
  convertTimeToDateTime,
  isHHMMFormat,
  isCommaSeparatedWithoutSpaces,
  containsValidNumber,
  convertTimeToHHMM,
};
