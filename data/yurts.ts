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
  hasKeypad: boolean;
  walkingDirections: string;
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
    hasKeypad: true,
    walkingDirections:
      'From the main parking lot, follow the flagstone path past the pavilion. Aspen is the second yurt on your left, with a king bed and a deck facing the red cliffs.',
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
    hasKeypad: true,
    walkingDirections:
      'From the main parking lot, take the walkway left toward the orchard. Willow sits on the far side under a cluster of cottonwoods.',
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
    hasKeypad: true,
    walkingDirections:
      'Ash is our ADA-accessible yurt. From the accessible parking spot at the south end of the lot, a paved walkway leads directly to the door — no stairs.',
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
    hasKeypad: true,
    walkingDirections:
      'From the main parking lot, follow the path past the fire pit circle. Birch is the first yurt on your right.',
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
    hasKeypad: true,
    walkingDirections:
      'From the main parking lot, take the walkway right past the central fire pit. Elm is just before the large yurts.',
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
    hasKeypad: true,
    walkingDirections:
      'From the large-yurt parking area at the north end of the lot, follow the wider path. Cottonwood is the second of our two-bedroom yurts, set back against the ridge.',
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
    hasKeypad: true,
    walkingDirections:
      'From the large-yurt parking area at the north end of the lot, Cedar is the first yurt on your right, with the big wraparound deck.',
    url: 'https://escalanteyurts.com/cedar/',
  },
];

export const YURTS_BY_ID: Record<string, Yurt> = Object.fromEntries(
  YURTS.map((y) => [y.id, y]),
);
