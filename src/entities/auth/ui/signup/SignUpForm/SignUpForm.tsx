'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorService } from '@shared/services';
import { Button } from '@ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import { Link } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authPaths } from 'src/app/(auth)/_helpers';
import { useLogin } from 'src/entities/auth/api';
import { SignInFormHelpers, SignInFormType } from './SignUpForm.helpers';

const SignInForm = () => {
  const { onLogin, isPending } = useLogin();

  const form = useForm<SignInFormType>({
    defaultValues: SignInFormHelpers.initValue,
    resolver: zodResolver(SignInFormHelpers.schema),
  });
  const { handleSubmit, control } = form;

  const route = useRouter();

  const onValidSubmit = (values: SignInFormType) => {
    onLogin(values, {
      onSuccess: () => {
        route.push('/');
      },
      onError: (error) => ErrorService.handler({ error }),
    });
  };

  return (
    <div className="container md:max-w-[600px] sm:w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl text-primary">Đăng nhập</CardTitle>
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
                      <Input placeholder="Username" {...field} />
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
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Đăng nhập</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex flex-row">
            <p className="text-sm mr-2">Đăng ký đi </p>
            <Link
              href={authPaths.signup}
              className="text-sm font-medium transition-colors hover:text-blue-500"
            >
              Đăng ký đi
            </Link>
          </div>
          <div className="mt-2">
            <Button
              variant="ghost"
              onClick={() => {
                route.push(authPaths.forgotPassword);
              }}
            >
              Quên mật khẩu ư?
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInForm;
