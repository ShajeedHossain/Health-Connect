import { useEffect, useState } from "react";
import classes from "../../../styles/Settings.module.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useHospitalProfileInfo } from "../../../hooks/Hospital/useHospitalProfileInfo";
import useGetCurrentLatLng from "../../../hooks/useGetCurrentLatLng";
import _ from "lodash";
export default function SettingsHospital() {
    // Get Previous Data

    const { user } = useAuthContext();
    const { data, loading, error } = useHospitalProfileInfo(user);
    const { currentLatitude, currentLongitude, town, district } =
        useGetCurrentLatLng();
    const [addressField, setAddressField] = useState("");
    const [enableEdit, setEnableEdit] = useState(false);

    const [editableData, setEditableData] = useState({});

    const hospital = data.hospital;
    console.log("Hospital Information", hospital);

    // const hospital = {
    //     _id: "653abe4770cbee356712c3a9",
    //     hospitalName: "Dhaka Medical College",
    //     address: {
    //         district: "Dhaka",
    //         town: "Shahbagh",
    //         latitude: "23.71653",
    //         longitude: "90.39578",
    //     },
    //     cabins: [
    //         {
    //             category: "Single Cabin",
    //             price: 1500,
    //             count: 5,
    //             _id: "653abe4770cbee356712c3aa",
    //             remaining: 2,
    //             features: "Food for 2 Person, Air Conditions, Bathroom",
    //         },
    //         {
    //             category: "Shared Cabin",
    //             price: 800,
    //             count: 10,
    //             _id: "653abe4770cbee356712c3ab",
    //             remaining: 10,
    //             features:
    //                 "Food for 1 Person, Air Conditions, Bathroom (Shared)",
    //         },
    //     ],
    //     beds: [
    //         {
    //             category: "General Bed",
    //             price: 1500,
    //             count: 5,
    //             _id: "653abe4770cbee356712c3ac",
    //             remaining: 3,
    //             features: "Food for 1 Person, Bathroom (Shared)",
    //         },
    //         {
    //             category: "Standard Bed",
    //             price: 1000,
    //             count: 10,
    //             _id: "653abe4770cbee356712c3ad",
    //             remaining: 10,
    //             features:
    //                 "Food for 1 Person, Air Conditions, Bathroom (Shared)",
    //         },
    //     ],
    //     email: "dmc@gmail.com",
    // };

    const getAddress = (e) => {
        e.preventDefault();
        setAddressField(`${town}, ${district}`);
        handleChange(e, -1, "");
    };

    function handleSubmit(e) {
        e.preventDefault();

        // [TODO] : API CALL , Send editableData to api
        console.log("DATA NEED TO UPDATE : ", editableData);
        setEnableEdit(false);
    }

    useEffect(() => {
        // const { hospitalName, address, cabins, beds, email } = data?.hospital;
        const tempObj = {
            hospitalName: hospital?.hospitalName,
            address: {
                district: hospital?.address.district,
                town: hospital?.address.town,
                latitude: hospital?.address.latitude,
                longitude: hospital?.address.longitude,
            },
            cabins: hospital?.cabins,
            beds: hospital?.beds,
            email: hospital?.email,
        };

        setEditableData(tempObj);
    }, [hospital]);

    function handleChange(e, index, tableName) {
        const name = e.target.name;
        console.log("[NAME] : ", e.target.name);
        const tempObj = { ...editableData };
        if (
            e.target.name !== "cabins" &&
            e.target.name !== "beds" &&
            e.target.name !== "address" &&
            index === -1
        ) {
            tempObj[e.target.name] = e.target.value;
        } else if (e.target.name === "address") {
            tempObj["address"]["district"] = district;
            tempObj["address"]["town"] = town;
            tempObj["address"]["longitude"] = currentLongitude;
            tempObj["address"]["latitude"] = currentLatitude;
            console.log("SET ADDRESS, ", tempObj["district"]);
        } else if (tableName == "cabins" || tableName == "beds") {
            tempObj[tableName][index][e.target.name] = e.target.value;
        }
        console.log("Targeted input name", name);
        setEditableData(tempObj);
    }
    return (
        // Need to change here and add the loading check after previous two are complete
        <div>
            <form
                action=""
                className={classes["patient-profile-update-form"]}
                onSubmit={handleSubmit}
            >
                <table
                    className={`${classes["setting-info-table"]}`}
                    border={1}
                    style={{ marginBottom: "10px" }}
                >
                    <tr>
                        <th colSpan={2}>Basic Info</th>
                    </tr>
                    <tr>
                        <td>Hospital Name: </td>
                        <td>
                            {enableEdit ? (
                                <input
                                    type="text"
                                    name="hospitalName"
                                    id="Hospital Name"
                                    placeholder="Hospital Name"
                                    value={editableData?.hospitalName}
                                    onChange={(e) => {
                                        handleChange(e, -1, "");
                                    }}
                                />
                            ) : (
                                editableData?.hospitalName
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
                                    value={editableData?.email}
                                    onChange={(e) => {
                                        handleChange(e, -1, "");
                                    }}
                                />
                            ) : (
                                editableData?.email
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
                                    value={editableData?.contact}
                                    onChange={(e) => {
                                        handleChange(e, -1, "");
                                    }}
                                />
                            ) : (
                                editableData?.contact
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
                                        name="address_box"
                                        id="address"
                                        placeholder="Address"
                                        value={addressField ? addressField : ""}
                                        onChange={(e) => {
                                            handleChange(e, -1, "");
                                        }}
                                        disabled
                                    />
                                    <input
                                        type="button"
                                        name="address"
                                        value="Get Current Location"
                                        onClick={(e) => {
                                            getAddress(e);
                                        }}
                                    />
                                </div>
                            ) : (
                                `${editableData?.address?.town}, ${editableData?.address?.district}`
                            )}
                        </td>
                    </tr>
                </table>

                <table
                    className={`${classes["setting-info-table"]}`}
                    border={1}
                    style={{ marginBottom: "10px" }}
                >
                    <tr>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                            <b>Beds</b>
                        </td>
                    </tr>
                    {editableData.beds?.map((facility, index) => (
                        <>
                            <tr className={`${classes["table-category-name"]}`}>
                                <td>
                                    <b>Category Name : </b>
                                </td>
                                <td>
                                    {enableEdit ? (
                                        <input
                                            type="text"
                                            name="category"
                                            id="category"
                                            placeholder="Category"
                                            value={facility?.category}
                                            onChange={(e) => {
                                                handleChange(e, index, "beds");
                                            }}
                                        />
                                    ) : (
                                        facility?.category
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Price : </b>
                                </td>
                                <td>
                                    {enableEdit ? (
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            placeholder="Price"
                                            value={facility.price}
                                            onChange={(e) => {
                                                handleChange(e, index, "beds");
                                            }}
                                        />
                                    ) : (
                                        facility.price
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Count : </b>
                                </td>
                                <td>
                                    {enableEdit ? (
                                        <input
                                            type="text"
                                            name="count"
                                            id="count"
                                            placeholder="Total Count"
                                            value={facility.count}
                                            onChange={(e) => {
                                                handleChange(e, index, "beds");
                                            }}
                                        />
                                    ) : (
                                        facility.count
                                    )}
                                </td>
                            </tr>
                            <tr className={`${classes["facility-row"]}`}>
                                <td>
                                    <b>Facilities : </b>
                                </td>
                                <td>
                                    {enableEdit ? (
                                        <input
                                            type="text"
                                            name="features"
                                            id="features"
                                            placeholder="All Features"
                                            value={facility?.features}
                                            onChange={(e) => {
                                                handleChange(e, index, "beds");
                                            }}
                                        />
                                    ) : (
                                        <ul>
                                            {facility?.features
                                                ?.split(",")
                                                .map(
                                                    (singleFacility, index) => (
                                                        <li key={index}>
                                                            {singleFacility}
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    )}
                                </td>
                            </tr>
                        </>
                    ))}
                </table>
                <table
                    className={`${classes["setting-info-table"]}`}
                    border={1}
                    style={{ marginBottom: "10px" }}
                >
                    <tr>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                            <b>Cabins</b>
                        </td>
                    </tr>
                    {editableData.cabins?.map((facility, index) => (
                        <>
                            <tr className={`${classes["table-category-name"]}`}>
                                <td>
                                    <b>Category Name : </b>
                                </td>
                                <td>
                                    {enableEdit ? (
                                        <input
                                            type="text"
                                            name="category"
                                            id="category"
                                            placeholder="Category"
                                            value={facility?.category}
                                            onChange={(e) => {
                                                handleChange(
                                                    e,
                                                    index,
                                                    "cabins"
                                                );
                                            }}
                                        />
                                    ) : (
                                        facility?.category
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Price : </b>
                                </td>
                                <td>
                                    {enableEdit ? (
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            placeholder="Price"
                                            value={facility.price}
                                            onChange={(e) => {
                                                handleChange(
                                                    e,
                                                    index,
                                                    "cabins"
                                                );
                                            }}
                                        />
                                    ) : (
                                        facility.price
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Count : </b>
                                </td>
                                <td>
                                    {enableEdit ? (
                                        <input
                                            type="text"
                                            name="count"
                                            id="count"
                                            placeholder="Total Count"
                                            value={facility.count}
                                            onChange={(e) => {
                                                handleChange(
                                                    e,
                                                    index,
                                                    "cabins"
                                                );
                                            }}
                                        />
                                    ) : (
                                        facility.count
                                    )}
                                </td>
                            </tr>
                            <tr className={`${classes["facility-row"]}`}>
                                <td>
                                    <b>Facilities : </b>
                                </td>
                                <td>
                                    {enableEdit ? (
                                        <input
                                            type="text"
                                            name="features"
                                            id="features"
                                            placeholder="All Features"
                                            value={facility?.features}
                                            onChange={(e) => {
                                                handleChange(
                                                    e,
                                                    index,
                                                    "cabins"
                                                );
                                            }}
                                        />
                                    ) : (
                                        <ul>
                                            {facility?.features
                                                ?.split(",")
                                                .map(
                                                    (singleFacility, index) => (
                                                        <li key={index}>
                                                            {singleFacility}
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    )}
                                </td>
                            </tr>
                        </>
                    ))}
                </table>

                {!enableEdit ? (
                    <button
                        className={`btn`}
                        onClick={() => {
                            setEnableEdit((prev) => !prev);
                        }}
                    >
                        Edit Information
                    </button>
                ) : (
                    <input
                        type="submit"
                        className={`btn`}
                        value="Confirm Update"
                    />
                )}
            </form>
        </div>
    );
}
