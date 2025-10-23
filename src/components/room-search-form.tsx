'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon, Users } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from './ui/card';

export function RoomSearchForm() {
  const router = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [guests, setGuests] = React.useState('2');

  const handleSearch = () => {
    // In a real app, you'd construct a query string and navigate
    // For now, it just navigates to the rooms page
    router.push('/rooms');
  };

  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="grid gap-2">
            <label htmlFor="dates" className="text-sm font-medium text-muted-foreground">
              Check-in / Check-out
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dates"
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal h-12 text-base',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <label htmlFor="guests" className="text-sm font-medium text-muted-foreground">
              Guests
            </label>
             <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger id="guests" className="h-12 text-base">
                    <Users className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                        <SelectItem key={num} value={String(num)}>{num} Guest{num > 1 ? 's' : ''}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSearch} className="h-12 text-base font-bold md:col-span-1">
            Search Rooms
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
