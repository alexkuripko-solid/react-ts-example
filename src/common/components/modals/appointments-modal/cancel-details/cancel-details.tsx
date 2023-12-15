import React, { ReactElement, useState } from "react";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { Box, Grid, Typography } from "@mui/material";
import { TextField } from "../../../../ui/text-field";
import Button from "../../../../ui/button";
import CancelRequestDto from "../../../../../services/api/appointment/dto/cancel-request.dto";
import PrivacyPolicyCheckbox from "../../../../privacy-policy-checkbox";

const initialValues: CancelRequestDto = {
  comment: '',
};

const validationSchema = () =>
  Yup.object().shape({
    comment: Yup.string().required(() => 'Please enter the comment'),
  });

interface ReviewForm {
  loading: boolean;
  onClose: () => void;
}

const CancelForm = ({ loading, onClose }: ReviewForm): ReactElement => {
  const [policyAccepted, setPolicyAccepted] = useState<boolean>(false);
  const { isSubmitting } = useFormikContext<CancelRequestDto>();

  return (
    <Grid sx={{ mt: 2 }} item xs={12} md={12}>
      <Form>
        <Typography fontWeight={600}>Reason for Сanceling</Typography>
        <TextField
          sx={{ mt: 2, mb: 1 }}
          name="comment"
          type="textarea"
          placeholder="Please indicate the reason for the cancellation..."
        />

        <PrivacyPolicyCheckbox checked={policyAccepted} onChange={setPolicyAccepted} />
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="error" disabled={loading || !policyAccepted} loading={loading}>
            Confirm Cancel
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

const CancelDetails = ({ loading, onSubmit, onClose }: Props): ReactElement => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema()}
    >
      <CancelForm loading={loading} onClose={onClose} />
    </Formik>
  );
};

export default CancelDetails;
