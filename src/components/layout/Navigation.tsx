
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface NavigationProps {
  isMobile?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isMobile = false }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // For mobile menu, use simpler navigation
  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-4 w-full">
        <Link 
          to="/" 
          className={`text-lg font-medium transition-colors px-2 py-2 rounded-md ${
            isActive('/') 
              ? 'bg-accent text-tourwang-orange font-bold' 
              : 'hover:bg-muted hover:text-tourwang-orange'
          }`}
        >
          หน้าหลัก
        </Link>
        <Link 
          to="/restaurants" 
          className={`text-lg font-medium transition-colors px-2 py-2 rounded-md ${
            isActive('/restaurants') 
              ? 'bg-accent text-tourwang-orange font-bold' 
              : 'hover:bg-muted hover:text-tourwang-orange'
          }`}
        >
          ร้านอาหาร
        </Link>
        {user && (
          <>
            <Link 
              to="/orders" 
              className={`text-lg font-medium transition-colors px-2 py-2 rounded-md ${
                isActive('/orders') 
                  ? 'bg-accent text-tourwang-orange font-bold' 
                  : 'hover:bg-muted hover:text-tourwang-orange'
              }`}
            >
              ออเดอร์ของฉัน
            </Link>
            <Link 
              to="/account" 
              className={`text-lg font-medium transition-colors px-2 py-2 rounded-md ${
                isActive('/account') 
                  ? 'bg-accent text-tourwang-orange font-bold' 
                  : 'hover:bg-muted hover:text-tourwang-orange'
              }`}
            >
              บัญชีของฉัน
            </Link>
          </>
        )}
        
        <Separator className="my-2" />
        
        <Link 
          to="/about" 
          className={`text-lg font-medium transition-colors px-2 py-2 rounded-md ${
            isActive('/about') 
              ? 'bg-accent text-tourwang-orange font-bold' 
              : 'hover:bg-muted hover:text-tourwang-orange'
          }`}
        >
          เกี่ยวกับเรา
        </Link>
        <Link 
          to="/contact" 
          className={`text-lg font-medium transition-colors px-2 py-2 rounded-md ${
            isActive('/contact') 
              ? 'bg-accent text-tourwang-orange font-bold'
              : 'hover:bg-muted hover:text-tourwang-orange'
          }`}
        >
          ติดต่อเรา
        </Link>
      </nav>
    );
  }

  // For desktop, use more complex navigation with hover effects
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink 
              className={cn(
                navigationMenuTriggerStyle(),
                isActive('/') ? "bg-accent text-tourwang-orange font-bold" : "",
                "transition-all duration-200 hover:text-tourwang-orange focus:text-tourwang-orange"
              )}
            >
              หน้าหลัก
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              isActive('/restaurants') ? "bg-accent text-tourwang-orange font-bold" : "",
              "transition-all duration-200 hover:text-tourwang-orange focus:text-tourwang-orange"
            )}
          >
            ร้านอาหาร
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <div className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-tourwang-cream to-white p-6 no-underline outline-none focus:shadow-md"
                    to="/restaurants"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-tourwang-brown">
                      ร้านอาหารทั้งหมด
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      ค้นพบร้านอาหารท้องถิ่นที่น่าสนใจในวังสามหมอ
                    </p>
                  </Link>
                </NavigationMenuLink>
              </div>
              <Link
                to="/restaurants/category/local"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium text-tourwang-brown">อาหารท้องถิ่น</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  รสชาติแท้ของวังสามหมอ
                </p>
              </Link>
              <Link
                to="/restaurants/category/popular"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium text-tourwang-brown">ร้านยอดนิยม</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  ร้านอาหารที่มีคนแนะนำมากที่สุด
                </p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {user && (
          <NavigationMenuItem>
            <Link to="/orders">
              <NavigationMenuLink 
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/orders') ? "bg-accent text-tourwang-orange font-bold" : "",
                  "transition-all duration-200 hover:text-tourwang-orange focus:text-tourwang-orange"
                )}
              >
                ออเดอร์ของฉัน
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
        
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              isActive('/about') || isActive('/contact') ? "bg-accent text-tourwang-orange font-bold" : "",
              "transition-all duration-200 hover:text-tourwang-orange focus:text-tourwang-orange"
            )}
          >
            เกี่ยวกับเรา
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[200px] gap-3 p-4">
              <Link
                to="/about"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium text-tourwang-brown">เกี่ยวกับเรา</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  เรื่องราวของที่นี่วังสามหมอ
                </p>
              </Link>
              <Link
                to="/contact"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium text-tourwang-brown">ติดต่อเรา</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  ช่องทางการติดต่อและข้อเสนอแนะ
                </p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
