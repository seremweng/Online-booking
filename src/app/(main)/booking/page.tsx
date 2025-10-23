'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { mockRooms } from '@/lib/mock-data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Lock } from 'lucide-react';

function BookingPageComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const roomId = searchParams.get('roomId');
  const room = mockRooms.find((r) => r.id === roomId) || mockRooms[0];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
        title: "Booking Confirmed!",
        description: `Your stay in the ${room.name} has been booked.`,
    });
    router.push('/booking/confirmation');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8">
                Complete Your Booking
            </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Guest Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 555-5555" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                        <Input id="card-number" placeholder="0000 0000 0000 0000" required />
                        <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="12345" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full text-lg">
                <Lock className="mr-2 h-5 w-5"/>
                Confirm and Pay
            </Button>
          </form>
        </div>
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
                <div className="relative h-48 w-full rounded-t-lg overflow-hidden mb-4 -mt-6 -mx-6">
                    <Image
                        src={room.images[0].imageUrl}
                        alt={room.name}
                        fill
                        className="object-cover"
                        data-ai-hint={room.images[0].imageHint}
                    />
                </div>
              <CardTitle className="font-headline">{room.name}</CardTitle>
              <CardDescription>Booking Summary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span>Aug 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span>Aug 18, 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Guests:</span>
                <span>2 Adults</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Price per night:</span>
                <span>${room.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Nights:</span>
                <span>3</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees:</span>
                <span>$45.00</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${room.price * 3 + 45}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookingPageComponent />
        </Suspense>
    )
}
