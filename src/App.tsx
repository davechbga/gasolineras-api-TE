import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { icon } from "leaflet";
import { GasStation, FuelTypes } from "./types";
import { GasStationList } from "./components/GasStationList";
import { GasStationFilter } from "./components/GasStationFilter";
import { GasTypeFilter } from "./components/GasTypeFilter";
import { AutonomousCommunityFilter } from "./components/AutonomousCommunityFilter";
import { ProvinceFilter } from "./components/ProvinceFilter";
import { DateFilter } from "./components/DateFilter";
import { getClosestStations } from "./services/api";
import "leaflet/dist/leaflet.css";

// shadcn/ui components
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Skeleton } from "./components/ui/skeleton";
import { Separator } from "./components/ui/separator";
import { MapPin, Navigation, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Progress } from "./components/ui/progress";

// Ícono para los marcadores
const ICON = icon({
  iconUrl: "/icon-gas.png",
  iconSize: [32, 32],
});

// Componente de carga para la lista de gasolineras
const GasStationListSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[180px]" />
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
                <Skeleton className="h-6 w-[80px]" />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-6 w-[80px]" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-6 w-[80px]" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-8 w-[120px]" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Componente de carga para los filtros
const FiltersSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

// Componente de carga para el mapa
const MapSkeleton = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-50">
      <div className="space-y-4 w-full p-4">
        <Skeleton className="h-[400px] w-full rounded-none" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
};

// Componente de instrucciones del mapa
const MapInstructions = () => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border animate-fade-in">
      <div className="flex items-center gap-2 text-sm">
        <MapPin className="h-4 w-4 text-primary" />
        <p>Haz click en un punto del mapa para cambiar la ubicación</p>
      </div>
    </div>
  );
};

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stations, setStations] = useState<GasStation[]>([]);
  const [filteredStations, setFilteredStations] = useState<GasStation[]>([]);
  const [brand, setBrand] = useState<string>("");
  const [fuelType, setFuelType] = useState<FuelTypes | "">("");
  const [autonomousCommunity, setAutonomousCommunity] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [center, setCenter] = useState<[number, number]>([40.416775, -3.70379]);
  const [latInput, setLatInput] = useState<string>("");
  const [lngInput, setLngInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  // Función para cargar estaciones
  const loadStations = async (newCenter: [number, number]) => {
    setLoading(true);
    setError(null);
    setLoadingProgress(0);

    try {
      // Simular progreso de carga
      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const closestStations = await getClosestStations(newCenter, 20, {
        brand,
        fuelType: fuelType || undefined,
        autonomousCommunity,
        province,
        date,
      });
      setStations(closestStations);
      setFilteredStations(closestStations);

      // Completar la barra de progreso
      clearInterval(progressInterval);
      setLoadingProgress(100);

      // Mostrar mensaje de éxito
      if (closestStations.length === 0) {
        setError(
          "No se encontraron gasolineras en esta ubicación. Intenta con otra ubicación."
        );
      }
    } catch (error) {
      console.error("Error loading stations:", error);
      setError("Error al cargar las gasolineras. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar estaciones cuando cambie el centro o los filtros
  useEffect(() => {
    loadStations(center);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, brand, fuelType, autonomousCommunity, province, date]);

  // Manejo de clics en el mapa
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setCenter([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold tracking-tight">FuelFinder</h1>
          <p className="text-muted-foreground">
            Encuentra las gasolineras más cercanas a ti
          </p>
        </div>
      </header>

      <main className="container mx-auto py-6">
        {/* Estado de carga y errores */}
        {loading && (
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              Cargando gasolineras...
            </div>
            <Progress value={loadingProgress} className="h-2" />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <FiltersSkeleton />
                ) : (
                  <>
                    <div className="space-y-2">
                      <GasStationFilter onFilterChange={setBrand} />
                    </div>
                    <div className="space-y-2">
                      <GasTypeFilter onGasTypeChange={setFuelType} />
                    </div>
                    <div className="space-y-2">
                      <AutonomousCommunityFilter
                        onAutonomousCommunityChange={setAutonomousCommunity}
                      />
                    </div>
                    <div className="space-y-2">
                      <ProvinceFilter
                        onProvinceChange={setProvince}
                        selectedAutonomousCommunity={autonomousCommunity}
                      />
                    </div>
                    <div className="space-y-2">
                      <DateFilter onDateChange={setDate} />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ubicación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => {
                    if ("geolocation" in navigator) {
                      setLoading(true);
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          setCenter([
                            position.coords.latitude,
                            position.coords.longitude,
                          ]);
                        },
                        (error) => {
                          console.error(
                            "Error obteniendo la geolocalización:",
                            error
                          );
                          setError(
                            "No se pudo obtener la ubicación. Permita el acceso o ingrese coordenadas manualmente."
                          );
                          setLoading(false);
                        }
                      );
                    } else {
                      setError(
                        "Geolocalización no soportada en este navegador."
                      );
                    }
                  }}
                  className="w-full"
                  disabled={loading}
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Usar mi ubicación
                </Button>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Coordenadas manuales
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Latitud"
                      value={latInput}
                      onChange={(e) => setLatInput(e.target.value)}
                      disabled={loading}
                    />
                    <Input
                      type="number"
                      placeholder="Longitud"
                      value={lngInput}
                      onChange={(e) => setLngInput(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      const lat = parseFloat(latInput);
                      const lng = parseFloat(lngInput);
                      if (!isNaN(lat) && !isNaN(lng)) {
                        setCenter([lat, lng]);
                      } else {
                        setError("Por favor, ingrese coordenadas válidas.");
                      }
                    }}
                    className="w-full"
                    disabled={loading}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Actualizar ubicación
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="relative h-[600px]">
                  {loading ? (
                    <MapSkeleton />
                  ) : null}
                  <MapInstructions />
                  <MapContainer
                    center={center}
                    zoom={12}
                    className="h-full w-full"
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapClickHandler />
                    {filteredStations.map((station) => (
                      <Marker
                        icon={ICON}
                        key={station.IDEESS}
                        position={[
                          parseFloat(station.Latitud.replace(",", ".")),
                          parseFloat(
                            station["Longitud (WGS84)"].replace(",", ".")
                          ),
                        ]}
                      >
                        <Popup>
                          <div className="space-y-2">
                            <h3 className="font-semibold">{station.Rótulo}</h3>
                            <p className="text-sm">{station.Dirección}</p>
                            <p className="text-sm">
                              {station.Municipio}, {station.Provincia}
                            </p>
                            {station.Horario && (
                              <p className="text-sm">
                                Horario: {station.Horario}
                              </p>
                            )}
                            {fuelType && station[fuelType] && (
                              <p className="text-sm font-medium">
                                {fuelType}: {station[fuelType]} €/L
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground">
                              Distancia: {station.distance?.toFixed(2)} km
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gasolineras cercanas</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <GasStationListSkeleton />
                ) : (
                  <GasStationList stations={filteredStations} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
