import { ReactElement, useContext, useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  styled,
  Theme,
} from '@mui/material';
import Logout from '../../../ui/icon/logout';
import { logout } from '../../../../store/actions/auth';
import { SidebarContext } from '../context/sidebar.context';
import { useAuthUser, useConfirmation } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { colors } from '../../../../config/theme/colors';
import { getImagePath } from "../../../../helpers/image.helper";

const Item = styled(ListItemButton)(
  ({ theme, color }: ListItemButtonProps & { color: string; theme?: Theme }) => `
    color: ${color};
    display: flex;
    border-radius: 6px;
    margin: 8px 24px;
    height: 36px;
    justify-content: initial;
    fill: ${color};
    stroke: ${color};
    
    &:hover {
        background: ${theme?.palette.text.secondary};
    }
`,
);

const ActiveItem = styled(Item)(
  ({ background }: ListItemButtonProps & { background?: string }) => `
    color: #006fcc;
    fill: #006fcc;
    stroke: #006fcc;
    background: ${background};
`,
);

const ItemText = styled('span')(
  () => `
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
`,
);

const UserInfo = styled(Box)(
  () => `
    display: flex;
    position: absolute;
    bottom: 0;
`,
);

const UserAvatar = styled('img')(
  () => `
    width: 40px;
    height: 40px;
    border-radius: 40px;
`,
);

const UserName = styled('p')(
  ({ color }) => `
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    color: ${color};
    margin: 0;
    text-wrap: wrap;
`,
);

const UserEmail = styled('p')(
  ({ theme }) => `
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin: 0;
    color: ${theme.palette.text.disabled};
`,
);

const LogoutIcon = styled(Logout)(
  () => `
  stroke: ${colors.secondary[10]};
`,
);

const getCurrentRoutePath = () => {
  const currentURL = window.location.href;
  const domain = window.location.origin;
  const urlWithoutDomain = currentURL.replace(domain, '');

  if (!urlWithoutDomain.length) {
    return '';
  }
  return urlWithoutDomain.split('?')[0];
};

interface Props {
  isMobile?: boolean;
}

const SidebarContent = ({ isMobile = false }: Props): ReactElement => {
  const [activeLink, setActiveLink] = useState<string>('');
  const { links } = useContext(SidebarContext);
  const user = useAuthUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Confirmation, showConfirmation } = useConfirmation();
  const sidebar = useContext(SidebarContext);

  useEffect(() => {
    setActiveLink(getCurrentRoutePath());
  }, []);

  const handleLinkClick = (link: string) => {
    navigate(link);
    setActiveLink(link);
  };

  const handleLogout = () => {
    showConfirmation({
      text: 'Confirm logout',
      description: 'Are you sure you want to log out?',
      onConfirm: () => {
        dispatch(logout());
      },
    });
  };
  return (
    <>
      {Confirmation}
      <List>
        {links.map(({ label, link, Icon }) => {
          const ItemButton = link === activeLink ? ActiveItem : Item;

          return (
            <ListItem key={label} disablePadding sx={{ display: 'block' }}>
              <ItemButton
                sx={
                  !sidebar.opened
                    ? {
                        margin: '14px',
                        padding: '8px',
                      }
                    : {}
                }
                color={isMobile ? colors.secondary[90] : colors.background.BG_1}
                background={isMobile ? colors.secondary[20] : colors.secondary[10]}
                onClick={() => handleLinkClick(link)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebar.opened ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Icon />
                </ListItemIcon>
                {sidebar.opened && <ItemText>{label}</ItemText>}
              </ItemButton>
            </ListItem>
          );
        })}
      </List>
      {user && (
        <UserInfo sx={{margin: sidebar.opened ? '32px 24px' : '32px 12px'}}>
          <UserAvatar src={getImagePath(0)} />
          {sidebar.opened && (
            <>
              <Box sx={{ ml: 1, display: 'grid' }}>
                <UserName color={isMobile ? colors.secondary[60] : colors.background.BG_1}>
                  {user.first_name} {user.last_name}
                </UserName>
                <UserEmail>{user.email}</UserEmail>
              </Box>
              {!isMobile && (
                <IconButton onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              )}
            </>
          )}
        </UserInfo>
      )}
    </>
  );
};

export default SidebarContent;
