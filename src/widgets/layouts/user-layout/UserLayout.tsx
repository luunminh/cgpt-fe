import { AuthGuard } from '@core/auth/guards';
import { Flex } from '@ui/flex';
import Navbar from '@widgets/navbar';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

const UserLayout = ({ children }: Props) => {
  return (
    <AuthGuard>
      <Navbar.User />
      <Flex align="center" justify="center" className="relative z-1 min-h-[90vh] h-full">
        <div className="container rounded-lg border-2 border-primary">{children}</div>
      </Flex>
    </AuthGuard>
  );
};

export default UserLayout;
