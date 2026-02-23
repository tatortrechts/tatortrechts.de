import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as dayjs from "dayjs";
import React from "react";

export default function DateInput({
  minMaxDate,
  startDate,
  startCb,
  endDate,
  endCb,
}) {
  const minDate = minMaxDate.minDate ? dayjs(minMaxDate.minDate) : undefined;
  const maxDate = minMaxDate.maxDate ? dayjs(minMaxDate.maxDate) : undefined;
  return (
    <div className="tor-date-input">
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        label="von"
        value={startDate}
        onChange={startCb}
        format="DD.MM.YYYY"
        slotProps={{
          textField: { size: "small" },
          actionBar: { actions: ["clear", "cancel", "accept"] },
        }}
      />
      <span className="ml-3"></span>
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        label="bis"
        value={endDate}
        onChange={endCb}
        format="DD.MM.YYYY"
        slotProps={{
          textField: { size: "small" },
          actionBar: { actions: ["clear", "cancel", "accept"] },
        }}
      />
    </div>
  );
}
