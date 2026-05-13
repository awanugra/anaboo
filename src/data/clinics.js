// Service types: clinic, hotel, grooming
export const SERVICE_TYPES = {
  clinic:   { label: 'Clinic',   emoji: '🏥', color: '#FF8A65', bg: '#FBE9E7' },
  hotel:    { label: 'Hotel',    emoji: '🏨', color: '#7C4DFF', bg: '#EDE7F6' },
  grooming: { label: 'Grooming', emoji: '✂️', color: '#26C6DA', bg: '#E0F7FA' },
}

export const SERVICE_FILTERS = [
  { key: 'all',      label: 'All',      emoji: '📍' },
  { key: 'clinic',   label: 'Clinic',   emoji: '🏥' },
  { key: 'hotel',    label: 'Hotel',    emoji: '🏨' },
  { key: 'grooming', label: 'Grooming', emoji: '✂️' },
]

export const SERVICES = [
  {
    id: 's1',
    type: 'clinic',
    name: 'Happy Paws Clinic',
    address: 'Jl. Kemang Raya No. 12, Jakarta Selatan',
    distance: 1.2,
    rating: 4.8,
    open24: true,
    phone: '021-1234567',
    hours: '08:00 – 20:00',
    coords: [-6.2088, 106.8456],
  },
  {
    id: 's2',
    type: 'hotel',
    name: 'Pet Hotel Sunshine',
    address: 'Jl. Senopati No. 45, Jakarta Selatan',
    distance: 2.5,
    rating: 4.5,
    open24: true,
    phone: '021-7654321',
    hours: '24 Hours',
    coords: [-6.2146, 106.8451],
  },
  {
    id: 's3',
    type: 'grooming',
    name: 'Grooming Master',
    address: 'Jl. Wijaya I No. 8, Jakarta Selatan',
    distance: 1.7,
    rating: 4.9,
    open24: false,
    phone: '021-9988776',
    hours: '09:00 – 18:00',
    coords: [-6.2023, 106.8521],
  },
  {
    id: 's4',
    type: 'clinic',
    name: 'Puskeswan DKI Jakarta',
    address: 'Jl. Harsono RM No. 3, Ragunan',
    distance: 3.8,
    rating: 4.5,
    open24: false,
    phone: '021-7800789',
    hours: '08:00 – 17:00',
    coords: [-6.3027, 106.8163],
  },
  {
    id: 's5',
    type: 'clinic',
    name: 'Animal Clinic Pondok Indah',
    address: 'Jl. Metro Pondok Indah',
    distance: 4.2,
    rating: 4.9,
    open24: true,
    phone: '021-7506321',
    hours: '24 Hours',
    coords: [-6.2657, 106.7838],
  },
  {
    id: 's6',
    type: 'grooming',
    name: 'Pawfect Grooming Salon',
    address: 'Jl. Gandaria 5',
    distance: 3.0,
    rating: 4.7,
    open24: false,
    phone: '021-7654000',
    hours: '10:00 – 19:00',
    coords: [-6.2436, 106.7995],
  },
]

// Backward compat — keep CLINICS export for any old imports
export const CLINICS = SERVICES.filter(s => s.type === 'clinic')
