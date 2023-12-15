import { ReactElement } from "react";
import { Form } from "formik";
import { TextField } from '../../../../ui/text-field';
import { Box, Rating, styled, Typography } from "@mui/material";
import Button from "../../../../ui/button";
import { colors } from "../../../../../config/theme/colors";
import { StarRounded } from "@mui/icons-material";

const RatingContainer = styled(Box)(
  () => `
    border-radius: 6px;
    border: 1px solid ${colors.secondary[30]};
`,
);

const RatingItem = styled(Box)(
  () => `
    display: flex;
    justify-content: space-between;
    margin: 16px;
`,
);

interface RatingFieldProps {
  label: string;
  value: number | null;
  onChange: (rating: number | null) => void;
}

const RatingField = ({ label, value, onChange }: RatingFieldProps): ReactElement => {
  return (
    <RatingItem>
      <Typography>{label}</Typography>
      <Rating
        value={value}
        onChange={(e, rating) => onChange(rating)}
        icon={<StarRounded sx={{color: colors.warning[40]}} fontSize="inherit" />}
        emptyIcon={<StarRounded color="secondary" />}
      />
    </RatingItem>
  )
}

const FeedbackFormContent = (): ReactElement => {
  return (
    <Form>
      <Box sx={{mt: 2}}>
        <TextField type="textarea" name="message" rows={5} placeholder="Write your review..."/>
        <Typography sx={{mt: 1}} variant="h6">Rate Us</Typography>
        <Typography sx={{mt: 2}}>
          If you had an amazing experience with your therapist 5 starts.
          If you had a poor experience rate 1 star
        </Typography>
        <RatingContainer sx={{ mt: 2}}>
          <RatingField label="Therapist assessment" value={5} onChange={console.log} />
          <RatingField label="Platform assessment" value={5} onChange={console.log} />
          <RatingField label="General assessment" value={5} onChange={console.log} />
        </RatingContainer>
        <Button sx={{ mt: 2 }} type="submit" variant="contained" fullWidth>Save</Button>
      </Box>
    </Form>
  )
};

export default FeedbackFormContent;
