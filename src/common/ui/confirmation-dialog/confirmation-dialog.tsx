import { type ReactElement } from 'react';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import Modal from '../modal';
import Button from '../button';
import { colors } from '../../../config/theme/colors';

const StyledDialogActions = styled(DialogActions)(
  () => `
    justify-content: space-between; 
`,
);

const StyledDialogContent = styled(DialogContent)(
  () => `
     text-align: center;
`,
);

const StyledDialogTitle = styled(DialogTitle)(
  () => `
    color: ${colors.secondary[90]};
`,
);

const StyledDialogContentText = styled(DialogContentText)(
  () => `
    color: ${colors.secondary[70]};
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
`,
);

const ActionButton = styled(Button)(
  () => `
    width: 88px;
    height: 46px;
`,
);

export interface ConfirmationDialogProps {
  open: boolean;
  text: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog = ({
  open,
  text,
  description,
  onCancel,
  onConfirm,
}: ConfirmationDialogProps): ReactElement => {
  return (
    <Modal open={open} onClose={onCancel}>
      <StyledDialogContent>
        <StyledDialogTitle variant="h3">{text}</StyledDialogTitle>
        {description && <StyledDialogContentText>{description}</StyledDialogContentText>}
      </StyledDialogContent>
      <StyledDialogActions>
        <ActionButton sx={{ color: colors.secondary[60] }} variant="contained" color="secondary" onClick={onCancel}>
          Cancel
        </ActionButton>
        <ActionButton variant="contained" onClick={onConfirm}>
          OK
        </ActionButton>
      </StyledDialogActions>
    </Modal>
  );
};

export default ConfirmationDialog;
