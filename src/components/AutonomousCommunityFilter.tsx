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
import { AUTONOMOUS_COMMUNITIES } from "@/types";

interface AutonomousCommunityFilterProps {
  onAutonomousCommunityChange: (communityId: string) => void;
}

export const AutonomousCommunityFilter = ({
  onAutonomousCommunityChange,
}: AutonomousCommunityFilterProps) => {
  const [selectedCommunity, setSelectedCommunity] = useState<string>("all");

  const handleCommunityChange = (value: string) => {
    setSelectedCommunity(value);
    onAutonomousCommunityChange(value === "all" ? "" : value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="autonomousCommunity" className="text-sm font-medium">
        Comunidad Autónoma
      </Label>
      <Select value={selectedCommunity} onValueChange={handleCommunityChange}>
        <SelectTrigger id="autonomousCommunity" className="w-full">
          <SelectValue placeholder="Seleccionar comunidad autónoma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Todas las comunidades</span>
            </div>
          </SelectItem>
          {AUTONOMOUS_COMMUNITIES.map((community) => (
            <SelectItem key={community.id} value={community.code}>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{community.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}; 