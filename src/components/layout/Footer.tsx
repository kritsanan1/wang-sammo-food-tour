
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  MapPin, 
  MessageCircle, 
  Phone 
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tourwang-brown text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/975c6206-3406-471a-bca9-0667ca761386.png" 
                alt="Tour Der Wang Logo" 
                className="h-12 w-auto mr-3"
              />
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-white">ที่นี่ วังสามหมอ</h3>
                <p className="text-sm text-tourwang-cream">Tour Der Wang</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              บริการส่งอาหารยอดนิยมในจังหวัดอุดรธานี บริการรวดเร็ว อาหารร้อน ส่งตรงถึงบ้านคุณ
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="hover:text-tourwang-orange transition-colors">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="hover:text-tourwang-orange transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">ลิงก์ด่วน</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/restaurants" 
                  className="text-sm hover:text-tourwang-orange transition-colors"
                >
                  ร้านอาหารทั้งหมด
                </Link>
              </li>
              <li>
                <Link 
                  to="/promotions" 
                  className="text-sm hover:text-tourwang-orange transition-colors"
                >
                  โปรโมชั่น
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-sm hover:text-tourwang-orange transition-colors"
                >
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link 
                  to="/join" 
                  className="text-sm hover:text-tourwang-orange transition-colors"
                >
                  ร่วมเป็นพาร์ทเนอร์
                </Link>
              </li>
              <li>
                <Link 
                  to="/rider" 
                  className="text-sm hover:text-tourwang-orange transition-colors"
                >
                  สมัครเป็นไรเดอร์
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">ช่วยเหลือ</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/faq" 
                  className="text-sm hover:text-tourwang-orange transition-colors"
                >
                  คำถามที่พบบ่อย
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-sm hover:text-tourwang-orange transition-colors"
                >
                  ข้อกำหนดการใช้งาน
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-sm hover:text-tourwang-orange transition-colors"
                >
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-sm hover:text-tourwang-orange transition-colors"
                >
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">ติดต่อ</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-tourwang-orange shrink-0" />
                <span className="text-sm">
                  123 ถนนวังสามหมอ อำเภอวังสามหมอ จังหวัดอุดรธานี 41280
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-tourwang-orange shrink-0" />
                <span className="text-sm">099-234-5678</span>
              </li>
              <li className="flex items-center">
                <MessageCircle className="mr-3 h-5 w-5 text-tourwang-orange shrink-0" />
                <span className="text-sm">contact@tourderwang.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-white/60 mb-4 md:mb-0">
            © {currentYear} ที่นี่ วังสามหมอ (Tour Der Wang). สงวนลิขสิทธิ์.
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-xs text-white/60 hover:text-white transition-colors">
              ข้อกำหนด
            </Link>
            <Link to="/privacy" className="text-xs text-white/60 hover:text-white transition-colors">
              ความเป็นส่วนตัว
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
