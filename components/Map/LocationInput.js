import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { extractShortAddress } from "../../utils/labels";

export default function LocationInput({ options, cbChange, cbInputChange }) {
  return (
    <div>
      <Autocomplete
        size="small"
        options={options}
        onChange={cbChange}
        onInputChange={cbInputChange}
        getOptionLabel={extractShortAddress}
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
