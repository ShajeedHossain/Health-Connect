import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({
    allowedWeekdays,
    selectedDate,
    setSelectedDate,
}) => {
    const isDayAllowed = (date) => {
        const allowedDayOfWeek = date.toLocaleString("en-US", {
            weekday: "long",
        });
        return allowedWeekdays.includes(allowedDayOfWeek);
    };

    const filterDate = (date) => {
        const currentDate = new Date();
        const endDate = new Date();
        endDate.setDate(currentDate.getDate() + 6);

        return date >= currentDate && date <= endDate && isDayAllowed(date);
    };

    return (
        <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            filterDate={filterDate}
        />
    );
};

export default CustomDatePicker;
