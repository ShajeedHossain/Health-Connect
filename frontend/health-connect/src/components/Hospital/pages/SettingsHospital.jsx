import { useState } from "react";
import classes from "../../../styles/Settings.module.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useHospitalProfileInfo } from "../../../hooks/Hospital/useHospitalProfileInfo";
import useGetCurrentLatLng from "../../../hooks/useGetCurrentLatLng";

export default function SettingsHospital() {
    // Get Previous Data
    // const [data, loading, error] = useHospitalProfileInfo();
    // console.log(data);

    const { user } = useAuthContext();
    const { data, loading, error } = useHospitalProfileInfo(user);
    const { currentLatitude, currentLongitude, town, district } =
        useGetCurrentLatLng();
    const [addressField, setAddressField] = useState("");
    const [enableEdit, setEnableEdit] = useState(false);

    const hospital = data.hospital;
    console.log("Hospital Information", data.hospital);
    const getAddress = (e) => {
        e.preventDefault();
        setAddressField(`${town}, ${district}`);
    };

    function handleSubmit(e) {
        e.preventDefault();

        // Form Data Object
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData);
        console.log("Form Data Example : ", formDataObject);

        // [TODO] : API CALL
    }
    return (
        // Need to change here and add the loading check after previous two are complete
        <div>
            <form
                action=""
                className={classes["patient-profile-update-form"]}
                onSubmit={handleSubmit}
            >
                <table>
                    <tr>
                        <td>Hospital Name: </td>
                        <td>
                            {enableEdit ? (
                                <input
                                    type="text"
                                    name="fullname"
                                    id="Hospital Name"
                                    placeholder="Hospital Name"
                                />
                            ) : (
                                hospital?.hospitalName
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>
                            {enableEdit ? (
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="email"
                                />
                            ) : (
                                hospital?.email
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Contact: </td>
                        <td>
                            {enableEdit ? (
                                <input
                                    type="text"
                                    name="contact"
                                    id="contact"
                                    placeholder="Contact Number"
                                />
                            ) : (
                                hospital?.contact
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Address: </td>
                        <td>
                            {enableEdit ? (
                                <div className={classes["date-gender"]}>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="Address"
                                        value={addressField ? addressField : ""}
                                        disabled
                                    />
                                    <input
                                        type="button"
                                        value="Get Current Location"
                                        onClick={getAddress}
                                    />
                                </div>
                            ) : (
                                `${hospital?.address.town}, ${hospital?.address.district}`
                            )}
                        </td>
                    </tr>
                </table>

                <table>
                    <tr>
                        <td rowSpan={hospital?.cabins.length}>Cabins</td>
                        <td>
                            <ul>
                                <li>
                                    Category: {hospital?.cabins[0].category}
                                </li>
                                <li>Price: {hospital?.cabins[0].price}</li>
                                <li>Total: {hospital?.cabins[0].count}</li>
                            </ul>
                        </td>
                        <td>Facilities: </td>
                    </tr>

                    {hospital?.cabins.map((cabin, index) => {
                        if (index != 0)
                            return (
                                <tr>
                                    <td>
                                        <ul>
                                            <li>Category: {cabin.category}</li>
                                            <li>Price: {cabin.price}</li>
                                            <li>Total: {cabin.count}</li>
                                        </ul>
                                    </td>
                                    <td>Facilities</td>
                                </tr>
                            );
                    })}
                </table>
                <div className={classes["date-gender"]}>
                    <input
                        type="text"
                        name="total-bed"
                        id="total-bed"
                        placeholder="Total Bed"
                    />
                    <input
                        type="text"
                        name="total-cabin"
                        id="total-cabin"
                        placeholder="Total Cabin"
                    />
                </div>
                <div className={classes["date-gender"]}>
                    <textarea
                        placeholder="Facilities with Beds"
                        name="beds-facilities"
                        id=""
                        cols="30"
                        rows="10"
                    ></textarea>
                    <textarea
                        placeholder="Facilities with Cabins"
                        name="cabins-facilities"
                        id=""
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>

                <input type="submit" value="Update Information" />
            </form>
        </div>
    );
}
