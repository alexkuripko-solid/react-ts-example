import React, { ReactElement } from "react";
import { PreferenceGenderLabels } from "../../../enums/genders.enum";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface Props {
  value: number;
  onChange: (newValue: number) => void;
  disabled?: boolean;
}

const PreferredGenderRadioGroup = ({ value, onChange, disabled = false }: Props): ReactElement => {

  return (
    <RadioGroup row value={value} onChange={(e) => onChange(parseInt(e.target.value))}>
      {Object.entries(PreferenceGenderLabels).map(([optionValue, label]) => (
        <FormControlLabel
          checked={parseInt(optionValue) === value}
          key={label}
          value={optionValue}
          control={<Radio />}
          label={label}
          disabled={disabled}
        />
      ))}
    </RadioGroup>
  );
};

export default PreferredGenderRadioGroup;
