import React from "react";
import { DatePicker } from "@material-ui/pickers";

export default function DateInput({ startDate, startCb, endDate, endCb }) {
  return (
    <div className="level">
      <div className="level-left">
        <DatePicker
          views={["year", "month"]}
          locale="de"
          label="Start Datum"
          value={startDate}
          onChange={startCb}
          autoOk
          format="MMM YYYY"
          okLabel={null}
          cancelLabel="Abbrechen"
          clearLabel="Entfernen"
          clearable
        />
      </div>
      <div className="level-right">
        <DatePicker
          views={["year", "month"]}
          locale="de"
          label="End Datum"
          value={endDate}
          onChange={endCb}
          autoOk
          format="MMM YYYY"
          okLabel={null}
          cancelLabel="Abbrechen"
          clearLabel="Entfernen"
          clearable
        />
      </div>
    </div>
  );
}
