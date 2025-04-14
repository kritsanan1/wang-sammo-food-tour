
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { UserIcon, Settings, LogOut, ShoppingBag, Heart } from "lucide-react";

// Helper function to get user initials
const getUserInitials = (user: any) => {
  if (!user || !user.user_metadata?.name) return '?';
  const name = user.user_metadata.name;
  const words = name.split(' ');
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

export const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  if (!user) {
    return (
      <Button 
        variant="default"
        className="bg-tourwang-orange hover:bg-tourwang-brown text-white font-medium"
        onClick={() => navigate('/login')}
      >
        เข้าสู่ระบบ
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-9 w-9 rounded-full p-0 overflow-hidden focus:ring-2 focus:ring-tourwang-orange focus:ring-offset-2"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-tourwang-orange text-white">
              {getUserInitials(user)}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">เมนูผู้ใช้</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 border-tourwang-cream/20 shadow-md animate-in fade-in-80 zoom-in-95"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.user_metadata?.name || 'ผู้ใช้'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => navigate('/account')}
          className="cursor-pointer hover:bg-accent hover:text-tourwang-orange focus:bg-accent focus:text-tourwang-orange"
        >
          <UserIcon className="mr-2 h-4 w-4" />
          <span>ข้อมูลส่วนตัว</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/orders')}
          className="cursor-pointer hover:bg-accent hover:text-tourwang-orange focus:bg-accent focus:text-tourwang-orange"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>ประวัติการสั่งซื้อ</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/favorites')}
          className="cursor-pointer hover:bg-accent hover:text-tourwang-orange focus:bg-accent focus:text-tourwang-orange"
        >
          <Heart className="mr-2 h-4 w-4" />
          <span>รายการโปรด</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => navigate('/settings')}
          className="cursor-pointer hover:bg-accent hover:text-tourwang-orange focus:bg-accent focus:text-tourwang-orange"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>ตั้งค่า</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={signOut}
          className="cursor-pointer text-rose-500 hover:text-rose-600 focus:text-rose-700 hover:bg-rose-50 focus:bg-rose-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>ออกจากระบบ</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
