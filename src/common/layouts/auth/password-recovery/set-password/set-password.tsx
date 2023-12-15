import { FC, ReactElement } from 'react';
import AuthPage from '../../auth-page';
import { PasswordRecoveryProps, PasswordRecoverySteps, RecoveryStepProps } from '../pasword-recovery';
import AuthImageSlider from '../../auth-image-slider';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from '../../../../ui/text-field';
import Button from '../../../../ui/button';

interface SetPasswordForm {
  password: string;
  confirm_password: string;
}

const setPasswordValidationSchema = () =>
  Yup.object().shape({
    password: Yup.string().required(() => 'Please enter new password'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required(() => 'Please confirm new password'),
  });

const setPasswordInitialValues: SetPasswordForm = {
  password: '',
  confirm_password: '',
};

const FormContent = ({ signInLink }: PasswordRecoveryProps): ReactElement => {
  const { isSubmitting } = useFormikContext<SetPasswordForm>();
  const navigate = useNavigate();

  return (
    <Form>
      <PasswordField label="New Password" name="password" fullWidth />
      <PasswordField label="Confirm Password" name="confirm_password" fullWidth />
      <Button sx={{ mt: 4 }} type="submit" fullWidth variant="contained" disabled={isSubmitting}>
        Reset password
      </Button>
      <Button sx={{ mt: 2 }} fullWidth variant="outlined" onClick={() => navigate(signInLink)} disabled={isSubmitting}>
        Back to log in
      </Button>
    </Form>
  );
};

const SetPassword: FC<RecoveryStepProps & PasswordRecoveryProps> = ({
  onStepChange,
  ...props
}: RecoveryStepProps & PasswordRecoveryProps): ReactElement => {
  const handleSubmit = (
    values: SetPasswordForm,
    { resetForm, setSubmitting, setErrors }: FormikHelpers<SetPasswordForm>,
  ) => {
    onStepChange(PasswordRecoverySteps.DONE);
  };

  return (
    <AuthPage
      title="Set new passord"
      description="Must be at least 8 characters"
      image={props.imageSrc}
      imageSlider={<AuthImageSlider />}
      paddingTop={30}
    >
      <Formik
        initialValues={setPasswordInitialValues}
        onSubmit={handleSubmit}
        validationSchema={setPasswordValidationSchema()}
        enableReinitialize
      >
        <FormContent {...props}/>
      </Formik>
    </AuthPage>
  );
};

export default SetPassword;
