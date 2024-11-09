import { UserStatus, UserType } from './profile.constant';

export type TProfile = {
  id: string;

  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;

  username: string;
  email: string;
  status: UserStatus;
  userType: UserType;

  roles: string[];
  permissions: string[];

  phoneNumber: string;
  address: string;
  qrUrl: string;
  avatarUrl: string;
};
