import corolla from "@/assets/vehicles/corolla.jpg";
import accent from "@/assets/vehicles/accent.jpg";
import rav4 from "@/assets/vehicles/rav4.jpg";
import xtrail from "@/assets/vehicles/xtrail.jpg";
import landcruiser from "@/assets/vehicles/landcruiser.jpg";
import pajero from "@/assets/vehicles/pajero.jpg";
import hilux from "@/assets/vehicles/hilux.jpg";
import trafic from "@/assets/vehicles/trafic.jpg";
import hiace from "@/assets/vehicles/hiace.jpg";
import sprinter from "@/assets/vehicles/sprinter.jpg";

export type VehicleCategory =
  | "Berline"
  | "SUV"
  | "4x4"
  | "Utilitaire"
  | "Minibus"
  | "Pick-up";

export type Transmission = "Manuelle" | "Automatique";
export type Fuel = "Essence" | "Diesel";

export interface PricingTier {
  duration: string;
  pricePerDay: number;
  discount: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: VehicleCategory;
  year: number;
  transmission: Transmission;
  fuel: Fuel;
  seats: number;
  hasAC: boolean;
  is4x4: boolean;
  trunkVolume: number; // litres
  pricePerDay: number; // Ar
  image: string;
  description: string;
  equipment: string[];
  pricingTiers: PricingTier[];
  conditions: {
    minAge: number;
    license: string;
    deposit: string;
    mileage: string;
    insurance: string;
  };
}

const baseConditions = {
  minAge: 23,
  license: "Permis B valide depuis au moins 2 ans",
  deposit: "Caution selon catégorie de véhicule",
  mileage: "Kilométrage illimité",
  insurance: "Assurance tous risques incluse",
};

const baseEquipment = [
  "Climatisation",
  "Direction assistée",
  "ABS / Airbags",
  "Vitres électriques",
  "Bluetooth",
  "Prise USB / 12V",
];

function tiers(base: number): PricingTier[] {
  return [
    { duration: "1-3 jours", pricePerDay: base, discount: "—" },
    { duration: "4-7 jours", pricePerDay: Math.round(base * 0.9), discount: "-10%" },
    { duration: "8-30 jours", pricePerDay: Math.round(base * 0.8), discount: "-20%" },
    { duration: "1 mois +", pricePerDay: Math.round(base * 0.7), discount: "-30%" },
  ];
}

export const vehicles: Vehicle[] = [
  {
    id: "1",
    slug: "toyota-corolla",
    name: "Toyota Corolla",
    category: "Berline",
    year: 2023,
    transmission: "Automatique",
    fuel: "Essence",
    seats: 5,
    hasAC: true,
    is4x4: false,
    trunkVolume: 470,
    pricePerDay: 180000,
    image: corolla,
    description:
      "Une berline confortable et économique, idéale pour les déplacements urbains et professionnels. La Toyota Corolla allie fiabilité japonaise et faible consommation pour vos trajets quotidiens.",
    equipment: [...baseEquipment, "GPS intégré", "Caméra de recul"],
    pricingTiers: tiers(180000),
    conditions: baseConditions,
  },
  {
    id: "2",
    slug: "hyundai-accent",
    name: "Hyundai Accent",
    category: "Berline",
    year: 2022,
    transmission: "Manuelle",
    fuel: "Essence",
    seats: 5,
    hasAC: true,
    is4x4: false,
    trunkVolume: 389,
    pricePerDay: 150000,
    image: accent,
    description:
      "Berline compacte économique et fiable, parfaite pour les déplacements en ville et les courts trajets. Excellent rapport qualité-prix pour vos missions professionnelles.",
    equipment: baseEquipment,
    pricingTiers: tiers(150000),
    conditions: baseConditions,
  },
  {
    id: "3",
    slug: "toyota-rav4",
    name: "Toyota RAV4",
    category: "SUV",
    year: 2023,
    transmission: "Automatique",
    fuel: "Essence",
    seats: 5,
    hasAC: true,
    is4x4: true,
    trunkVolume: 580,
    pricePerDay: 320000,
    image: rav4,
    description:
      "SUV polyvalent, à l'aise aussi bien en ville que sur les routes accidentées de Madagascar. Confort, sécurité et capacité tout-terrain modérée pour tous vos déplacements.",
    equipment: [...baseEquipment, "GPS intégré", "Caméra de recul", "4 roues motrices"],
    pricingTiers: tiers(320000),
    conditions: baseConditions,
  },
  {
    id: "4",
    slug: "nissan-xtrail",
    name: "Nissan X-Trail",
    category: "SUV",
    year: 2022,
    transmission: "Automatique",
    fuel: "Diesel",
    seats: 7,
    hasAC: true,
    is4x4: false,
    trunkVolume: 565,
    pricePerDay: 290000,
    image: xtrail,
    description:
      "SUV familial 7 places spacieux et confortable. Idéal pour les missions d'équipe ou les déplacements de groupe avec bagages.",
    equipment: [...baseEquipment, "GPS intégré", "Caméra de recul"],
    pricingTiers: tiers(290000),
    conditions: baseConditions,
  },
  {
    id: "5",
    slug: "toyota-land-cruiser",
    name: "Toyota Land Cruiser",
    category: "4x4",
    year: 2023,
    transmission: "Manuelle",
    fuel: "Diesel",
    seats: 7,
    hasAC: true,
    is4x4: true,
    trunkVolume: 700,
    pricePerDay: 550000,
    image: landcruiser,
    description:
      "La référence du tout-terrain à Madagascar. Robuste, fiable et capable de franchir les pistes les plus difficiles, le Land Cruiser est l'allié indispensable des missions en brousse.",
    equipment: [...baseEquipment, "GPS intégré", "4 roues motrices", "Réducteur de vitesse"],
    pricingTiers: tiers(550000),
    conditions: { ...baseConditions, minAge: 25 },
  },
  {
    id: "6",
    slug: "mitsubishi-pajero",
    name: "Mitsubishi Pajero",
    category: "4x4",
    year: 2022,
    transmission: "Automatique",
    fuel: "Diesel",
    seats: 7,
    hasAC: true,
    is4x4: true,
    trunkVolume: 663,
    pricePerDay: 480000,
    image: pajero,
    description:
      "4x4 luxueux et performant pour vos missions exigeantes. Confort haut de gamme combiné à une excellente capacité tout-terrain.",
    equipment: [...baseEquipment, "GPS intégré", "Caméra de recul", "4 roues motrices"],
    pricingTiers: tiers(480000),
    conditions: { ...baseConditions, minAge: 25 },
  },
  {
    id: "7",
    slug: "toyota-hilux",
    name: "Toyota Hilux",
    category: "Pick-up",
    year: 2023,
    transmission: "Manuelle",
    fuel: "Diesel",
    seats: 5,
    hasAC: true,
    is4x4: true,
    trunkVolume: 1500,
    pricePerDay: 420000,
    image: hilux,
    description:
      "Pick-up légendaire, taillé pour le travail et l'aventure. Charge utile importante et capacité 4x4 pour vos chantiers et missions logistiques.",
    equipment: baseEquipment.concat(["4 roues motrices", "Benne aménagée"]),
    pricingTiers: tiers(420000),
    conditions: baseConditions,
  },
  {
    id: "8",
    slug: "renault-trafic",
    name: "Renault Trafic",
    category: "Utilitaire",
    year: 2022,
    transmission: "Manuelle",
    fuel: "Diesel",
    seats: 3,
    hasAC: true,
    is4x4: false,
    trunkVolume: 5800,
    pricePerDay: 260000,
    image: trafic,
    description:
      "Fourgon utilitaire spacieux pour vos transports de marchandises ou de matériel. Volume de chargement généreux et accès facilité.",
    equipment: ["Climatisation", "Direction assistée", "ABS / Airbags", "Bluetooth", "Prise USB / 12V"],
    pricingTiers: tiers(260000),
    conditions: baseConditions,
  },
  {
    id: "9",
    slug: "toyota-hiace",
    name: "Toyota Hiace",
    category: "Minibus",
    year: 2023,
    transmission: "Manuelle",
    fuel: "Diesel",
    seats: 15,
    hasAC: true,
    is4x4: false,
    trunkVolume: 1200,
    pricePerDay: 380000,
    image: hiace,
    description:
      "Minibus 15 places pour le transport de groupes, équipes ou collaborateurs. Confortable, fiable et économique sur longue distance.",
    equipment: baseEquipment,
    pricingTiers: tiers(380000),
    conditions: baseConditions,
  },
  {
    id: "10",
    slug: "mercedes-sprinter",
    name: "Mercedes Sprinter",
    category: "Minibus",
    year: 2023,
    transmission: "Manuelle",
    fuel: "Diesel",
    seats: 19,
    hasAC: true,
    is4x4: false,
    trunkVolume: 1800,
    pricePerDay: 520000,
    image: sprinter,
    description:
      "Minibus haut de gamme 19 places pour les transferts d'équipes et événements professionnels. Confort premium et image valorisante pour vos clients.",
    equipment: [...baseEquipment, "GPS intégré", "Sièges premium"],
    pricingTiers: tiers(520000),
    conditions: { ...baseConditions, minAge: 25 },
  },
];

export const categories: VehicleCategory[] = [
  "Berline",
  "SUV",
  "4x4",
  "Utilitaire",
  "Minibus",
  "Pick-up",
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR").format(price) + " Ar";
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getSimilarVehicles(vehicle: Vehicle, limit = 3): Vehicle[] {
  return vehicles
    .filter((v) => v.id !== vehicle.id && v.category === vehicle.category)
    .slice(0, limit);
}
