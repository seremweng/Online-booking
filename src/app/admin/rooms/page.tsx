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
import { mockRooms } from "@/lib/mock-data"
import { MoreHorizontal, Users, File, ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image";
import { AddRoomDialog } from "./add-room-dialog";
import React, { useState, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { EditRoomDialog } from "./edit-room-dialog";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ImagePlaceholder } from "@/lib/placeholder-images"

type Room = (typeof mockRooms)[0] & { id: string; status?: 'active' | 'inactive' };

interface RoomGroup {
    type: string;
    name: string;
    description: string;
    price: number;
    guests: number;
    amenities: string[];
    images: ImagePlaceholder[];
    total: number;
    available: number;
    status: 'active' | 'inactive';
}

const ITEMS_PER_PAGE = 5;


export default function AdminRoomsPage() {
    const [rooms, setRooms] = useState<Room[]>(mockRooms.map((r, i) => ({ ...r, id: (i+1).toString(), status: 'active' })));
    const [editingRoom, setEditingRoom] = useState<RoomGroup | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    // Dummy logic for availability
    const isRoomAvailable = (room: Room) => parseInt(room.id) % 2 !== 0 && room.status !== 'inactive';

    const roomGroups = useMemo((): RoomGroup[] => {
        const groups: { [key: string]: RoomGroup } = {};

        rooms.forEach(room => {
            const groupName = room.name.replace(/ #\d+$/, '');
            if (!groups[groupName]) {
                 groups[groupName] = {
                    type: room.type,
                    name: groupName,
                    description: room.description,
                    price: room.price,
                    guests: room.guests,
                    amenities: room.amenities,
                    images: room.images,
                    total: 0,
                    available: 0,
                    status: room.status || 'active',
                };
            }
        });

        rooms.forEach(room => {
            const groupName = room.name.replace(/ #\d+$/, '');
            if (groups[groupName]) {
                groups[groupName].total += 1;
                if (isRoomAvailable(room)) {
                    groups[groupName].available += 1;
                }
                // If any room in the group is active, the group is active.
                if(room.status === 'active') {
                    groups[groupName].status = 'active';
                }
            }
        });
        
        // If all rooms of a group are inactive, mark group as inactive.
        Object.values(groups).forEach(group => {
            const allInactive = rooms.filter(r => r.name.startsWith(group.name)).every(r => r.status === 'inactive');
            if (allInactive) {
                group.status = 'inactive';
                group.available = 0;
            }
        })


        return Object.values(groups);
    }, [rooms]);
    

    const handleAddRoom = (newRoomData: any, quantity: number) => {
        const newRooms: Room[] = [];
        const baseName = newRoomData.name;
        
        const existingRoomsWithSameName = rooms.filter(r => r.name.startsWith(baseName));
        const startIndex = existingRoomsWithSameName.length;

        for (let i = 0; i < quantity; i++) {
            const newId = (rooms.length + i + 1).toString();
            const newRoom: Room = {
                ...newRoomData,
                id: newId,
                name: quantity > 1 || existingRoomsWithSameName.length > 0 ? `${baseName} #${startIndex + i + 1}` : baseName,
                images: [{
                  imageUrl: newRoomData.imageUrl || `https://picsum.photos/seed/new-room-${newId}/800/600`,
                  imageHint: 'new hotel room'
                }],
                amenities: newRoomData.amenities || [],
                status: 'active'
            };
            newRooms.push(newRoom);
        }
        setRooms(prevRooms => [...prevRooms, ...newRooms]);
    };

    const handleEditRoom = (updatedRoomData: Partial<RoomGroup>) => {
        if (!editingRoom) return;

        setRooms(prevRooms => prevRooms.map(room => {
            const groupName = room.name.replace(/ #\d+$/, '');
            if(groupName === editingRoom.name) {
                return {
                    ...room,
                    name: room.name.replace(editingRoom.name, updatedRoomData.name || editingRoom.name),
                    type: updatedRoomData.type || room.type,
                    description: updatedRoomData.description || room.description,
                    price: updatedRoomData.price || room.price,
                    guests: updatedRoomData.guests || room.guests,
                }
            }
            return room;
        }));
        setEditingRoom(null);
    }
    
    const handleDeactivateRoom = (groupName: string) => {
        setRooms(prevRooms => prevRooms.map(room => {
            const rGroupName = room.name.replace(/ #\d+$/, '');
            if (rGroupName === groupName) {
                return { ...room, status: 'inactive' };
            }
            return room;
        }));
    };

    const [activeTab, setActiveTab] = useState('all');

    const filteredGroups = useMemo(() => {
        if (activeTab === 'all') return roomGroups;
        return roomGroups.filter(group => group.type.toLowerCase() === activeTab);
    }, [roomGroups, activeTab]);

    const totalPages = Math.ceil(filteredGroups.length / ITEMS_PER_PAGE);

    const paginatedGroups = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredGroups.slice(startIndex, endIndex);
    }, [filteredGroups, currentPage]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1);
    }

  return (
    <>
    <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deluxe">Deluxe</TabsTrigger>
                <TabsTrigger value="suite">Suite</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                    </span>
                </Button>
                <AddRoomDialog onAddRoom={handleAddRoom} />
            </div>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Rooms</CardTitle>
            <CardDescription>
              Manage hotel rooms and their availability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Room Type</TableHead>
                  <TableHead>Type</TableHead>
                   <TableHead>Status</TableHead>
                  <TableHead className="w-[200px]">Availability</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Max Guests</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedGroups.map(group => (
                    <TableRow key={group.name} className={group.status === 'inactive' ? 'opacity-50' : ''}>
                        <TableCell className="font-medium flex items-center gap-3">
                            <Image src={group.images[0].imageUrl} alt={group.name} width={64} height={42} className="rounded-md object-cover" />
                            {group.name}
                        </TableCell>
                        <TableCell>
                            <Badge variant="secondary">{group.type}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant={group.status === 'active' ? 'default' : 'destructive'}>
                                {group.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm">{group.available} of {group.total} available</span>
                                <Progress value={(group.available / group.total) * 100} className="h-2"/>
                            </div>
                        </TableCell>
                        <TableCell>${typeof group.price === 'number' ? group.price.toFixed(2) : parseFloat(group.price).toFixed(2)}</TableCell>
                        <TableCell className="flex items-center gap-2">
                           <Users className="h-4 w-4 text-muted-foreground" /> {group.guests}
                        </TableCell>
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
                                    <DropdownMenuItem onClick={() => setEditingRoom(group)}>
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/bookings?roomType=${encodeURIComponent(group.name)}`}>
                                            View Bookings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                                Deactivate Room Type
                                            </DropdownMenuItem>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will deactivate all rooms of type &quot;{group.name}&quot; and they will no longer be available for booking. This action cannot be undone immediately.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    className="bg-destructive hover:bg-destructive/90"
                                                    onClick={() => handleDeactivateRoom(group.name)}
                                                >
                                                    Deactivate
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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
    {editingRoom && (
        <EditRoomDialog
            isOpen={!!editingRoom}
            onClose={() => setEditingRoom(null)}
            onEditRoom={handleEditRoom}
            roomData={editingRoom}
        />
    )}
    </>
  )
}
