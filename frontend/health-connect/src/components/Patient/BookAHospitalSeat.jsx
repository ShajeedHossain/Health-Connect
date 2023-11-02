import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHospitalList } from "../../hooks/useHospitalList";
import classes from "../../styles/BookAHospitalSeat.module.css";
import SingleHospital from "./SingleHospital";

export default function BookAHospitalSeat() {
  const { user } = useAuthContext();
  const {
    data,
    loading,
    error,
    districtFilter,
    sortByDistance,
    setDistrictFilter,
    setSortByDistance,
  } = useHospitalList(user);
  const hospitalList = data.hospitalList;

  const [distrcitList, setDistrictList] = useState([]);

  useEffect(() => {
    const allDistrict = [];

    hospitalList?.forEach((hospital) => {
      if (!allDistrict.includes(hospital.address.district)) {
        // Avoid duplicates
        allDistrict.push(hospital.address.district);
      }
    });

    setDistrictList(allDistrict);
  }, [hospitalList]);

  return (
    <section className={classes["BookHospitalSeat"]}>
      <div className="filter-field">
        <form>
          <label htmlFor="filter-district">District : </label>
          <select
            name="filter-district"
            id="filter-district"
            value={districtFilter}
            onChange={(e) => {
              console.log("District Value :", e.target.value);
              setDistrictFilter(e.target.value);
            }}
          >
            {distrcitList?.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <label htmlFor="filter-distance">Sort By Distance</label>
          <input
            type="checkbox"
            name="filter-distance"
            id="filter-distance"
            checked={sortByDistance}
            onChange={() => {
              setSortByDistance((prev) => (prev ? 0 : 1));
            }}
          />
        </form>
      </div>
      <section className={classes["HospitalBookSeatPart"]}>
        <div className={classes["HospitalBookSeatPartHeading"]}>
          <h2>Available Hospitals</h2>
        </div>

        <div className={classes["BookHospitalCards"]}>
          {hospitalList &&
            !loading &&
            hospitalList.map((hospital) => (
              <SingleHospital key={hospital._id} hospital={hospital} />
            ))}

          {loading && <p>Loading...</p>}
        </div>
      </section>
    </section>
  );
}
