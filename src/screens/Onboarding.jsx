import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import StatusBar from '../components/StatusBar'
import Icon from '../components/Icon'
import StepDots from '../components/StepDots'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { cn } from '../lib/utils'
import { SPECIES, SPECIES_BY_ID, GENDERS, FUR_COLORS, EYE_COLORS } from '../data/species'
import { compressImage } from '../lib/photo'
import { assessWeight } from '../lib/obesity'

const STEPS = 3

export default function Onboarding({ navigate, petData, savePet, addPet, mode = 'edit', firstTime = false }) {
  const { t, i18n: i18nInst } = useTranslation()
  const lang = i18nInst.language?.startsWith('en') ? 'en' : 'id'
  const isNew = mode === 'new' || firstTime

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  // Step 1
  const [species, setSpecies] = useState(petData?.species ?? '')
  const [name,    setName]    = useState(petData?.name    ?? '')

  // Step 2
  const [birthDate, setBirthDate] = useState(petData?.birthDate ?? '')
  const [gender,    setGender]    = useState(petData?.gender    ?? '')
  const [weight,    setWeight]    = useState(petData?.weight    ?? '')

  // Step 3
  const [breed,    setBreed]    = useState(petData?.breed    ?? '')
  const [furColor, setFurColor] = useState(petData?.furColor ?? '')
  const [eyeColor, setEyeColor] = useState(petData?.eyeColor ?? '')
  const [photo,    setPhoto]    = useState(petData?.photo    ?? null)
  const [illustration, setIllustration] = useState(petData?.illustration ?? null)
  const [generating, setGenerating]     = useState(false)
  const fileRef = useRef(null)

  const speciesObj = species ? SPECIES_BY_ID[species] : null
  const obesity    = weight && species ? assessWeight(species, weight) : null

  const canNext = (
    (step === 0 && species && name.trim()) ||
    (step === 1) ||
    (step === 2)
  )

  const handlePhoto = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const data = await compressImage(file)
    setPhoto(data)
    setIllustration(null) // clear old illustration since photo changed
    autoGenerate(data)    // auto-trigger mascot generation
  }

  // Auto-generate mascot from photo. On any error, silently fall back to photo.
  const autoGenerate = async (photoData) => {
    if (!photoData) return
    setGenerating(true)
    try {
      const res = await fetch('/api/illustrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photo: photoData, species, breed, furColor, eyeColor }),
      })
      if (res.ok) {
        const { url } = await res.json()
        if (url) setIllustration(url)
      }
      // Else: silently keep photo as the avatar
    } catch {
      // network error → silently keep photo
    } finally {
      setGenerating(false)
    }
  }

  const handleFinish = () => {
    if (submitting || !name.trim() || !species) return
    setSubmitting(true)
    const data = { species, breed, name: name.trim(), birthDate, gender, weight, photo, furColor, eyeColor, illustration }
    if (isNew) addPet(data)
    else savePet(data)
    navigate('dashboard')
  }

  const handleNext = () => {
    if (step < STEPS - 1) setStep(s => s + 1)
    else handleFinish()
  }

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1)
    else if (!firstTime) navigate('dashboard')
  }

  return (
    <div className="flex flex-col min-h-[760px] bg-white overflow-hidden">
      <StatusBar
        title=""
        onBack={firstTime && step === 0 ? undefined : handleBack}
      />

      <div className="flex-1 px-6 pt-2 pb-4 flex flex-col overflow-y-auto scrollbar-thin">
        {step === 0 && (
          <div className="flex flex-col gap-5 animate-fadeUp">
            <div className="text-center">
              <h1 className="text-h1 font-display text-brand-blue tracking-tight">{t('onboarding.step1Title')}</h1>
              <p className="text-[14px] font-semibold text-slate-500 mt-1">{t('onboarding.step1Subtitle')}</p>
            </div>

            {/* Species 3x2 grid */}
            <div className="grid grid-cols-3 gap-3">
              {SPECIES.map(s => {
                const selected = species === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => setSpecies(s.id)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200',
                      selected ? 'border-2 border-dashed border-brand-blue scale-[1.03]' : 'border-2 border-transparent active:scale-95'
                    )}
                  >
                    <div className={cn(
                      'w-full aspect-square rounded-2xl flex items-center justify-center',
                      s.tint
                    )}>
                      <span className="text-[40px]">{s.emoji}</span>
                    </div>
                    <span className="text-[14px] font-extrabold text-slate-700">
                      {lang === 'en' ? s.labelEn : s.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="border-t border-slate-100 pt-4">
              <label className="text-[14px] font-extrabold text-slate-700">{t('onboarding.nameLabel')}</label>
              <Input
                type="text"
                placeholder={t('onboarding.namePlaceholder')}
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-2 rounded-2xl"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5 animate-fadeUp">
            <div className="text-center">
              <h1 className="text-h1 font-display text-brand-blue tracking-tight">{t('onboarding.step2Title')}</h1>
              <p className="text-[14px] font-semibold text-slate-500 mt-1">{t('onboarding.step2Subtitle')}</p>
            </div>

            {/* Selected pet preview */}
            {speciesObj && (
              <div className={cn('rounded-2xl flex items-center gap-3 p-4', speciesObj.tint)}>
                <span className="text-[40px]">{speciesObj.emoji}</span>
                <div>
                  <p className="font-display text-[16px] font-extrabold text-slate-700">{name}</p>
                  <p className="text-[12px] font-semibold text-slate-500">
                    {lang === 'en' ? speciesObj.labelEn : speciesObj.label}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-slate-500">{t('onboarding.birthDate')} {t('common.optional')}</label>
              <Input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} className="rounded-2xl" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-slate-500">{t('onboarding.gender')} {t('common.optional')}</label>
              <div className="flex gap-2">
                {GENDERS.map(g => {
                  const selected = gender === g.id
                  return (
                    <button
                      key={g.id}
                      onClick={() => setGender(selected ? '' : g.id)}
                      className={cn(
                        'flex-1 py-3 rounded-2xl border text-[14px] font-bold transition-all flex items-center justify-center gap-1.5',
                        selected ? 'bg-brand-orange border-brand-orange text-white' : 'bg-white border-slate-200 text-slate-700'
                      )}
                    >
                      <span>{g.emoji}</span>
                      {lang === 'en' ? g.labelEn : g.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-slate-500">{t('onboarding.weight')} {t('common.optional')}</label>
              <Input
                type="number"
                step="0.1"
                placeholder={t('onboarding.weightPlaceholder')}
                value={weight}
                onChange={e => setWeight(e.target.value)}
                className="rounded-2xl"
              />
              {obesity && obesity.status !== 'unknown' && (
                <div className={cn(
                  'flex items-start gap-2 rounded-xl p-2.5 mt-1 animate-fadeUp',
                  obesity.color === 'green'  && 'bg-brand-green-lt',
                  obesity.color === 'yellow' && 'bg-brand-yellow-lt',
                  obesity.color === 'red'    && 'bg-brand-red-lt',
                )}>
                  <Icon name="info" size={14} className="shrink-0 mt-0.5" />
                  <p className="text-[12px] font-semibold text-slate-700 leading-snug">
                    <strong>{obesity.label}.</strong> {obesity.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5 animate-fadeUp">
            <div className="text-center">
              <h1 className="text-h1 font-display text-brand-blue tracking-tight">{t('onboarding.step3Title')}</h1>
              <p className="text-[14px] font-semibold text-slate-500 mt-1">{t('onboarding.step3Subtitle')}</p>
            </div>

            {/* Breed dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-extrabold text-slate-700">{t('onboarding.breed')}</label>
              <div className="relative">
                <select
                  value={breed}
                  onChange={e => setBreed(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 rounded-2xl py-3 px-4 pr-10 text-[14px] font-semibold text-slate-700 focus:outline-none focus:border-brand-blue"
                >
                  <option value="">{t('onboarding.breedSelect')}</option>
                  {speciesObj?.breeds.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▼</span>
              </div>
            </div>

            {/* Fur color swatches */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-extrabold text-slate-700">{t('onboarding.furColor')}</label>
              <div className="flex gap-2.5 flex-wrap">
                {FUR_COLORS.map(c => {
                  const selected = furColor === c.id
                  return (
                    <button
                      key={c.id}
                      onClick={() => setFurColor(selected ? '' : c.id)}
                      className={cn(
                        'w-11 h-11 rounded-xl transition-all',
                        selected ? 'ring-2 ring-offset-2 ring-brand-blue ring-dashed scale-110' : 'border border-slate-200'
                      )}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    />
                  )
                })}
              </div>
            </div>

            {/* Eye color swatches */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-extrabold text-slate-700">{t('onboarding.eyeColor')}</label>
              <div className="flex gap-2.5 flex-wrap">
                {EYE_COLORS.map(c => {
                  const selected = eyeColor === c.id
                  return (
                    <button
                      key={c.id}
                      onClick={() => setEyeColor(selected ? '' : c.id)}
                      className={cn(
                        'w-11 h-11 rounded-xl transition-all',
                        selected ? 'ring-2 ring-offset-2 ring-brand-blue scale-110' : 'border border-slate-200'
                      )}
                      style={{ backgroundColor: c.hex }}
                      title={c.label}
                    />
                  )
                })}
              </div>
            </div>

            {/* Photo upload + mascot preview (auto-generated) */}
            <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center gap-3">
              <div className={cn(
                'relative w-32 h-32 rounded-2xl flex items-center justify-center overflow-hidden',
                speciesObj?.tint || 'bg-slate-100'
              )}>
                {/* Always show photo if available; overlay loading or replace with illustration */}
                {illustration ? (
                  <img src={illustration} alt="" className="w-full h-full object-cover" />
                ) : photo ? (
                  <img src={photo} alt="" className={cn('w-full h-full object-cover', generating && 'opacity-60')} />
                ) : (
                  <span className="text-[64px]">{speciesObj?.emoji ?? '🐾'}</span>
                )}

                {/* Loading overlay when generating */}
                {generating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/30 backdrop-blur-sm">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-bold text-white">Generating mascot…</span>
                  </div>
                )}
              </div>

              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={generating}
                className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-[12px] font-extrabold text-slate-700 active:scale-95 transition-all disabled:opacity-50"
              >
                {photo ? t('onboarding.changePhoto') : t('onboarding.uploadPhoto')}
              </button>
              <p className="text-[11px] font-semibold text-slate-500 text-center leading-snug">
                {generating
                  ? 'Anaboo is drawing your pet…'
                  : illustration
                  ? '✨ Mascot ready! Tap photo button to change'
                  : photo
                  ? 'We\'ll auto-create a mascot illustration when you upload'
                  : 'Upload a photo to auto-create a mascot'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer with dots + CTA */}
      <div className="px-6 pt-3 pb-6 flex flex-col gap-3 border-t border-slate-100">
        <StepDots total={STEPS} current={step} />
        <Button onClick={handleNext} disabled={!canNext || submitting || generating}>
          {step < STEPS - 1
            ? t('common.next')
            : generating
            ? 'Drawing mascot…'
            : submitting
            ? t('onboarding.generating')
            : t('onboarding.finish')}
        </Button>
      </div>
    </div>
  )
}
