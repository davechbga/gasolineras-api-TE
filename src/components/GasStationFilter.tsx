import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Search } from "lucide-react";

interface GasStationFilterProps {
  onFilterChange: (brand: string) => void;
}

export const GasStationFilter = ({ onFilterChange }: GasStationFilterProps) => {
  const [brand, setBrand] = useState<string>("");

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBrand = e.target.value;
    setBrand(newBrand);
    onFilterChange(newBrand);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="brand" className="text-sm font-medium">
        Buscar por marca
      </Label>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id="brand"
          placeholder="Ej: REPSOL, CEPSA, GALP..."
          type="text"
          value={brand}
          onChange={handleBrandChange}
          className="pl-8"
        />
      </div>
    </div>
  );
};
