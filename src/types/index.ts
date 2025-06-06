export interface GasStation {
  distance?: number;
  "C.P.": string;
  Dirección: string;
  Horario: string;
  Latitud: string; // Puede incluir comas en lugar de puntos como separadores decimales
  Localidad: string;
  "Longitud (WGS84)": string; // Puede incluir comas en lugar de puntos como separadores decimales
  Margen: string;
  Municipio: string;
  "Precio Biodiesel": string | null;
  "Precio Bioetanol": string | null;
  "Precio Gas Natural Comprimido": string | null;
  "Precio Gas Natural Licuado": string | null;
  "Precio Gases licuados del petróleo": string | null;
  "Precio Gasoleo A": string | null;
  "Precio Gasoleo B": string | null;
  "Precio Gasoleo Premium": string | null;
  "Precio Gasolina 95 E10": string | null;
  "Precio Gasolina 95 E5": string | null;
  "Precio Gasolina 95 E5 Premium": string | null;
  "Precio Gasolina 98 E10": string | null;
  "Precio Gasolina 98 E5": string | null;
  "Precio Hidrogeno": string | null;
  Provincia: string;
  Remisión: string;
  Rótulo: string;
  "Tipo Venta": string;
  "% BioEtanol": string | null;
  "% Éster metílico": string | null;
  IDEESS: string;
  IDMunicipio: string;
  IDProvincia: string;
  IDCCAA: string;
  [key: string]: string | number | null | undefined; // Firma de índice
}

export interface GasStationResponse {
  Fecha: string;
  ListaEESSPrecio: GasStation[];
  Nota: string;
  ResultadoConsulta: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface FilterOptions {
  fuelType: FuelTypes;
  brand: string;
  maxDistance: number;
}

export type FuelTypes =
  | "Precio Gasoleo A"
  | "Precio Gasoleo B"
  | "Precio Gasolina 95 E5"
  | "Precio Gasolina 98 E5"
  | "Precio Gasoleo Premium"
  | "Precio Gases licuados del petróleo"
  | "Precio Hidrogeno";
