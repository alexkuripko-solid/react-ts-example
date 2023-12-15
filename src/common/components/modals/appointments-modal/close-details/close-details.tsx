import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import Button from "../../../../ui/button";

interface Props {
  loading: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const CloseDetails = ({ loading, onSubmit, onClose }: Props): ReactElement => {
  return (
    <Box sx={{mt: 2}} display="flex" justifyContent="space-between">
      <Button variant="contained" color="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={onSubmit}
        disabled={loading}
        loading={loading}
      >
        Confirm Cancel
      </Button>
    </Box>
  );
};

export default CloseDetails;
