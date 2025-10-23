import { RoomCard } from '@/components/room-card';
import { mockRooms } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';

export default function RoomsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Choose Your Sanctuary
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Every room at Dzimbahwe is a testament to comfort and elegance, designed to be your home away from home.
        </p>
      </div>

      <div className="mb-8 p-4 bg-card rounded-lg flex flex-col md:flex-row gap-4 items-center">
        <Input placeholder="Search by keyword..." className="max-w-xs"/>
        <Select>
            <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Room Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="family">Family</SelectItem>
            </SelectContent>
        </Select>
        <Select>
            <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="low-high">Price: Low to High</SelectItem>
                <SelectItem value="high-low">Price: High to Low</SelectItem>
            </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
        {mockRooms.map((room) => (
           <RoomCard key={`${room.id}-clone`} room={{...room, id: `${room.id}-clone`}} />
        ))}
      </div>
    </div>
  );
}
