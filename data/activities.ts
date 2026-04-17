export type ActivityCategory =
  | 'hike'
  | 'scenic-drive'
  | 'slot-canyon'
  | 'national-park'
  | 'kid-friendly';

export type Difficulty = 'easy' | 'moderate' | 'strenuous' | 'varies';

export type Activity = {
  id: string;
  name: string;
  primaryCategory: ActivityCategory;
  categories: ActivityCategory[];
  coords: { latitude: number; longitude: number };
  driveTime: string;
  distanceNote?: string;
  difficulty: Difficulty;
  difficultyNote?: string;
  type: string;
  description: string;
  heroImage?: number;
};

const IMAGES = {
  calfCreek: require('@/assets/images/activities/calf-creek-falls.jpg'),
  peekaboo: require('@/assets/images/activities/peekaboo.jpg'),
  devilsGarden: require('@/assets/images/activities/devils-garden.jpg'),
  petrifiedForest: require('@/assets/images/activities/petrified-forest.jpg'),
  bryce: require('@/assets/images/activities/bryce-canyon.jpg'),
  capitolReef: require('@/assets/images/activities/capitol-reef.jpg'),
  grosvenor: require('@/assets/images/activities/grosvenor-arch.jpg'),
};

export const PROPERTY_COORDS = { latitude: 37.787621, longitude: -111.594132 };

export const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  hike: 'Hikes',
  'scenic-drive': 'Scenic Drives',
  'slot-canyon': 'Slot Canyons',
  'national-park': 'National Parks',
  'kid-friendly': 'Kid-Friendly',
};

export const CATEGORY_ORDER: ActivityCategory[] = [
  'hike',
  'scenic-drive',
  'slot-canyon',
  'national-park',
  'kid-friendly',
];

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  moderate: 'Moderate',
  strenuous: 'Strenuous',
  varies: 'Varies',
};

export const ACTIVITIES: Activity[] = [
  {
    id: 'lower-calf-creek-falls',
    name: 'Lower Calf Creek Falls',
    primaryCategory: 'hike',
    categories: ['hike'],
    coords: { latitude: 37.7934, longitude: -111.4132 },
    driveTime: '~15 min drive',
    difficulty: 'moderate',
    type: 'Hike · 6 mi round trip',
    description:
      'A classic Escalante hike along Calf Creek to a 126-foot waterfall pouring into a desert oasis. Sandy stretches make it feel longer than the distance suggests — bring water and sun protection.',
    heroImage: IMAGES.calfCreek
  },
  {
    id: 'peekaboo-spooky',
    name: 'Peekaboo & Spooky Slot Canyons',
    primaryCategory: 'slot-canyon',
    categories: ['slot-canyon', 'hike'],
    coords: { latitude: 37.4767, longitude: -111.225 },
    driveTime: '~1 hr drive',
    distanceNote: 'Via Hole-in-the-Rock Road',
    difficulty: 'strenuous',
    type: 'Slot canyons · 3.5 mi loop',
    description:
      'Two of the most photographed slot canyons in the Southwest. Peekaboo involves scrambling up a 12-foot entry; Spooky narrows to less than a foot wide. Not for claustrophobes. High-clearance vehicle recommended.',
    heroImage: IMAGES.peekaboo
  },
  {
    id: 'devils-garden',
    name: "Devil's Garden",
    primaryCategory: 'hike',
    categories: ['hike', 'kid-friendly'],
    coords: { latitude: 37.5388, longitude: -111.425 },
    driveTime: '~45 min drive',
    distanceNote: 'Off Hole-in-the-Rock Road',
    difficulty: 'easy',
    type: 'Short hike · Natural arches & hoodoos',
    description:
      'A compact playground of sandstone hoodoos, small arches, and slickrock — easy to explore at any pace. Great for families and a quick sunset detour.',
    heroImage: IMAGES.devilsGarden
  },
  {
    id: 'petrified-forest',
    name: 'Escalante Petrified Forest State Park',
    primaryCategory: 'hike',
    categories: ['hike', 'kid-friendly'],
    coords: { latitude: 37.7969, longitude: -111.6141 },
    driveTime: '~10 min drive',
    difficulty: 'easy',
    type: 'Short hike · Educational',
    description:
      'A 1-mile loop climbs to fields of colorful petrified wood, with interpretive signs explaining how 150-million-year-old trees became stone. Swim at Wide Hollow Reservoir after.',
    heroImage: IMAGES.petrifiedForest
  },
  {
    id: 'bryce-canyon',
    name: 'Bryce Canyon National Park',
    primaryCategory: 'national-park',
    categories: ['national-park'],
    coords: { latitude: 37.6403, longitude: -112.1673 },
    driveTime: '~1 hr drive',
    difficulty: 'varies',
    difficultyNote: 'Trails range from easy rim walks to strenuous descents',
    type: 'National Park',
    description:
      'Otherworldly amphitheaters of orange hoodoos. Start at Sunrise or Sunset Point, then drop into the Navajo Loop / Queens Garden combo for the iconic Bryce experience.',
    heroImage: IMAGES.bryce
  },
  {
    id: 'capitol-reef',
    name: 'Capitol Reef National Park',
    primaryCategory: 'national-park',
    categories: ['national-park'],
    coords: { latitude: 38.2918, longitude: -111.2611 },
    driveTime: '~1.5 hr drive',
    difficulty: 'varies',
    type: 'National Park',
    description:
      'A 100-mile warp in the earth. Hit the Fruita historic district, pick fruit in season at the orchards, and drive the scenic road to Capitol Gorge.',
    heroImage: IMAGES.capitolReef
  },
  {
    id: 'hells-backbone',
    name: "Hell's Backbone Drive",
    primaryCategory: 'scenic-drive',
    categories: ['scenic-drive'],
    coords: { latitude: 37.9833, longitude: -111.6333 },
    driveTime: '~30 min drive',
    distanceNote: 'To the bridge',
    difficulty: 'easy',
    difficultyNote: 'Easy driving, unpaved sections',
    type: 'Scenic drive · ~44 mi loop',
    description:
      'A backcountry CCC-era road to a narrow bridge spanning a 1,500-ft chasm between Box-Death Hollow and the Dixie National Forest. Best in dry weather — skip after rain.',
  },
  {
    id: 'mossy-cave',
    name: 'Mossy Cave Trail (Bryce)',
    primaryCategory: 'hike',
    categories: ['hike', 'kid-friendly', 'national-park'],
    coords: { latitude: 37.6739, longitude: -112.1372 },
    driveTime: '~1 hr drive',
    difficulty: 'easy',
    type: 'Short hike · 0.8 mi round trip',
    description:
      "The easiest way to taste Bryce. A level trail leads to a dripping grotto and a small waterfall — perfect for kids and shoulder-season visits when the main rim is crowded.",
    heroImage: IMAGES.bryce
  },
  {
    id: 'grosvenor-arch',
    name: 'Grosvenor Arch',
    primaryCategory: 'scenic-drive',
    categories: ['scenic-drive'],
    coords: { latitude: 37.4501, longitude: -111.8375 },
    driveTime: '~45 min drive',
    distanceNote: 'Via Cottonwood Canyon Road',
    difficulty: 'easy',
    type: 'Photo op · 50 ft from parking',
    description:
      'A rare double arch of pale Entrada sandstone, named for Gilbert Grosvenor of National Geographic. A quick stop that rewards a long drive through the Grand Staircase.',
    heroImage: IMAGES.grosvenor
  },
  {
    id: 'hole-in-the-rock-road',
    name: 'Hole in the Rock Road',
    primaryCategory: 'scenic-drive',
    categories: ['scenic-drive'],
    coords: { latitude: 37.7392, longitude: -111.5019 },
    driveTime: '5 mi east of town',
    distanceNote: 'Trailhead starts off UT-12',
    difficulty: 'moderate',
    difficultyNote: '4WD recommended past mile 36',
    type: 'Scenic / 4WD drive · 62 mi one-way',
    description:
      "The historic 1879 Mormon pioneer route to the Colorado River. Access point for Devil's Garden, Peekaboo/Spooky, Dry Fork, and Zebra Slot. First 30 miles are graded dirt; beyond that, high-clearance or 4WD is essential.",
  },
];
