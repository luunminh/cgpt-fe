import Layout from '@widgets/layouts';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Layout.Identity>{children}</Layout.Identity>;
}
