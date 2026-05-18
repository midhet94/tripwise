export type Stay = {
  id: string;
  name: string;
  location: string;
  price: string;
  nights: number;
  rating: number;
  tag: string;
  emoji: string;
};

export type Experience = {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  emoji: string;
  category: string;
};

export type Deal = {
  id: string;
  title: string;
  description: string;
  saving: string;
  expires: string;
  emoji: string;
};

export type FamilyMember = {
  id: string;
  name: string;
  relation: string;
  age: number;
  emoji: string;
};

export const STAYS: Stay[] = [
  {
    id: 's1',
    name: 'Oberoi Amarvilas',
    location: 'Agra, India',
    price: '₹85,000',
    nights: 2,
    rating: 4.9,
    tag: 'Iconic',
    emoji: '🏰',
  },
  {
    id: 's2',
    name: 'Aman New Delhi',
    location: 'New Delhi, India',
    price: '₹1,20,000',
    nights: 3,
    rating: 5.0,
    tag: 'Editor\'s Pick',
    emoji: '🌿',
  },
  {
    id: 's3',
    name: 'Taj Lake Palace',
    location: 'Udaipur, India',
    price: '₹65,000',
    nights: 2,
    rating: 4.8,
    tag: 'Romantic',
    emoji: '🌊',
  },
  {
    id: 's4',
    name: 'Six Senses Vana',
    location: 'Dehradun, India',
    price: '₹95,000',
    nights: 4,
    rating: 4.9,
    tag: 'Wellness',
    emoji: '🧘',
  },
  {
    id: 's5',
    name: 'Sujan Jawai',
    location: 'Rajasthan, India',
    price: '₹1,10,000',
    nights: 3,
    rating: 4.9,
    tag: 'Wildlife',
    emoji: '🦁',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    title: 'Private Taj Mahal Sunrise',
    location: 'Agra',
    duration: '3 hrs',
    price: '₹18,000',
    emoji: '🌅',
    category: 'Cultural',
  },
  {
    id: 'e2',
    title: 'Helicopter Tiger Safari',
    location: 'Ranthambore',
    duration: 'Full day',
    price: '₹45,000',
    emoji: '🚁',
    category: 'Adventure',
  },
  {
    id: 'e3',
    title: 'Chef\'s Table at ITC',
    location: 'Mumbai',
    duration: '4 hrs',
    price: '₹22,000',
    emoji: '🍽️',
    category: 'Dining',
  },
  {
    id: 'e4',
    title: 'Ayurvedic Panchakarma',
    location: 'Kerala',
    duration: '7 days',
    price: '₹75,000',
    emoji: '🌿',
    category: 'Wellness',
  },
  {
    id: 'e5',
    title: 'Private Yacht — Lakshadweep',
    location: 'Lakshadweep',
    duration: '5 days',
    price: '₹2,50,000',
    emoji: '⛵',
    category: 'Sea',
  },
];

export const DEALS: Deal[] = [
  {
    id: 'd1',
    title: 'Maldives Winter Escape',
    description: 'Overwater villa + seaplane transfer + spa credit',
    saving: '₹40,000 saved',
    expires: '31 May',
    emoji: '🌴',
  },
  {
    id: 'd2',
    title: 'Rajasthan Heritage Circuit',
    description: '7 nights across 3 palaces — curated by Tripwise',
    saving: '₹65,000 saved',
    expires: '15 Jun',
    emoji: '🏯',
  },
  {
    id: 'd3',
    title: 'Japan Cherry Blossom',
    description: 'Tokyo + Kyoto, Ritz-Carlton properties, private guide',
    saving: '₹1,20,000 saved',
    expires: '28 Feb',
    emoji: '🌸',
  },
];

export const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'f1',
    name: 'Priya',
    relation: 'Spouse',
    age: 34,
    emoji: '👩',
  },
  {
    id: 'f2',
    name: 'Arjun',
    relation: 'Son',
    age: 8,
    emoji: '👦',
  },
  {
    id: 'f3',
    name: 'Meera',
    relation: 'Daughter',
    age: 5,
    emoji: '👧',
  },
];

export const TRAVEL_PURPOSES = [
  'Leisure & Relaxation',
  'Anniversary / Romance',
  'Family Holiday',
  'Honeymoon',
  'Adventure',
  'Wellness Retreat',
  'Cultural Immersion',
  'Business + Leisure',
];

export const DESTINATIONS = [
  'Maldives',
  'Rajasthan, India',
  'Kerala, India',
  'Bali, Indonesia',
  'Tokyo, Japan',
  'Amalfi Coast, Italy',
  'Santorini, Greece',
  'Swiss Alps',
  'Patagonia',
  'Safari — Kenya',
];

export const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Jain',
  'Halal',
  'Gluten-Free',
  'No Restrictions',
];

export const ACCESSIBILITY_OPTIONS = [
  'Wheelchair Access',
  'No Stairs',
  'Medical Equipment',
  'Visual Impairment Support',
  'Hearing Impairment Support',
  'None Required',
];

export const TRAVEL_STYLE_OPTIONS = [
  'Ultra-Luxury',
  'Boutique & Intimate',
  'Adventure & Active',
  'Wellness-Focused',
  'Cultural Immersion',
  'Beach & Islands',
  'City & Gastronomy',
  'Wildlife & Nature',
];

export const PAST_ITINERARIES = [
  {
    id: 'i1',
    destination: 'Maldives',
    dates: 'Jan 12–19, 2026',
    status: 'completed',
    emoji: '🌴',
    hotel: 'One & Only Reethi Rah',
  },
  {
    id: 'i2',
    destination: 'Udaipur, India',
    dates: 'Mar 3–6, 2026',
    status: 'completed',
    emoji: '🏯',
    hotel: 'Taj Lake Palace',
  },
];

export const ONGOING_ITINERARIES = [
  {
    id: 'i3',
    destination: 'Bali, Indonesia',
    dates: 'May 25 – Jun 1, 2026',
    status: 'upcoming',
    emoji: '🌺',
    hotel: 'Four Seasons Jimbaran Bay',
  },
];
