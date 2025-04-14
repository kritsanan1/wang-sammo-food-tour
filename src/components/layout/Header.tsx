
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from '@/hooks/use-mobile';
import Navigation from "./Navigation";
import { SearchInput } from "./SearchInput";
import { UserMenu } from "./UserMenu";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

const Header: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for the navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? 'bg-background/95 shadow-sm' : 'bg-background'
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
                <img 
                  src="/lovable-uploads/dde92498-b875-4cb0-ad00-bde9dfeda475.png" 
                  alt="Tour Der Wang Logo" 
                  className="h-10 w-auto"
                />
                <span className="font-bold text-xl text-tourwang-brown">ที่นี่วังสามหมอ</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>หน้าหลัก</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Desktop Navigation */}
        <Navigation />

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center space-x-4 flex-1 px-4">
          <SearchInput />
        </div>

        {/* User Menu & Cart - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          {user && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div><CartButton /></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>ตะกร้าสินค้า</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <UserMenu />
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
