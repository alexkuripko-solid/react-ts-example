import React from 'react';
import { Navigate } from 'react-router-dom';

import { RouteInterface } from '../../../routes/interfaces/route.interface';
import { ClientRouteEnum } from './enums/route.enum';
import Bookings from '../components/pages/bookings';
import SignIn from "../components/auth/sign-in";
import SignUp from "../components/auth/sign-up";
import SignUpLastStep from "../components/auth/sign-up-last-step";
import PasswordRecovery from "../components/auth/password-recovery";
import Verification from "../components/auth/verification";
import Reviews from "../components/pages/reviews";
import Help from "../components/pages/help";
import RebookAppointment from "../components/pages/rebook-appointment";
import CreateAppointment from "../components/pages/create-appointment";

export const routes: RouteInterface[] = [
  {
    path: ClientRouteEnum.ROOT,
    Component: () => <Navigate to={ClientRouteEnum.BOOKINGS} />,
  },
  {
    path: ClientRouteEnum.SIGN_IN,
    Component: SignIn,
    notAuthOnly: true,
    redirectTo: ClientRouteEnum.BOOKINGS,
  },
  {
    path: ClientRouteEnum.SIGN_UP,
    Component: SignUp,
    notAuthOnly: true,
    redirectTo: ClientRouteEnum.BOOKINGS,
  },
  {
    path: ClientRouteEnum.PASSWORD_RECOVERY,
    Component: PasswordRecovery,
    notAuthOnly: true,
    redirectTo: ClientRouteEnum.BOOKINGS,
  },
  {
    path: ClientRouteEnum.SIGN_UP_LAST_STEP,
    Component: SignUpLastStep,
    authOnly: true,
    redirectTo: ClientRouteEnum.BOOKINGS,
  },
  {
    path: ClientRouteEnum.VERIFICATION,
    Component: Verification,
    authOnly: true,
    redirectTo: ClientRouteEnum.BOOKINGS,
  },
  {
    path: ClientRouteEnum.BOOKINGS,
    Component: Bookings,
    authOnly: true,
    redirectTo: ClientRouteEnum.SIGN_IN,
  },
  {
    path: ClientRouteEnum.REBOOK_APPOINTMENT,
    Component: RebookAppointment,
    authOnly: true,
    redirectTo: ClientRouteEnum.SIGN_IN,
  },
  {
    path: ClientRouteEnum.CREATE_APPOINTMENT,
    Component: CreateAppointment,
    authOnly: true,
    redirectTo: ClientRouteEnum.SIGN_IN,
  },
  {
    path: ClientRouteEnum.REVIEWS,
    Component: Reviews,
    authOnly: true,
    redirectTo: ClientRouteEnum.SIGN_IN,
  },
  {
    path: ClientRouteEnum.HELP,
    Component: Help,
    authOnly: true,
    redirectTo: ClientRouteEnum.SIGN_IN,
  },
];
