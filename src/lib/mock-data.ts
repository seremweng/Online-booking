import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) as ImagePlaceholder;
const getImages = (ids: string[]) => ids.map(id => getImage(id));

export const mockRooms = [
  {
    id: '1',
    name: 'Deluxe Queen Room',
    description: 'A spacious room with a queen-sized bed, offering stunning views of the savanna. Perfect for couples or solo travelers seeking comfort and style.',
    price: 150,
    guests: 2,
    type: 'Deluxe',
    images: getImages(['room-luxury', 'room-interior-1', 'room-bathroom-1']),
    amenities: ['Wi-Fi', 'Air Conditioning', 'Savanna View', 'Mini Bar'],
  },
  {
    id: '2',
    name: 'Executive Suite',
    description: 'Experience luxury in our Executive Suite, featuring a separate living area, a king-sized bed, and premium amenities for an unforgettable stay.',
    price: 250,
    guests: 2,
    type: 'Suite',
    images: getImages(['room-suite', 'room-interior-2', 'room-bathroom-2']),
    amenities: ['Wi-Fi', 'Air Conditioning', 'Living Area', 'Jacuzzi'],
  },
  {
    id: '3',
    name: 'Family Room',
    description: 'Ideal for families, this room offers two double beds and ample space. It is designed to ensure a comfortable stay for you and your loved ones.',
    price: 200,
    guests: 4,
    type: 'Family',
    images: getImages(['room-modern', 'room-interior-3', 'room-bathroom-3']),
    amenities: ['Wi-Fi', 'Air Conditioning', 'Connecting Rooms available'],
  },
];

export const mockBookings = [
  {
    id: 'BK12345',
    userName: 'John Doe',
    roomName: 'Deluxe Queen Room',
    checkIn: new Date('2024-08-15'),
    checkOut: new Date('2024-08-20'),
    status: 'Confirmed',
    total: 750,
  },
  {
    id: 'BK12346',
    userName: 'Jane Smith',
    roomName: 'Executive Suite',
    checkIn: new Date('2024-09-01'),
    checkOut: new Date('2024-09-05'),
    status: 'Confirmed',
    total: 1000,
  },
  {
    id: 'BK12347',
    userName: 'Peter Jones',
    roomName: 'Family Room',
    checkIn: new Date('2024-08-18'),
    checkOut: new Date('2024-08-22'),
    status: 'Pending',
    total: 800,
  },
    {
    id: 'BK12348',
    userName: 'Sarah Miller',
    roomName: 'Deluxe Queen Room',
    checkIn: new Date('2024-10-10'),
    checkOut: new Date('2024-10-15'),
    status: 'Completed',
    total: 750,
  },
];

export const mockAttractions = [
  {
    id: 'attr1',
    name: 'Sunrise Safari',
    image: getImage('attraction-safari'),
  },
  {
    id: 'attr2',
    name: 'Local Artisan Market',
    image: getImage('attraction-market'),
  },
    {
    id: 'attr3',
    name: 'Ancient Ruins Tour',
    image: getImage('attraction-ruins'),
  },
];

export const mockTransactions = [
    {
        id: 'TRN001',
        bookingId: 'BK12345',
        date: new Date('2024-07-20'),
        amount: 750,
        type: 'Payment',
        method: 'Credit Card',
        status: 'Completed',
    },
    {
        id: 'TRN002',
        bookingId: 'BK12346',
        date: new Date('2024-08-15'),
        amount: 1000,
        type: 'Payment',
        method: 'PayPal',
        status: 'Completed',
    },
    {
        id: 'TRN003',
        bookingId: 'BK12347',
        date: new Date('2024-08-16'),
        amount: 800,
        type: 'Payment',
        method: 'Credit Card',
        status: 'Pending',
    },
    {
        id: 'TRN004',
        bookingId: 'BK12348',
        date: new Date('2024-09-25'),
        amount: 750,
        type: 'Payment',
        method: 'Credit Card',
        status: 'Completed',
    },
    {
        id: 'TRN005',
        bookingId: 'BK12345',
        date: new Date('2024-07-22'),
        amount: 50,
        type: 'Refund',
        method: 'Credit Card',
        status: 'Completed',
    },
     {
        id: 'TRN006',
        bookingId: 'BK12349',
        date: new Date('2024-11-01'),
        amount: 300,
        type: 'Payment',
        method: 'PayPal',
        status: 'Failed',
    },
];


export const mockUsers = [
  {
    id: 'USR001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Guest',
    status: 'Active',
    lastLogin: new Date('2024-08-10T10:00:00Z'),
    joinDate: new Date('2023-01-15'),
    avatarUrl: 'https://picsum.photos/seed/ua1/100/100',
  },
  {
    id: 'USR002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Guest',
    status: 'Active',
    lastLogin: new Date('2024-08-12T14:30:00Z'),
    joinDate: new Date('2023-02-20'),
     avatarUrl: 'https://picsum.photos/seed/ua2/100/100',
  },
  {
    id: 'USR003',
    name: 'Admin User',
    email: 'admin@dzimbahwe.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: new Date('2024-08-13T09:00:00Z'),
    joinDate: new Date('2022-11-05'),
     avatarUrl: 'https://picsum.photos/seed/ua3/100/100',
  },
  {
    id: 'USR004',
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    role: 'Guest',
    status: 'Suspended',
    lastLogin: new Date('2024-07-01T11:00:00Z'),
    joinDate: new Date('2023-05-10'),
    avatarUrl: 'https://picsum.photos/seed/ua4/100/100',
  },
   {
    id: 'USR005',
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    role: 'Guest',
    status: 'Active',
    lastLogin: new Date('2024-08-11T18:45:00Z'),
    joinDate: new Date('2023-06-25'),
    avatarUrl: 'https://picsum.photos/seed/ua5/100/100',
  },
];

export const mockRevenueData = [
  { month: 'March', revenue: 6200 },
  { month: 'April', revenue: 7800 },
  { month: 'May', revenue: 5500 },
  { month: 'June', revenue: 8800 },
  { month: 'July', revenue: 9500 },
  { month: 'August', revenue: 11200 },
];

export const mockRoomTypeDistribution = [
  { name: 'Deluxe', value: 45, fill: 'hsl(var(--chart-1))' },
  { name: 'Suite', value: 25, fill: 'hsl(var(--chart-2))' },
  { name: 'Family', value: 30, fill: 'hsl(var(--chart-3))' },
];
