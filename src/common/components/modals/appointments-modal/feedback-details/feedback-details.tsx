import React, { ReactElement } from 'react';
import { Box, Grid, Rating, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { TextField } from '../../../../ui/text-field';
import * as Yup from 'yup';
import { Form, Formik, useFormikContext } from 'formik';
import ReviewRequestDto from '../../../../../services/api/appointment/dto/review-request.dto';
import Button from '../../../../ui/button';
import { UserTypesEnum } from "../../../../../enums/user-types.enum";

const initialValues: ReviewRequestDto = {
  rating: 0,
  comment: '',
  author: UserTypesEnum.CLIENT,
};

const validationSchema = () =>
  Yup.object().shape({
    comment: Yup.string().required(() => 'Please enter your feedback'),
  });

interface ReviewForm {
  loading: boolean;
  onClose: () => void;
}

const FeedbackForm = ({ loading, onClose }: ReviewForm): ReactElement => {
  const { values, setFieldValue, isSubmitting } = useFormikContext<ReviewRequestDto>();

  return (
      <Grid sx={{ mt: 2 }} item xs={12} md={12}>
        <Form>
          <Typography fontWeight={600}>Tell us about your experience</Typography>
          <Rating
            sx={{ mt: 2 }}
            value={values.rating}
            onChange={(e, rating) => setFieldValue('rating', rating)}
            emptyIcon={<Star style={{ color: '#000', opacity: 0.2 }} fontSize="inherit" />}
            size="large"
          />
          <TextField sx={{ mt: 2, mb: 3 }} name="comment" type="textarea" placeholder="Leave a feedback..." />
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={loading} loading={loading}>
              Send
            </Button>
          </Box>
        </Form>
      </Grid>
  );
};

interface Props {
  loading: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const FeedbackDetails = ({ loading, onSubmit, onClose }: Props): ReactElement => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema()}>
      <FeedbackForm loading={loading} onClose={onClose} />
    </Formik>
  );
};

export default FeedbackDetails;
