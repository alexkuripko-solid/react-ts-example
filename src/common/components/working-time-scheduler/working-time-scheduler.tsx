import React, { ReactElement, useMemo } from "react";
import { DayLabelsShort } from '../../../enums/days.enum';
import DayItem from './day-item';
import { Schedule } from "./day-item/types/schedule.type";
import { Box } from "@mui/material";

interface Props {
  value: Schedule;
  onChange: (schedule: Schedule) => void
}

const WorkingTimeScheduler = ({value, onChange}: Props): ReactElement => {

  return (
    <Box position="relative">
      {Object.keys(DayLabelsShort).map((day, index) => (
        <DayItem key={index} value={value} day={parseInt(day)} onChange={onChange} />
      ))}
    </Box>
  );
};

export default WorkingTimeScheduler;
