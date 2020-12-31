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
    <div className="columns">
      <div className="column">
        <KeyboardDatePicker
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
          invalidDateMessage="Format: TT.MM.JJJJ wie z. B. 13.02.2020"
        />
      </div>
      <div className="column">
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
          invalidDateMessage="Format: TT.MM.JJJJ wie z. B. 13.10.2020"
        />
      </div>
    </div>
  );
}
