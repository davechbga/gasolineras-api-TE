import { GasStationResponse, GasStation, FuelTypes } from "@/types";

export const getClosestStations = async (
  center: [number, number],
  maxResults: number = 20,
  brand?: string,
  fuelType?: FuelTypes
): Promise<GasStation[]> => {
  try {
    const response = await fetch(
      "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/"
    );
    const data: GasStationResponse = await response.json();

    // Calcular distancias
    const stationsWithDistance = data.ListaEESSPrecio.map((station) => {
      const lat = parseFloat(station.Latitud.replace(",", "."));
      const lng = parseFloat(station["Longitud (WGS84)"].replace(",", "."));
      const distance = haversineDistance(center, [lat, lng]);
      return { ...station, distance };
    });

    // Filtrar por empresa y tipo de combustible
    const filteredStations = stationsWithDistance.filter((station) => {
      const matchesBrand = brand
        ? station.Rótulo.toLowerCase().includes(brand.toLowerCase())
        : true;

      // Comprobamos si el tipo de combustible está disponible en la estación
      const matchesFuel =
        fuelType &&
        station[fuelType] !== undefined &&
        station[fuelType] !== null
          ? parseFloat(String(station[fuelType]).replace(",", ".")) > 0
          : true;

      return matchesBrand && matchesFuel;
    });

    // Ordenar por distancia y devolver las más cercanas
    return filteredStations
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxResults);
  } catch (error) {
    console.error("Error fetching closest stations:", error);
    throw error;
  }
};

// Fórmula de Haversine
const haversineDistance = (
  [lat1, lon1]: [number, number],
  [lat2, lon2]: [number, number]
): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia en km
};
