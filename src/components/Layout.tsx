import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Terminal, Sparkles, ChevronRight, User, LogOut, X, Gamepad2, Trophy, Swords, Upload, Camera, Shield, FileText, Map, Gift, Zap, Volume2, VolumeX, BookOpen, Users, ShoppingBag, Coins, Sword, Menu, ShoppingCart, TerminalSquare, Backpack, ShieldAlert, ChevronDown, Layout, Code2, Rocket, MessageSquare, Brain, Activity
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LevelUpModal } from './LevelUpModal';
import { FloatingChat } from './FloatingChat';
import { playSound, toggleMute, getIsMuted } from '../utils/sounds';
import { SocialPanel } from './SocialPanel';
import { calculateRank, getRankColor } from '../utils/ranks';

const getRankProgress = (level: number) => {
  const ranks = [
    { rank: 'F', level: 0 },
    { rank: 'E', level: 6 },
    { rank: 'D', level: 11 },
    { rank: 'C', level: 21 },
    { rank: 'B', level: 31 },
    { rank: 'A', level: 41 },
    { rank: 'S', level: 51 },
    { rank: 'S+', level: 61 },
    { rank: 'SS', level: 71 },
    { rank: 'SS+', level: 81 },
    { rank: 'SSS', level: 86 },
    { rank: 'SSS+', level: 91 },
    { rank: 'GOD', level: 96 },
    { rank: 'ETERNAL', level: 101 },
  ];
  
  let currentRankIndex = 0;
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (level >= ranks[i].level) {
      currentRankIndex = i;
      break;
    }
  }
  const currentRank = ranks[currentRankIndex];
  const nextRank = ranks[currentRankIndex + 1];
  
  if (!nextRank) return 100;
  
  const progress = ((level - currentRank.level) / (nextRank.level - currentRank.level)) * 100;
  return Math.max(0, Math.min(progress, 100));
};

export const Navbar = () => {
  const location = useLocation();
  const autoHide = location.pathname.startsWith('/lesson');
  const { 
    currentUser, userProfile, logout, login, register, loginWithGoogle, 
    levelUp, resetLevelUp, claimDailyReward, canClaimReward, isAdmin,
    performanceSettings, setLowPerfMode 
  } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<any>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [showRewardSuccess, setShowRewardSuccess] = useState(false);
  const [isClaimingReward, setIsClaimingReward] = useState(false);
  const [isMuted, setIsMuted] = useState(getIsMuted());
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [socialChatUserId, setSocialChatUserId] = useState<string | null>(null);

  const handleToggleMute = () => {
    const newMuted = toggleMute();
    setIsMuted(newMuted);
    if (!newMuted) playSound('click');
  };

  useEffect(() => {
    const handleOpenAuth = () => {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    };
    window.addEventListener('open-auth-modal', handleOpenAuth);
    
    const handleOpenChat = (e: any) => {
      setSocialChatUserId(e.detail?.userId || null);
      setIsSocialOpen(true);
    };
    window.addEventListener('open-private-chat', handleOpenChat);

    return () => {
      window.removeEventListener('open-auth-modal', handleOpenAuth);
      window.removeEventListener('open-private-chat', handleOpenChat);
    };
  }, []);

  useEffect(() => {
    if (levelUp) {
      playSound('levelUp');
    }
  }, [levelUp]);

  const isRewardAvailable = canClaimReward();

  const handleClaimReward = async () => {
    if (!isRewardAvailable || isClaimingReward) {
      playSound('error');
      return;
    }
    setIsClaimingReward(true);
    try {
      const success = await claimDailyReward();
      if (success) {
        playSound('success');
        setShowRewardSuccess(true);
        setTimeout(() => setShowRewardSuccess(false), 3000);
      } else {
        playSound('error');
      }
    } finally {
      setIsClaimingReward(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsAuthLoading(true);
    try {
      if (authMode === 'login') {
        await login(username, password);
      } else {
        await register(username, password);
      }
      playSound('success');
      setIsAuthModalOpen(false);
      setUsername('');
      setPassword('');
    } catch (err: any) {
      playSound('error');
      if (err.message?.includes('auth/operation-not-allowed')) {
        setError('Ошибка: Для входа по никнейму необходимо включить провайдер "Email/Password" в консоли Firebase (Authentication -> Sign-in method).');
      } else if (err.message?.includes('auth/invalid-credential') || err.message?.includes('auth/wrong-password')) {
        setError('Ошибка: Неверный никнейм или пароль.');
      } else if (err.message?.includes('auth/user-not-found')) {
        setError('Ошибка: Пользователь с таким никнеймом не найден.');
      } else if (err.message?.includes('auth/email-already-in-use')) {
        setError('Ошибка: Этот никнейм уже занят.');
      } else {
        setError(err.message || 'Ошибка аутентификации');
      }
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsAuthLoading(true);
    try {
      await loginWithGoogle();
      playSound('success');
      setIsAuthModalOpen(false);
    } catch (err: any) {
      playSound('error');
      setError(err.message || 'Ошибка входа через Google');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const navGroups = [
    {
      id: 'learn',
      label: 'Обучение',
      icon: <BookOpen className="w-4 h-4" />,
      items: [
        { to: '/pathways', icon: <Map className="w-4 h-4" />, label: 'Пути развития' },
        { to: '/skill-tree', icon: <Brain className="w-4 h-4" />, label: 'Древо навыков' },
        { to: '/achievements', icon: <Trophy className="w-4 h-4" />, label: 'Достижения' },
        { to: '/sandbox', icon: <TerminalSquare className="w-4 h-4" />, label: 'Песочница' },
        { to: '/collaborative', icon: <Users className="w-4 h-4" />, label: 'Коллаборация' },
      ]
    },
    {
      id: 'play',
      label: 'Активности',
      icon: <Gamepad2 className="w-4 h-4" />,
      items: [
        { to: '/daily', icon: <Zap className="w-4 h-4" />, label: 'Ежедневные' },
        { to: '/arcade', icon: <Gamepad2 className="w-4 h-4" />, label: 'Аркада' },
        { to: '/duels', icon: <Swords className="w-4 h-4" />, label: 'Дуэли' },
        { to: '/boss-arena', icon: <Sword className="w-4 h-4" />, label: 'Босс-Арена' },
        { to: '/tournaments', icon: <Trophy className="w-4 h-4" />, label: 'Турниры' },
      ]
    },
    {
      id: 'social',
      label: 'Сообщество',
      icon: <Users className="w-4 h-4" />,
      items: [
        { to: '/community', icon: <Users className="w-4 h-4" />, label: 'Лента' },
        { to: '/gallery', icon: <Layout className="w-4 h-4" />, label: 'Галерея кода' },
        { to: '/leaderboard', icon: <Sparkles className="w-4 h-4" />, label: 'Рейтинг' },
        { to: '/friends', icon: <Users className="w-4 h-4" />, label: 'Друзья' },
        { to: '/guilds', icon: <Shield className="w-4 h-4" />, label: 'Гильдии' },
      ]
    },
    {
      id: 'store',
      label: 'Магазин',
      icon: <ShoppingBag className="w-4 h-4" />,
      items: [
        { to: '/shop', icon: <ShoppingBag className="w-4 h-4" />, label: 'Маркет' },
        { to: '/inventory', icon: <Backpack className="w-4 h-4" />, label: 'Инвентарь' },
      ]
    }
  ];

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  const toggleDropdown = (id: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(current => (current === id ? null : id));
  };

  // Escape closes whichever menu is open, from anywhere.
  useEffect(() => {
    if (!activeDropdown) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveDropdown(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeDropdown]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);

  return (
    <>
      {autoHide && (
        <div 
          className="fixed top-0 left-0 right-0 h-10 z-[60] flex items-start justify-center cursor-pointer pointer-events-auto"
          onMouseEnter={() => setIsNavHovered(true)}
        >
          <motion.div 
            animate={{ opacity: isNavHovered ? 0 : 1 }}
            className="px-6 py-0.5 glass rounded-b-xl border-b border-x border-white/10 flex flex-col items-center pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-[#04070a]/90 backdrop-blur-md"
          >
            <ChevronDown className="w-5 h-5 text-brand-primary animate-bounce mt-1" />
            <span className="text-[9px] font-black tracking-[0.2em] text-white/50 uppercase pb-1">Главное МЕНЮ</span>
          </motion.div>
        </div>
      )}

      <motion.nav 
        initial={autoHide ? { y: "-100%" } : { y: 0 }}
        animate={{ y: (!autoHide || isNavHovered || isMobileMenuOpen || isAuthModalOpen || isProfileModalOpen) ? 0 : "-100%" }}
        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-3 pointer-events-none"
      >
        <div 
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => setIsNavHovered(false)}
          onFocusCapture={() => setIsNavHovered(true)}
          className="max-w-[1800px] mx-auto flex items-center justify-between glass glass-lit rounded-2xl md:rounded-[2rem] px-4 md:px-8 py-2 md:py-3 pointer-events-auto"
        >
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity flex-shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-8 h-8 md:w-9 md:h-9 bg-emerald-400 rounded-lg md:rounded-[10px] flex items-center justify-center">
              <Terminal className="text-[#04070a] w-4 h-4 md:w-[18px] md:h-[18px]" aria-hidden="true" />
            </div>
            <span className="text-xl md:text-[22px] font-display font-bold tracking-[-0.04em]">StudyPy</span>
          </Link>
          
          {}
          <div className="hidden xl:flex items-center gap-10 2xl:gap-14 text-sm font-bold text-white/60 mx-8 2xl:mx-12">
            {navGroups.map((group) => (
              <div 
                key={group.id}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(group.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === group.id}
                  onClick={() => toggleDropdown(group.id)}
                  onFocus={() => handleMouseEnter(group.id)}
                  className={`flex items-center gap-2 py-2 transition-colors hover:text-white ${activeDropdown === group.id ? 'text-white' : ''}`}
                >
                  {group.icon}
                  <span>{group.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === group.id ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                <AnimatePresence>
                  {activeDropdown === group.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 mt-2 w-56 glass rounded-2xl p-2 border border-white/10 shadow-2xl backdrop-blur-3xl z-[110]"
                    >
                      {group.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-brand-primary transition-all group/item"
                        >
                          <div className="p-2 bg-white/5 rounded-lg group-hover/item:bg-brand-primary/20 group-hover/item:text-brand-primary transition-colors">
                            {item.icon}
                          </div>
                          <span className="font-bold">{item.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            
            {isAdmin && (
              <Link to="/admin" className="flex items-center gap-2 hover:text-red-500 transition-colors font-black text-red-500/80 group">
                <ShieldAlert className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>АДМИН</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {currentUser && userProfile ? (
              <div className="flex items-center gap-2 md:gap-6 flex-shrink-0">
                {}
                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={handleClaimReward}
                    disabled={!isRewardAvailable || isClaimingReward}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all group relative ${
                      isRewardAvailable && !isClaimingReward
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-500 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(251,191,36,0.2)]' 
                        : 'bg-white/5 border border-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    {isClaimingReward ? (
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white bg-transparent rounded-full animate-spin" />
                    ) : (
                      <Gift className={`w-4 h-4 ${isRewardAvailable ? 'group-hover:rotate-12 animate-bounce' : ''} transition-transform`} />
                    )}
                    <span className="text-xs font-black uppercase tracking-tighter">
                      {isClaimingReward ? 'Загрузка...' : isRewardAvailable ? 'Награда!' : 'Ждите'}
                    </span>
                  </button>

                  <div className="flex flex-col gap-1 min-w-[120px]">
                    <div className="flex items-center gap-2 px-3 2xl:px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary">
                      <Zap className="w-3.5 h-3.5" />
                      <span className="text-[10px] 2xl:text-xs font-black">{userProfile.xp} XP / Lvl {userProfile.level}</span>
                    </div>
                    {}
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getRankProgress(userProfile.level || 1)}%` }}
                        className={`h-full bg-gradient-to-r ${getRankColor(calculateRank(userProfile.level || 1))}`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 2xl:px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500">
                    <Coins className="w-3.5 h-3.5" />
                    <span className="text-[10px] 2xl:text-xs font-black">{userProfile.coins || 0}</span>
                  </div>
                </div>

                {}
                <div className="flex items-center gap-2 md:gap-4 md:border-l border-white/10 md:pl-6">
                  <button 
                    type="button"
                    onClick={() => setIsProfileModalOpen(true)}
                    aria-label={`Профиль: ${userProfile.username}`}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="relative">
                      {userProfile.avatar ? (
                        <img src={userProfile.avatar} alt="" className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl object-cover border border-brand-primary/30" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-brand-primary/20 flex items-center justify-center text-brand-primary font-black text-xs md:text-sm">
                          {userProfile.username[0].toUpperCase()}
                        </div>
                      )}
                      <div className={`absolute -top-1 -right-1 px-1.5 py-0.5 rounded-lg text-[7px] font-black bg-gradient-to-br ${getRankColor(calculateRank(userProfile.level || 1))} text-white border border-white/20 shadow-lg z-10`}>
                        {calculateRank(userProfile.level || 1)}
                      </div>
                    </div>
                    <span className="hidden sm:inline-block text-xs md:text-sm font-black text-white tracking-tight">
                      {userProfile.username}
                    </span>
                  </button>

                  <div className="hidden sm:flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={handleToggleMute}
                      aria-pressed={isMuted}
                      aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40" /> : <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-primary" />}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setLowPerfMode(!performanceSettings.lowPerfMode)}
                      aria-pressed={performanceSettings.lowPerfMode}
                      aria-label={performanceSettings.lowPerfMode ? 'Экономный режим включён' : 'Включить экономный режим'}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition-colors border ${performanceSettings.lowPerfMode ? 'border-amber-500/50 bg-amber-500/10' : 'border-white/10'}`}
                      title={performanceSettings.lowPerfMode ? "Экономный режим: ВКЛ" : "Обычный режим"}
                    >
                      <Activity className={`w-3.5 h-3.5 md:w-4 md:h-4 ${performanceSettings.lowPerfMode ? 'text-amber-500' : 'text-white/40'}`} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsSocialOpen(true)}
                      aria-label="Сообщения"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl glass flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
                    >
                      <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60" aria-hidden="true" />
                    </button>
                    <button 
                      type="button"
                      onClick={logout}
                      aria-label="Выйти из аккаунта"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-500 flex items-center justify-center transition-all border border-red-500/20"
                    >
                      <LogOut className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 md:gap-4">
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 md:px-8 py-2 md:py-3 bg-white text-black rounded-xl md:rounded-2xl font-bold text-xs md:text-sm hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  Войти
                  <ChevronRight className="w-3 md:w-4 h-3 md:h-4" />
                </button>
              </div>
            )}

            {}
            <button 
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              className="xl:hidden w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[45] pt-24 pb-10 px-4 xl:hidden pointer-events-auto overflow-y-auto"
            >
              <div className="absolute inset-0 bg-black/90 backdrop-blur-xl z-[-1]" onClick={() => setIsMobileMenuOpen(false)} />
              
              <div className="space-y-6">
                {navGroups.map((group) => (
                  <div key={group.id} className="space-y-3">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-4 flex items-center gap-2">
                      {group.icon} {group.label}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {group.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all"
                        >
                          <div className="text-brand-primary">{item.icon}</div>
                          <span className="font-bold text-lg">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500"
                  >
                    <ShieldAlert className="w-5 h-5" />
                    <span className="font-bold text-lg uppercase tracking-tight">Админ-Панель</span>
                  </Link>
                )}

                {currentUser && (
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <div className="flex items-center justify-between px-4">
                      <div className="flex items-center gap-2 text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                        <Coins className="w-4 h-4" />
                        <span className="font-bold">{userProfile?.coins || 0}</span>
                      </div>
                      <div className="flex items-center gap-2 text-brand-primary bg-brand-primary/10 px-3 py-1.5 rounded-full border border-brand-primary/20">
                        <Zap className="w-4 h-4" />
                        <span className="font-bold">{userProfile?.xp || 0} XP</span>
                      </div>
                    </div>
                    <button 
                      onClick={logout}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-500/20 text-red-500 border border-red-500/30 font-bold"
                    >
                      <LogOut className="w-5 h-5" />
                      Выйти из аккаунта
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>


      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md glass rounded-3xl p-8 border border-white/10 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center glow-shadow">
                  <User className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold">
                    {authMode === 'login' ? 'С возвращением' : 'Присоединяйтесь к StudyPy'}
                  </h2>
                  <p className="text-sm text-white/40">
                    {authMode === 'login' ? 'Введите свои данные, чтобы продолжить.' : 'Создайте никнейм и начните обучение.'}
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleAuth} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Никнейм</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                    placeholder="например, CodeNinja99"
                    required
                    minLength={3}
                    maxLength={24}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Пароль</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full py-4 mt-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl font-bold text-white glow-shadow hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100"
                >
                  {isAuthLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Подождите...
                    </div>
                  ) : (
                    authMode === 'login' ? 'Войти' : 'Создать аккаунт'
                  )}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#080d10] px-2 text-white/40">Или</span>
                </div>
              </div>

              <button 
                onClick={handleGoogleLogin}
                disabled={isAuthLoading}
                className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-medium text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                Войти через Google
              </button>

              <div className="mt-6 text-center text-sm text-white/40">
                {authMode === 'login' ? "Нет аккаунта? " : "Уже есть аккаунт? "}
                <button 
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-brand-primary font-bold hover:underline"
                >
                  {authMode === 'login' ? 'Зарегистрироваться' : 'Войти'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LevelUpModal 
        isOpen={levelUp !== null} 
        level={levelUp || 0} 
        onClose={resetLevelUp} 
      />

      <AnimatePresence>
        {isProfileModalOpen && <ProfileModal onClose={() => setIsProfileModalOpen(false)} />}
      </AnimatePresence>

      <SocialPanel 
        isOpen={isSocialOpen} 
        onClose={() => {
          setIsSocialOpen(false);
          setSocialChatUserId(null);
        }} 
        initialChatUserId={socialChatUserId}
      />
    </>
  );
};

const ProfileModal = ({ onClose }: { onClose: () => void }) => {
  const { userProfile, updateProfile } = useAuth();
  const [username, setUsername] = useState(userProfile?.username || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [avatar, setAvatar] = useState(userProfile?.avatar || '');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatars = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({ username, bio, avatar });
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Файл слишком большой. Пожалуйста, выберите изображение до 2МБ.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.7);
          setAvatar(compressed);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-md glass rounded-3xl p-8 border border-white/10 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-3xl font-display font-bold mb-8">Настройки Профиля</h2>
        
        <form onSubmit={handleSave} className="space-y-6">
            <div className="col-span-3 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-white/40 text-[10px] uppercase tracking-widest">Прогресс Ранга</div>
                <div className={`text-sm font-black bg-gradient-to-br ${getRankColor(calculateRank(userProfile?.level || 1))} bg-clip-text text-transparent`}>
                  {calculateRank(userProfile?.level || 1)}
                </div>
              </div>
              <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getRankProgress(userProfile?.level || 1)}%` }}
                  className={`h-full bg-gradient-to-r ${getRankColor(calculateRank(userProfile?.level || 1))}`}
                />
              </div>
              <div className="flex justify-between text-[8px] font-bold text-white/20 uppercase tracking-widest">
                <span>LVL {userProfile?.level}</span>
                <span>След. ранг: {getRankProgress(userProfile?.level || 1).toFixed(0)}%</span>
              </div>
            </div>
          
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Выберите Аватар</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {avatars.map((url) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setAvatar(url)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${avatar === url ? 'border-brand-primary scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={url} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`w-10 h-10 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center hover:border-brand-primary hover:bg-brand-primary/10 transition-all ${avatar.startsWith('data:') ? 'border-brand-primary bg-brand-primary/10' : ''}`}
              >
                <Camera className="w-4 h-4 text-white/40" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>
            <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-brand-primary/30 shadow-xl">
              <img src={avatar || avatars[0]} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Никнейм</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">О себе</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Расскажите о своем пути в Python..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
            />
          </div>

          {userProfile?.inventory && userProfile.inventory.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Инвентарь</label>
              <div className="flex flex-wrap gap-2">
                {userProfile.inventory.map(item => (
                  <div key={item.id} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-white/60 font-bold uppercase tracking-wider">
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button 
            type="submit"
            disabled={isSaving}
            className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] disabled:opacity-50"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};
