import type { ReactElement } from 'react';
import React from 'react';
import { CategoryLabels } from '../../../enums/service-categories.enum';
import { useField } from 'formik';
import SelectInput from '../select-input';
import { SxProps } from "@mui/material";

export interface SelectOption {
  label?: string;
  value: string | number | undefined;
}

interface Props {
  label?: string;
  name: string;
  options: SelectOption[];
  fullWidth?: boolean;
  disabled?: boolean;
  sx?: SxProps;
}

const SelectField = ({ label, name, ...props }: Props): ReactElement => {
  const [field] = useField<string>(name);

  return <SelectInput {...props} label={label} name={name} value={field.value} onChange={field.onChange} />;
};

export default SelectField;
