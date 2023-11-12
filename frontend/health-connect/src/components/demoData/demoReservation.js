const demoReservation = [
    {
        reservationType: "bed",
        reservationCategory: "Deluxe",
        reservationFee: 100,
        hospitalId: "653abe4770cbee356712c3a9",
        patientId: "652bd708f0f1c2211c8d2870",

        reservationDate: "2023-11-13T00:00:00.000Z",
        additional_requirements: ["food", "water", "airpurifier"],
        __v: 0,
        ambulance_address: "Something, Dhaka",
    },
    {
        _id: "6550edd5a5d69e33dbb9a966",
        reservationType: "cabins",
        reservationCategory: "Standard",
        hospitalId: "653abb6034fe6e11f367ba18",
        patientId: "6543e3b6032a009ecb80eb89",
        reservationDate: "2023-11-16T00:00:00.000Z",
        additional_requirements: [
            "ambulance",
            "stretcher",
            "wheelchair",
            "oxygen",
        ],
        ambulance_address: "Oxygen, Chittagong",
        __v: 0,
    },
];

export default demoReservation;
