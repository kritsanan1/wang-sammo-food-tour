
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { SearchInput } from "./SearchInput";
import { Navigation } from "./Navigation";
import { CartButton } from "./CartButton";

export const MobileMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="md:hidden flex items-center space-x-2">
      {user && <CartButton />}
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-muted hover:text-tourwang-orange focus:outline-none"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open main menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[350px]">
          <SheetHeader className="pb-6">
            <SheetTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/dde92498-b875-4cb0-ad00-bde9dfeda475.png" 
                  alt="Tour Der Wang Logo" 
                  className="h-8 w-auto mr-2" 
                />
                <span className="font-bold text-lg text-tourwang-brown">
                  ที่นี่วังสามหมอ
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col h-full">
            <div className="py-3">
              <SearchInput className="w-full" />
            </div>
            
            <div className="flex-grow overflow-auto py-3">
              <Navigation isMobile={true} />
            </div>
            
            <div className="mt-auto pt-4 border-t">
              {user ? (
                <Button 
                  variant="outline" 
                  className="w-full hover:text-tourwang-orange hover:border-tourwang-orange" 
                  onClick={signOut}
                >
                  ออกจากระบบ
                </Button>
              ) : (
                <div className="grid gap-2">
                  <Button 
                    variant="default" 
                    className="w-full bg-tourwang-orange hover:bg-tourwang-brown text-white"
                    onClick={() => handleNavigation('/login')}
                  >
                    เข้าสู่ระบบ
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full hover:text-tourwang-orange hover:border-tourwang-orange"
                    onClick={() => handleNavigation('/register')}
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
  );
};
