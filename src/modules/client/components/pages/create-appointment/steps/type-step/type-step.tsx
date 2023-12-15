import React, { ReactElement } from 'react';
import { Box, Grid, Theme, Typography, useTheme } from "@mui/material";
import { StepProps } from "../../create-appointment";
import TypeSelector from "../../../../../../../common/components/appointment-widgets/type-selector";
import { colors } from "../../../../../../../config/theme/colors";
import Button from "../../../../../../../common/ui/button";
import StepsEnum from "../../enums/steps.enum";

const TypeStep = ({ appointment, setAppointment, setActiveStep, onFinish, loading }: StepProps): ReactElement => {
  const theme: Theme = useTheme();
  const handleSelectType = (type: number, price: number) => {
    setAppointment({ ...appointment, type, price });
  };

  return (
    <Box sx={{ ml: 2 }}>
      <Typography sx={{ mt: 1, mb: 3, color: colors.secondary[60] }}>
        To make an appointment, select the type of therapy you need
      </Typography>
      <Box display="flex" justifyContent="center">
      <Box width="100%" maxWidth={theme.breakpoints.values.md}>
        <TypeSelector
          type={appointment.type}
          categoryId={appointment.category_id}
          onTypeSelect={handleSelectType}
        />
      </Box>
      </Box>
      <Box sx={{ mt: 8 }} display="flex" justifyContent="space-between">
        <Button variant="contained" color="inherit" onClick={() => setActiveStep(StepsEnum.DATE_TIME)}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={onFinish}
          loading={loading  }
          disabled={!appointment.type || loading}
        >
          Finish
        </Button>
      </Box>
    </Box>
  );
};

export default TypeStep;
