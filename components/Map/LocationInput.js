import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";

export default function LocationInput({
  inputValue,
  options,
  cbChange,
  cbInputChange,
  clear,
}) {
  return (
    <div>
      {inputValue != null && (
        <Button variant="outlined" endIcon={<ClearIcon />} onClick={clear}>
          {inputValue}
        </Button>
      )}
      {inputValue == null && (
        <Autocomplete
          options={options}
          onChange={cbChange}
          onInputChange={cbInputChange}
          getOptionLabel={(x) => x.location_string}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Location input"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
      )}
    </div>
  );
}