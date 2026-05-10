// Species + breed catalog (extended: kucing, anjing, burung, kelinci, reptil, ikan)
export const SPECIES = [
  {
    id: 'dog',
    label: 'Anjing',
    labelEn: 'Dog',
    emoji: '🐶',
    icon: 'paw',
    tint: 'bg-pet-blue',
    accent: '#93C5FD',
    breeds: ['Mix / Kampung', 'Golden Retriever', 'Labrador', 'Pomeranian', 'Shih Tzu', 'Poodle', 'Chihuahua', 'Husky', 'Beagle', 'Pug', 'Bulldog'],
    idealWeight: { min: 5, max: 35 },
  },
  {
    id: 'cat',
    label: 'Kucing',
    labelEn: 'Cat',
    emoji: '🐱',
    icon: 'cat',
    tint: 'bg-pet-green',
    accent: '#86EFAC',
    breeds: ['Domestic / Mix', 'Persia', 'Anggora', 'British Shorthair', 'Maine Coon', 'Ragdoll', 'Scottish Fold', 'Sphynx', 'Siamese', 'Bengal'],
    idealWeight: { min: 3.5, max: 5.5 },
  },
  {
    id: 'bird',
    label: 'Burung',
    labelEn: 'Bird',
    emoji: '🐦',
    icon: 'paw',
    tint: 'bg-pet-purple',
    accent: '#C4B5FD',
    breeds: ['Lovebird', 'Kenari', 'Murai Batu', 'Kakak Tua', 'Parkit', 'Cucak Ijo', 'Perkutut', 'Kacer'],
    idealWeight: { min: 0.02, max: 1.5 },
  },
  {
    id: 'rabbit',
    label: 'Kelinci',
    labelEn: 'Rabbit',
    emoji: '🐰',
    icon: 'paw',
    tint: 'bg-pet-pink',
    accent: '#FBCFE8',
    breeds: ['Lokal', 'Holland Lop', 'Netherland Dwarf', 'Anggora', 'Rex', 'Lionhead', 'Flemish Giant'],
    idealWeight: { min: 0.9, max: 6 },
  },
  {
    id: 'reptile',
    label: 'Reptil',
    labelEn: 'Reptile',
    emoji: '🦎',
    icon: 'paw',
    tint: 'bg-pet-yellow',
    accent: '#FDE68A',
    breeds: ['Gecko', 'Iguana', 'Bearded Dragon', 'Kura-kura', 'Ular Sanca', 'Bunglon'],
    idealWeight: { min: 0.05, max: 10 },
  },
  {
    id: 'fish',
    label: 'Ikan',
    labelEn: 'Fish',
    emoji: '🐟',
    icon: 'paw',
    tint: 'bg-pet-cyan',
    accent: '#A5F3FC',
    breeds: ['Cupang', 'Koi', 'Mas Koki', 'Arwana', 'Discus', 'Guppy', 'Molly', 'Manfish'],
    idealWeight: { min: 0.001, max: 5 },
  },
]

export const SPECIES_BY_ID = Object.fromEntries(SPECIES.map(s => [s.id, s]))

export const GENDERS = [
  { id: 'male',   label: 'Jantan', labelEn: 'Male',   emoji: '♂️' },
  { id: 'female', label: 'Betina', labelEn: 'Female', emoji: '♀️' },
]

export const FUR_COLORS = [
  { id: 'brown',  hex: '#C28860', label: 'Coklat' },
  { id: 'black',  hex: '#1F1F1F', label: 'Hitam'  },
  { id: 'cream',  hex: '#F4E4D0', label: 'Krem'   },
  { id: 'gold',   hex: '#E4B768', label: 'Emas'   },
  { id: 'white',  hex: '#FAFAFA', label: 'Putih'  },
  { id: 'gray',   hex: '#9CA3AF', label: 'Abu'    },
  { id: 'orange', hex: '#FB923C', label: 'Oranye' },
]

export const EYE_COLORS = [
  { id: 'black',  hex: '#1F1F1F', label: 'Hitam' },
  { id: 'amber',  hex: '#B45309', label: 'Amber' },
  { id: 'blue',   hex: '#93C5FD', label: 'Biru'  },
  { id: 'olive',  hex: '#65A30D', label: 'Olive' },
  { id: 'green',  hex: '#16A34A', label: 'Hijau' },
  { id: 'gray',   hex: '#94A3B8', label: 'Abu'   },
]
