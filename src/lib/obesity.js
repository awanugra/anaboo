import { SPECIES_BY_ID } from '../data/species'

// Returns: { status: 'ideal' | 'kurus' | 'obesitas' | 'unknown', label, color, message }
export function assessWeight(speciesId, weightKg) {
  const species = SPECIES_BY_ID[speciesId]
  if (!species || !weightKg) {
    return { status: 'unknown', label: '–', color: 'slate', message: 'Belum ada data berat badan.' }
  }
  const w = parseFloat(weightKg)
  const { min, max } = species.idealWeight

  if (w < min) {
    return {
      status:  'kurus',
      label:   'Agak kurus',
      color:   'yellow',
      message: `Berat ideal ${species.label.toLowerCase()} dewasa: ${min}–${max} kg. Yuk konsultasi dokter buat pola makan yang pas.`,
    }
  }
  if (w > max) {
    return {
      status:  'obesitas',
      label:   'Obesitas',
      color:   'red',
      message: `Di atas range ideal ${min}–${max} kg. Kurangi porsi & ajak main lebih aktif yuk!`,
    }
  }
  return {
    status:  'ideal',
    label:   'Ideal',
    color:   'green',
    message: `Mantap! Berat ${w} kg masih di range ideal (${min}–${max} kg).`,
  }
}
