import React, { type ReactElement, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from "react-redux";
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import store from './store';
import Routes from './routes/routes';
import { DesktopSidebar, MobileSidebar } from './common/layouts/sidebar';

import Snackbar from './common/ui/snackbar';
import desktopTheme from './config/theme/desktop-theme';
import mobileTheme from './config/theme/mobile-theme';
import { SidebarContext } from './common/layouts/sidebar/context/sidebar.context';
import useRoutes from './routes/hooks';
import useWithSidebar from './hooks/use-with-sidebar.hook';

import './index.css';
import useSidebarContext from './common/layouts/sidebar/hooks/use-sidebar-context.hook';
import useIsMobile from './hooks/use-is-mobile.hook';
import { getServices } from './store/actions/services';
import Header from './common/layouts/header';
import Footer from './common/layouts/footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuthorized } from "./hooks";
import { getAuthUser } from "./store/actions/auth";
import { selectAuth } from "./store/selectors";

const App = (): ReactElement | null => {
  const { authUser, loading } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const sidebarContextValues = useSidebarContext(authUser);
  const routesProps = useRoutes();
  const withSidebar = useWithSidebar();
  const isMobile = useIsMobile();
  const isAuth = useAuthorized();

  useEffect(() => {
    if (isAuth) {
      dispatch(getAuthUser());
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(getServices({}));
  }, []);

  const Sidebar = isMobile ? MobileSidebar : DesktopSidebar;

  if (loading) {
    return null;
  }

  return (
    <SidebarContext.Provider value={sidebarContextValues}>
      <ThemeProvider theme={isMobile ? mobileTheme : desktopTheme}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
          <CssBaseline />
          <Router>
            <Snackbar />
            {routesProps.withHeader && <Header />}
            {!routesProps.withoutSidebar && withSidebar ? (
              <Box sx={{ display: isMobile ? 'block' : 'flex' }}>
                <Sidebar />
                <Routes {...routesProps} />
              </Box>
            ) : (
              <Routes {...routesProps} />
            )}
            {routesProps.withFooter && <Footer />}
          </Router>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </SidebarContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
