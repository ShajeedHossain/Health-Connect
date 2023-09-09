function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0"); // Get the day with leading zeros
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month with leading zeros (Months are 0-indexed, so we add 1)
  const year = date.getFullYear(); // Get the year

  return `${day}-${month}-${year}`;
}

module.exports = { formatDate };
