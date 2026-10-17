import { useEffect, useState, useRef, lazy, Suspense, type FormEvent } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Terminal, Volume2, VolumeX, BookOpen } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { Dialog } from './Dialog';
import { getIsMuted, toggleMute, getSoundVolume, setSoundVolume, previewSound, type SoundPlaybackResult } from '../utils/sounds';
const SocialPanel = lazy(() => import('./SocialPanel').then(m => ({ default: m.SocialPanel })));
const PRIMARY = [{to:'/pathways',label:'Обучение'},{to:'/sandbox',label:'Практика'},{to:'/arcade',label:'Игры'}];
const MORE = [{to:'/typing',label:'Набор кода Python'},{to:'/community',label:'Сообщество'},{to:'/gallery',label:'Галерея решений'},{to:'/friends',label:'Друзья'},{to:'/guilds',label:'Гильдии'},{to:'/tournaments',label:'Серии задач'},{to:'/duels',label:'Дуэли'},{to:'/daily',label:'Задача дня'},{to:'/achievements',label:'Игровые достижения'},{to:'/shop',label:'Магазин'},{to:'/inventory',label:'Инвентарь'},{to:'/pet',label:'Питомец'},{to:'/skill-tree',label:'Игровые перки'},{to:'/leaderboard',label:'Игровой рейтинг'}];
export function Navbar() {
  const { currentUser, userProfile, login, register, loginWithGoogle, logout, updateProfile, isAdmin } = useAuth();
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [muted, setMuted] = useState(getIsMuted());
  const [volume, setVolume] = useState(getSoundVolume());
  const [soundStatus, setSoundStatus] = useState('');
  const [soundBusy, setSoundBusy] = useState(false);
  const soundRequest = useRef(0);
  const soundPending = useRef(false);
  const [social, setSocial] = useState<string | null | false>(false);
  useEffect(() => { setMenu(false); }, [location.pathname]);
  useEffect(() => {
    const auth = () => { setError(''); setAuthOpen(true); };
    const chat = (event: Event) => setSocial((event as CustomEvent).detail?.userId || null);
    window.addEventListener('open-auth-modal', auth);
    window.addEventListener('open-private-chat', chat);
    return () => { window.removeEventListener('open-auth-modal', auth); window.removeEventListener('open-private-chat', chat); };
  }, []);
  const reportSound = (result: SoundPlaybackResult) => setSoundStatus({
    played: 'Проверочный звук воспроизведён. Если его не слышно, проверь громкость устройства и вкладки.',
    muted: 'Звук выключен. Нажми «Включить и проверить».',
    silent: 'Громкость — 0%. Подними её и повтори проверку.',
    unavailable: 'Браузер не смог воспроизвести звук. Попробуй обновить страницу.',
    blocked: 'Браузер приостановил звук. Нажми «Проверить звук» ещё раз.',
  }[result]);
  const runSoundPreview = async () => {
    if (soundPending.current) return;
    const request = ++soundRequest.current;
    soundPending.current = true; setSoundBusy(true);
    const result = await previewSound();
    if (request !== soundRequest.current) return;
    soundPending.current = false; setSoundBusy(false);
    reportSound(result);
  };
  const switchSound = async () => {
    const next = toggleMute();
    setMuted(next);
    if (next) {
      soundRequest.current++; soundPending.current = false; setSoundBusy(false);
      setSoundStatus('Звук выключен. Настройка сохранена.');
    } else await runSoundPreview();
  };
  const testSound = async () => {
    if (soundPending.current) return;
    if (getIsMuted()) setMuted(toggleMute());
    await runSoundPreview();
  };
  const authenticate = async (event?: FormEvent, google = false) => {
    event?.preventDefault();
    if (busy) return;
    setBusy(true); setError('');
    try {
      if (google) await loginWithGoogle();
      else if (registering) await register(username, password);
      else await login(username, password);
      setAuthOpen(false); setPassword('');
    } catch (reason) {
      const message = String(reason);
      setError(/invalid-credential|wrong-password|user-not-found/.test(message) ? 'Проверь никнейм и пароль.' : /email-already-in-use/.test(message) ? 'Этот никнейм уже занят.' : /popup-closed/.test(message) ? 'Окно входа закрыто. Можно попробовать ещё раз.' : 'Не удалось войти. Проверь подключение и попробуй ещё раз.');
    } finally { setBusy(false); }
  };
  const openProfile = () => { setUsername(userProfile?.username || ''); setBio(userProfile?.bio || ''); setError(''); setProfileOpen(true); };
  return <>
    <header className="site-header"><nav aria-label="Основная навигация" className="nav-inner">
      <Link className="brand" to="/" aria-label="StudyPy — главная"><Terminal size={22} aria-hidden="true"/><span>StudyPy</span></Link>
      <div className="primary-nav">{PRIMARY.map(item=><NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}</div>
      <div className="nav-actions">
        <button className="quiet-button mentor-entry" aria-label="Открыть наставника" onClick={()=>window.dispatchEvent(new Event('open-mentor'))}><BookOpen size={17} aria-hidden="true"/><span>Наставник</span></button>
        <button className="icon-button sound-entry" data-ui-sound="off" onClick={switchSound} title={muted?'Включить мягкие звуки':'Выключить звук'} aria-label={muted?'Включить звук':'Выключить звук'} aria-pressed={!muted}>{muted?<VolumeX size={18}/>:<Volume2 size={18}/>}</button>
        <button className="quiet-button" onClick={currentUser?openProfile:()=>{setError('');setUsername('');setAuthOpen(true);}}>{currentUser?'Профиль':'Войти'}</button>
        <button className="icon-button menu-trigger" onClick={()=>setMenu(!menu)} aria-label="Открыть меню" aria-expanded={menu} aria-haspopup="dialog" aria-controls="site-menu-dialog"><span className="menu-glyph" data-open={menu} aria-hidden="true"><span/><span/><span/></span></button>
      </div>
    </nav></header>
    <AnimatePresence>{menu&&<Dialog key="site-menu" id="site-menu-dialog" title="Меню" close={()=>setMenu(false)}><nav className="menu-links" aria-label="Все разделы">{[...PRIMARY,...MORE].map(item=><Link key={item.to} to={item.to} onClick={()=>setMenu(false)}>{item.label}</Link>)}{isAdmin&&<Link to="/admin">Администрирование</Link>}</nav><section className="menu-preferences" aria-labelledby="sound-preferences-title" data-ui-sound="off"><div className="sound-heading"><div><h3 id="sound-preferences-title">Мягкие звуки</h3><p>Отклик на кнопки и набор кода. Громкость и включение сохраняются на устройстве.</p></div><button className="secondary-button" aria-label={muted?'Включить звук':'Выключить звук'} aria-pressed={!muted} onClick={()=>void switchSound()}>{muted?'Включить':'Выключить'}</button></div><label className="sound-volume" htmlFor="sound-volume"><span>Громкость <output htmlFor="sound-volume">{Math.round(volume*100)}%</output></span><input id="sound-volume" type="range" min="0" max="100" step="5" value={Math.round(volume*100)} aria-valuetext={`${Math.round(volume*100)} процентов`} onChange={event=>{setVolume(setSoundVolume(Number(event.target.value)/100));setSoundStatus('');}}/></label><button className="secondary-button sound-preview" disabled={soundBusy} aria-busy={soundBusy} onClick={()=>void testSound()}>{soundBusy?'Проверка звука…':muted?'Включить и проверить':'Проверить звук'}</button><p className="sound-status" role="status" aria-live="polite">{soundStatus}</p></section></Dialog>}</AnimatePresence>
    {authOpen&&<Dialog title={registering?'Создать аккаунт':'Войти в StudyPy'} close={()=>setAuthOpen(false)}>
      <p className="muted mb-5">Без аккаунта код и учебный прогресс сохраняются в этом браузере. Аккаунт позволяет синхронизировать новые отметки прохождения и работать вместе.</p>
      {error&&<p role="alert" className="error-message">{error}</p>}
      <form onSubmit={authenticate} className="form-stack"><label>Никнейм<input autoComplete="username" required minLength={3} maxLength={24} value={username} onChange={e=>setUsername(e.target.value)}/></label><label>Пароль<input type="password" autoComplete={registering?'new-password':'current-password'} required minLength={6} value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="primary-button" disabled={busy}>{busy?'Вход…':registering?'Создать аккаунт':'Войти'}</button></form>
      <button className="secondary-button w-full mt-3" disabled={busy} onClick={()=>void authenticate(undefined,true)}>Войти через Google</button>
      <button className="text-link mt-5" onClick={()=>{setRegistering(!registering);setError('');}}>{registering?'Уже есть аккаунт — войти':'Создать аккаунт'}</button>
    </Dialog>}
    {profileOpen&&<Dialog title="Профиль" close={()=>setProfileOpen(false)}>
      <p className="muted mb-5">Игровой уровень {userProfile?.level || 1} · {userProfile?.xp || 0} XP. Он отражает игровые награды, а не знание Python.</p>
      {error&&<p className="error-message" role="alert">{error}</p>}
      <form className="form-stack" onSubmit={async e=>{e.preventDefault();if(busy)return;setBusy(true);try{await updateProfile({username,bio});setProfileOpen(false);}catch{setError('Не удалось сохранить профиль. Попробуй ещё раз.');}finally{setBusy(false);}}}>
        <label>Никнейм<input value={username} onChange={e=>setUsername(e.target.value)} minLength={3} maxLength={24} required/></label><label>О себе<textarea value={bio} maxLength={500} onChange={e=>setBio(e.target.value)}/></label><button className="primary-button" disabled={busy}>{busy?'Сохранение…':'Сохранить профиль'}</button>
      </form><div className="flex flex-wrap gap-3 mt-5"><button className="secondary-button" onClick={()=>{setProfileOpen(false);setSocial(null);}}>Сообщения</button><button className="quiet-button" onClick={()=>{void logout();setProfileOpen(false);}}>Выйти</button></div>
    </Dialog>}
    {social!==false&&<Suspense fallback={<p role="status">Загрузка сообщений…</p>}><SocialPanel isOpen onClose={()=>setSocial(false)} initialChatUserId={social}/></Suspense>}
  </>;
}
