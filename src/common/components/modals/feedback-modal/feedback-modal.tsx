import { ReactElement, useState } from 'react';
import Modal from '../../../ui/modal';
import { Box, Divider, Typography } from '@mui/material';
import FeedbackFormContent from './feedback-form-content';
import ContactFormContent from '../../../../modules/client/components/pages/help/contact-form/contact-form-content';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../../../ui/button';

interface FeedbackForm {
  message: string;
  therapist_rating: number;
  platform_rating: number;
  general_rating: number;
}

export const defaultFormValue: FeedbackForm = {
  message: '',
  therapist_rating: 0,
  platform_rating: 0,
  general_rating: 0,
};

const validationSchema = Yup.object().shape({
  message: Yup.string().required(() => 'Please enter a message'),
});

interface Props {
  open: boolean;
  onClose: () => void;
}

const FeedbackModal = ({ open, onClose }: Props): ReactElement => {
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);

  const handleSubmit = () => {
    onClose();
    setOpenSuccessModal(true);
  };

  return (
    <>
      <Modal open={open} title="Tell us about your experience?" onClose={onClose}>
        <Typography>
          We love to hear from you. If you you had a great experience we want to hear about it. If you didn’t we want to
          know about it
        </Typography>
        <Formik initialValues={defaultFormValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
          <FeedbackFormContent />
        </Formik>
      </Modal>
      <Modal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)} maxWidth="xs">
        <Box textAlign="center">
          <img src="/img/feedback-pana.svg" />
          <Typography sx={{ mt: 3 }} variant="h5">
            Thank you for sharing your experience
          </Typography>
        </Box>
        <Divider sx={{ mt: 3, mb: 3 }} />
        <Box display="flex" justifyContent="end">
          <Button variant="contained" color="secondary" onClick={() => setOpenSuccessModal(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FeedbackModal;
