'use client';

import { authPaths } from '@app/(auth)/_helpers';
import { useLogin } from '@core/auth';
import { useGetMyProfile } from '@core/profile/api';
import { UserType } from '@core/profile/base';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorService, TokenService } from '@shared/services';
import { useAuthStore } from '@shared/store';
import { useToast } from '@shared/ui/hooks/use-toast';
import { Button } from '@ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { SignInFormHelpers, SignInFormType } from './SignInForm.helpers';

const SignInForm = () => {
  const { onLogin, isPending } = useLogin();
  const { toast } = useToast();

  const { onSetUserProfile } = useAuthStore();

  const { onGetMyProfile } = useGetMyProfile({
    onSuccess(data) {
      onSetUserProfile(data);

      if (data.userType === UserType.USER) {
        route.push('/home');
      }

      if (data.userType === UserType.ADMIN) {
        route.push('/admin');
      }
    },
    onError: (error) => ErrorService.handler(error),
  });

  const form = useForm<SignInFormType>({
    defaultValues: SignInFormHelpers.initValue,
    resolver: zodResolver(SignInFormHelpers.schema),
  });
  const { handleSubmit, control } = form;

  const route = useRouter();

  const onValidSubmit = (values: SignInFormType) => {
    onLogin(values, {
      onSuccess: ({ data }) => {
        toast({ title: 'Đăng nhập thành công', duration: 2000 });

        TokenService.saveTokens([
          { name: 'accessToken', value: data.accessToken },
          { name: 'refreshToken', value: data.refreshToken },
        ]);
        onGetMyProfile();
      },
      onError: (error) => ErrorService.handler({ error }),
    });
  };

  return (
    <div className="container md:max-w-[600px] sm:w-full">
      <Card className="sm:rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Đăng nhập</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onValidSubmit)} className="gap-4 flex flex-col">
              <FormField
                control={control}
                name={SignInFormHelpers.key.USERNAME}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={SignInFormHelpers.key.PASSWORD}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input required type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                Đăng nhập
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex flex-row">
            <Link
              href={authPaths.signup}
              className="text-sm font-medium transition-colors hover:text-blue-500"
            >
              Đăng ký đi
            </Link>
          </div>
          <div className="mt-2">
            <Button variant="link" onClick={() => route.push(authPaths.forgotPassword)}>
              Quên mật khẩu ư?
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInForm;
