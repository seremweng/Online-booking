'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building } from 'lucide-react';

interface LoginDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onLogin: (email: string) => void;
  onSwitchToSignup: () => void;
}

export function LoginDialog({ isOpen, onOpenChange, onLogin, onSwitchToSignup }: LoginDialogProps) {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center items-center">
          <Building className="h-10 w-10 text-primary mb-2" />
          <DialogTitle className="text-2xl font-headline">Welcome Back</DialogTitle>
          <DialogDescription>Enter your email to sign in to your account.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required defaultValue="********" />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <Button variant="outline" className="w-full">
              Sign In with Google
            </Button>
          </div>
        </form>
        <DialogFooter className="text-sm text-center justify-center">
          Don't have an account?{' '}
          <Button variant="link" size="sm" className="p-0 h-auto" onClick={onSwitchToSignup}>
            Sign up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
