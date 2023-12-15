import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Book = ({ size = 32, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M6.66667 11.0062C8.35437 11.2676 10.237 11.7021 12 12.3838M6.66667 16.3395C7.51932 16.4716 8.42174 16.6478 9.33334 16.8778M16 8.07116V27.07M5.32578 4.01503C8.28361 4.34926 12.2575 5.24843 15.0891 7.2326C15.6333 7.61394 16.3667 7.61394 16.9109 7.2326C19.7425 5.24843 23.7164 4.34926 26.6742 4.01503C28.1381 3.84961 29.3333 5.07203 29.3333 6.58024V21.5999C29.3333 23.1081 28.1381 24.331 26.6742 24.4964C23.7164 24.8307 19.7425 25.7298 16.9109 27.714C16.3667 28.0953 15.6333 28.0953 15.0891 27.714C12.2575 25.7298 8.28361 24.8307 5.32578 24.4964C3.8619 24.331 2.66667 23.1081 2.66667 21.5999V6.58024C2.66667 5.07203 3.8619 3.84961 5.32578 4.01503Z"
        stroke="#28303F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </Icon>
);

export default Book;
