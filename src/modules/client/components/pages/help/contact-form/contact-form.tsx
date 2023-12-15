import { ReactElement, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Box, Grid, Typography } from "@mui/material";
import * as Yup from 'yup';
import ContactFormContent from './contact-form-content';
import { useAuthUser } from '../../../../../../hooks';
import Modal from '../../../../../../common/ui/modal';
import Button from "../../../../../../common/ui/button";

interface ContactUsForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export const defaultFormValue: ContactUsForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(() => 'Please enter your name'),
  email: Yup.string()
    .email()
    .required(() => 'Please enter your email'),
  subject: Yup.string().required(() => 'Please enter a subject'),
  message: Yup.string().required(() => 'Please enter a message'),
});

const ContactForm = ({ open, onClose }: Props): ReactElement => {
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [initFormValue, setInitFormValue] = useState<ContactUsForm>(defaultFormValue);
  const authUser = useAuthUser();

  const handleSubmit = () => {
    onClose();
    setOpenSuccessModal(true);
  };

  useEffect(() => {
    if (authUser) {
      setInitFormValue({
        ...defaultFormValue,
        name: `${authUser.first_name} ${authUser.last_name}`,
        email: authUser.email,
      });
    }
  }, [authUser]);

  return (
    <>
      <Modal open={open} title="Contact us" onClose={onClose} maxWidth="sm">
        <Typography sx={{ mt: 2, mb: 3 }}>We are here for you. Let us know how we can help</Typography>
        <Formik
          initialValues={initFormValue}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <ContactFormContent onCancel={onClose}/>
        </Formik>
      </Modal>
      <Modal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)} maxWidth="xs">
        <Box>
          <Typography textAlign="center" variant="h5">
            Thank you for reaching out.
            We will be in touch soon!
          </Typography>
          <Typography sx={{ mt: 2}} fontSize={14}>
            We aim to get back to you within 24 hours.
            If you have any questions please see out F.A.Q.
          </Typography>
        </Box>
        <Box sx={{ mt: 2}} display="flex" justifyContent="end">
          <Button variant="contained" color="secondary" onClick={() => setOpenSuccessModal(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ContactForm;
