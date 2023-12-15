import { ReactElement } from "react";
import { Form } from 'formik';
import { TextField } from "../../../../../../../common/ui/text-field";
import { Box } from '@mui/material';
import Button from "../../../../../../../common/ui/button";

interface Props {
  onCancel: () => void;
}

const ContactFormContent = ({ onCancel }: Props): ReactElement => {
  return (
    <Form>
      <TextField label="Subject" name="subject" />
      <TextField type="textarea" name="message" rows={7} placeholder="Text your massage..."/>
      <Box sx={{mt: 2}} display="flex" justifyContent="space-between">
        <Button
          onClick={onCancel}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
        >
          Send
        </Button>
      </Box>
    </Form>
  );
};

export default ContactFormContent;
