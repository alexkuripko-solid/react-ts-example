import { ReactElement } from 'react';
import { MobileSidebar } from '../sidebar';
import { IconButton } from '@mui/material';
import Button from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import { ClientRouteEnum } from '../../../modules/client/routes/enums/route.enum';

const MobileHeader = (): ReactElement => {
  return (
    <MobileSidebar
      sidebarContent={<></>}
      headerAction={
        <Button color="inherit" onClick={() => (window.location.href = ClientRouteEnum.SIGN_UP)}>
          Sign Up
        </Button>
      }
    />
  );
};

export default MobileHeader;
