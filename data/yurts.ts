export type YurtSize = 'small' | 'large';
export type KitchenType = 'kitchenette' | 'full';

export type Yurt = {
  id: string;
  name: string;
  size: YurtSize;
  sqft: 450 | 900;
  maxGuests: number;
  beds: string;
  kitchen: KitchenType;
  bathroom: string;
  amenities: string[];
  ada?: boolean;
  url: string;
};

const smallAmenities = [
  'Private deck',
  'Propane grill',
  'Coffee maker',
  'Mini fridge',
  'Microwave',
  'Heat & A/C',
  'Luxury linens',
] as const;

const largeAmenities = [
  'Private deck',
  'Propane grill',
  'Two-burner stove',
  'Dishwasher',
  'Mini fridge & freezer',
  'Coffee maker',
  'Microwave',
  'Heat & A/C',
  'Luxury linens',
] as const;

export const YURTS: Yurt[] = [
  {
    id: 'aspen',
    name: 'Aspen',
    size: 'small',
    sqft: 450,
    maxGuests: 4,
    beds: '1 King, 1 Queen sofa sleeper',
    kitchen: 'kitchenette',
    bathroom: 'Full private bathroom',
    amenities: [...smallAmenities],
    url: 'https://escalanteyurts.com/aspen/',
  },
  {
    id: 'willow',
    name: 'Willow',
    size: 'small',
    sqft: 450,
    maxGuests: 4,
    beds: '1 King, 1 Queen sofa sleeper',
    kitchen: 'kitchenette',
    bathroom: 'Full private bathroom',
    amenities: [...smallAmenities],
    url: 'https://escalanteyurts.com/willow/',
  },
  {
    id: 'ash',
    name: 'Ash',
    size: 'small',
    sqft: 450,
    maxGuests: 4,
    beds: '1 King, 1 Queen sofa sleeper',
    kitchen: 'kitchenette',
    bathroom: 'ADA-accessible private bathroom',
    amenities: [...smallAmenities, 'ADA accessible'],
    ada: true,
    url: 'https://escalanteyurts.com/ash/',
  },
  {
    id: 'birch',
    name: 'Birch',
    size: 'small',
    sqft: 450,
    maxGuests: 4,
    beds: '1 King, 1 Queen sofa sleeper',
    kitchen: 'kitchenette',
    bathroom: 'Private bathroom with shower',
    amenities: [...smallAmenities],
    url: 'https://escalanteyurts.com/birch/',
  },
  {
    id: 'elm',
    name: 'Elm',
    size: 'small',
    sqft: 450,
    maxGuests: 4,
    beds: '1 King, 1 Queen sofa sleeper',
    kitchen: 'kitchenette',
    bathroom: 'Private bathroom with shower',
    amenities: [...smallAmenities],
    url: 'https://escalanteyurts.com/elm/',
  },
  {
    id: 'cottonwood',
    name: 'Cottonwood',
    size: 'large',
    sqft: 900,
    maxGuests: 7,
    beds: '2 Queens, 3 Twins (2 bedrooms + loft)',
    kitchen: 'full',
    bathroom: 'Spacious bath & shower',
    amenities: [...largeAmenities],
    url: 'https://escalanteyurts.com/cottonwood/',
  },
  {
    id: 'cedar',
    name: 'Cedar',
    size: 'large',
    sqft: 900,
    maxGuests: 7,
    beds: '2 Queens, 3 Twins (2 bedrooms + loft)',
    kitchen: 'full',
    bathroom: 'Spacious bath & shower',
    amenities: [...largeAmenities],
    url: 'https://escalanteyurts.com/cedar/',
  },
];

export const YURTS_BY_ID: Record<string, Yurt> = Object.fromEntries(
  YURTS.map((y) => [y.id, y]),
);
