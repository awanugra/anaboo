/**
 * vaccines.js
 * Data vaksin kucing di Indonesia
 * Sumber: IAMS Indonesia, Purina, Alodokter, KlikDokter
 */

const VACCINES = [
  {
    id: 'tricat',
    name: 'Tricat / F3',
    emoji: '🐾',
    type: 'core',        // core = wajib semua kucing
    ageWeeks: '8–10',
    priceRange: 'Rp80.000 – Rp250.000',
    protects: ['Panleukopenia (FPV)', 'Rhinotracheitis (FHV-1)', 'Calicivirus (FCV)'],
    description:
      'Vaksin pertama dan paling penting. Melindungi dari tiga virus mematikan yang sangat mudah menular antar kucing.',
    diseases: [
      {
        name: 'Panleukopenia',
        icon: '☠️',
        info: 'Tingkat kematian sangat tinggi pada anak kucing. Menyerang usus & sumsum tulang. Gejala: diare berdarah, lemas total, muntah.',
      },
      {
        name: 'Rhinotracheitis (FHV-1)',
        icon: '🫁',
        info: 'Infeksi saluran napas berat. Bisa kambuh berulang kali meski sudah pernah sembuh.',
      },
      {
        name: 'Calicivirus (FCV)',
        icon: '😷',
        info: 'Sariawan, demam, sulit makan. Mudah menular lewat udara di area dengan banyak kucing.',
      },
    ],
    booster: 'Diulang tiap 3–4 minggu hingga usia 16 minggu. Kucing outdoor: booster tiap tahun. Indoor: tiap 3 tahun.',
    zoonosis: false,
  },
  {
    id: 'tetracat',
    name: 'Tetracat / F4',
    emoji: '💊',
    type: 'core',
    ageWeeks: '12–14',
    priceRange: 'Rp170.000 – Rp210.000',
    protects: ['Panleukopenia', 'Rhinotracheitis', 'Calicivirus', 'Chlamydia'],
    description:
      'Sama seperti Tricat dengan tambahan perlindungan dari Chlamydia yang menyebabkan infeksi mata parah.',
    diseases: [
      {
        name: 'Chlamydia',
        icon: '👁️',
        info: 'Menyebabkan mata merah & bengkak parah, kelopak mata menutup sendiri, demam, dan radang paru-paru pada kasus berat.',
      },
    ],
    booster: 'Diberikan setelah Tricat pertama. Diulang sesuai jadwal dokter hewan.',
    zoonosis: false,
  },
  {
    id: 'rabies',
    name: 'Vaksin Rabies',
    emoji: '🦠',
    type: 'core',
    ageWeeks: '20',
    priceRange: '~Rp100.000',
    protects: ['Rabies'],
    description:
      'Wajib untuk semua kucing tanpa terkecuali. Rabies hampir selalu fatal dan tidak ada obatnya — hanya bisa dicegah.',
    diseases: [
      {
        name: 'Rabies',
        icon: '🧠',
        info: 'Menyerang sistem saraf pusat, menyebabkan agresif, air liur berlebihan, kejang, dan kelumpuhan. Hampir 100% fatal.',
      },
    ],
    booster: 'Booster setiap 1–3 tahun tergantung jenis vaksin. Konsultasikan dengan dokter hewan.',
    zoonosis: true,
    zoonosisNote:
      'Rabies adalah penyakit ZOONOSIS penting di Indonesia. Bisa menular ke manusia melalui gigitan atau cakaran kucing yang terinfeksi. Vaksinasi kucing = melindungi keluargamu juga!',
  },
  {
    id: 'felv',
    name: 'FeLV (Leukemia)',
    emoji: '🌡️',
    type: 'non-core',    // non-core = sesuai kebutuhan/gaya hidup
    ageWeeks: 'Setelah 9 minggu',
    priceRange: 'Rp100.000 – Rp200.000',
    protects: ['Feline Leukemia Virus (FeLV)'],
    description:
      'Direkomendasikan terutama untuk kucing outdoor atau yang sering kontak dengan kucing lain. FeLV menular lewat air liur dan grooming bersama.',
    diseases: [
      {
        name: 'Feline Leukemia Virus',
        icon: '🩸',
        info: 'Menyebabkan anemia, limfoma (kanker), dan penurunan sistem imun secara permanen. Bisa menular lewat berbagi tempat makan.',
      },
    ],
    booster: '2 dosis awal (jarak 3–4 minggu), kemudian booster setiap tahun.',
    zoonosis: false,
  },
];

/**
 * Jadwal vaksin standar Indonesia
 */
const VACCINE_SCHEDULE = [
  { week: '8–10',  vaccineId: 'tricat',   label: 'Tricat Tahap 1',   required: true },
  { week: '12–14', vaccineId: 'tetracat', label: 'Tetracat Tahap 2', required: true },
  { week: '20',    vaccineId: 'rabies',   label: 'Vaksin Rabies',    required: true },
  { week: '52+',   vaccineId: 'tricat',   label: 'Booster Tahunan',  required: false, note: 'Setiap 1–3 tahun' },
];

/**
 * Tips penting vaksin
 */
const VACCINE_TIPS = [
  { icon: '🌡️', title: 'Cek suhu dulu',   desc: 'Pastikan suhu tubuh normal (38–39,5°C) sebelum vaksin.' },
  { icon: '🏥', title: 'Konsultasi dokter', desc: 'Dokter hewan akan menyesuaikan jadwal sesuai kondisi kucing.' },
  { icon: '💰', title: 'Ada yang gratis',  desc: 'Puskeswan (pemerintah) kadang menyediakan vaksin gratis di momen tertentu.' },
  { icon: '🏠', title: 'Indoor tetap perlu', desc: 'Kucing indoor wajib vaksin inti — virus bisa masuk lewat udara.' },
];

// Export untuk digunakan modul lain
if (typeof module !== 'undefined') {
  module.exports = { VACCINES, VACCINE_SCHEDULE, VACCINE_TIPS };
}
