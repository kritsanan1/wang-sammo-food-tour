
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from '@/hooks/use-mobile';
import { Navigation } from "./Navigation";
import { SearchInput } from "./SearchInput";
import { UserMenu } from "./UserMenu";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";

const Header: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-tourwang-brown">ที่นี่วังสามหมอ</span>
        </Link>

        {/* Desktop Navigation */}
        <Navigation />

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center space-x-4 flex-1 px-4">
          <SearchInput />
        </div>

        {/* User Menu & Cart - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          {user && <CartButton />}
          <UserMenu />
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
