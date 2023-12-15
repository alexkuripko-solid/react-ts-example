import * as Yup from 'yup';

const providerValidationSchema = Yup.object().shape({
  first_name: Yup.string().required(() => 'Please enter your first name'),
  last_name: Yup.string().required(() => 'Please enter your last name'),
  details: Yup.object({
    phone: Yup.string().required(() => 'Please enter your phone number'),
  }),
  services: Yup.array().min(1, () => 'Please select at least one service'),
});

export default providerValidationSchema;