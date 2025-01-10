import { TableParams } from '@shared/utils';

export type GetMyGroupsResponse = {
  id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  updatedById: string;
  groupName: string;
  description: string;
  avatarUrl: string;
  groupType: 'TRIP';
  lkCurrencyId: string;
  ownerId: string;
  members: GetMyGroupsMemberResponse[];
};

type GetMyGroupsMemberResponse = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatarUrl: string;
  userStatus: string;
  memberStatus: string;
};

export type GetMyGroupsFilterParams = {};

export type GetMyGroupsParams = TableParams & Partial<GetMyGroupsFilterParams>;
