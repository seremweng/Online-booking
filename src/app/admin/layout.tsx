'use client';
import { Bell, Building, Home, Package2, Settings, Users, BedDouble, ArrowRightLeft, UserCircle } from 'lucide-react';
import Link from 'next/link';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
    const pathname = usePathname();
    const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1');
  return (
    <Sidebar>
        <SidebarHeader>
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="shrink-0 rounded-lg">
                    <Package2 className="h-5 w-5" />
                    <span className="sr-only">Dzimbahwe Lodges</span>
                </Button>
                <span className="font-headline text-lg font-semibold group-data-[collapsible=icon]:hidden">Dzimbahwe Admin</span>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                 <SidebarMenuItem>
                    <Link href="/admin">
                        <SidebarMenuButton isActive={pathname === '/admin'}>
                            <Home />
                            <span>Dashboard</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/admin/bookings">
                        <SidebarMenuButton isActive={pathname.startsWith('/admin/bookings')}>
                            <Building />
                            <span>Bookings</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/admin/rooms">
                        <SidebarMenuButton isActive={pathname.startsWith('/admin/rooms')}>
                            <BedDouble />
                            <span>Rooms</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/admin/clients">
                        <SidebarMenuButton isActive={pathname.startsWith('/admin/clients')}>
                            <UserCircle />
                            <span>Clients</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/admin/transactions">
                        <SidebarMenuButton isActive={pathname.startsWith('/admin/transactions')}>
                            <ArrowRightLeft />
                            <span>Transactions</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/admin/users">
                        <SidebarMenuButton isActive={pathname.startsWith('/admin/users')}>
                            <Users />
                            <span>Users</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
             <SidebarMenu>
                 <SidebarMenuItem>
                    <Link href="#">
                        <SidebarMenuButton>
                            <Settings />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                     <div className="flex items-center gap-3 p-2">
                        <Avatar className="size-8">
                            {userAvatar && <AvatarImage src={userAvatar.imageUrl} data-ai-hint={userAvatar.imageHint}/>}
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                            <span className="text-sm font-medium">Admin User</span>
                            <span className="text-xs text-muted-foreground">admin@dzimbahwe.com</span>
                        </div>
                    </div>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  );
};


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
             <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <SidebarTrigger className="sm:hidden" />
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5"/>
                        <span className="sr-only">Notifications</span>
                    </Button>
                </div>
            </header>
          <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
