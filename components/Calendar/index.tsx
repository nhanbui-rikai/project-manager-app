"use client";

import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
const Calendar = (props: any) => {
  const handleChange = (e: any) => {
    if (props.onChange) return props.onChange(e);
  };
  const ref = React.useRef();
  return (
    <div {...props} ref={props.ref} className="bg-slate-300 rounded-md z-[999] calendar-wrapper">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar className="h-[300px] w-[300px]" onChange={handleChange} />
      </LocalizationProvider>
    </div>
  );
};
export default Calendar;
