import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";
import { extractShortAddress } from "../../utils/labels";

export default function LocationInput({ options, cbChange, cbInputChange }) {
  return (
    <div>
      <Autocomplete
        size="small"
        autoHighlight
        options={options}
        onChange={cbChange}
        onInputChange={cbInputChange}
        // do not filter out any options since there are already filtered by the backend (wtf, how can this be enabled by default?)
        filterOptions={(options, state) => {
          // some crazy hack to avoid duplicate labels, FIXME: should be done better in backend
          const result = [];
          const resultLabels = [];
          for (const o of options) {
            const label = extractShortAddress(o);
            if (resultLabels.indexOf(label) < 0) {
              resultLabels.push(label);
              result.push(o);
            }
          }
          return result;
        }}
        getOptionLabel={(x) => extractShortAddress(x)}
        isOptionEqualToValue={(o, v) => o.id === v.id}
        noOptionsText="kein Ort gefunden"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Ort"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
    </div>
  );
}
