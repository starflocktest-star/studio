
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogIn, Menu, Star, User, LayoutDashboard, LogOut, Video, ShieldCheck } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
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

type UserRole = 'fan' | 'influencer' | 'admin';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  // Mock authentication state. In a real app, you'd use a context or state manager.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('fan');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In a real app, you would fetch the user's role and login status
    // For now, we can check the path to guess the role for demonstration
    if (pathname.startsWith('/creator-dashboard')) {
        setIsLoggedIn(true);
        setUserRole('influencer');
    } else if (pathname.startsWith('/dashboard')) {
        setIsLoggedIn(true);
        setUserRole('fan');
    } else if (pathname.startsWith('/admin')) {
        setIsLoggedIn(true);
        setUserRole('admin');
    } else if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
        setIsLoggedIn(false);
    }

  }, [pathname]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push('/');
  }


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

        {(!isLoggedIn || userRole !== 'influencer') && (
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
          </div>
        )}

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
                          {userRole}@example.com
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                     {userRole === 'fan' && (
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard"><LayoutDashboard/>My Requests</Link>
                        </DropdownMenuItem>
                     )}
                      {userRole === 'influencer' && (
                        <DropdownMenuItem asChild>
                            <Link href="/creator-dashboard"><Video/>Creator Dashboard</Link>
                        </DropdownMenuItem>
                     )}
                      {userRole === 'admin' && (
                        <DropdownMenuItem asChild>
                            <Link href="/admin"><ShieldCheck/>Admin Panel</Link>
                        </DropdownMenuItem>
                     )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
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
                  {(!isLoggedIn || userRole !== 'influencer') && (
                    <NavLinks className="flex-col text-lg items-start" />
                  )}
                     {isClient && isLoggedIn && (
                       <>
                        {userRole === 'fan' && (
                          <Link href="/dashboard" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                            My Requests
                          </Link>
                        )}
                        {userRole === 'influencer' && (
                          <Link href="/creator-dashboard" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                              Creator Dashboard
                          </Link>
                        )}
                         {userRole === 'admin' && (
                          <Link href="/admin" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                              Admin Panel
                          </Link>
                        )}
                        <Button variant="outline" onClick={handleLogout} className="w-full justify-start text-lg font-medium text-muted-foreground">
                          <LogOut /> Sign Out
                        </Button>
                       </>
                     )}
                </div>
            </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
