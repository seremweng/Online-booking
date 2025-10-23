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
import { mockUsers } from "@/lib/mock-data"
import { format } from "date-fns"
import { MoreHorizontal, File, ChevronLeft, ChevronRight, UserPlus, SlidersHorizontal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddUserDialog } from "./add-user-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type User = (typeof mockUsers)[0];
const ITEMS_PER_PAGE = 7;

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddUserOpen, setAddUserOpen] = useState(false);
    const [actionUser, setActionUser] = useState<User | null>(null);
    const [dialogAction, setDialogAction] = useState<'suspend' | 'activate' | null>(null);

    const filteredUsers = useMemo(() => {
        let filtered = users;

        if (activeTab !== 'all') {
             if (activeTab === 'admin' || activeTab === 'guest') {
                filtered = filtered.filter(user => user.role.toLowerCase() === activeTab);
            } else { // 'active' or 'suspended'
                filtered = filtered.filter(user => user.status.toLowerCase() === activeTab);
            }
        }
        
        return filtered;
    }, [users, activeTab]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredUsers.slice(startIndex, endIndex);
    }, [filteredUsers, currentPage]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1);
    }

    const handleAddUser = (newUser: Omit<User, 'id' | 'lastLogin' | 'joinDate' | 'avatarUrl'>) => {
        const user: User = {
            ...newUser,
            id: `USR${String(users.length + 1).padStart(3, '0')}`,
            joinDate: new Date(),
            lastLogin: new Date(),
            avatarUrl: `https://picsum.photos/seed/ua${users.length + 1}/100/100`,
        }
        setUsers(prev => [...prev, user]);
    }

    const handleUserStatusChange = (userId: string, status: 'Active' | 'Suspended') => {
        setUsers(prev => prev.map(user => user.id === userId ? { ...user, status } : user));
        setActionUser(null);
        setDialogAction(null);
    }

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Suspended': return 'destructive';
            default: return 'secondary';
        }
    };
    
    const getRoleBadgeVariant = (role: string) => {
        return role === 'Admin' ? 'secondary' : 'outline';
    }
    
    const openConfirmationDialog = (user: User, action: 'suspend' | 'activate') => {
        setActionUser(user);
        setDialogAction(action);
    };

  return (
    <>
    <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="suspended">Suspended</TabsTrigger>
                <TabsTrigger value="admin">Admins</TabsTrigger>
                <TabsTrigger value="guest">Guests</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                    </span>
                </Button>
                 <Button size="sm" variant="outline" className="h-8 gap-1">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                    </span>
                </Button>
                <Button size="sm" className="h-8 gap-1" onClick={() => setAddUserOpen(true)}>
                    <UserPlus className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add User
                    </span>
                </Button>
            </div>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage all users in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map(user => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">
                           <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                </div>
                           </div>
                        </TableCell>
                         <TableCell>
                            <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{format(user.joinDate, 'MMM d, yyyy')}</TableCell>
                        <TableCell>{format(user.lastLogin, 'MMM d, yyyy, p')}</TableCell>
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
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                {user.status === 'Active' ? (
                                    <DropdownMenuItem className="text-destructive" onClick={() => openConfirmationDialog(user, 'suspend')}>
                                        Suspend
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => openConfirmationDialog(user, 'activate')}>
                                        Activate
                                    </DropdownMenuItem>
                                )}
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
    <AddUserDialog isOpen={isAddUserOpen} onClose={() => setAddUserOpen(false)} onAddUser={handleAddUser} />
    
    <AlertDialog open={!!(actionUser && dialogAction)} onOpenChange={() => { setActionUser(null); setDialogAction(null); }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to {dialogAction} the user "{actionUser?.name}". 
            {dialogAction === 'suspend' 
              ? " They will lose access to their account." 
              : " They will regain access to their account."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => { setActionUser(null); setDialogAction(null); }}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={dialogAction === 'suspend' ? "bg-destructive hover:bg-destructive/90" : ""}
            onClick={() => handleUserStatusChange(actionUser!.id, dialogAction === 'suspend' ? 'Suspended' : 'Active')}
          >
            {dialogAction === 'suspend' ? 'Suspend' : 'Activate'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
