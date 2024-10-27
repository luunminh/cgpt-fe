'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorService } from '@shared/services';
import { useToast } from '@shared/ui/hooks/use-toast';
import { Button } from '@ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Input } from '@ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authPaths } from 'src/app/(auth)/_helpers';
import { useSignUp } from 'src/entities/auth/api';
import { SignUpFormHelpers, SignUpFormType } from './SignUpForm.helpers';

const SignUpForm = () => {
  const { onSignUp, isPending } = useSignUp();

  const { toast } = useToast();

  const form = useForm<SignUpFormType>({
    defaultValues: SignUpFormHelpers.initValue,
    resolver: zodResolver(SignUpFormHelpers.schema),
  });

  const { handleSubmit, control } = form;
  const route = useRouter();

  const onValidSubmit = (values: SignUpFormType) => {
    onSignUp(values, {
      onSuccess: () => {
        toast({
          title: 'Đăng ký thành công',
          duration: 2000,
        });
        route.push(authPaths.signin);
      },
      onError: (error) => ErrorService.handler({ error }),
    });
  };

  return (
    <div className="container md:max-w-[500px] sm:w-full">
      <Card className="sm:rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Đăng Ký</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onValidSubmit)} className="gap-4 flex flex-col">
              <FormField
                control={control}
                name={SignUpFormHelpers.key.USERNAME}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tên đăng nhập của bạn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={SignUpFormHelpers.key.PASSWORD}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter mật khẩu của bạn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={SignUpFormHelpers.key.EMAIL}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email của bạn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={SignUpFormHelpers.key.FIRST_NAME}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tên của bạn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={SignUpFormHelpers.key.LAST_NAME}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter họ của bạn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                Đăng ký
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-row gap-1 justify-center">
          <span className="text-sm font-bold">Có tài khoản rồi thì</span>
          <div className="flex flex-row">
            <Link
              href={authPaths.signin}
              className="text-sm font-medium text-primary transition-colors hover:text-blue-500"
            >
              Đăng nhập đi
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpForm;
