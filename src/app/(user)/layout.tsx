import Layout from '@widgets/layouts';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <Layout.User>{children}</Layout.User>;
}
