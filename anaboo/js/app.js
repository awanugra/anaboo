/**
 * ANABOO – Main Application Logic
 * Cat Vaccine Companion for Indonesia
 */

/* ─────────────────────────────────
   NAVIGATION
───────────────────────────────── */

/**
 * Switch between screens.
 * @param {string} screenId - The ID of the screen to show.
 * @param {HTMLElement} tabEl - The tab button to mark as active.
 */
function showScreen(screenId, tabEl) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  // Show target screen
  document.getElementById(screenId).classList.add('active');
  // Update tab bar
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (tabEl) tabEl.classList.add('active');
}

/* ─────────────────────────────────
   ONBOARDING INTERACTIONS
───────────────────────────────── */

/**
 * Select a lifestyle toggle button (Indoor / Outdoor / Both).
 * @param {HTMLElement} btn - The clicked toggle button.
 */
function selectToggle(btn) {
  btn.closest('.toggle-group')
     .querySelectorAll('.toggle-btn')
     .forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

/* ─────────────────────────────────
   ADD VACCINE – VACCINE PICKER
───────────────────────────────── */

/**
 * Select a vaccine type in the Add Vaccine screen.
 * Expands the edu info for the selected vaccine.
 * @param {HTMLElement} el - The clicked vaccine picker item.
 */
function selectVaccine(el) {
  el.closest('.vaccine-picker')
    .querySelectorAll('.vp-item')
    .forEach(v => v.classList.remove('selected'));
  el.classList.add('selected');
}

/* ─────────────────────────────────
   TIMELINE – EXPANDABLE EDU BOXES
───────────────────────────────── */

/**
 * Toggle the expandable education info box inside a vaccine milestone card.
 * @param {HTMLElement} trigger - The clicked trigger button.
 */
function toggleEdu(trigger) {
  const box    = trigger.nextElementSibling;
  const isOpen = box.classList.contains('open');
  trigger.classList.toggle('open', !isOpen);
  box.classList.toggle('open', !isOpen);
}

/* ─────────────────────────────────
   VACCINE DATA (static mock)
   Replace with real API calls in production
───────────────────────────────── */

const VACCINES = [
  {
    id: 'tricat',
    name: 'Tricat / F3',
    alias: 'Vaksin Inti Tahap 1',
    ageWeeks: '8–10',
    priceRange: 'Rp80.000 – Rp250.000',
    protects: ['Panleukopenia', 'Rhinotracheitis (FHV-1)', 'Calicivirus (FCV)'],
    isCore: true,
    isZoonosis: false,
    intervalMonths: 12,
  },
  {
    id: 'tetracat',
    name: 'Tetracat / F4',
    alias: 'Vaksin Inti Tahap 2',
    ageWeeks: '12–14',
    priceRange: 'Rp170.000 – Rp210.000',
    protects: ['Panleukopenia', 'Rhinotracheitis (FHV-1)', 'Calicivirus (FCV)', 'Chlamydia'],
    isCore: true,
    isZoonosis: false,
    intervalMonths: 12,
  },
  {
    id: 'rabies',
    name: 'Vaksin Rabies',
    alias: 'Wajib – Zoonosis',
    ageWeeks: '20',
    priceRange: '~Rp100.000',
    protects: ['Rabies'],
    isCore: true,
    isZoonosis: true,
    intervalMonths: 12,
  },
  {
    id: 'felv',
    name: 'FeLV (Leukemia)',
    alias: 'Non-inti – Terutama outdoor',
    ageWeeks: null,
    priceRange: 'Rp100.000 – Rp200.000',
    protects: ['Feline Leukemia Virus'],
    isCore: false,
    isZoonosis: false,
    intervalMonths: 12,
  },
];

/**
 * Get vaccine data by ID.
 * @param {string} id - Vaccine ID.
 * @returns {Object|undefined}
 */
function getVaccineById(id) {
  return VACCINES.find(v => v.id === id);
}

/* ─────────────────────────────────
   INIT
───────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🐾 Anaboo loaded! Luna is ready.');
  // Future: load saved pet data from localStorage or API here
});
