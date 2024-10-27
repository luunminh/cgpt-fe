import { z } from 'zod';

export type SignUpFormType = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const initialValues: SignUpFormType = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

enum SignUpFormKey {
  USERNAME = 'username',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  PASSWORD = 'password',
}

const validationSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .refine((value) => /^([a-z0-9_.-]){3,20}$/.test(value), 'Invalid format username'),
  firstName: z.string({ required_error: 'First name is required' }).trim().min(1),
  lastName: z.string({ required_error: 'Last name is required' }).trim().min(1),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const SignUpFormHelpers = {
  key: SignUpFormKey,
  initValue: initialValues,
  schema: validationSchema,
};
