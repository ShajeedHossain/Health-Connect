const jwt = require("jsonwebtoken");
const Reservation = require("../model/reservationModel");

const addReservation = async (req, res) => {
  const { reservationType, reservationDate, hospitalId } = req.body;

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const reservation = await Reservation.addReservation(
      reservationType,
      hospitalId,
      _id,
      reservationDate
    );
    console.log(reservation);
    res.status(200).json({ reservation });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  addReservation,
};
