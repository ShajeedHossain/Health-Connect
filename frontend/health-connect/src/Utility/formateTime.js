export function formatDateAndTime(dateString) {
    // Parse the input date string
    const date = new Date(dateString);

    // Get the day, month, and year
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are 0-based, so we add 1
    let year = date.getFullYear();

    // Get the hours and minutes
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Determine AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    if (hours > 12) {
        hours -= 12;
    }

    // Add leading zeros to day, month, hours, and minutes if needed
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Create the formatted date and time string
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes} ${amOrPm}`;

    return { date: formattedDate, time: formattedTime };
}
