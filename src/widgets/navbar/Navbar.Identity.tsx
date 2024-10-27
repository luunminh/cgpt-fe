'use client';

import { authPaths } from '@app/(auth)/_helpers';
import { Button } from '@ui/button';
import { Flex } from '@ui/flex';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavbarIdentity() {
  const route = useRouter();

  return (
    <nav className="py-2 px-4 z-10 fixed top-0 flex justify-between items-center w-full bg-white max-h-[60px]">
      <Link href="/">
        <img src="./logo.png" width={90} height={70} />
      </Link>
      <Flex gap={2}>
        <Button onClick={() => route.push(authPaths.signin)} variant="ghost">
          Sign In
        </Button>
        <Button onClick={() => route.push(authPaths.signup)}>Sign Up</Button>
      </Flex>
    </nav>
  );
}
