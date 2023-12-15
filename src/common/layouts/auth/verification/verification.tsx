import { ReactElement, useEffect, useState } from 'react';
import { styled, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import AuthMessagePage from '../auth-message-page';
import { useAuthUser, useQuery } from '../../../../hooks';
import { logout, verify } from '../../../../store/actions/auth';
import { colors } from '../../../../config/theme/colors';
import dayjs from 'dayjs';
import useSnackbar from '../../../../hooks/use-snackbar.hook';
import { AuthStorage } from '../../../../services/storage/auth.storage';
import { Navigate } from "react-router-dom";

const Link = styled('span')(
  () => `
    color: ${colors.primary[70]};
    cursor: pointer;
`,
);

interface Props {
  signUpLink: string;
  nextStepLink: string;
}

const Verification = ({ signUpLink, nextStepLink }: Props): ReactElement | null => {
  const [verificationFailed, setVerificationFailed] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const { successSnackbar } = useSnackbar();
  const { params } = useQuery();
  const dispatch = useDispatch();
  const user = useAuthUser();

  const handleVerify = () => {
    if (user && !user?.email_verified_at && params.activationCode) {
      dispatch(
        verify(
          user.id,
          params.activationCode,
          nextStepLink,
          () => {
            window.location.reload();
          },
          () => {
            setVerificationFailed(true);
          },
        ),
      );
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = signUpLink;
  };

  const updateTimer = (timerValue: number) => {
    if (timerValue >= 0) {
      setTimer(timerValue);
      setTimeout(() => {
        updateTimer(timerValue - 1);
      }, 1000);
    }
  };

  const handleResend = () => {
    // dispatch(
    //   sendVerificationCode(() => {
        successSnackbar('Email sent');
        AuthStorage.storeLastCodeSendTime(dayjs(new Date()).unix());
        updateTimer(100);
    //   }),
    // );
  };

  useEffect(() => {
    updateTimer(100 - (dayjs(new Date()).unix() - (AuthStorage.getLastCodeSendTime() || 0)) || 0);
  }, []);

  useEffect(() => {
    handleVerify();
  }, [user]);

  if(user?.email_verified_at) {
    return <Navigate to={nextStepLink} />;
  }

  if (user && !params.activationCode) {
    return (
      <AuthMessagePage
        title="Let's connect! Please verify your email address"
        description={
          <>
            <Typography>
              Welcome to Therappy! Please verify your email address
              <Typography color="primary" component="span">
                {` ${user?.email} `}
              </Typography>
              and complete your registration on our platform
            </Typography>
            <Typography sx={{ mt: 3 }}>
              If you entered the wrong email,
              <Link onClick={handleLogout}>{' return to the Sign Up page'}</Link>
            </Typography>
          </>
        }
      />
    );
  }

  if (verificationFailed) {
    return (
      <AuthMessagePage
        title="Email verification link has expired"
        description={
          <>
            <Typography>
              If you don’t receive a confirmation email,
              <Typography component="span">
                {timer > 0
                  ? ` resend in ${timer} sec`
                  : <Link onClick={handleResend}>
                    {` click to resend`}
                  </Link>}
              </Typography>
            </Typography>
            <Typography sx={{ mt: 3 }}>
              If you entered the wrong email,
              <Link onClick={handleLogout}>{' return to the Sign Up page'}</Link>
            </Typography>
          </>
        }
      />
    );
  }

  return null;
};

export default Verification;
