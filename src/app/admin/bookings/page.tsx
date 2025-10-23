'use client';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { mockBookings, mockUsers } from "@/lib/mock-data"
import { format } from "date-fns"
import { MoreHorizontal, PlusCircle, File, ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react";
import { BookingDetailsDialog } from "./booking-details-dialog"

type Booking = (typeof mockBookings)[0];
const ITEMS_PER_PAGE = 7;

export default function AdminBookingsPage() {
    const searchParams = useSearchParams();
    const roomTypeFilter = searchParams.get('roomType');
    const userIdFilter = searchParams.get('userId');

    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);


    const filteredBookings = useMemo(() => {
        let bookings = mockBookings;

        if (roomTypeFilter) {
            bookings = bookings.filter(booking => booking.roomName.includes(roomTypeFilter.replace(/ #\d+$/, '')));
        }
        
        if (userIdFilter) {
            const user = mockUsers.find(u => u.id === userIdFilter);
            if (user) {
                 bookings = bookings.filter(booking => booking.userName === user.name);
            }
        }

        if (activeTab !== 'all') {
            bookings = bookings.filter(booking => booking.status.toLowerCase() === activeTab);
        }
        
        return bookings;
    }, [roomTypeFilter, activeTab, userIdFilter]);

    const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

    const paginatedBookings = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredBookings.slice(startIndex, endIndex);
    }, [filteredBookings, currentPage]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1);
    }
    
    const getPageTitle = () => {
      if (roomTypeFilter) return `Bookings for ${roomTypeFilter}`;
      if (userIdFilter) {
        const user = mockUsers.find(u => u.id === userIdFilter);
        return user ? `Bookings for ${user.name}` : 'Bookings';
      }
      return 'Bookings';
    }


    const getBadgeVariant = (status: string) => {
        switch (status) {
            case 'Confirmed': return 'default';
            case 'Pending': return 'secondary';
            case 'Completed': return 'outline';
            default: return 'secondary';
        }
    };

  return (
    <>
    <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                    </span>
                </Button>
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Booking
                    </span>
                </Button>
            </div>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{getPageTitle()}</CardTitle>
            <CardDescription>
              Manage all guest bookings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBookings.map(booking => (
                    <TableRow key={booking.id}>
                        <TableCell>
                            <div className="font-medium">{booking.userName}</div>
                        </TableCell>
                        <TableCell>{booking.roomName}</TableCell>
                        <TableCell>
                            <Badge variant={getBadgeVariant(booking.status)}>{booking.status}</Badge>
                        </TableCell>
                        <TableCell>{format(booking.checkIn, 'MMM d, yyyy')}</TableCell>
                        <TableCell>{format(booking.checkOut, 'MMM d, yyyy')}</TableCell>
                        <TableCell>${booking.total.toFixed(2)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => setSelectedBooking(booking)}>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                    Cancel Booking
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
            <div className="flex items-center justify-end space-x-2 py-4 px-6">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>
        </Card>
    </Tabs>
    {selectedBooking && (
      <BookingDetailsDialog
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
      />
    )}
    </>
  )
}
