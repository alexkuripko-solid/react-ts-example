import { ReactElement } from 'react';
import { Box, Divider, Grid, IconButton, styled, Typography } from "@mui/material";
import { FacebookOutlined, GitHub, Instagram, Twitter } from "@mui/icons-material";
import { colors } from "../../../config/theme/colors";
import { Link as CommonLink } from "react-router-dom";

const FooterContainer = styled(Box)(
  () => `
  display: flex;
  padding: 16px;
  justify-content: space-between;
  background: ${colors.primary[100]};
`,
);

const GridCenter = styled(Grid)(
  () => `
  display: flex;
  justify-content: center;
`,
);

const GridStart = styled(Grid)(
  () => `
  display: flex;
  justify-content: start;
  padding-left: 24px;
`,
);

const GridEnd = styled(Grid)(
  () => `
  display: flex;
  justify-content: end;
  padding-right: 24px;
`,
);

const Subtitle = styled(Typography)(
  () => `
  color: #F0F0F0;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  margin-left: 8px;
`,
);

const Signature = styled(Typography)(
  () => `
  color: ${colors.secondary[50]};
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  margin-left: 8px;
  margin-top: 40px;
`,
);

const Link = styled(CommonLink)(
  () => `
  color: ${colors.secondary[30]};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-decoration: none;
  margin: 12px;
`,
);

const CustomDivider = styled(Box)(
  () => `
    width: 111px;
    height: 1px;
    transform: rotate(90deg);
    opacity: 0.2;
    border: 1px solid rgb(237, 237, 241);
    position: relative;
    bottom: 65px;
`,
);

const MobileFooter = (): ReactElement => {
  return (
    <FooterContainer>
      <Grid container>
        <GridCenter item xs={12}>
          <img src="/img/logo.svg" />
        </GridCenter>
        <GridCenter item xs={12}>
          <Subtitle>Therapy made easy.</Subtitle>
        </GridCenter>
        <GridEnd item xs={6}>
          <Box sx={{display: 'grid'}}>
            <Link to={''}>Services</Link>
            <Link to={''}>About us</Link>
            <Link to={''}>Benefits</Link>
          </Box>
        </GridEnd>
        <GridStart item xs={6}>
          <Box sx={{display: 'grid'}}>
            <Link to={''}>Our specialists</Link>
            <Link to={''}>Join us</Link>
            <Link to={''}>Contacts</Link>
          </Box>
        </GridStart>
        <GridCenter item xs={12}>
          <CustomDivider />
        </GridCenter>
        <GridCenter item xs={12}>
          <Box sx={{display: 'flex', justifyContent: 'end'}}>
            <IconButton color="secondary">
              <Twitter />
            </IconButton>
            <IconButton color="secondary">
              <FacebookOutlined />
            </IconButton>
            <IconButton color="secondary">
              <Instagram />
            </IconButton>
            <IconButton color="secondary">
              <GitHub />
            </IconButton>
          </Box>
        </GridCenter>
        <GridCenter item xs={12}>
          <Signature>© 2023 Company name. All rights reserved. </Signature>
        </GridCenter>
      </Grid>
    </FooterContainer>
  );
};

export default MobileFooter;