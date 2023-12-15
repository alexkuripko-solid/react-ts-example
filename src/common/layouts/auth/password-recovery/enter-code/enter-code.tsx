import React, { FC, ReactElement } from 'react';
import { styled, Typography } from '@mui/material';
import { PasswordRecoveryProps, PasswordRecoverySteps, RecoveryStepProps } from '../pasword-recovery';
import AuthImageSlider from '../../auth-image-slider';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { colors } from '../../../../../config/theme/colors';
import CodeInput from '../../../../ui/code-input';
import Button from '../../../../ui/button';
import AuthPage from '../../auth-page';

const StyledLink = styled('a')(
  () => `
  margin-top: 4px;
  text-decoration: none;
  color: ${colors.primary[60]};
  font-size: 14px;
  cursor: pointer;
`,
);

interface EnterCodeForm {
  code: string;
}

const enterCodeValidationSchema = () =>
  Yup.object().shape({
    code: Yup.string()
      .min(4, 'Please enter your code')
      .required(() => 'Please enter your code'),
  });

const enterCodeInitialValues: EnterCodeForm = {
  code: '',
};

const FormContent = ({ signInLink }: PasswordRecoveryProps): ReactElement => {
  const { values, setFieldValue, isSubmitting, errors } = useFormikContext<EnterCodeForm>();
  const navigate = useNavigate();

  return (
    <Form>
      <CodeInput value={values.code} onChange={(code) => setFieldValue('code', code)} />
      <Button sx={{ mt: 4 }} type="submit" fullWidth variant="contained" disabled={isSubmitting || !!errors.code}>
        Continue
      </Button>
      <Button
        sx={{ mt: 2, mb: 2 }}
        fullWidth
        variant="outlined"
        onClick={() => navigate(signInLink)}
        disabled={isSubmitting}
      >
        Back to log in
      </Button>
      <Typography sx={{ textAlign: 'center', mb: 10 }}>
        Didn&apos;t receive the email?
        <StyledLink onClick={() => console.log('resend')}> Click to resend</StyledLink>
      </Typography>
    </Form>
  );
};

const EnterCode: FC<RecoveryStepProps & PasswordRecoveryProps> = ({
  onStepChange,
  ...props
}: PasswordRecoveryProps & RecoveryStepProps): ReactElement => {
  const handleSubmit = (
    values: EnterCodeForm,
    { resetForm, setSubmitting, setErrors }: FormikHelpers<EnterCodeForm>,
  ) => {
    onStepChange(PasswordRecoverySteps.SET_PASSWORD);
  };

  return (
    <AuthPage
      title="Password reset"
      description="We sent a code to Jayson.Will@mail.com"
      image={props.imageSrc}
      imageSlider={<AuthImageSlider />}
      paddingTop={30}
    >
      <Formik
        initialValues={enterCodeInitialValues}
        onSubmit={handleSubmit}
        validationSchema={enterCodeValidationSchema()}
        enableReinitialize
      >
        <FormContent {...props}/>
      </Formik>
    </AuthPage>
  );
};

export default EnterCode;
