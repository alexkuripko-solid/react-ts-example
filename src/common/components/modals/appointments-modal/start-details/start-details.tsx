import React, { ReactElement, useState } from "react";
import { Box, Grid } from "@mui/material";
import Button from "../../../../ui/button";
import PrivacyPolicyCheckbox from "../../../../privacy-policy-checkbox";

interface Props {
  loading: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const StartDetails = ({ loading, onClose, onSubmit }: Props): ReactElement => {
  const [policyAccepted, setPolicyAccepted] = useState<boolean>(false);

  return (
    <>
      <Grid item display="flex" xs={12} md={12}>
        <PrivacyPolicyCheckbox checked={policyAccepted} onChange={setPolicyAccepted} />
      </Grid>
      <Grid item xs={12} md={12}>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} variant="contained" disabled={!policyAccepted || loading} loading={loading}>
            Confirm Start
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default StartDetails;
