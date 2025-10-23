import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockRooms } from '@/lib/mock-data';
import { Badge } from './ui/badge';
import { Users } from 'lucide-react';

type Room = (typeof mockRooms)[0];

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full">
          <Image
            src={room.images[0].imageUrl}
            alt={`Photo of ${room.name}`}
            fill
            className="object-cover"
            data-ai-hint={room.images[0].imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-headline mb-2">{room.name}</CardTitle>
            <Badge variant="secondary" className="whitespace-nowrap">{room.type}</Badge>
        </div>
        <CardDescription>{room.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div className="flex flex-col">
            <p className="text-2xl font-bold text-primary">${room.price}</p>
            <p className="text-sm text-muted-foreground">per night</p>
        </div>
         <Button asChild>
          <Link href={`/rooms/${room.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
