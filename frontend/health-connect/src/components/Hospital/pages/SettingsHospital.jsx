import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HospitalApi from "../../../apis/HospitalApi";
import { useHospitalProfileInfo } from "../../../hooks/Hospital/useHospitalProfileInfo";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useGetCurrentLatLng from "../../../hooks/useGetCurrentLatLng";
import classes from "../../../styles/Settings.module.css";
export default function SettingsHospital() {
    const [settingError, setSettingError] = useState(false);
    const [settingLoading, setSettingLoading] = useState(false);
    // Get Previous Data

    const { user } = useAuthContext();
    const { data, loading, error } = useHospitalProfileInfo(user);
    const { currentLatitude, currentLongitude, town, district } =
        useGetCurrentLatLng();
    const [addressField, setAddressField] = useState("");
    const [enableEdit, setEnableEdit] = useState(false);

    const [editableData, setEditableData] = useState({});
    const navigate = useNavigate();

    const hospital = data.hospital;
    console.log("Hospital Information", hospital);

    useEffect(() => {
        toast.onChange((payload) => {
            if (payload.status === "removed") {
                navigate("/hospital-dashboard/settings");
            }
        });
    }, [navigate]);

    const getAddress = (e) => {
        e.preventDefault();
        setAddressField(`${town}, ${district}`);
        handleChange(e, -1, "");
    };

    async function handleSubmit(e) {
        setSettingError("");
        setSettingLoading(true);
        e.preventDefault();

        // [TODO] : API CALL , Send editableData to api
        console.log("DATA NEED TO UPDATE : ", editableData);
        try {
            const response = await HospitalApi.put(
                "/update-hospital",
                editableData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success(
                "Profile updated successfully !! Navigating to previous page...",
                {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1500, // Time in milliseconds to auto-close the toast (1.5 seconds in this case)
                }
            );
            setSettingLoading(false);
            console.log("HOSPITAL UPDATE RESPONSE: ", response);
            setEnableEdit(false);
        } catch (error) {
            setSettingError(error.response.data.error);
            setSettingLoading(false);
            console.log("UPDATE API: ERROR ", error);
        }
    }

    useEffect(() => {
        // const { hospitalName, address, cabins, beds, email } = data?.hospital;
        const tempObj = {
            hospitalName: hospital?.hospitalName,
            contact: hospital?.contact,
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
        console.log("TEMP: ", tempObj);

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
        <>
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
                                        required
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
                                        required
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
                                        required
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
                                            value={
                                                addressField ? addressField : ""
                                            }
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
                                <tr
                                    className={`${classes["table-category-name"]}`}
                                >
                                    <td>
                                        <b>Category Name : </b>
                                    </td>
                                    <td>
                                        {enableEdit ? (
                                            <input
                                                required
                                                type="text"
                                                name="category"
                                                id="category"
                                                placeholder="Category"
                                                value={facility?.category}
                                                onChange={(e) => {
                                                    handleChange(
                                                        e,
                                                        index,
                                                        "beds"
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
                                                required
                                                type="text"
                                                name="price"
                                                id="price"
                                                placeholder="Price"
                                                value={facility.price}
                                                onChange={(e) => {
                                                    handleChange(
                                                        e,
                                                        index,
                                                        "beds"
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
                                                required
                                                type="text"
                                                name="count"
                                                id="count"
                                                placeholder="Total Count"
                                                value={facility.count}
                                                onChange={(e) => {
                                                    handleChange(
                                                        e,
                                                        index,
                                                        "beds"
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
                                                required
                                                type="text"
                                                name="features"
                                                id="features"
                                                placeholder="All Features"
                                                value={facility?.features}
                                                onChange={(e) => {
                                                    handleChange(
                                                        e,
                                                        index,
                                                        "beds"
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <ul>
                                                {facility?.features
                                                    ?.split(",")
                                                    .map(
                                                        (
                                                            singleFacility,
                                                            index
                                                        ) => (
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
                                <tr
                                    className={`${classes["table-category-name"]}`}
                                >
                                    <td>
                                        <b>Category Name : </b>
                                    </td>
                                    <td>
                                        {enableEdit ? (
                                            <input
                                                required
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
                                                required
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
                                                required
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
                                                required
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
                                                        (
                                                            singleFacility,
                                                            index
                                                        ) => (
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
                        <>
                            {" "}
                            {settingError && (
                                <p style={{ color: "red" }}>{settingError}</p>
                            )}{" "}
                            <input
                                type="submit"
                                className={`btn`}
                                value="Confirm Update"
                                disabled={settingLoading}
                            />
                        </>
                    )}
                </form>
            </div>
            <ToastContainer position="top-right" />
        </>
    );
}
