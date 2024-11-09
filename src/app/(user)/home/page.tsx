import { Card, CardDescription, CardHeader, CardTitle } from '@ui/card';

export default function HomePage() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>User Home Page</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
    </Card>
  );
}
