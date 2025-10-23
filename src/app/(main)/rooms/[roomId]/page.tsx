
import { notFound } from 'next/navigation';
import { mockRooms } from '@/lib/mock-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Check, Users, Wifi } from 'lucide-react';
import Link from 'next/link';

export default function RoomDetailsPage({ params }: { params: { roomId: string } }) {
  const room = mockRooms.find((r) => r.id === params.roomId);

  if (!room) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
           <Carousel className="w-full rounded-lg overflow-hidden">
                <CarouselContent>
                    {room.images.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="relative aspect-video">
                        <Image
                            src={image.imageUrl}
                            alt={`${room.name} - image ${index + 1}`}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                        />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-3xl font-headline">{room.name}</CardTitle>
                        <Badge variant="secondary" className="text-base ml-4">{room.type}</Badge>
                    </div>
                    <CardDescription className="text-lg">{room.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Key Features</h3>
                         <div className="flex items-center gap-4 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                <span>{room.guests} Guests</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wifi className="h-5 w-5" />
                                <span>Free Wi-Fi</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Amenities</h3>
                        <ul className="grid grid-cols-2 gap-2">
                            {room.amenities.map(amenity => (
                                <li key={amenity} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>{amenity}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-center pt-4">
                        <p className="text-3xl font-bold text-primary mb-2">${room.price}<span className="text-base font-normal text-muted-foreground">/night</span></p>
                         <Button asChild size="lg" className="w-full">
                            <Link href={`/booking?roomId=${room.id}`}>Book Now</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
