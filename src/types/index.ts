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
  brand?: string;
  fuelType?: FuelTypes;
  maxDistance?: number;
  autonomousCommunity?: string;
  province?: string;
  date?: string;
}

export type FuelTypes =
  | "Precio Gasoleo A"
  | "Precio Gasoleo B"
  | "Precio Gasolina 95 E5"
  | "Precio Gasolina 98 E5"
  | "Precio Gasoleo Premium"
  | "Precio Gases licuados del petróleo"
  | "Precio Hidrogeno";

export interface AutonomousCommunity {
  id: string;
  name: string;
  code: string;
}

export interface Province {
  id: string;
  name: string;
  code: string;
  autonomousCommunityCode: string;
}

// Mapeo de códigos de comunidades autónomas
export const AUTONOMOUS_COMMUNITIES: AutonomousCommunity[] = [
  { id: "01", name: "Andalucía", code: "01" },
  { id: "02", name: "Aragón", code: "02" },
  { id: "03", name: "Asturias, Principado de", code: "03" },
  { id: "04", name: "Balears, Illes", code: "04" },
  { id: "05", name: "Canarias", code: "05" },
  { id: "06", name: "Cantabria", code: "06" },
  { id: "07", name: "Castilla y León", code: "07" },
  { id: "08", name: "Castilla - La Mancha", code: "08" },
  { id: "09", name: "Cataluña", code: "09" },
  { id: "10", name: "Comunitat Valenciana", code: "10" },
  { id: "11", name: "Extremadura", code: "11" },
  { id: "12", name: "Galicia", code: "12" },
  { id: "13", name: "Madrid, Comunidad de", code: "13" },
  { id: "14", name: "Murcia, Región de", code: "14" },
  { id: "15", name: "Navarra, Comunidad Foral de", code: "15" },
  { id: "16", name: "País Vasco", code: "16" },
  { id: "17", name: "Rioja, La", code: "17" },
  { id: "18", name: "Ceuta", code: "18" },
  { id: "19", name: "Melilla", code: "19" },
];

// Mapeo de provincias con sus códigos y comunidades autónomas
export const PROVINCES: Province[] = [
  { id: "04", name: "Almería", code: "04", autonomousCommunityCode: "01" },
  { id: "11", name: "Cádiz", code: "11", autonomousCommunityCode: "01" },
  { id: "14", name: "Córdoba", code: "14", autonomousCommunityCode: "01" },
  { id: "18", name: "Granada", code: "18", autonomousCommunityCode: "01" },
  { id: "21", name: "Huelva", code: "21", autonomousCommunityCode: "01" },
  { id: "23", name: "Jaén", code: "23", autonomousCommunityCode: "01" },
  { id: "29", name: "Málaga", code: "29", autonomousCommunityCode: "01" },
  { id: "41", name: "Sevilla", code: "41", autonomousCommunityCode: "01" },
  { id: "22", name: "Huesca", code: "22", autonomousCommunityCode: "02" },
  { id: "44", name: "Teruel", code: "44", autonomousCommunityCode: "02" },
  { id: "50", name: "Zaragoza", code: "50", autonomousCommunityCode: "02" },
  { id: "33", name: "Asturias", code: "33", autonomousCommunityCode: "03" },
  { id: "07", name: "Balears, Illes", code: "07", autonomousCommunityCode: "04" },
  { id: "35", name: "Palmas, Las", code: "35", autonomousCommunityCode: "05" },
  { id: "38", name: "Santa Cruz de Tenerife", code: "38", autonomousCommunityCode: "05" },
  { id: "39", name: "Cantabria", code: "39", autonomousCommunityCode: "06" },
  { id: "05", name: "Ávila", code: "05", autonomousCommunityCode: "07" },
  { id: "09", name: "Burgos", code: "09", autonomousCommunityCode: "07" },
  { id: "24", name: "León", code: "24", autonomousCommunityCode: "07" },
  { id: "34", name: "Palencia", code: "34", autonomousCommunityCode: "07" },
  { id: "37", name: "Salamanca", code: "37", autonomousCommunityCode: "07" },
  { id: "40", name: "Segovia", code: "40", autonomousCommunityCode: "07" },
  { id: "42", name: "Soria", code: "42", autonomousCommunityCode: "07" },
  { id: "47", name: "Valladolid", code: "47", autonomousCommunityCode: "07" },
  { id: "49", name: "Zamora", code: "49", autonomousCommunityCode: "07" },
  { id: "02", name: "Albacete", code: "02", autonomousCommunityCode: "08" },
  { id: "13", name: "Ciudad Real", code: "13", autonomousCommunityCode: "08" },
  { id: "16", name: "Cuenca", code: "16", autonomousCommunityCode: "08" },
  { id: "19", name: "Guadalajara", code: "19", autonomousCommunityCode: "08" },
  { id: "45", name: "Toledo", code: "45", autonomousCommunityCode: "08" },
  { id: "08", name: "Barcelona", code: "08", autonomousCommunityCode: "09" },
  { id: "17", name: "Girona", code: "17", autonomousCommunityCode: "09" },
  { id: "25", name: "Lleida", code: "25", autonomousCommunityCode: "09" },
  { id: "43", name: "Tarragona", code: "43", autonomousCommunityCode: "09" },
  { id: "03", name: "Alicante/Alacant", code: "03", autonomousCommunityCode: "10" },
  { id: "12", name: "Castellón/Castelló", code: "12", autonomousCommunityCode: "10" },
  { id: "46", name: "Valencia/València", code: "46", autonomousCommunityCode: "10" },
  { id: "06", name: "Badajoz", code: "06", autonomousCommunityCode: "11" },
  { id: "10", name: "Cáceres", code: "10", autonomousCommunityCode: "11" },
  { id: "15", name: "Coruña, A", code: "15", autonomousCommunityCode: "12" },
  { id: "27", name: "Lugo", code: "27", autonomousCommunityCode: "12" },
  { id: "32", name: "Ourense", code: "32", autonomousCommunityCode: "12" },
  { id: "36", name: "Pontevedra", code: "36", autonomousCommunityCode: "12" },
  { id: "28", name: "Madrid", code: "28", autonomousCommunityCode: "13" },
  { id: "30", name: "Murcia", code: "30", autonomousCommunityCode: "14" },
  { id: "31", name: "Navarra", code: "31", autonomousCommunityCode: "15" },
  { id: "01", name: "Araba/Álava", code: "01", autonomousCommunityCode: "16" },
  { id: "48", name: "Bizkaia", code: "48", autonomousCommunityCode: "16" },
  { id: "20", name: "Gipuzkoa", code: "20", autonomousCommunityCode: "16" },
  { id: "26", name: "Rioja, La", code: "26", autonomousCommunityCode: "17" },
  { id: "51", name: "Ceuta", code: "51", autonomousCommunityCode: "18" },
  { id: "52", name: "Melilla", code: "52", autonomousCommunityCode: "19" },
];
