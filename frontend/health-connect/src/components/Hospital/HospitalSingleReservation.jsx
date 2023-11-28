import _ from "lodash";
import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../Utility/formateTime";
import { usePatientProfileInfo } from "../../hooks/Patient/usePatientProfileInfo";
import { useAuthContext } from "../../hooks/useAuthContext";
import classes from "../../styles/SingleDoctor.module.css";

export default function HospitalSingleReservation({
  reservation,
  previousData,
}) {
  const { user } = useAuthContext();
  const timeConverter = formatDateAndTime;
  const {
    patientId,
    reservationType,
    reservationCategory,
    reservationFee,
    reservationDate,
  } = reservation;
  const { patientData, patientLoading, patientError } = usePatientProfileInfo(
    patientId,
    user,
    ""
  );
  console.log(reservation);
  console.log("Single patient data from single reservation: ", patientData);
  return (
    <>
      {!patientLoading && (
        <div className={`${classes["single-bookappoint-card"]} dashboard-card`}>
          <table>
            <tr>
              <td>
                <b>Patient Name</b>
              </td>
              <td> {patientData[0]?.fullName}</td>
            </tr>
            <tr>
              <td>
                <b>Reservation Type:</b>
              </td>
              <td>{_.capitalize(reservationType)}</td>
            </tr>
            <tr>
              <td>
                <b>Reservation Category</b>
              </td>
              <td>{reservationCategory}</td>
            </tr>
            <tr>
              <td>
                <b>Fees:</b>
              </td>
              <td>{reservationFee} per night</td>
            </tr>
            <tr>
              <td>
                <b>Reservation Date: </b>
              </td>
              <td>{formatDateAndTime(reservationDate).date}</td>
            </tr>

            <tr>
              <td></td>
              {!previousData ? (
                <td
                  style={{
                    textAlign: "right",
                    padding: "15px 0",
                  }}
                >
                  <Link
                    to={`/hospital-dashboard/reservation-details`}
                    className={`btn`}
                    state={{
                      reservation,
                      patientData: patientData[0],
                    }}
                  >
                    View Details
                  </Link>
                  <Link
                    state={{
                      reservation,
                      patientData: patientData[0],
                    }}
                    to={`/hospital-dashboard/prepare-bill`}
                    className={`btn`}
                  >
                    Discharge
                  </Link>
                </td>
              ) : (
                <td
                  style={{
                    textAlign: "right",
                    padding: "15px 0",
                  }}
                >
                  <Link
                    state={{
                      reservation,
                      patientData: patientData[0],
                    }}
                    to={`/hospital-dashboard/prepare-bill`}
                    className={`btn`}
                  >
                    View Bill
                  </Link>
                </td>
              )}
            </tr>
            <tr></tr>
          </table>
        </div>
      )}
    </>
  );
}
