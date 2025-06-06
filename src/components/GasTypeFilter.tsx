import { useState } from "react";
import { FuelTypes } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Fuel } from "lucide-react";

interface GasTypeFilterProps {
  onGasTypeChange: (gasType: FuelTypes | "") => void;
}

export const GasTypeFilter = ({ onGasTypeChange }: GasTypeFilterProps) => {
  const [fuelType, setGasType] = useState<FuelTypes | "">("");

  const handleGasTypeChange = (value: string) => {
    // Si el valor es "all", enviamos cadena vacía para mostrar todas las gasolineras
    const newFuelType = value === "all" ? "" : (value as FuelTypes);
    setGasType(newFuelType);
    onGasTypeChange(newFuelType);
  };

  const fuelOptions = [
    { value: "all", label: "Todos los combustibles" },
    { value: "Precio Gasolina 95 E5", label: "Gasolina 95 E5" },
    { value: "Precio Gasoleo A", label: "Gasóleo A" },
    { value: "Precio Gasolina 98 E5", label: "Gasolina 98 E5" },
    { value: "Precio Gasoleo Premium", label: "Gasóleo Premium" },
    { value: "Precio Hidrogeno", label: "Hidrógeno" },
  ];

  // Convertir el valor actual a "all" si es cadena vacía para el Select
  const currentValue = fuelType === "" ? "all" : fuelType;

  return (
    <div className="space-y-2">
      <Label htmlFor="fuelType" className="text-sm font-medium">
        Tipo de combustible
      </Label>
      <Select 
        value={currentValue}
        onValueChange={handleGasTypeChange}
      >
        <SelectTrigger id="fuelType" className="w-full">
          <SelectValue placeholder="Seleccionar combustible" />
        </SelectTrigger>
        <SelectContent>
          {fuelOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4" />
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
