'use client';

import { useLogout } from '@core/auth';
import { useGetMyProfile } from '@core/profile/api';
import { useResponsive } from '@shared/hooks';
import { ScreenSize } from '@shared/hooks/useResponsive';
import { cn } from '@shared/ui/utils';
import { getFullName } from '@shared/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { Button } from '@ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu';
import { Flex } from '@ui/flex';
import { Sheet, SheetContent, SheetTrigger } from '@ui/sheet';
import { Stack } from '@ui/stack';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, PropsWithChildren, useCallback, useMemo } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function NavbarUser() {
  const isMobileScreen = useResponsive(ScreenSize.MOBILE);

  const { data: profile } = useGetMyProfile();

  const getAvatarName = useCallback(() => {
    if (!profile) return 'A';

    const username = `${profile?.firstName} ${profile.lastName}`;
    return username !== '' ? username.match(/\b(\w)/g) : 'A';
  }, [profile]);

  const avatarCmp = useMemo(
    () => (
      <Avatar className="rounded-lg">
        <AvatarImage src={profile?.avatarUrl || '/images/avatar.png'} alt="Avatar" />
        <AvatarFallback>{getAvatarName()}</AvatarFallback>
      </Avatar>
    ),
    [profile, getAvatarName],
  );

  return (
    <nav className="py-2 px-4 z-10 fixed top-0 flex justify-between items-center w-full bg-white max-h-[60px] border-b-[1.5px]">
      {isMobileScreen && <NavbarUser.Sheet />}
      {!isMobileScreen && (
        <>
          <Link href="/">
            <img src="/images/logo.png" width={90} height={70} />
          </Link>
          <NavbarUser.Link />
        </>
      )}
      <Flex gap={2}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-2 cursor-pointer items-center">
              {avatarCmp}
              {!isMobileScreen && (
                <DropdownMenuLabel className="text-center">
                  {profile?.fullName || getFullName(profile) || 'Anonymous'}
                </DropdownMenuLabel>
              )}
            </div>
          </DropdownMenuTrigger>
          <NavbarUser.Menu>{avatarCmp}</NavbarUser.Menu>
        </DropdownMenu>
      </Flex>
    </nav>
  );
}

const navbarLinks: { label: string; value: string }[] = [
  {
    label: 'Home',
    value: '/home',
  },
  {
    label: 'Groups',
    value: '/groups',
  },
  {
    label: 'Recent',
    value: '/recent',
  },
  {
    label: 'Friends',
    value: '/friends',
  },
];

NavbarUser.Link = () => {
  const pathname = usePathname();

  const isActivePath = useCallback(
    (path: string) => (path !== '/' && pathname.includes(path)) || pathname === path,
    [pathname],
  );

  return (
    <Flex align="center" justify="space-between" gap={8}>
      {navbarLinks.map(({ label, value }) => {
        const isActive = isActivePath(value);

        return (
          <Link
            key={value}
            href={value}
            className={cn('hover:underline  text-gray-500', {
              'font-semibold': isActive,
              'text-primary': isActive,
            })}
          >
            {label}
          </Link>
        );
      })}
    </Flex>
  );
};

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

NavbarUser.Sheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <GiHamburgerMenu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <Stack className="mt-4">
          {navbarLinks.map(({ label, value }) => {
            return (
              <Link key={value} href={value}>
                <div className="relative flex text-xl hover:bg-gray-100 cursor-pointer select-none items-center gap-2 rounded-sm p-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
                  <span>{label}</span>
                </div>
              </Link>
            );
          })}
        </Stack>
      </SheetContent>
    </Sheet>
  );
};
