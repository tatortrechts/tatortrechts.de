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

  const renderValue = (values) => {
    if (organizations.length === values.length)
      return "keine Organisationen ausgewählt";

    if (values.length === 0) return "alle Organistionen";

    return organizations
      .filter((x) => !values.includes(x.id))
      .map((x) => x.name)
      .join(", ");
  };

  return (
    <FormControl>
      <Select
        multiple
        value={organizationsSelected}
        onChange={handleChangeMultiple}
        input={<Input />}
        displayEmpty
        renderValue={renderValue}
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
