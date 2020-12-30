import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

export default function DateInput({ startDate, startCb, endDate, endCb }) {
  return (
    <div className="columns">
      <div className="column">
        <KeyboardDatePicker
          type="small"
          // views={["year", "month"]}
          locale="de"
          label="von"
          value={startDate}
          onChange={startCb}
          autoOk
          format="DD.MM.YYYY"
          okLabel={null}
          cancelLabel="Abbrechen"
          clearLabel="Entfernen"
          clearable
        />
      </div>
      <div className="column">
        <KeyboardDatePicker
          type="small"
          // views={["year", "month"]}
          locale="de"
          label="bis"
          value={endDate}
          onChange={endCb}
          autoOk
          format="DD.MM.YYYY"
          okLabel={null}
          cancelLabel="Abbrechen"
          clearLabel="Entfernen"
          clearable
        />
      </div>
    </div>
  );
}
