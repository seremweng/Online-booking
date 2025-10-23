'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { mockBookings } from '@/lib/mock-data';
import { format } from 'date-fns';
import { Calendar, User, BedDouble, DollarSign, Badge, Hash } from 'lucide-react';

interface BookingDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  booking: (typeof mockBookings)[0];
}

export function BookingDetailsDialog({ isOpen, onClose, booking }: BookingDetailsDialogProps) {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
             <Hash className="h-5 w-5 text-primary"/>
            Booking Details
          </DialogTitle>
          <DialogDescription>
            Full details for booking ID: {booking.id}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-semibold">{booking.userName}</p>
              <p className="text-sm text-muted-foreground">Guest Name</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <BedDouble className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-semibold">{booking.roomName}</p>
              <p className="text-sm text-muted-foreground">Room</p>
            </div>
          </div>
           <Separator />
           <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">{format(booking.checkIn, 'MMM d, yyyy')}</p>
                        <p className="text-sm text-muted-foreground">Check-in</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">{format(booking.checkOut, 'MMM d, yyyy')}</p>
                        <p className="text-sm text-muted-foreground">Check-out</p>
                    </div>
                </div>
           </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                <p className="font-semibold">${booking.total.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                </div>
            </div>
             <div>
                <Badge variant={booking.status === 'Confirmed' ? 'default' : booking.status === 'Completed' ? 'outline' : 'secondary'}>{booking.status}</Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
