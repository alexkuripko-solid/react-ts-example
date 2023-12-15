import { ReactElement } from 'react';
import { ClientRouteEnum } from '../../../routes/enums/route.enum';
import CommonVerification from '../../../../../common/layouts/auth/verification';

const Verification = (): ReactElement | null => {
  return <CommonVerification signUpLink={ClientRouteEnum.SIGN_UP} nextStepLink={ClientRouteEnum.SIGN_UP_LAST_STEP} />;
};

export default Verification;
