import { useEffect, useState } from "react";
import { formatDateAndTime } from "../../../Utility/formateTime";
import { useAllReservation } from "../../../hooks/Hospital/useAllReservation";
import { useAuthContext } from "../../../hooks/useAuthContext";
import classes from "../../../styles/TakeAppointment.module.css";
import HospitalSingleReservation from "../HospitalSingleReservation";

export default function HospitalViewAllReservation() {
  const { user } = useAuthContext();
  console.log("user : ", user);

  const { reservationData, reservationLoading, reservationError } =
    useAllReservation(user);
  console.log("Reservation List", reservationData);
  const reservationList = reservationData.reservations;

  const [filterDate, setFilterDate] = useState(
    formatDateAndTime(new Date()).date
  );

  const [filteredAppointment, setFilteredAppointment] = useState();

  const [upcomingData, setUpcomingData] = useState();
  const [previousData, setPreviousData] = useState();

  //     {
  //     "_id": "655384925103bd22dd7879a6",
  //     "reservationType": "cabins",
  //     "reservationCategory": "Deluxe",
  //     "hospitalId": "653abe4770cbee356712c3a9",
  //     "patientId": "6543e3b6032a009ecb80eb89",
  //     "reservationDate": "2023-11-15T00:00:00.000Z",
  //     "additional_requirements": [
  //         "ambulance",
  //         "stretcher",
  //         "wheelchair",
  //         "oxygen"
  //     ],
  //     "ambulance_address": "Dhanmondi Dhaka",
  //     "dischargeStatus": true,
  //     "__v": 0,
  //     "bill": {
  //         "Patient Name": "Shajeed Hossain",
  //         "Reservation Date": "2023-11-15",
  //         "Discharge Date": "2023-11-14",
  //         "Reservation Bill": 0,
  //         "Doctor Visit": "600"
  //     }
  // }

  // // Filter Based on date
  useEffect(() => {
    console.log("Filter Date,", filterDate);
    if (filterDate) {
      const tempAppointment = reservationList?.filter((singleReservation) => {
        console.log(
          filterDate,
          " === ",
          formatDateAndTime(singleReservation?.reservationDate).date
        );
        return (
          filterDate ===
          formatDateAndTime(singleReservation?.reservationDate).date
        );
      });
      setFilteredAppointment(tempAppointment);
    } else {
      setFilteredAppointment(reservationList);
    }

    // console.log("Filtered Appointment", tempAppointment);
  }, [reservationList, filterDate]);

  function dateFormat(dateString) {
    const newDateString = dateString
      .toString()
      .replace(/\.\d+Z$/, ".000+06:00");
    const date = new Date(newDateString);

    // console.log("DATE & DATESTRING", date, newDateString);

    // Get the day, month, and year
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are 0-based, so we add 1
    let year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  // // Filter Upcoming
  useEffect(() => {
    console.log("UPCOMING FILTER WORKING...");
    const tempAppointment = filteredAppointment?.filter((singleAppointment) => {
      console.log(
        "UPCOMING",
        formatDateAndTime(singleAppointment?.reservationDate).date,
        " === ",
        dateFormat(new Date(Date.now())),
        "---",
        formatDateAndTime(singleAppointment?.reservationDate).date >=
          formatDateAndTime(Date.now()).date
      );
      return (
        formatDateAndTime(singleAppointment?.reservationDate).date >=
          dateFormat(new Date(Date.now())) &&
        singleAppointment?.dischargeStatus === false
      );
    });
    setUpcomingData(tempAppointment);

    // console.log("Filtered Appointment", tempAppointment);
  }, [filteredAppointment]);

  // // Previous Data
  useEffect(() => {
    console.log("PREVIOUS FILTER WORKING...");
    const tempAppointment = filteredAppointment?.filter((singleAppointment) => {
      console.log(
        "PREVIOUS",
        formatDateAndTime(singleAppointment?.reservationDate).date,
        " === ",
        dateFormat(new Date(Date.now())),
        "---",
        formatDateAndTime(singleAppointment?.reservationDate).date <
          dateFormat(new Date(Date.now()))
      );
      return (
        formatDateAndTime(
          singleAppointment?.reservationDate
            .toString()
            .replace(/\.\d+Z$/, ".000+06:00")
        ).date < formatDateAndTime(new Date()).date ||
        singleAppointment?.dischargeStatus === true
      );
    });
    setPreviousData(tempAppointment);

    // console.log("Filtered Appointment", tempAppointment);
  }, [filteredAppointment]);
  return (
    <section className={classes["take-appointment-part"]}>
      <section className={classes["doc-upcoming-apoint-chk-part"]}>
        <div>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
            }}
            name=""
            id=""
          />
        </div>
        <div className={classes["doc-upcoming-apoint-check-heading"]}>
          <h2>Upcoming Reservation</h2>
        </div>

        <div className={classes["doctorList-cards"]}>
          {!reservationError &&
            !reservationLoading &&
            upcomingData?.map((reservation, index) => (
              <HospitalSingleReservation
                key={index}
                reservation={reservation}
              />
            ))}
        </div>
        <div className={classes["doc-upcoming-apoint-check-heading"]}>
          <h2>Previous Reservation</h2>
        </div>

        <div className={classes["doctorList-cards"]}>
          {!reservationError &&
            !reservationLoading &&
            previousData?.map((reservation, index) => (
              <HospitalSingleReservation
                key={index}
                reservation={reservation}
                previousData={true}
              />
            ))}
        </div>
      </section>
    </section>
  );
}
