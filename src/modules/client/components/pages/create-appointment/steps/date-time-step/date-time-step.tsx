import React, { ReactElement } from 'react';
import { Box, Grid, styled, Theme, Typography, useTheme } from "@mui/material";
import StepsEnum from '../../enums/steps.enum';
import { colors } from '../../../../../../../config/theme/colors';
import { StepProps } from '../../create-appointment';
import useWorkingHours from '../../../../../../../hooks/use-working-hours.hook';
import { TimeRange } from '../../../../../../../services/api/appointment/dto/appointment.dto';
import { AppointmentTimeTypesEnum } from '../../../../../../../enums/appointment-time-types.enum';
import AppointmentDatePicker from '../../../../../../../common/components/appointment-date-picker';
import Button from '../../../../../../../common/ui/button';

const DateTimeContainer = styled(Box)(
  () => `
    width: 100%;
    border-radius: 12px;
    border: 1px solid ${colors.secondary[30]};
    background: ${colors.background.BG_1};
`,
);

const DateTimeStep = ({ appointment, setAppointment, setActiveStep }: StepProps): ReactElement => {
  const hours = useWorkingHours();
  const theme: Theme = useTheme();

  const handleDateChange = (date: string | null) => {
    setAppointment({ ...appointment, date });
  };

  const handleIntervalsChange = (intervals: TimeRange[]) => {
    setAppointment({ ...appointment, intervals });
  };

  const handleTimeTypeChange = (timeType: AppointmentTimeTypesEnum) => {
    setAppointment({
      ...appointment,
      timeType,
      intervals: timeType === AppointmentTimeTypesEnum.SPECIFIC ? [{ start: hours[0], end: hours[5] }] : [],
    });
  };

  return (
    <Box sx={{ ml: 2 }}>
      <Typography sx={{ mt: 1, mb: 3, color: colors.secondary[60] }}>
        Choose a date and time for this therapy and we&apos;ll match to you a therapist
      </Typography>
      <Box display="flex" justifyContent="center">
        <DateTimeContainer maxWidth={theme.breakpoints.values.md}>
          <AppointmentDatePicker
            date={appointment.date}
            timeType={appointment.timeType}
            selectedIntervals={appointment.intervals}
            onDateChange={handleDateChange}
            onIntervalsChange={handleIntervalsChange}
            onTimeTypeChange={handleTimeTypeChange}
          />
        </DateTimeContainer>
      </Box>
      <Box sx={{ mt: 8 }} display="flex" justifyContent="space-between">
        <Button variant="contained" color="inherit" onClick={() => setActiveStep(StepsEnum.SERVICE)}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveStep(StepsEnum.TYPE)}
          disabled={!appointment.date}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default DateTimeStep;
