import type { ReactElement } from 'react';
import { Autocomplete, Select as MuiSelect, styled, TextField, Typography } from '@mui/material';
import React from 'react';
import { Clear } from '@mui/icons-material';
import { AutocompleteProps } from '@mui/material/Autocomplete/Autocomplete';
import { BaseProps } from '@mui/material/OverridableComponent';

const Label = styled(Typography)(
  ({ theme }) => `
  font-size: 14px;
  margin: 8px 2px 0 2px;
  color: ${theme.palette.text.primary};
`,
);

export interface MultiSelectOption {
  [key: string]: any;
}

interface Props extends BaseProps<any> {
  optionKey: string;
  value: MultiSelectOption[];
  options: MultiSelectOption[];
  defaultValue?: MultiSelectOption[];
  disabled?: boolean;
}

const MultiSelectInput = ({
  value,
  optionKey,
  defaultValue = [],
  options,
  disabled,
  label,
  ...props
}: Props): ReactElement => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Autocomplete
        {...props}
        multiple
        options={options}
        value={value}
        getOptionLabel={(option) => option[optionKey]}
        defaultValue={defaultValue}
        renderInput={(params) => <TextField {...params} />}
        ChipProps={{
          sx: { borderRadius: '4px' },
          color: 'primary',
          deleteIcon: <Clear />,
        }}
        filterSelectedOptions
        disabled={disabled}
      />
    </>

  );
};

export default MultiSelectInput;
