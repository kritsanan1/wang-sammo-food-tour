
import React from "react";
import { Link } from "react-router-dom";
import { UserMenu } from "./UserMenu";
import CartButton from "./CartButton";
import SearchInput from "./SearchInput";

const Navigation: React.FC = () => {
  return (
    <nav className="py-2 border-b shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-lg font-bold text-tourwang-orange hover:text-tourwang-brown">
            Tourwang
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/restaurants" className="text-gray-600 hover:text-tourwang-orange">
              ร้านอาหาร
            </Link>
            <Link to="/auth" className="text-gray-600 hover:text-tourwang-orange">
              บัญชี
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block w-64">
            <SearchInput />
          </div>
          <CartButton />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
