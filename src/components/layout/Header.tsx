
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface HeaderProps {
  cartItemCount?: number;
  isLoggedIn?: boolean;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  cartItemCount = 0, 
  isLoggedIn = false,
  userName = ''
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/975c6206-3406-471a-bca9-0667ca761386.png" 
            alt="Tour Der Wang Logo" 
            className="h-10 w-auto" 
          />
          <span className="hidden md:inline-block font-bold text-lg text-tourwang-brown">
            ที่นี่ วังสามหมอ
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    หน้าหลัก
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/restaurants">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    ร้านอาหาร
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/orders">
                  <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    ออเดอร์ของฉัน
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Desktop Search */}
          <div className="relative w-[200px] lg:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ค้นหาร้านอาหารหรือเมนู..."
              className="w-full rounded-md pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
          
          {/* Cart Button */}
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-tourwang-orange text-[10px] font-medium text-white">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Authentication */}
          {isLoggedIn ? (
            <Link to="/account">
              <Button variant="ghost" className="flex gap-2 items-center">
                <User className="h-4 w-4" />
                <span className="max-w-[100px] truncate">{userName}</span>
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="default" className="bg-tourwang-orange hover:bg-tourwang-orange/90">
                เข้าสู่ระบบ
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          {/* Mobile Search Toggle */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="relative"
          >
            {isSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Cart */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-tourwang-orange text-[10px] font-medium text-white">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                <Link 
                  to="/" 
                  className="text-lg font-medium hover:text-tourwang-orange transition-colors"
                >
                  หน้าหลัก
                </Link>
                <Link 
                  to="/restaurants" 
                  className="text-lg font-medium hover:text-tourwang-orange transition-colors"
                >
                  ร้านอาหาร
                </Link>
                <Link 
                  to="/orders" 
                  className="text-lg font-medium hover:text-tourwang-orange transition-colors"
                >
                  ออเดอร์ของฉัน
                </Link>
                <div className="border-t my-4 pt-4">
                  {isLoggedIn ? (
                    <>
                      <Link 
                        to="/account" 
                        className="text-lg font-medium hover:text-tourwang-orange transition-colors"
                      >
                        บัญชีของฉัน
                      </Link>
                      <Button 
                        variant="ghost" 
                        className="mt-4 w-full justify-start px-0 text-muted-foreground hover:text-tourwang-orange"
                        onClick={() => console.log("Logout clicked")}
                      >
                        ออกจากระบบ
                      </Button>
                    </>
                  ) : (
                    <Link to="/login">
                      <Button className="w-full bg-tourwang-orange hover:bg-tourwang-orange/90">
                        เข้าสู่ระบบ
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar (Expandable) */}
      {isSearchOpen && (
        <div className="md:hidden container pb-3">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ค้นหาร้านอาหารหรือเมนู..."
              className="w-full rounded-md pl-8"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
