import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="relative bg-white rounded-2xl shadow-lg border border-white/50">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-6 py-5 text-lg border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-none bg-transparent placeholder:text-slate-400"
        />
        <Button
          size="sm"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
