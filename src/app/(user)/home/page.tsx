import { Button } from '@ui/button';
import { CardHeader, CardTitle } from '@ui/card';
import { Flex } from '@ui/flex';

export default function HomePage() {
  return (
    <div className="container border-primary rounded-md border-2 h-[80vh] bg-white">
      <CardHeader>
        <Flex justify="space-between" align="center" gap={2}>
          <CardTitle className="text-2xl">Dashboard</CardTitle>
          <Flex gap={2}>
            <Button variant="destructive" className="font-bold">
              Add an expense
            </Button>
            <Button className="font-bold w-[110px]">Settle up</Button>
          </Flex>
        </Flex>
      </CardHeader>
    </div>
  );
}
