import React from "react";

import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

export default function OrganizationInput({
  organizations,
  organizationsSelected,
  cbChange,
}) {
  const handleChangeMultiple = (event) => {
    console.log(value);
    const { value } = event.target;
    cbChange(value);
  };

  return (
    <FormControl>
      <Select
        multiple
        value={organizationsSelected}
        onChange={handleChangeMultiple}
        input={<Input />}
        displayEmpty
        renderValue={(values) =>
          organizations.length === values.length
            ? "keine Organisationen ausgewählt"
            : values.length === 0
            ? "alle Organistionen"
            : organizations
                .filter((x) => !values.includes(x.id))
                .map((x) => x.name)
                .join(", ")
        }
      >
        {organizations &&
          organizations.map((x) => (
            <MenuItem key={x.id} value={x.id}>
              <Checkbox checked={!organizationsSelected.includes(x.id)} />
              <ListItemText primary={x.name} secondary={x.region} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
