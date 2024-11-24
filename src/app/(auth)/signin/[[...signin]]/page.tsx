import { SignInForm } from '@core/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cái giá phải trả - Đăng nhập',
};

export default function SignInPage() {
  return <SignInForm />;
}
