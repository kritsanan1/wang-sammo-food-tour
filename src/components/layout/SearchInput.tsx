
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
  return (
    <div className={className || "relative w-full max-w-sm"}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input 
        type="search" 
        placeholder="ค้นหาร้านอาหารหรือเมนู..." 
        className="pl-10 focus-visible:ring-tourwang-orange"
      />
    </div>
  );
};
