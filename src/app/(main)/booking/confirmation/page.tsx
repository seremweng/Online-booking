import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-lg w-full text-center shadow-lg">
            <CardHeader className="items-center">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4"/>
                <CardTitle className="text-3xl font-headline text-primary">Booking Confirmed!</CardTitle>
                <CardDescription className="text-base">Thank you for choosing Dzimbahwe Lodges.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">
                    A confirmation email with your booking details has been sent to your email address. We look forward to welcoming you!
                </p>
                <div className="space-y-2 text-left bg-muted/50 p-4 rounded-md">
                    <h3 className="font-semibold">Booking Reference: #DZ12345</h3>
                    <p><strong>Room:</strong> Deluxe Queen Room</p>
                    <p><strong>Check-in:</strong> August 15, 2024</p>
                    <p><strong>Check-out:</strong> August 18, 2024</p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/profile">View My Bookings</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
