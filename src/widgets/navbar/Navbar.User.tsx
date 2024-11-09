'use client';

import { useLogout } from '@core/auth';
import { useGetMyProfile } from '@core/profile/api';
import { getFullName } from '@shared/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Flex } from '@ui/flex';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, PropsWithChildren, useCallback, useMemo } from 'react';

export default function NavbarUser() {
  const { data: profile } = useGetMyProfile();

  const getAvatarName = useCallback(() => {
    if (!profile) return 'A';

    const username = `${profile?.firstName} ${profile.lastName}`;
    return username !== '' ? username.match(/\b(\w)/g) : 'A';
  }, [profile]);

  const avatarCmp = useMemo(
    () => (
      <Avatar className="rounded-lg">
        <AvatarImage src={profile?.avatarUrl || '/src/assets/images/avatar.png'} alt="Avatar" />
        <AvatarFallback>{getAvatarName()}</AvatarFallback>
      </Avatar>
    ),
    [profile, getAvatarName],
  );

  return (
    <nav className="py-2 px-4 z-10 fixed top-0 flex justify-between items-center w-full bg-white max-h-[60px] border-b-[1.5px]">
      <Link href="/">
        <img src="./logo.png" width={90} height={70} />
      </Link>
      <Flex gap={2}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-2 cursor-pointer items-center">
              {avatarCmp}
              <DropdownMenuLabel className="text-center">
                {profile?.fullName || getFullName(profile) || 'Anonymous'}
              </DropdownMenuLabel>
            </div>
          </DropdownMenuTrigger>
          <NavbarUser.Menu>{avatarCmp}</NavbarUser.Menu>
        </DropdownMenu>
      </Flex>
    </nav>
  );
}

NavbarUser.Menu = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();
  const { onLogout } = useLogout();
  const { data: profile, isLoading } = useGetMyProfile();

  const handleChangePassword = () => {};

  const options = [
    { label: 'Profile', hasDivider: false, onClick: () => push('/profile') },
    { label: 'Change Password', hasDivider: true, onclick: handleChangePassword },
    { label: 'Logout', hasDivider: false, onClick: () => onLogout() },
  ];

  return (
    <DropdownMenuContent align="end" className="bg-white">
      <div className="flex items-center gap-2 p-2">
        {children}
        <div className="grid gap-0.5 leading-none">
          <div className="font-semibold">{profile?.fullName}</div>
          <div className="text-sm text-muted-foreground">{profile?.email}</div>
        </div>
      </div>
      <DropdownMenuSeparator />
      {options.map(({ label, hasDivider, onClick }) => (
        <Fragment key={label}>
          <DropdownMenuItem onClick={onClick} disabled={isLoading}>
            <span>{label}</span>
          </DropdownMenuItem>
          {hasDivider && <DropdownMenuSeparator />}
        </Fragment>
      ))}
    </DropdownMenuContent>
  );
};
