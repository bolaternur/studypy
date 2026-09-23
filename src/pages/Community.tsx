import React from 'react';
import { motion } from 'motion/react';
import { Users, MessageSquare, Globe, Sparkles, Send, Github, Twitter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { TextReveal } from '../components/TextReveal';
import { Link } from 'react-router-dom';
import { CURRICULUM_SUMMARY } from '../constants/curriculum-summary';

const GITHUB_URL = 'https://github.com/bolaternur/studypy';

export const Community = () => {
  const [chatStatus, setChatStatus] = React.useState<ChatStatus>('connecting');

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-brand-primary/30">
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          {}
          <div className="text-center mb-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-xs font-bold text-brand-secondary uppercase tracking-widest border border-brand-secondary/20">
                <Globe className="w-4 h-4" />
                Глобальная сеть
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
                <TextReveal text="Присоединяйтесь к" delay={0.1} /><br /> <TextReveal text="сообществу" delay={0.2} /> <span className="text-gradient">StudyPy</span>
              </h1>
              <p className="text-white/50 text-xl max-w-2xl mx-auto mb-10">
                <TextReveal text="Общайтесь с тысячами изучающих Python, делитесь своими проектами и получайте помощь от экспертов в нашей глобальной сети." delay={0.4} />
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-8 py-4 bg-emerald-400 text-[#04070a] hover:scale-[1.03] transition-transform rounded-full font-bold flex items-center gap-3"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                  Проект на GitHub
                </a>
                <Link
                  to="/gallery"
                  className="px-8 py-4 glass hover:bg-white/10 transition-colors rounded-full font-bold flex items-center gap-3"
                >
                  <Sparkles className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                  Галерея решений
                </Link>
              </div>
            </motion.div>
          </div>

          {}
          <div className="grid md:grid-cols-3 gap-6 mb-32">
            {[
              { icon: Sparkles, title: `${CURRICULUM_SUMMARY.lessons} уроков`, desc: "В открытой программе", color: "text-emerald-400" },
              { icon: MessageSquare, title: `${CURRICULUM_SUMMARY.challenges} задач`, desc: "С автоматической проверкой", color: "text-teal-400" },
              { icon: Github, title: "Open source", desc: "Код проекта открыт на GitHub", color: "text-emerald-400" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-3xl p-8 border border-white/10 text-center group hover:border-white/20 transition-colors"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.title}</h3>
                <p className="text-white/50">{stat.desc}</p>
              </motion.div>
            ))}
          </div>

          {}
          <div className="glass rounded-[40px] p-8 md:p-12 border border-white/10 relative overflow-hidden mb-20">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold">Чат Сообщества</h2>
                <ChatStatusBadge status={chatStatus} />
              </div>

              <CommunityChat onStatusChange={setChatStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { playSound } from '../utils/sounds';

export type ChatStatus = 'connecting' | 'online' | 'error';

const STATUS_LABEL: Record<ChatStatus, { text: string; dot: string; tone: string }> = {
  connecting: { text: 'Подключение…', dot: 'bg-amber-400', tone: 'text-amber-300' },
  online: { text: 'Чат подключён', dot: 'bg-emerald-400', tone: 'text-emerald-400' },
  error: { text: 'Нет соединения', dot: 'bg-red-400', tone: 'text-red-400' },
};

const ChatStatusBadge = ({ status }: { status: ChatStatus }) => {
  const meta = STATUS_LABEL[status];
  return (
    <div className={`flex items-center gap-2 text-sm ${meta.tone}`} role="status">
      <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
      {meta.text}
    </div>
  );
};

const CommunityChat = ({ onStatusChange }: { onStatusChange: (status: ChatStatus) => void }) => {
  const [messages, setMessages] = React.useState<any[]>([]);
  const [input, setInput] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  const { currentUser: user, userProfile, loading } = useAuth();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const lastMessageId = React.useRef<string | null>(null);

  React.useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
      const reversed = msgs.reverse();
      
      
      if (reversed.length > 0) {
        const latest = reversed[reversed.length - 1];
        if (lastMessageId.current && latest.id !== lastMessageId.current && latest.uid !== user?.uid) {
          playSound('message');
        }
        lastMessageId.current = latest.id;
      }
      
      setMessages(reversed);
      setHasError(false);
      onStatusChange('online');
    }, (error) => {
      console.error('Chat subscription failed:', error.code);
      setHasError(true);
      onStatusChange('error');
    });

    return () => unsubscribe();
  }, [user?.uid]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageContent = input.trim();
    if (!messageContent || !user || !userProfile) return;

    setInput(''); 
    playSound('click');
    try {
      await addDoc(collection(db, 'messages'), {
        uid: user.uid,
        username: userProfile.username,
        avatar: userProfile.avatar || '',
        content: messageContent,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Send Error:", error);
      setInput(messageContent); 
      playSound('error');
    }
  };

  if (loading) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-black/40 rounded-3xl border border-white/10">
        <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        role="alert"
        className="h-[500px] flex flex-col items-center justify-center gap-4 bg-black/40 rounded-3xl border border-red-500/20 px-6 text-center"
      >
        <p className="text-lg font-semibold">Чат недоступен</p>
        <p className="max-w-md text-sm text-white/50">
          Не удалось подписаться на сообщения. Проверьте соединение и обновите
          страницу — история никуда не делась.
        </p>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div className={`flex flex-col h-[500px] bg-black/40 rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 ${!user ? 'blur-md pointer-events-none select-none opacity-50' : ''}`}>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-4 group/msg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
                {msg.avatar ? (
                  <img src={msg.avatar} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  msg.username?.charAt(0) || '?'
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-white">{msg.username}</span>
                  <span className="text-[11px] text-white/50 uppercase tracking-tighter">
                    {msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                  </span>
                </div>
                <p className="text-sm text-white/70 break-words leading-relaxed">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-white/5 border-t border-white/10">
          <div className="flex gap-2">
            <input aria-label="Ввод для программы"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={!user ? "Войдите, чтобы общаться" : !userProfile ? "Создайте профиль, чтобы общаться" : "Напишите сообщение..."}
              disabled={!user || !userProfile}
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-primary transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || !user || !userProfile}
              className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {!user && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="bg-black/60 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 text-center shadow-2xl max-w-xs mx-auto">
            <Globe className="w-12 h-12 text-brand-primary mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold mb-2">Чат закрыт</h3>
            <p className="text-white/60 text-sm mb-6">Войдите в систему, чтобы присоединиться к обсуждению</p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}
              className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all active:scale-95"
            >
              Войти в аккаунт
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
