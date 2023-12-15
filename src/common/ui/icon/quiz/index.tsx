import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Quiz = ({ size = 20, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d="M14.4771 6.81063C16.7488 7.83079 18.3333 10.1343 18.3333 12.8125V15.625C18.3333 16.6605 17.5042 17.5 16.4815 17.5H10.9259C8.507 17.5 6.44915 15.9347 5.68649 13.75M14.4771 6.81063C13.8926 4.33805 11.6953 2.5 9.07407 2.5H8.14815C4.56852 2.5 1.66667 5.43813 1.66667 9.0625V11.875C1.66667 12.9105 2.49577 13.75 3.51852 13.75H5.68649M14.4771 6.81063C14.5768 7.23229 14.6296 7.6724 14.6296 8.125C14.6296 11.2316 12.1423 13.75 9.07407 13.75H5.68649M8.33333 8.33333C9.25381 8.33333 10 7.58714 10 6.66667C10 5.74619 9.25381 5 8.33333 5C7.41286 5 6.66667 5.74619 6.66667 6.66667" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.16667 10.8333C9.16667 11.2936 8.79357 11.6667 8.33333 11.6667C7.8731 11.6667 7.5 11.2936 7.5 10.8333C7.5 10.3731 7.8731 10 8.33333 10C8.79357 10 9.16667 10.3731 9.16667 10.8333Z" fill="#EDEDF1"/>
    </svg>
  </Icon>
);

export default Quiz;