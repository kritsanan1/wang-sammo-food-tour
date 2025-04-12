
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.user_metadata?.name) return '?';
    const name = user.user_metadata.name;
    const words = name.split(' ');
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-tourwang-brown">ที่นี่วังสามหมอ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            หน้าหลัก
          </Link>
          <Link 
            to="/restaurants" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            ร้านอาหาร
          </Link>
          {user && (
            <Link 
              to="/orders" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              ออเดอร์ของฉัน
            </Link>
          )}
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center space-x-4 flex-1 px-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="ค้นหาร้านอาหารหรือเมนู..." 
              className="pl-10 focus-visible:ring-tourwang-orange"
            />
          </div>
        </div>

        {/* User Menu & Cart - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => navigate('/cart')}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-tourwang-orange text-white text-xs flex items-center justify-center">
                  0
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-tourwang-orange text-white">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/account')}>
                    ข้อมูลส่วนตัว
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    ประวัติการสั่งซื้อ
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    ออกจากระบบ
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="default" onClick={() => navigate('/login')}>
              เข้าสู่ระบบ
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          {user && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-tourwang-orange text-white text-xs flex items-center justify-center">
                0
              </span>
            </Button>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="py-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="ค้นหาร้านอาหารหรือเมนู..." 
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/" 
                    className="text-lg font-medium hover:text-tourwang-orange"
                  >
                    หน้าหลัก
                  </Link>
                  <Link 
                    to="/restaurants" 
                    className="text-lg font-medium hover:text-tourwang-orange"
                  >
                    ร้านอาหาร
                  </Link>
                  {user && (
                    <>
                      <Link 
                        to="/orders" 
                        className="text-lg font-medium hover:text-tourwang-orange"
                      >
                        ออเดอร์ของฉัน
                      </Link>
                      <Link 
                        to="/account" 
                        className="text-lg font-medium hover:text-tourwang-orange"
                      >
                        บัญชีของฉัน
                      </Link>
                    </>
                  )}
                </nav>
                
                <div className="mt-auto pt-6">
                  {user ? (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={signOut}
                    >
                      ออกจากระบบ
                    </Button>
                  ) : (
                    <div className="grid gap-2">
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={() => navigate('/login')}
                      >
                        เข้าสู่ระบบ
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/register')}
                      >
                        สมัครสมาชิก
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
