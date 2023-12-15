import { UserTypesEnum } from '../../../../enums/user-types.enum';
import { UserStatusesEnum } from '../../../../enums/user-statuses.enum';

export interface Card {
  number: string;
  expiry: string;
  cvv: string;
  cardholder: string;
  save: boolean;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  type: UserTypesEnum;
  status: UserStatusesEnum;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
  withoutSidebar?: boolean;
  redirect?: string;
  details?: object;
}
