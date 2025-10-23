'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building, Menu, User, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LoginDialog } from './login-dialog';
import { SignupDialog } from './signup-dialog';
import { mockUsers } from '@/lib/mock-data';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Recommendations', href: '/recommendations' },
];

// Mock auth state
type UserType = 'guest' | 'admin' | null;

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const [user, setUser] = React.useState<UserType>(null);
  const [userData, setUserData] = React.useState<(typeof mockUsers)[0] | null>(null);

  const [isLoginOpen, setLoginOpen] = React.useState(false);
  const [isSignupOpen, setSignupOpen] = React.useState(false);

  const handleLogin = (email: string) => {
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
        setUser(foundUser.role.toLowerCase() as UserType);
        setUserData(foundUser);
        setLoginOpen(false);
    } else {
        // For simplicity, if user not in mock, treat as new guest
        const newGuest = {
            id: `USR${mockUsers.length + 1}`,
            name: 'New Guest',
            email,
            role: 'Guest',
            status: 'Active',
            lastLogin: new Date(),
            joinDate: new Date(),
            avatarUrl: `https://picsum.photos/seed/newUser/100/100`,
        }
        setUser('guest');
        setUserData(newGuest);
        setLoginOpen(false);
    }
  };

  const handleSignup = (email: string, name: string) => {
     const newUser = {
        id: `USR${mockUsers.length + 1}`,
        name: name,
        email,
        role: 'Guest',
        status: 'Active',
        lastLogin: new Date(),
        joinDate: new Date(),
        avatarUrl: `https://picsum.photos/seed/new${name}/100/100`,
    }
    setUser('guest');
    setUserData(newUser);
    setSignupOpen(false);
  }

  const handleLogout = () => {
    setUser(null);
    setUserData(null);
  };

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Building className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">
              Dzimbahwe Lodges
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <Building className="h-6 w-6 mr-2 text-primary" />
              <span className="font-bold font-headline text-lg">Dzimbahwe Lodges</span>
            </Link>
            <div className="my-4 h-px w-full bg-border" />
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can add a command menu search here in the future */}
          </div>
          <nav className="flex items-center">
            {user ? (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                    >
                    <Avatar className="h-8 w-8">
                        {userData && <AvatarImage src={userData.avatarUrl} alt={userData.name} />}
                        <AvatarFallback>
                            <User className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userData?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                        {userData?.email}
                        </p>
                    </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user === 'guest' && (
                        <DropdownMenuItem asChild>
                            <Link href="/profile"><UserCircle className="mr-2 h-4 w-4" />Profile</Link>
                        </DropdownMenuItem>
                    )}
                     {user === 'admin' && (
                        <DropdownMenuItem asChild>
                            <Link href="/admin"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={() => setLoginOpen(true)}>Log in</Button>
                    <Button onClick={() => setSignupOpen(true)}>Sign Up</Button>
                </div>
            )}
          </nav>
        </div>
      </div>
    </header>
    <LoginDialog isOpen={isLoginOpen} onOpenChange={setLoginOpen} onLogin={handleLogin} onSwitchToSignup={() => { setLoginOpen(false); setSignupOpen(true); }}/>
    <SignupDialog isOpen={isSignupOpen} onOpenChange={setSignupOpen} onSignup={handleSignup} onSwitchToLogin={() => { setSignupOpen(false); setLoginOpen(true); }}/>
    </>
  );
}
