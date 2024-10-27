import { authPaths } from '@app/(auth)/_helpers';
import { useToast } from '@shared/ui/hooks/use-toast';
import { CommonQueryKey } from '@shared/utils';
import { usePathname, useRouter } from 'next/navigation';

const useAuthNavigate = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { toast } = useToast();

  const navigateToLogin = () => {
    toast({
      title: 'Unauthorized, Please sign in first',
      variant: 'destructive',
    });
    router.push(`${authPaths.signin}?${CommonQueryKey.REDIRECT_URL}=${pathname}`);
  };

  return { navigateToLogin };
};

export default useAuthNavigate;
