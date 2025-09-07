
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogIn, Menu, Star, User, LayoutDashboard, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/influencers', label: 'Influencers' },
  { href: '/register', label: 'Become a Star'},
];

export default function Header() {
  const pathname = usePathname();
  // Mock authentication state. In a real app, you'd use a context or state manager.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const NavLinks = ({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) => (
    <nav className={cn('flex items-center gap-4', className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
          <Star className="w-6 h-6 text-primary" />
          <span>StarConnect</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
        </div>

        <div className="flex items-center gap-2">
            {isClient && (
              isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                       <Avatar className="h-9 w-9">
                        <AvatarImage src="https://picsum.photos/100/100" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">My Account</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          user@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard"><LayoutDashboard/>My Requests</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      <LogOut /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              ) : (
                <Button asChild variant="ghost">
                  <Link href="/login">
                    <LogIn />
                    <span className="ml-2 hidden sm:inline">Login</span>
                  </Link>
                </Button>
              )
            )}


            <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
                <div className="flex flex-col gap-6 pt-10">
                    <NavLinks className="flex-col text-lg items-start" />
                     {isClient && isLoggedIn && (
                       <Link href="/dashboard" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                         My Requests
                       </Link>
                     )}
                </div>
            </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
