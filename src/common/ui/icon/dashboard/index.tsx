import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Dashboard = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M16.6667 14.1673C16.6667 15.548 15.5474 16.6673 14.1667 16.6673C12.786 16.6673 11.6667 15.548 11.6667 14.1673C11.6667 12.7866 12.786 11.6673 14.1667 11.6673C15.5474 11.6673 16.6667 12.7866 16.6667 14.1673Z"
        strokeWidth="1.5"
      />
      <path
        d="M11.6667 5.00065C11.6667 4.08018 12.4129 3.33398 13.3333 3.33398H15C15.9205 3.33398 16.6667 4.08018 16.6667 5.00065V6.66732C16.6667 7.58779 15.9205 8.33398 15 8.33398H13.3333C12.4129 8.33398 11.6667 7.58779 11.6667 6.66732V5.00065Z"
        strokeWidth="1.5"
      />
      <path
        d="M3.33333 5.00065C3.33333 4.08018 4.07953 3.33398 5 3.33398H6.66667C7.58714 3.33398 8.33333 4.08018 8.33333 5.00065V6.66732C8.33333 7.58779 7.58714 8.33398 6.66667 8.33398H5C4.07953 8.33398 3.33333 7.58779 3.33333 6.66732V5.00065Z"
        strokeWidth="1.5"
      />
      <path
        d="M3.33333 13.334C3.33333 12.4135 4.07953 11.6673 5 11.6673H6.66667C7.58714 11.6673 8.33333 12.4135 8.33333 13.334V15.0007C8.33333 15.9211 7.58714 16.6673 6.66667 16.6673H5C4.07953 16.6673 3.33333 15.9211 3.33333 15.0007V13.334Z"
        strokeWidth="1.5"
      />
    </svg>
  </Icon>
);

export default Dashboard;