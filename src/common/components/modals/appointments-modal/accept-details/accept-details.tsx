import React, { ReactElement } from 'react';
import { Error } from '../../../../ui/icon-v2';
import { Box, Grid, Typography } from '@mui/material';
import Button from '../../../../ui/button';

interface Props {
  loading: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const AcceptDetails = ({ loading, onClose, onSubmit }: Props): ReactElement => {
  return (
    <>
      <Grid item display="flex" xs={12} md={12}>
        <Error size={24} />
        <Typography variant="body2" fontSize={14} sx={{ ml: 2 }}>
          If you accept this appointment, a notification will be sent to the client and yourself. You have 24hrs to
          cancel without penalty. See cancellation of bookings policy and questions
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} variant="contained" disabled={loading} loading={loading}>
            Accept
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default AcceptDetails;
