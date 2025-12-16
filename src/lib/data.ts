export interface Animal {
  id: string;
  name: string;
  species: string;
  category: string;
  age: number;
  gender: 'Male' | 'Female';
  habitat: string;
  diet: string;
  description: string;
  image: string;
  conservationStatus: 'Least Concern' | 'Near Threatened' | 'Vulnerable' | 'Endangered' | 'Critically Endangered';
  funFact: string;
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  priceIndian: number;
  priceForeigner: number;
  features: string[];
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  ticketType: string;
  nationality: 'Indian' | 'Foreigner';
  visitDate: string;
  adults: number;
  children: number;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}

export const animals: Animal[] = [
  {
    id: '1',
    name: 'Raja',
    species: 'Bengal Tiger',
    category: 'Big Cats',
    age: 8,
    gender: 'Male',
    habitat: 'Tiger Enclosure - Zone A',
    diet: 'Carnivore - 10kg meat daily',
    description: 'Raja is our majestic Bengal tiger, known for his striking orange coat with black stripes. He is one of the most popular attractions at the zoo.',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800',
    conservationStatus: 'Endangered',
    funFact: 'Bengal tigers can leap up to 30 feet in a single bound!'
  },
  {
    id: '2',
    name: 'Ganesha',
    species: 'Asian Elephant',
    category: 'Mammals',
    age: 25,
    gender: 'Male',
    habitat: 'Elephant Sanctuary - Zone B',
    diet: 'Herbivore - 150kg vegetation daily',
    description: 'Ganesha is our gentle giant Asian elephant. He loves interacting with visitors and is known for his playful nature during feeding times.',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800',
    conservationStatus: 'Endangered',
    funFact: 'Asian elephants can recognize themselves in mirrors!'
  },
  {
    id: '3',
    name: 'Luna',
    species: 'Indian Peacock',
    category: 'Birds',
    age: 4,
    gender: 'Male',
    habitat: 'Aviary - Zone C',
    diet: 'Omnivore - Seeds, insects, small reptiles',
    description: 'Luna displays the most magnificent plumage during mating season. His iridescent blue and green feathers are a sight to behold.',
    image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800',
    conservationStatus: 'Least Concern',
    funFact: 'A peacock\'s tail feathers can span up to 5 feet!'
  },
  {
    id: '4',
    name: 'Kali',
    species: 'Indian Cobra',
    category: 'Reptiles',
    age: 6,
    gender: 'Female',
    habitat: 'Reptile House - Zone D',
    diet: 'Carnivore - Rodents, frogs',
    description: 'Kali is a stunning spectacled cobra with the characteristic hood markings. She is safely housed in our state-of-the-art reptile facility.',
    image: 'https://images.unsplash.com/photo-1531386151447-fd76ad50012f?w=800',
    conservationStatus: 'Least Concern',
    funFact: 'Cobras can live for over 20 years in captivity!'
  },
  {
    id: '5',
    name: 'Simba',
    species: 'Asiatic Lion',
    category: 'Big Cats',
    age: 10,
    gender: 'Male',
    habitat: 'Lion Pride Area - Zone A',
    diet: 'Carnivore - 8kg meat daily',
    description: 'Simba leads our pride of Asiatic lions. His magnificent mane and powerful roar make him an unforgettable sight.',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800',
    conservationStatus: 'Endangered',
    funFact: 'Asiatic lions are found only in the Gir Forest of Gujarat, India!'
  },
  {
    id: '6',
    name: 'Hathi',
    species: 'One-Horned Rhinoceros',
    category: 'Mammals',
    age: 15,
    gender: 'Female',
    habitat: 'Rhino Reserve - Zone B',
    diet: 'Herbivore - Grass, leaves, fruits',
    description: 'Hathi is our beloved Indian rhinoceros with her distinctive single horn and armor-like skin folds.',
    image: 'https://images.unsplash.com/photo-1598894000329-5e30a9a73280?w=800',
    conservationStatus: 'Vulnerable',
    funFact: 'Indian rhinos are excellent swimmers and can run up to 35 mph!'
  }
];

export const ticketTypes: TicketType[] = [
  {
    id: 'basic',
    name: 'Basic Entry',
    description: 'Standard zoo admission with access to all animal exhibits',
    priceIndian: 100,
    priceForeigner: 500,
    features: [
      'Access to all animal exhibits',
      'Zoo map and guide',
      'Children\'s play area access',
      'Valid for one day'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Safari',
    description: 'Enhanced experience with safari ride and feeding sessions',
    priceIndian: 300,
    priceForeigner: 1200,
    features: [
      'All Basic Entry features',
      'Safari bus ride',
      'Elephant feeding session',
      'Priority entry',
      'Complimentary refreshments'
    ]
  },
  {
    id: 'vip',
    name: 'VIP Experience',
    description: 'Ultimate zoo experience with private guide and behind-the-scenes access',
    priceIndian: 800,
    priceForeigner: 3000,
    features: [
      'All Premium Safari features',
      'Private guided tour',
      'Behind-the-scenes access',
      'Meet the keepers session',
      'Exclusive photography opportunities',
      'Gourmet lunch included'
    ]
  }
];

export const sampleBookings: Booking[] = [
  {
    id: 'B001',
    userId: 'U001',
    userName: 'Rahul Sharma',
    userEmail: 'rahul@example.com',
    ticketType: 'Premium Safari',
    nationality: 'Indian',
    visitDate: '2024-01-15',
    adults: 2,
    children: 1,
    totalAmount: 900,
    status: 'Confirmed',
    createdAt: '2024-01-10'
  },
  {
    id: 'B002',
    userId: 'U002',
    userName: 'John Smith',
    userEmail: 'john@example.com',
    ticketType: 'VIP Experience',
    nationality: 'Foreigner',
    visitDate: '2024-01-18',
    adults: 2,
    children: 0,
    totalAmount: 6000,
    status: 'Pending',
    createdAt: '2024-01-12'
  },
  {
    id: 'B003',
    userId: 'U003',
    userName: 'Priya Patel',
    userEmail: 'priya@example.com',
    ticketType: 'Basic Entry',
    nationality: 'Indian',
    visitDate: '2024-01-20',
    adults: 4,
    children: 2,
    totalAmount: 500,
    status: 'Confirmed',
    createdAt: '2024-01-14'
  }
];
