import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { MapPin } from "lucide-react";
import { PROVINCES } from "@/types";

interface ProvinceFilterProps {
  onProvinceChange: (provinceId: string) => void;
  selectedAutonomousCommunity?: string;
}

export const ProvinceFilter = ({
  onProvinceChange,
  selectedAutonomousCommunity,
}: ProvinceFilterProps) => {
  const [selectedProvince, setSelectedProvince] = useState<string>("all");

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    onProvinceChange(value === "all" ? "" : value);
  };

  const filteredProvinces = selectedAutonomousCommunity
    ? PROVINCES.filter((p) => p.autonomousCommunityCode === selectedAutonomousCommunity)
    : PROVINCES;

  return (
    <div className="space-y-2">
      <Label htmlFor="province" className="text-sm font-medium">
        Provincia
      </Label>
      <Select
        value={selectedProvince}
        onValueChange={handleProvinceChange}
        disabled={selectedAutonomousCommunity ? false : true}
      >
        <SelectTrigger id="province" className="w-full">
          <SelectValue placeholder="Seleccionar provincia" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Todas las provincias</span>
            </div>
          </SelectItem>
          {filteredProvinces.map((province) => (
            <SelectItem key={province.id} value={province.code}>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{province.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}; 