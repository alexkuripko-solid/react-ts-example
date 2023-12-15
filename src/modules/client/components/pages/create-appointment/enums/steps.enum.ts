enum StepsEnum {
  CATEGORY,
  SERVICE,
  DATE_TIME,
  TYPE,
}

export const StepLabels = {
  [StepsEnum.CATEGORY]: 'Select a therapy',
  [StepsEnum.SERVICE]: 'Service',
  [StepsEnum.DATE_TIME]: 'Select date & time',
  [StepsEnum.TYPE]: 'Appointment type',
};

export default StepsEnum;
