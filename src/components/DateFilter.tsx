import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Calendar } from "lucide-react";

interface DateFilterProps {
  onDateChange: (date: string) => void;
}

export const DateFilter = ({ onDateChange }: DateFilterProps) => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="date" className="text-sm font-medium">
        Fecha
      </Label>
      <div className="relative">
        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id="date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="pl-8"
        />
      </div>
    </div>
  );
}; 