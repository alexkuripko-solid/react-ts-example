import { useMemo, useState } from 'react';
import { SidebarLinkInterface } from '../interfaces/interfaces';
import { UserTypesEnum } from '../../../../enums/user-types.enum';
import modules from '../../../../modules';
import { IUser } from '../../../../services/api/user/dto/user.dto';
import { SidebarContextInterface } from '../context/sidebar.context';
import { useTheme } from "@mui/material";

const getLinksByUserType = (type: number): SidebarLinkInterface[] => {
  switch (type) {
    case UserTypesEnum.ADMIN:
      return modules.admin.sidebarLinks || [];

    case UserTypesEnum.PROVIDER:
      return modules.therapist.sidebarLinks || [];

    case UserTypesEnum.CLIENT:
      return modules.client.sidebarLinks || [];

    default:
      return [];
  }
};


const useSidebarContext = (user: IUser | null): SidebarContextInterface => {
  const theme = useTheme();
  const defaultOpened = window.innerWidth > theme.breakpoints.values.lg;
  const [opened, setOpened] = useState<boolean>(defaultOpened);

  return useMemo(
    () => ({
      opened,
      toggle: () => {
        setOpened((prevState) => !prevState);
      },
      links: user ? getLinksByUserType(user.type) : [],
    }),
    [opened, user],
  );
};

export default useSidebarContext;
