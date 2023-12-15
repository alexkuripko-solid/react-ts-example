import { ReactElement } from "react";
import { Box, styled } from "@mui/material";
import { colors } from "../../../config/theme/colors";
import { Link as CommonLink } from "react-router-dom";
import Button from "../../ui/button";
import { ClientRouteEnum } from "../../../modules/client/routes/enums/route.enum";

const HeaderContainer = styled(Box)(
  () => `
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 32px;
  justify-content: space-between;
  background: ${colors.background.BG_1};
  z-index: 9999;
`,
);

const Links = styled(Box)(
  () => `
  display: flex;
`,
);

const Link = styled(CommonLink)(
  () => `
  color: ${colors.secondary[70]};
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  text-decoration: none;
  margin-left: 40px;
`,
);

const DesktopHeader = (): ReactElement => {
  return (
    <HeaderContainer>
      <img src="/img/logo.svg" />
      <Links>
        <Link to={''}>Services</Link>
        <Link to={''}>How we work</Link>
        <Link to={''}>Benefits</Link>
        <Link to={''}>Our Therapists</Link>
        <Link to={''}>Therapist Login</Link>
        <Link to={''}>Contacts</Link>
      </Links>
      <Box>
        <Button
          sx={{ mr: 2, color: colors.primary[50] }}
          onClick={() => window.location.href = ClientRouteEnum.SIGN_IN}
        >
          Login
        </Button>
        <Button
          sx={{ background: colors.primary[50] }}
          onClick={() => window.location.href = ClientRouteEnum.SIGN_UP}
          variant="contained"
        >
          Sign Up
        </Button>
      </Box>
    </HeaderContainer>
  );
};

export default DesktopHeader;
