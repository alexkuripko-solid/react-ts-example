export enum UserStatusesEnum {
  NEW,
  PENDING,
  APPROVED,
  ACTIVE,
  DECLINED,
}

export const ParsedUserStatuses = {
  [UserStatusesEnum.NEW]: 'New',
  [UserStatusesEnum.PENDING]: 'Pending',
  [UserStatusesEnum.APPROVED]: 'Approved',
  [UserStatusesEnum.ACTIVE]: 'Active',
  [UserStatusesEnum.DECLINED]: 'Declined',
};
