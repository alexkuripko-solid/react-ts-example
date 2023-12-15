import React, { ReactElement } from 'react';
import { Box, Grid, Rating, styled, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { TextField } from '../../../../ui/text-field';
import * as Yup from 'yup';
import { Form, Formik, useFormikContext } from 'formik';
import ReviewRequestDto from '../../../../../services/api/appointment/dto/review-request.dto';
import Button from '../../../../ui/button';
import Switch from '../../../../ui/switch';
import { colors } from '../../../../../config/theme/colors';

const BlockUserContainer = styled(Box)(
  () => `
    display: flex;
    padding: 8px 12px;
    border-radius: 8px;
`,
);

const initialValues: ReviewRequestDto = {
  rating: 0,
  comment: '',
  blockUser: false,
};

const validationSchema = () =>
  Yup.object().shape({
    comment: Yup.string().required(() => 'Please enter your feedback'),
  });

interface ReviewForm {
  loading: boolean;
  onClose: () => void;
}

const ReviewForm = ({ loading, onClose }: ReviewForm): ReactElement => {
  const { values, setFieldValue, isSubmitting } = useFormikContext<ReviewRequestDto>();

  return (
    <>
      <Grid item xs={12} md={12}>
        <BlockUserContainer sx={{ border: `1px solid ${values.blockUser ? colors.error[60] : colors.secondary[20]}`}}>
          <Switch
            color="error"
            checked={!!values.blockUser}
            onChange={(e, checked) => setFieldValue('blockUser', checked)}
          />
          <Box>
            <Typography variant="subtitle1">Block this client</Typography>
            <Typography variant="body2" fontSize={14}>
              A blocked client won’t be able to book a session with you again. You’ll be able to unblock them later.
            </Typography>
          </Box>
        </BlockUserContainer>
      </Grid>
      <Grid item xs={12} md={12}>
        <Form>
          <Typography fontWeight={600}>Rate your customer experience</Typography>
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
              Confirm
            </Button>
          </Box>
        </Form>
      </Grid>
    </>
  );
};

interface Props {
  loading: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const ReviewDetails = ({ loading, onSubmit, onClose }: Props): ReactElement => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema()}>
      <ReviewForm loading={loading} onClose={onClose} />
    </Formik>
  );
};

export default ReviewDetails;
