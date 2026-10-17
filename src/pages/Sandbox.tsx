import React, { useEffect, useRef, useState } from 'react';
import { Check, Send, Share2, Users } from 'lucide-react';
import { io, type Socket } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { CodeEditor } from '../components/CodeEditor';
import { readDraft, writeDraft } from '../runtime/drafts';

const EXAMPLES = [
  { name: 'Вывод', code: 'print("Привет, Python!")\n' },
  { name: 'Переменные', code: 'price = 120\ncount = 3\nprint(price * count)\n' },
  { name: 'Ввод', code: 'name = input("Как тебя зовут? ")\nprint(f"Привет, {name}!")\n' },
  { name: 'Цикл', code: 'for number in range(1, 6):\n    print(number ** 2)\n' },
  { name: 'Списки', code: 'numbers = [8, 3, 5, 1]\nnumbers.sort()\nprint(numbers)\n' },
  { name: 'Функции', code: 'def rectangle_area(width, height):\n    return width * height\n\nprint(rectangle_area(4, 3))\n' },
];

interface SessionMessage { userId: string; author: string; text: string; at: number; }

export const Sandbox = React.memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, updateQuestProgress } = useAuth();
  const draftKey = `sandbox:${id ?? 'local'}`;
  const [code, setCode] = useState(() => readDraft(draftKey, EXAMPLES[0].code));
  const [copied, setCopied] = useState(false);
  const [usersCount, setUsersCount] = useState(1);
  const [connection, setConnection] = useState<'offline' | 'connecting' | 'connected'>('offline');
  const [chatMessages, setChatMessages] = useState<SessionMessage[]>([]);
  const [chatDraft, setChatDraft] = useState('');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    setCode(readDraft(draftKey, EXAMPLES[0].code));
    setChatMessages([]);
    setCopied(false);
  }, [draftKey]);

  useEffect(() => {
    if (!id || !currentUser) { setConnection('offline'); return; }
    let disposed = false;
    let socket: Socket | null = null;
    setConnection('connecting');
    const connect = async () => {
      const token = await currentUser.getIdToken();
      if (disposed) return;
      socket = io(window.location.origin, { auth: { token } });
      socketRef.current = socket;
      socket.on('connect', () => {
        setConnection('connected');
        socket?.emit('join_room', { roomId: id, type: 'sandbox' });
      });
      socket.on('disconnect', () => setConnection('offline'));
      socket.on('user_joined', ({ count }: { count: number }) => setUsersCount(count));
      socket.on('remote_update', ({ code: next }: { code: string }) => setCode(next));
      socket.on('sandbox_message', (message: SessionMessage) => setChatMessages((items) => [...items, message].slice(-50)));
      socket.on('connect_error', () => {
        setConnection('offline');
        toast.error('Совместное редактирование недоступно. Локальный код сохранён; подключение повторится автоматически.');
      });
    };
    void connect().catch(() => { if (!disposed) { setConnection('offline'); toast.error('Не удалось подключить аккаунт к сессии. Повтори вход.'); } });
    return () => { disposed = true; socketRef.current = null; socket?.disconnect(); };
  }, [currentUser, id]);

  const handleCodeChange = React.useCallback((next: string) => {
    setCode(next);
    if (socketRef.current?.connected && id) socketRef.current.emit('sandbox_update', { roomId: id, code: next });
  }, [id]);

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); }
    catch { toast.error('Не удалось скопировать ссылку. Скопируй адрес из строки браузера.'); }
  };

  const createSession = () => {
    if (!currentUser) { toast.info('Для совместного редактора войди в аккаунт. Обычная практика доступна без входа.'); return; }
    const sessionId = crypto.randomUUID();
    writeDraft(`sandbox:${sessionId}`, code);
    navigate(`/sandbox/${sessionId}`);
  };

  const sendChatMessage = (event: React.FormEvent) => {
    event.preventDefault();
    const text = chatDraft.trim();
    if (!text || !socketRef.current?.connected || !id) return;
    socketRef.current.emit('sandbox_chat', { roomId: id, text });
    setChatDraft('');
  };

  return (
    <div className="pt-24 pb-8 px-4 md:px-6 max-w-[1320px] mx-auto text-white min-h-screen">
      <header className="flex flex-wrap justify-between items-start gap-4 mb-5">
        <div><h1 className="text-2xl md:text-3xl font-semibold">{id ? 'Совместный редактор' : 'Практика Python'}</h1><p className="text-gray-300 mt-2 text-sm">Пиши код, запускай и проверяй результат. Черновик сохраняется на этом устройстве.</p></div>
        {id ? <button onClick={copyLink} className="min-h-11 px-4 flex gap-2 items-center border border-white/20 rounded-lg text-sm"><span aria-hidden="true">{copied ? <Check size={16} /> : <Share2 size={16} />}</span>{copied ? 'Ссылка скопирована' : 'Скопировать ссылку'}</button> : <button onClick={createSession} className="min-h-11 px-4 flex gap-2 items-center border border-white/20 rounded-lg text-sm"><Users size={16} aria-hidden="true" />Совместный редактор</button>}
      </header>
      {id && <p role="status" className="mb-4 text-sm text-gray-300">{!currentUser ? 'Войди в аккаунт, чтобы подключиться к совместной сессии. Сейчас редактор работает локально.' : connection === 'connected' ? `Подключено. Участников: ${usersCount}. Изменения кода видны всем в сессии.` : connection === 'connecting' ? 'Подключение к совместной сессии…' : 'Нет подключения к сессии. Можно продолжать локально.'}</p>}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <label htmlFor="sandbox-example" className="text-sm text-gray-300">Пример</label>
        <select id="sandbox-example" defaultValue="" onChange={(event) => { const item = EXAMPLES.find((entry) => entry.name === event.target.value); if (item) handleCodeChange(item.code); }} className="min-h-11 bg-[#10191c] border border-white/20 rounded-lg px-3 text-sm max-w-full">
          <option value="" disabled>Выбрать пример</option>{EXAMPLES.map((example) => <option key={example.name} value={example.name}>{example.name}</option>)}
        </select>
        <span className="text-xs text-gray-300">Выбор примера заменит текущий код.</span>
      </div>
      <div className={`grid gap-5 ${id ? 'lg:grid-cols-[minmax(0,1fr)_280px]' : ''}`}>
        <div className="min-w-0"><CodeEditor key={draftKey} initialCode={code} onChange={handleCodeChange} onSuccess={() => updateQuestProgress('sandbox')} lessonId="sandbox" draftKey={draftKey} /></div>
        {id && <aside className="border border-white/15 rounded-lg p-4 self-start min-w-0">
          <h2 className="font-semibold mb-3">Чат сессии</h2>
          <div className="max-h-72 min-h-24 overflow-auto space-y-3 text-sm" aria-live="polite">{chatMessages.length ? chatMessages.map((message, index) => <div key={`${message.userId}-${message.at}-${index}`}><p className="text-emerald-200 font-medium">{message.author}</p><p className="text-gray-200 break-words">{message.text}</p></div>) : <p className="text-gray-300">{connection === 'connected' ? 'Пока нет сообщений. Отправь ссылку участнику, чтобы работать вместе.' : 'Сообщения появятся после подключения.'}</p>}</div>
          <form onSubmit={sendChatMessage} className="mt-4 flex gap-2">
            <input aria-label="Сообщение в чат сессии" value={chatDraft} onChange={(event) => setChatDraft(event.target.value)} maxLength={500} disabled={connection !== 'connected'} className="w-full min-w-0 min-h-11 px-2 bg-black/30 border border-white/20 rounded text-base" placeholder="Сообщение" />
            <button type="submit" aria-label="Отправить сообщение" disabled={!chatDraft.trim() || connection !== 'connected'} className="min-w-11 min-h-11 flex items-center justify-center bg-brand-primary text-black rounded disabled:opacity-40"><Send size={16} /></button>
          </form>
        </aside>}
      </div>
    </div>
  );
});
