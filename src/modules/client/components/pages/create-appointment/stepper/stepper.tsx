import { ReactElement } from 'react';
import {
  Box,
  styled,
  Stepper as MuiStepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import StepsEnum, { StepLabels } from '../enums/steps.enum';
import { colors } from '../../../../../../config/theme/colors';

const StepsContainer = styled(Box)(
  () => `
    display: flex;
    justify-content: center;
    margin: 24px 0;
  `,
);

const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: colors.primary[70],
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: colors.primary[70],
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

interface Props {
  activeStep: StepsEnum;
  onStepChange: (step: StepsEnum) => void;
}

const Stepper = ({ activeStep, onStepChange }: Props): ReactElement => {
  return (
    <StepsContainer>
      <MuiStepper sx={{ width: '100%' }} activeStep={activeStep} connector={<Connector />}>
        {Object.values(StepsEnum)
          .filter((step) => typeof step === 'number')
          .map((step, index) => {
            return (
              <Step key={index} onClick={() => onStepChange(step as StepsEnum)} >
                <StepLabel
                  slotProps={{
                    label: {
                      style: { color: activeStep === step ? colors.primary[70] : colors.secondary[90] },
                    },
                  }}
                >
                  {StepLabels[step as StepsEnum]}
                </StepLabel>
              </Step>
            );
          })}
      </MuiStepper>
    </StepsContainer>
  );
};

export default Stepper;
