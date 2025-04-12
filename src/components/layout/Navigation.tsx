
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  isMobile?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isMobile = false }) => {
  const { user } = useAuth();
  
  const linkClass = isMobile 
    ? "text-lg font-medium hover:text-tourwang-orange" 
    : "text-sm font-medium transition-colors hover:text-primary";
  
  return (
    <nav className={isMobile ? "flex flex-col space-y-4" : "hidden md:flex items-center space-x-6"}>
      <Link 
        to="/" 
        className={linkClass}
      >
        หน้าหลัก
      </Link>
      <Link 
        to="/restaurants" 
        className={linkClass}
      >
        ร้านอาหาร
      </Link>
      {user && (
        <Link 
          to="/orders" 
          className={linkClass}
        >
          ออเดอร์ของฉัน
        </Link>
      )}
      {isMobile && user && (
        <Link 
          to="/account" 
          className={linkClass}
        >
          บัญชีของฉัน
        </Link>
      )}
    </nav>
  );
};
