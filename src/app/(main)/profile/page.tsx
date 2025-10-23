
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { mockBookings, mockTransactions } from "@/lib/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { User, CreditCard } from "lucide-react";

export default function ProfilePage() {
    const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');
    const userName = "John Doe"; // Hardcoded for now
    const userBookings = mockBookings.filter(b => b.userName === userName);
    const userBookingIds = userBookings.map(b => b.id);
    const userTransactions = mockTransactions.filter(t => userBookingIds.includes(t.bookingId));


    const getBadgeVariant = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'default';
            case 'Pending': return 'secondary';
            case 'Completed': return 'outline';
            default: return 'secondary';
        }
    };
    
    const getTransactionStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
            case 'Completed': return 'default';
            case 'Pending': return 'secondary';
            case 'Failed': return 'destructive';
            default: return 'outline';
        }
    };

    const getTransactionTypeBadgeVariant = (type: string): "default" | "secondary" | "destructive" | "outline" => {
        switch (type) {
            case 'Payment': return 'outline';
            case 'Refund': return 'secondary';
            default: return 'outline';
        }
    }


    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-8">
                Your Profile
            </h1>

            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="pt-6 flex flex-col items-center text-center">
                            <Avatar className="h-24 w-24 mb-4">
                                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint}/>}
                                <AvatarFallback className="text-3xl">
                                    <User/>
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-bold font-headline">{userName}</h2>
                            <p className="text-muted-foreground">john.doe@example.com</p>
                            <p className="text-sm text-muted-foreground mt-2">Member since 2023</p>
                            <Button variant="outline" className="mt-4 w-full">Edit Profile</Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Bookings</CardTitle>
                            <CardDescription>Here are your past and upcoming stays.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Room</TableHead>
                                        <TableHead>Dates</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userBookings.map(booking => (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-medium">{booking.roomName}</TableCell>
                                            <TableCell>{format(booking.checkIn, 'MMM d')} - {format(booking.checkOut, 'MMM d, yyyy')}</TableCell>
                                            <TableCell>
                                                <Badge variant={getBadgeVariant(booking.status)}>{booking.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CreditCard className="mr-2 h-5 w-5 text-primary" />
                                My Transactions
                            </CardTitle>
                            <CardDescription>A record of your financial activities.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Booking ID</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {userTransactions.map(transaction => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>{format(transaction.date, 'MMM d, yyyy')}</TableCell>
                                            <TableCell>
                                                <Badge variant={getTransactionTypeBadgeVariant(transaction.type)}>{transaction.type}</Badge>
                                            </TableCell>
                                            <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                                            <TableCell>
                                                 <Badge variant={getTransactionStatusBadgeVariant(transaction.status)}>{transaction.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-mono text-xs">{transaction.bookingId}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
