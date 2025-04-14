
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserIcon, Settings, Bell, ShoppingBag, LogOut } from 'lucide-react';

interface UserDashboardProps {
  user: User;
  onLogout?: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onLogout }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const getUserInitials = () => {
    if (!user || !user.user_metadata?.name) return '?';
    const name = user.user_metadata.name;
    const words = name.split(' ');
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };
  
  const getUserFullName = () => {
    return user.user_metadata?.name || user.email?.split('@')[0] || 'ผู้ใช้';
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: 'ออกจากระบบสำเร็จ',
      });
      
      if (onLogout) {
        onLogout();
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถออกจากระบบได้',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.user_metadata?.avatar_url} alt={getUserFullName()} />
              <AvatarFallback className="bg-tourwang-orange text-white text-xl">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{getUserFullName()}</CardTitle>
              <CardDescription className="text-sm">
                {user.email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="profile">
                <UserIcon className="h-4 w-4 mr-2" />
                ข้อมูลส่วนตัว
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBag className="h-4 w-4 mr-2" />
                การสั่งซื้อ
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                การแจ้งเตือน
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                ตั้งค่า
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <h3 className="text-lg font-semibold">ข้อมูลส่วนตัวของคุณ</h3>
                  <p className="text-sm text-muted-foreground">
                    ข้อมูลส่วนตัวของคุณที่จะแสดงในเว็บไซต์
                  </p>
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <dl className="divide-y divide-border">
                      <div className="grid grid-cols-3 py-3">
                        <dt className="text-sm font-medium">อีเมล</dt>
                        <dd className="col-span-2 text-sm">{user.email}</dd>
                      </div>
                      <div className="grid grid-cols-3 py-3">
                        <dt className="text-sm font-medium">ชื่อ-นามสกุล</dt>
                        <dd className="col-span-2 text-sm">{getUserFullName()}</dd>
                      </div>
                      <div className="grid grid-cols-3 py-3">
                        <dt className="text-sm font-medium">เป็นสมาชิกตั้งแต่</dt>
                        <dd className="col-span-2 text-sm">
                          {new Date(user.created_at!).toLocaleDateString('th-TH')}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-10">
                    <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">ไม่พบประวัติการสั่งซื้อ</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      เมื่อคุณทำการสั่งซื้อ ข้อมูลจะแสดงที่นี่
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate('/restaurants')}
                    >
                      เริ่มการสั่งซื้อ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-10">
                    <Bell className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">ไม่มีการแจ้งเตือน</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      คุณจะได้รับการแจ้งเตือนเกี่ยวกับการสั่งซื้อและโปรโมชั่นที่นี่
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">การตั้งค่าบัญชี</h3>
                    <p className="text-sm text-muted-foreground">
                      ตั้งค่าต่างๆสำหรับบัญชีของคุณ
                    </p>
                    
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        เปลี่ยนรหัสผ่าน
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        การตั้งค่าการแจ้งเตือน
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        ภาษาและภูมิภาค
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            ออกจากระบบ
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDashboard;
