import { GasStation } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, Fuel, MapPin, ExternalLink } from "lucide-react";
import { Separator } from "./ui/separator";

interface GasStationCardProps {
  station: GasStation;
}

export const GasStationCard = ({ station }: GasStationCardProps) => {
  const formatPrice = (price: string | null | undefined) => {
    if (!price) return "N/A";
    return `${price} €/L`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin size={18} className="text-primary" />
              {station.Rótulo}
            </CardTitle>
            <CardDescription className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                {station.Dirección}
              </span>
              <span className="text-sm text-muted-foreground">
                {station.Municipio}, {station.Provincia}
              </span>
            </CardDescription>
          </div>
          <Badge variant="secondary" className="h-fit">
            <Fuel size={16} className="mr-2" />
            Precios
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Gasóleo A</p>
            <p className="text-2xl font-bold text-primary">
              {formatPrice(station["Precio Gasoleo A"])}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Gasolina 95 E5</p>
            <p className="text-2xl font-bold text-primary">
              {formatPrice(station["Precio Gasolina 95 E5"])}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} />
          <span>{station.Horario || "Horario no disponible"}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          asChild
        >
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              station.Dirección
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} />
            Ver en Google Maps
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
