import { Flex } from '@ui/flex';
import Navbar from '@widgets/navbar';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const IdentityLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar.Identity />
      <div
        style={{
          backgroundImage: 'url(/images/auth-bg.webp)',
        }}
        className="blur-sm bg-cover bg-no-repeat absolute top-0 h-full w-full"
      />
      <Flex align="center" justify="center" className="relative z-1 min-h-[90vh] h-full">
        {children}
      </Flex>
    </>
  );
};

export default IdentityLayout;
