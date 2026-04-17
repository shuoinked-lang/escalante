export const PROPERTY = {
  name: 'Escalante Yurts',
  address: {
    street: '1605 N. Pine Creek Road',
    city: 'Escalante',
    state: 'Utah',
    zip: '84726',
  },
  phone: {
    primary: '844-200-9878',
    primaryDisplay: '844-200-YURT',
    secondary: '435-826-4222',
    text: '435-671-2382',
  },
  email: 'info@escalanteyurts.com',
  checkIn: '3:00 PM',
  checkOut: '10:00 AM',
  quietHours: { start: '10:00 PM', end: '8:00 AM' },
  wifi: {
    available: true,
    network: 'EscalanteYurts-Guest',
    password: 'RedRock2024',
    note: 'Complimentary for registered guests. Signal strength can vary — Escalante is a somewhat remote location.',
  },
} as const;

export const POLICIES = {
  breakfast: {
    title: 'Complimentary Breakfast',
    body: 'Breakfast is prepared fresh daily and placed in your yurt the afternoon before — enjoy it on your own schedule. A rotating selection includes breakfast burritos, sandwiches, quiche, pastries, fruit, a cold beverage, and coffee.',
  },
  firePit: {
    title: 'Fire Pits',
    body: 'Three common fire pits on the property are stocked with wood, matches, lighter fluid, and roasting sticks — just bring your marshmallows. Observe any active fire restrictions posted at the office.',
  },
  grill: {
    title: 'Grills',
    body: 'Each yurt has a propane grill and utensils on the private deck — no charcoal needed.',
  },
  pets: {
    title: 'Pet Policy',
    body: 'No pets or emotional support animals are permitted on the property. Service dogs trained to perform tasks for a person with a disability are welcome. Undeclared pets will incur a cleaning fee.',
  },
  quietHours: {
    title: 'Quiet Hours',
    body: 'Quiet hours are observed daily from 10:00 PM to 8:00 AM out of respect for fellow guests and the surrounding desert.',
  },
  smoking: {
    title: 'Smoking',
    body: 'Smoking and vaping are permitted only in designated outdoor areas. Smoking inside a yurt will result in a $500 fine.',
  },
  cancellation: {
    title: 'Cancellation Policy',
    body: 'Reservations cancelled 2 weeks or more before arrival receive a full refund. Deposits are forfeited for changes or cancellations within 2 weeks of your stay. Multi-yurt bookings require 2 weeks per yurt (e.g. 4 weeks for 2 yurts, 6 weeks for 3). Major holidays require 28 days notice for a full refund. Contact info@escalanteyurts.com for changes.',
  },
} as const;

export const FAQ_LINKS = [
  { label: 'FAQs', url: 'https://escalanteyurts.com/faqs/' },
  { label: 'Full policies', url: 'https://escalanteyurts.com/policies/' },
  { label: 'Plan your visit', url: 'https://escalanteyurts.com/plan-your-visit/' },
] as const;
