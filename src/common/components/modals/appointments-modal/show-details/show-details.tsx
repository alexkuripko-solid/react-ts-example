import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import Button from "../../../../ui/button";

interface Props {
  loading: boolean;
  onClose: () => void;
}

const ShowDetails = ({ onClose }: Props): ReactElement => {
  return (
    <Box sx={{mt: 2}} display="flex" justifyContent="end">
      <Button
        variant="contained"
        color="secondary"
        onClick={onClose}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default ShowDetails;
