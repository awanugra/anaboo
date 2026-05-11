import { useTranslation } from 'react-i18next'
import StatusBar from '../components/StatusBar'
import Icon from '../components/Icon'
import { cn } from '../lib/utils'
import useLocalStorage from '../hooks/useLocalStorage'

const APP_VERSION = '1.0.0'

function Section({ title, children }) {
  return (
    <div className="mb-2">
      <p className="text-[12px] font-extrabold text-slate-500 uppercase tracking-[0.5px] px-5 pt-5 pb-2">{title}</p>
      <div className="mx-4 rounded-2xl overflow-hidden bg-white border border-slate-100">
        {children}
      </div>
    </div>
  )
}

function Row({ icon, label, right, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-slate-50 transition-colors border-t border-slate-100 first:border-t-0"
    >
      {icon && (
        <div className="w-9 h-9 rounded-xl bg-brand-orange-lt flex items-center justify-center shrink-0">
          <Icon name={icon} size={18} tone={danger ? 'orange' : 'default'} />
        </div>
      )}
      <span className={cn('flex-1 text-[14px] font-bold', danger ? 'text-brand-red' : 'text-slate-700')}>{label}</span>
      {right ?? <Icon name="back" size={14} className="rotate-180 opacity-40" />}
    </button>
  )
}

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(!on) }}
      className={cn(
        'w-11 h-6 rounded-full transition-colors relative shrink-0',
        on ? 'bg-brand-blue' : 'bg-slate-200'
      )}
    >
      <span className={cn(
        'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-card transition-transform',
        on ? 'translate-x-[22px]' : 'translate-x-0.5'
      )} />
    </button>
  )
}

export default function Settings({ navigate, user, logout }) {
  const { t, i18n } = useTranslation()
  const [notif3, setNotif3]     = useLocalStorage('anaboo_notif_3', true)
  const [notif1, setNotif1]     = useLocalStorage('anaboo_notif_1', true)
  const [notifVit, setNotifVit] = useLocalStorage('anaboo_notif_vit', false)
  const [notifSnd, setNotifSnd] = useLocalStorage('anaboo_notif_snd', true)

  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'id'

  return (
    <div className="flex flex-col min-h-[760px] bg-white overflow-hidden">
      <StatusBar title={t('settings.title')} onBack={() => navigate('dashboard')} />

      <div className="flex-1 overflow-y-auto scrollbar-thin pb-6">

        {/* Profile */}
        <Section title={t('settings.profile')}>
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="w-14 h-14 rounded-full bg-brand-orange-lt flex items-center justify-center text-[28px]">👤</div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-[16px] font-extrabold text-slate-700 truncate">{user?.name || 'Anaboo User'}</p>
              <p className="text-[12px] font-semibold text-slate-500 truncate">{user?.email || '—'}</p>
            </div>
            <button className="text-[12px] font-extrabold text-brand-blue active:opacity-70">{t('settings.editProfile')}</button>
          </div>
        </Section>

        {/* Language */}
        <Section title={t('settings.language')}>
          <button
            onClick={() => i18n.changeLanguage('id')}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-slate-50"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-orange-lt flex items-center justify-center text-[18px]">🇮🇩</div>
            <span className="flex-1 text-[14px] font-bold text-slate-700">{t('settings.languageId')}</span>
            {currentLang === 'id' && <Icon name="check-square" size={20} tone="blue" />}
          </button>
          <button
            onClick={() => i18n.changeLanguage('en')}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-slate-50 border-t border-slate-100"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-orange-lt flex items-center justify-center text-[18px]">🇬🇧</div>
            <span className="flex-1 text-[14px] font-bold text-slate-700">{t('settings.languageEn')}</span>
            {currentLang === 'en' && <Icon name="check-square" size={20} tone="blue" />}
          </button>
        </Section>

        {/* Notifications */}
        <Section title={t('settings.notifications')}>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-9 h-9 rounded-xl bg-brand-orange-lt flex items-center justify-center"><Icon name="bell" size={18} /></div>
            <span className="flex-1 text-[14px] font-bold text-slate-700">{t('settings.notif3Days')}</span>
            <Toggle on={notif3} onChange={setNotif3} />
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5 border-t border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-brand-orange-lt flex items-center justify-center"><Icon name="bell" size={18} /></div>
            <span className="flex-1 text-[14px] font-bold text-slate-700">{t('settings.notif1Day')}</span>
            <Toggle on={notif1} onChange={setNotif1} />
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5 border-t border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-brand-orange-lt flex items-center justify-center"><Icon name="heart" size={18} /></div>
            <span className="flex-1 text-[14px] font-bold text-slate-700">{t('settings.notifVitamin')}</span>
            <Toggle on={notifVit} onChange={setNotifVit} />
          </div>
          <div className="flex items-center gap-3 px-4 py-3.5 border-t border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-brand-orange-lt flex items-center justify-center"><Icon name="info" size={18} /></div>
            <span className="flex-1 text-[14px] font-bold text-slate-700">{t('settings.notifSound')}</span>
            <Toggle on={notifSnd} onChange={setNotifSnd} />
          </div>
        </Section>

        {/* Data */}
        <Section title={t('settings.data')}>
          <Row icon="check-square" label={t('settings.exportData')} />
          <Row icon="add" label={t('settings.importData')} />
          <Row icon="info" label={t('settings.clearData')} danger />
        </Section>

        {/* Privacy */}
        <Section title={t('settings.privacy')}>
          <Row icon="shield" label={t('settings.changePassword')} />
          <Row icon="info" label={t('settings.privacyPolicy')} />
          <Row icon="book" label={t('settings.terms')} />
        </Section>

        {/* About */}
        <Section title={t('settings.about')}>
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-9 h-9 rounded-xl bg-brand-orange-lt flex items-center justify-center"><Icon name="paw" size={18} /></div>
            <span className="flex-1 text-[14px] font-bold text-slate-700">{t('settings.version', { version: APP_VERSION })}</span>
          </div>
          <Row icon="star" label={t('settings.rate')} />
          <Row icon="hospital" label={t('settings.contact')} />
        </Section>

        {/* Logout */}
        <div className="mx-4 mt-4">
          <button
            onClick={() => { if (confirm(t('settings.logout') + '?')) logout?.() }}
            className="w-full py-3.5 rounded-2xl bg-brand-red-lt text-brand-red font-extrabold text-[14px] active:scale-[0.98] transition-all"
          >
            {t('settings.logout')}
          </button>
        </div>

        <p className="text-center text-[12px] text-slate-400 mt-6">Anaboo v{APP_VERSION} · Made with 🐾</p>
      </div>
    </div>
  )
}
