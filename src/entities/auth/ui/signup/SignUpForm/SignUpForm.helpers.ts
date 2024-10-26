import { z } from 'zod';

export type SignInFormType = {
  username: string;
  password: string;
};

const initialValues: SignInFormType = {
  username: '',
  password: '',
};

enum SignInFormKey {
  USERNAME = 'username',
  PASSWORD = 'password',
}

const validationSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .refine((value) => /^([a-z0-9_.-]){3,20}$/.test(value), 'Invalid format username'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const SignInFormHelpers = {
  key: SignInFormKey,
  initValue: initialValues,
  schema: validationSchema,
};
