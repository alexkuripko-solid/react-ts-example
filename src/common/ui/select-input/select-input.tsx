import type { ReactElement } from 'react';
import { Box, MenuItem, Select as MuiSelect, SelectChangeEvent, styled, Typography } from '@mui/material';
import React from 'react';
import { SxProps } from '@mui/system/styleFunctionSx';

const Select = styled(MuiSelect)(
  () => `
    border-radius: 8px;
    height: 40px;
`,
);

const Label = styled(Typography)(
  ({ theme }) => `
  font-size: 14px;
  margin: 4px 2px;
  color: ${theme.palette.text.primary};
`,
);

export interface SelectOption {
  label?: string;
  value: string | number | undefined;
  disabled?: boolean;
}

interface Props {
  label?: string;
  name?: string;
  value: string | number | null | undefined;
  options: SelectOption[];
  onChange: (e: SelectChangeEvent<any>) => void;
  fullWidth?: boolean;
  disabled?: boolean;
  sx?: SxProps;
}

const SelectInput = ({ label, name, value, options, onChange, fullWidth, disabled, sx }: Props): ReactElement => {
  return (
    <Box>
      {label && <Label>{label}</Label>}
      <Select sx={sx} name={name} value={value} onChange={onChange} fullWidth={fullWidth} disabled={disabled}>
        {(options || []).map(({ label, value, disabled }) => {
          if (value === undefined) {
            return (
              <MenuItem key="none" value="">
                <em>none</em>
              </MenuItem>
            );
          }
          return (
            <MenuItem key={`${label}_${value}`} value={value} disabled={disabled}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

export default SelectInput;
