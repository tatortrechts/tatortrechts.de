import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";

export default function DateInput({
  minMaxDate,
  startDate,
  startCb,
  endDate,
  endCb,
}) {
  const { minDate, maxDate } = minMaxDate;
  return (
    <div className="tor-date-input">
      <KeyboardDatePicker
        initialFocusedDate={minDate}
        minDate={minDate}
        maxDate={maxDate}
        type="small"
        // views={["year", "month"]}
        label="von"
        value={startDate}
        onChange={startCb}
        autoOk
        format="DD.MM.YYYY"
        cancelLabel="Abbrechen"
        clearLabel="Entfernen"
        clearable
        invalidDateMessage="Format: TT.MM.JJJJ"
      />
      <span className="ml-3"></span>
      <KeyboardDatePicker
        minDate={minDate}
        maxDate={maxDate}
        type="small"
        // views={["year", "month"]}
        label="bis"
        value={endDate}
        onChange={endCb}
        autoOk
        format="DD.MM.YYYY"
        cancelLabel="Abbrechen"
        clearLabel="Entfernen"
        clearable
        invalidDateMessage="Format: TT.MM.JJJJ"
      />
    </div>
  );
}
