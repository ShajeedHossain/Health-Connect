import { Link } from "react-router-dom";
import useGetCurrentLatLng from "../../hooks/useGetCurrentLatLng";
import classes from "../../styles/BookAHospitalSeat.module.css";
export default function SingleHospital({ hospital }) {
  const { currentLatitude, currentLongitude } = useGetCurrentLatLng();
  const { hospitalName, email, address, availableBeds, availableCabins } =
    hospital;
  return (
    <div className={`${classes["BookHospitalCard"]} dashboard-card`}>
      <table>
        <tr>
          <td>
            <b>Hospital name:</b>
          </td>
          <td>{hospitalName}</td>
        </tr>
        <tr>
          <td>
            <b>Email:</b>
          </td>
          <td>{email}</td>
        </tr>
        <tr>
          <td>
            <b>Address:</b>
          </td>
          <td>
            {address.town}, {address.district}
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <Link
              style={{
                color: "green",
                verticalAlign: "baseline",
                display: "flex",
              }}
              to={`https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${address.latitude},${address.longitude}`}
              target="_blank"
            >
              <span
                style={{
                  color: "green",
                  verticalAlign: "baseline",
                }}
                className="material-symbols-outlined"
              >
                person_pin_circle
              </span>{" "}
              <span>Map</span>
            </Link>
          </td>
        </tr>
        <tr>
          <td>
            {" "}
            <b>Available Beds</b>
          </td>
          <td>{1000}</td>
        </tr>
        <tr>
          <td>
            <b>Available Cabins:</b>
          </td>
          <td>{50}</td>
        </tr>
        <tr>
          <td></td>
          <td>
            <Link
              state={{
                hospitalId: hospital._id,
                hospital,
              }}
              to="/dashboard/hospitalBooking/bookseat/complete-reservation"
              className={classes["BookHospitalBtn"]}
            >
              Book Seat
            </Link>
          </td>
        </tr>
      </table>
    </div>
  );
}
