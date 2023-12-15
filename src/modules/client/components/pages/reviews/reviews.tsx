import { ReactElement, useState } from "react";
import { Box } from "@mui/material";
import FeedbackModal from "../../../../../common/components/modals/feedback-modal";

const Reviews = (): ReactElement => {
  const [open, setOpen] = useState(true)
  return (
    <Box>
      <FeedbackModal open={open} onClose={() => setOpen(false)}/>
    </Box>
  );
};

export default Reviews;
