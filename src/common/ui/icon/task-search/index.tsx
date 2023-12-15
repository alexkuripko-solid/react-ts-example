import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Dashboard = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M12.0833 12.9165L12.9167 13.7498M13.3333 3.33317H14.1667C16.0076 3.33317 17.5 4.82555 17.5 6.6665V14.9998C17.5 16.8408 16.0076 18.3332 14.1667 18.3332H5.83333C3.99238 18.3332 2.5 16.8408 2.5 14.9998V6.6665C2.5 4.82555 3.99238 3.33317 5.83333 3.33317H6.66667M13.3333 3.33317C13.3333 4.25365 12.5871 4.99984 11.6667 4.99984H8.33333C7.41286 4.99984 6.66667 4.25365 6.66667 3.33317M13.3333 3.33317C13.3333 2.4127 12.5871 1.6665 11.6667 1.6665H8.33333C7.41286 1.6665 6.66667 2.4127 6.66667 3.33317M12.5 10.8332C12.5 12.2139 11.3807 13.3332 10 13.3332C8.61929 13.3332 7.5 12.2139 7.5 10.8332C7.5 9.45246 8.61929 8.33317 10 8.33317C11.3807 8.33317 12.5 9.45246 12.5 10.8332Z" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </Icon>
);

export default Dashboard;