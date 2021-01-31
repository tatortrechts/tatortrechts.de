import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";

export default function SearchInput({
  options,
  cbChange,
  cbInputChange,
  value,
}) {
  return (
    <Autocomplete
      freeSolo
      size="small"
      options={options}
      onChange={cbChange}
      // do not filter out any options since there are already filtered by the backend (wtf, how can this be enabled by default?)
      filterOptions={(options, state) => options}
      onInputChange={cbInputChange}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Schlagwort"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: "search" }}
        />
      )}
    />
  );
}
