
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-6">หน้านี้ไม่มีอยู่</p>
          <p className="text-gray-500 mb-8">
            ขออภัย เราไม่พบหน้าที่คุณต้องการ
          </p>
        </div>
        <Button 
          onClick={() => navigate("/")} 
          className="flex items-center justify-center gap-2 bg-tourwang-orange hover:bg-tourwang-brown" 
          size="lg"
        >
          <Home className="h-5 w-5" />
          <span>กลับไปหน้าหลัก</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
