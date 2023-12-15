import React, { type ReactElement, useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes as CommonRoutes } from 'react-router-dom';
import useAuthorized from '../hooks/use-authorized.hook';
import { type RouteInterface } from './interfaces/route.interface';
import { RouteEnum } from './enums/route.enum';
import useAuthUser from '../hooks/use-auth-user.hook';
import { IUser } from '../services/api/user/dto/user.dto';
import { UserTypeModules, UserTypesEnum } from '../enums/user-types.enum';
import modules from '../modules';
import ForceRedirect from './force-redirect';
import NotFound from '../common/pages/not-found';

export interface RoutesProps {
  routes: RouteInterface[];
  defaultRedirect?: string;
  withoutSidebar: boolean;
  userTypeAccess: UserTypesEnum | undefined;
  withHeader: boolean;
  withFooter: boolean;
}

const Routes = ({ routes, defaultRedirect, userTypeAccess }: RoutesProps): ReactElement | null => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allowedRoutes, setAllowedRoutes] = useState<RouteInterface[]>([]);
  const isAuthorized: boolean | null = useAuthorized();
  const user: IUser | null = useAuthUser();

  const getAllowedRoutes = () => {
    if (isAuthorized !== null) {
      setAllowedRoutes(
        routes.map((route: RouteInterface) => {
          if (user?.redirect && route.path !== '' && route.path !== user.redirect.split('?')[0]) {
            return {
              ...route,
              Component: () => <ForceRedirect to={user.redirect || ''} />,
            };
          }
          if (user && userTypeAccess && userTypeAccess !== user?.type) {
            return {
              ...route,
              Component: () => <ForceRedirect to={modules[UserTypeModules[user.type]].rootUrl} />,
            };
          }

          if (
            (route.authOnly && isAuthorized) ||
            (route.notAuthOnly && !isAuthorized) ||
            (!route.authOnly && !route.notAuthOnly)
          ) {
            return route;
          }

          return {
            ...route,
            Component: () => <Navigate to={user?.redirect || route.redirectTo || defaultRedirect || ''} />,
          };
        }),
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllowedRoutes();
  }, []);

  useEffect(() => {
    getAllowedRoutes();
  }, [isAuthorized]);

  if (loading) return null;

  return (
    <CommonRoutes>
      {allowedRoutes.map((route: RouteInterface, key: number) => (
        <Route key={key} path={route.path} Component={route.Component} />
      ))}
      {defaultRedirect && <Route path={RouteEnum.HOME} Component={() => <Navigate to={defaultRedirect} />} />}
      <Route path={RouteEnum.NOT_FOUND} Component={NotFound} />
    </CommonRoutes>
  );
};

export default Routes;
