import { FC, ReactElement, useState } from 'react';
import Done from './done';
import EnterCode from './enter-code';
import SendCode from './send-code';
import SetPassword from './set-password';

export enum PasswordRecoverySteps {
  SEND_CODE,
  ENTER_CODE,
  SET_PASSWORD,
  DONE,
}

export interface RecoveryStepProps {
  onStepChange: (step: PasswordRecoverySteps) => void;
}

export interface PasswordRecoveryProps {
  signInLink: string;
  imageSrc: string;
}


type StepsType = {
  [key in PasswordRecoverySteps]: FC<RecoveryStepProps & PasswordRecoveryProps>;
};

const steps: StepsType = {
  [PasswordRecoverySteps.SEND_CODE]: SendCode,
  [PasswordRecoverySteps.ENTER_CODE]: EnterCode,
  [PasswordRecoverySteps.SET_PASSWORD]: SetPassword,
  [PasswordRecoverySteps.DONE]: Done,
};


const PasswordRecovery = (props: PasswordRecoveryProps): ReactElement => {
  const [step, setStep] = useState(PasswordRecoverySteps.SEND_CODE);

  const ActivePage = steps[step];
  return <ActivePage onStepChange={setStep} {...props} />;
};

export default PasswordRecovery;
