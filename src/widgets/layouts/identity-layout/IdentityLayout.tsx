import { Flex } from '@ui/flex';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const IdentityLayout = ({ children }: Props) => {
  return (
    <>
      <div
        style={{
          backgroundImage: 'url(./auth-bg.webp)',
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
