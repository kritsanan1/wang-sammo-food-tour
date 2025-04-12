
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { SearchInput } from "./SearchInput";
import { Navigation } from "./Navigation";
import { CartButton } from "./CartButton";

export const MobileMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="md:hidden flex items-center space-x-2">
      {user && <CartButton />}
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col h-full">
            <div className="py-6">
              <SearchInput />
            </div>
            
            <Navigation isMobile={true} />
            
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
  );
};
