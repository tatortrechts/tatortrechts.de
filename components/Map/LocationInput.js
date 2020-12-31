import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";


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
          size="small"
          options={options}
          onChange={cbChange}
          onInputChange={cbInputChange}
          getOptionLabel={(x) => x.location_string}
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
      )}
    </div>
  );
}
