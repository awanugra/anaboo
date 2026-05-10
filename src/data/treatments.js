// Recurring treatments: dewormer, flea, vaccines (per species)
// intervalDays = how often to repeat

export const TREATMENT_TYPES = {
  vaccine:  { id: 'vaccine',  label: 'Vaksin',       icon: 'shield',      color: 'blue'   },
  deworm:   { id: 'deworm',   label: 'Obat Cacing',  icon: 'pill',        color: 'orange' },
  flea:     { id: 'flea',     label: 'Obat Kutu',    icon: 'health-care', color: 'yellow' },
  vitamin:  { id: 'vitamin',  label: 'Vitamin',      icon: 'heart',       color: 'green'  },
}

// Default schedules per species
export const DEFAULT_SCHEDULES = {
  cat: [
    { type: 'vaccine', name: 'Tricat / F3',          ageWeeks: '8–10',   intervalDays: 365 },
    { type: 'vaccine', name: 'Tetracat / F4',        ageWeeks: '12–14',  intervalDays: 365 },
    { type: 'vaccine', name: 'Vaksin Rabies',        ageWeeks: '20',     intervalDays: 365 },
    { type: 'deworm',  name: 'Obat Cacing',          ageWeeks: '4',      intervalDays: 90  },
    { type: 'flea',    name: 'Obat Kutu',            ageWeeks: '8',      intervalDays: 30  },
  ],
  dog: [
    { type: 'vaccine', name: 'DHPPi (Vaksin Inti)',  ageWeeks: '6–8',    intervalDays: 365 },
    { type: 'vaccine', name: 'Lepto + Corona',       ageWeeks: '10–12',  intervalDays: 365 },
    { type: 'vaccine', name: 'Vaksin Rabies',        ageWeeks: '12–16',  intervalDays: 365 },
    { type: 'deworm',  name: 'Obat Cacing',          ageWeeks: '2',      intervalDays: 90  },
    { type: 'flea',    name: 'Obat Kutu',            ageWeeks: '8',      intervalDays: 30  },
  ],
  bird: [
    { type: 'vaccine', name: 'Vaksin ND',            ageWeeks: '4',      intervalDays: 180 },
    { type: 'deworm',  name: 'Obat Cacing',          ageWeeks: '6',      intervalDays: 90  },
  ],
  rabbit: [
    { type: 'vaccine', name: 'Vaksin RHD',           ageWeeks: '10',     intervalDays: 365 },
    { type: 'vaccine', name: 'Vaksin Myxomatosis',   ageWeeks: '12',     intervalDays: 365 },
    { type: 'deworm',  name: 'Obat Cacing',          ageWeeks: '8',      intervalDays: 90  },
    { type: 'flea',    name: 'Obat Kutu',            ageWeeks: '12',     intervalDays: 60  },
  ],
  reptile: [
    { type: 'deworm',  name: 'Obat Parasit',         ageWeeks: '12',     intervalDays: 180 },
  ],
  fish: [
    { type: 'vaccine', name: 'Vitamin Anti-Stress',  ageWeeks: '4',      intervalDays: 30  },
  ],
}

// Education snippets
export const TREATMENT_EDU = {
  vaccine: 'Vaksin ngebantu sistem imun anabul siap lawan virus berbahaya. Booster tahunan = perlindungan ekstra 🛡️',
  deworm:  'Cacingan bisa bikin anabul kurus & lemes. Pemberian rutin tiap 3 bulan ngejaga kesehatannya 💊',
  flea:    'Kutu nggak cuma bikin gatal, tapi juga bisa bawa cacing pita. Cek bulu rutin & kasih obat kutu bulanan 🪲',
  vitamin: 'Vitamin harian bantu daya tahan tubuh, bulu lebih sehat, dan mood lebih ceria ✨',
}
