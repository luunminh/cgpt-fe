'use client';

import { useGetMyProfile } from '@core/profile/api';
import { useAuthNavigate } from '@shared/hooks';
import { useAuthStore } from '@shared/store';
import { isEmpty } from '@shared/utils';
import { useLayoutEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { user, onSetUserProfile } = useAuthStore();

  const { navigateToLogin } = useAuthNavigate();
  const { onGetMyProfile } = useGetMyProfile({
    onSuccess(data) {
      if (isEmpty(data)) {
        return navigateToLogin();
      }

      console.log(data);
      onSetUserProfile(data);
    },
    onError: () => setTimeout(() => navigateToLogin(), 2000),
  });

  useLayoutEffect(() => {
    if (isEmpty(user)) {
      onGetMyProfile();
    }
  }, [user]);

  if (isEmpty(user)) {
    return null;
  }

  return <>{children}</>;
}
