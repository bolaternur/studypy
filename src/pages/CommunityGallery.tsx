import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Heart, Loader2, MessageSquare, Plus, Share2, Star, Users, X } from 'lucide-react';
import { collection, doc, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { CodeEditor } from '../components/CodeEditor';
import { useDialogFocus } from '../components/Dialog';
import { postAuthenticated } from '../services/serverApi';
import { readDraft, writeDraft } from '../runtime/drafts';

interface Snippet {
  id: string; title: string; description: string; code: string; authorId: string; authorName: string;
  likes: number; stars: number; starredBy: string[]; tags: string[]; createdAt?: any; commentCount?: number;
}
interface Comment { id: string; text: string; authorName: string; createdAt?: any; }
interface SnippetDraft { title: string; description: string; code: string; tags: string; }
const emptyDraft: SnippetDraft = { title: '', description: '', code: '', tags: '' };

function readPublicationDraft(): SnippetDraft {
  try {
    const draft = JSON.parse(localStorage.getItem('studypy:publication-draft') ?? '{}');
    return { title: typeof draft.title === 'string' ? draft.title : '', description: typeof draft.description === 'string' ? draft.description : '', tags: typeof draft.tags === 'string' ? draft.tags : '', code: readDraft('gallery:new', '') };
  } catch { return { ...emptyDraft, code: readDraft('gallery:new', '') }; }
}

async function readWithDeadline<T>(request: Promise<T>): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([request, new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('READ_TIMEOUT')), 12000);
    })]);
  } finally { clearTimeout(timer); }
}

export const CommunityGallery = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [createOpen, setCreateOpen] = useState(false);
  const [selected, setSelected] = useState<Snippet | null>(null);
  const [draft, setDraft] = useState(readPublicationDraft);
  const [submitting, setSubmitting] = useState(false);
  const [publicationError, setPublicationError] = useState('');
  const [actionError, setActionError] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState('');
  const [commentDraft, setCommentDraft] = useState('');
  const [postingComment, setPostingComment] = useState(false);
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const pending = useRef(new Set<string>());
  const submitLock = useRef(false);
  const commentLock = useRef(false);
  const readVersion = useRef(0);
  const commentVersion = useRef(0);
  const sharedOpened = useRef(false);
  const selectedIdRef = useRef<string | undefined>(undefined);
  selectedIdRef.current = selected?.id;
  const createRef = useDialogFocus(createOpen, () => setCreateOpen(false));
  const detailRef = useDialogFocus(!!selected, () => setSelected(null));

  useEffect(() => {
    try { localStorage.setItem('studypy:publication-draft', JSON.stringify({ title: draft.title, description: draft.description, tags: draft.tags })); }
    catch { /* The editor separately reports failure to save its code. */ }
  }, [draft.title, draft.description, draft.tags]);
  useEffect(() => () => { readVersion.current++; commentVersion.current++; }, []);

  const fetchSnippets = useCallback(async () => {
    const version = ++readVersion.current;
    setLoading(true);
    setLoadError('');
    try {
      const snapshot = await readWithDeadline(getDocs(query(collection(db, 'snippets'), orderBy('createdAt', 'desc'), limit(50))));
      // Firestore may resolve an offline read with an empty local cache instead of rejecting.
      if (snapshot.metadata.fromCache && snapshot.empty) throw new Error('OFFLINE_EMPTY_CACHE');
      const fetched = snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })) as Snippet[];
      if (version !== readVersion.current) return;
      setSnippets(fetched);
      if (snapshot.metadata.fromCache) setLoadError('Не удалось обновить галерею. Показаны сохранённые публикации.');
      const sharedId = new URLSearchParams(window.location.search).get('snippet');
      if (sharedId && !sharedOpened.current) {
        sharedOpened.current = true;
        const local = fetched.find((item) => item.id === sharedId);
        if (local) setSelected(local);
        else {
          const shared = await readWithDeadline(getDoc(doc(db, 'snippets', sharedId)));
          if (shared.metadata.fromCache && !shared.exists()) throw new Error('OFFLINE_MISSING_DOCUMENT');
          if (version !== readVersion.current) return;
          if (shared.exists()) setSelected({ id: shared.id, ...shared.data() } as Snippet);
          else setLoadError('Публикация по ссылке не найдена. Остальная галерея доступна ниже.');
        }
      }
    } catch (error) {
      console.error('Gallery read failed', error);
      if (version === readVersion.current) setLoadError('Не удалось загрузить галерею. Проверь подключение и повтори попытку.');
    } finally { if (version === readVersion.current) setLoading(false); }
  }, []);
  useEffect(() => { void fetchSnippets(); }, [fetchSnippets]);

  const fetchComments = useCallback(async (snippetId: string) => {
    const version = ++commentVersion.current;
    setCommentsLoading(true);
    setCommentsError('');
    try {
      const snapshot = await readWithDeadline(getDocs(query(collection(db, `snippets/${snippetId}/comments`), orderBy('createdAt', 'asc'), limit(100))));
      if (snapshot.metadata.fromCache && snapshot.empty) throw new Error('OFFLINE_EMPTY_CACHE');
      if (version === commentVersion.current) setComments(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })) as Comment[]);
      if (version === commentVersion.current && snapshot.metadata.fromCache) setCommentsError('Не удалось обновить комментарии. Показаны сохранённые сообщения.');
    } catch (error) {
      console.error('Comments read failed', error);
      if (version === commentVersion.current) setCommentsError('Не удалось загрузить комментарии. Можно повторить запрос.');
    } finally { if (version === commentVersion.current) setCommentsLoading(false); }
  }, []);
  useEffect(() => {
    setComments([]);
    setCommentDraft('');
    setActionError('');
    if (selected?.id) void fetchComments(selected.id);
    return () => { commentVersion.current++; };
  }, [selected?.id, fetchComments]);

  const updateSnippet = (id: string, changes: Partial<Snippet>) => {
    setSnippets((items) => items.map((item) => item.id === id ? { ...item, ...changes } : item));
    setSelected((item) => item?.id === id ? { ...item, ...changes } : item);
  };

  const reactToSnippet = async (snippet: Snippet, kind: 'like' | 'star') => {
    if (!userProfile) { setActionError('Войди в аккаунт, чтобы оценивать публикации.'); return; }
    if (pending.current.has(snippet.id)) return;
    pending.current.add(snippet.id);
    setPendingIds([...pending.current]);
    setActionError('');
    try {
      if (kind === 'like') {
        const result = await postAuthenticated<{ likes: number }>('/community/snippets/like', { snippetId: snippet.id });
        updateSnippet(snippet.id, { likes: result.likes });
      } else {
        const result = await postAuthenticated<{ stars: number; starred: boolean }>('/community/snippets/star', { snippetId: snippet.id });
        updateSnippet(snippet.id, { stars: result.stars, starredBy: result.starred ? [...new Set([...(snippet.starredBy ?? []), userProfile.uid])] : (snippet.starredBy ?? []).filter((id) => id !== userProfile.uid) });
      }
    } catch (error) {
      console.error('Gallery reaction failed', error);
      setActionError('Не удалось подтвердить оценку. Обнови галерею перед повторной попыткой.');
    } finally { pending.current.delete(snippet.id); setPendingIds([...pending.current]); }
  };

  const publish = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitLock.current) return;
    if (!userProfile) { setPublicationError('Войди в аккаунт, чтобы опубликовать код. Черновик сохранён на устройстве.'); return; }
    if (!draft.title.trim() || !draft.code.trim()) { setPublicationError('Добавь название и код.'); return; }
    if (/(lesson_solution|challenge_answer)/i.test(draft.title)) { setPublicationError('В галерее не публикуются готовые ответы на задания.'); return; }
    submitLock.current = true;
    setSubmitting(true);
    setPublicationError('');
    try {
      await postAuthenticated('/community/snippets', { title: draft.title.trim(), description: draft.description, code: draft.code, tags: [...new Set(draft.tags.split(',').map((tag) => tag.trim()).filter(Boolean))].slice(0, 8) });
      setCreateOpen(false);
      setDraft({ ...emptyDraft });
      writeDraft('gallery:new', '');
      toast.success('Код опубликован.');
      void fetchSnippets();
    } catch (error) {
      console.error('Publication failed', error);
      setPublicationError('Публикация не подтверждена. Черновик сохранён. Проверь галерею перед повторной отправкой.');
    } finally { submitLock.current = false; setSubmitting(false); }
  };

  const postComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (commentLock.current || !selected || !commentDraft.trim()) return;
    if (!userProfile) { setCommentsError('Войди в аккаунт, чтобы оставить комментарий.'); return; }
    const snippetId = selected.id;
    commentLock.current = true;
    setPostingComment(true);
    try {
      const result = await postAuthenticated<{ commentCount: number }>('/community/snippets/comments', { snippetId, text: commentDraft.trim() });
      updateSnippet(snippetId, { commentCount: result.commentCount });
      if (selectedIdRef.current === snippetId) {
        setCommentDraft('');
        void fetchComments(snippetId);
      }
    } catch (error) {
      console.error('Comment publication failed', error);
      if (selectedIdRef.current === snippetId) setCommentsError('Не удалось подтвердить отправку. Текст комментария сохранён в поле.');
    } finally { commentLock.current = false; setPostingComment(false); }
  };

  const share = async (id: string) => {
    const url = `${window.location.origin}/gallery?snippet=${encodeURIComponent(id)}`;
    try { await navigator.clipboard.writeText(url); toast.success('Ссылка скопирована.'); }
    catch { toast.info(url, { duration: 10000, description: 'Скопируй ссылку вручную.' }); }
  };
  const collaborate = (snippet: Snippet) => {
    if (!currentUser) { setActionError('Войди в аккаунт, чтобы создать совместную сессию. Код можно запускать здесь без входа.'); return; }
    const id = crypto.randomUUID();
    writeDraft(`sandbox:${id}`, readDraft(`gallery:${snippet.id}`, snippet.code));
    navigate(`/sandbox/${id}`);
  };
  const filtered = snippets.filter((item) => `${item.title} ${(item.tags ?? []).join(' ')}`.toLocaleLowerCase('ru').includes(search.toLocaleLowerCase('ru'))).sort((a, b) => sort === 'stars' ? (b.stars ?? 0) - (a.stars ?? 0) : 0);
  const reactionButtons = (snippet: Snippet) => <>
    <button aria-label={`Нравится: ${snippet.likes ?? 0}`} disabled={pendingIds.includes(snippet.id)} onClick={() => void reactToSnippet(snippet, 'like')} className="min-h-11 flex gap-2 items-center px-2 rounded hover:bg-white/10 disabled:opacity-40"><Heart size={18} aria-hidden="true" />{snippet.likes ?? 0}</button>
    <button aria-label={`Избранное: ${snippet.stars ?? 0}`} aria-pressed={(snippet.starredBy ?? []).includes(userProfile?.uid ?? '')} disabled={pendingIds.includes(snippet.id)} onClick={() => void reactToSnippet(snippet, 'star')} className="min-h-11 flex gap-2 items-center px-2 rounded hover:bg-white/10 disabled:opacity-40"><Star size={18} aria-hidden="true" />{snippet.stars ?? 0}</button>
  </>;

  return <div className="pt-24 pb-10 px-4 md:px-6 max-w-6xl mx-auto text-white min-h-screen">
    <header className="flex flex-wrap justify-between items-start gap-4 mb-6">
      <div><h1 className="text-3xl font-semibold">Галерея кода</h1><p className="text-gray-300 mt-2">Примеры участников: читай, запускай и обсуждай Python-код.</p></div>
      <button onClick={() => setCreateOpen(true)} className="min-h-11 flex gap-2 items-center px-4 rounded-lg bg-brand-primary text-black font-semibold"><Plus size={18} />Опубликовать код</button>
    </header>
    <div className="flex flex-wrap gap-3 mb-5">
      <input aria-label="Поиск по названию и тегам" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Название или тег" className="min-h-11 w-full sm:w-64 px-3 bg-black/20 border border-white/20 rounded-lg text-base" />
      <select aria-label="Порядок публикаций" value={sort} onChange={(event) => setSort(event.target.value)} className="min-h-11 px-3 bg-[#10191c] border border-white/20 rounded-lg"><option value="latest">Сначала новые</option><option value="stars">По избранному</option></select>
    </div>
    {actionError && <p role="status" className="text-amber-200 mb-4">{actionError}</p>}
    {loading && <p role="status" className="flex gap-2 items-center py-8 text-gray-200"><Loader2 size={18} className="animate-spin" />Загрузка публикаций…</p>}
    {loadError && <div role="alert" className="border border-amber-700 rounded-lg p-4 mb-5"><p className="text-amber-100">{loadError}</p><button onClick={() => void fetchSnippets()} className="min-h-11 mt-2 underline">Повторить загрузку</button></div>}
    {!loading && !loadError && !filtered.length && <p className="py-8 text-gray-300">{search ? 'По этому запросу ничего не найдено. Попробуй другое название или тег.' : 'Публикаций пока нет. Можно поделиться своим примером кода.'}</p>}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.map((snippet) => <article key={snippet.id} className="border border-white/15 rounded-lg p-5 min-w-0 flex flex-col gap-3">
      <Link to={`/u/${encodeURIComponent(snippet.authorName)}`} className="text-sm text-emerald-200 break-words">{snippet.authorName}</Link>
      <h2 className="text-xl font-semibold break-words">{snippet.title}</h2><p className="text-sm text-gray-300 line-clamp-3">{snippet.description}</p>
      <p className="text-xs text-gray-300 break-words">{(snippet.tags ?? []).map((tag) => `#${tag}`).join(' ')}</p>
      <div className="flex items-center gap-1 mt-auto text-gray-200">{reactionButtons(snippet)}<span className="flex gap-1 items-center text-xs ml-1" aria-label={`Комментариев: ${snippet.commentCount ?? 0}`}><MessageSquare size={16} aria-hidden="true" />{snippet.commentCount ?? 0}</span><button onClick={() => setSelected(snippet)} aria-label={`Открыть код: ${snippet.title}`} className="min-w-11 min-h-11 ml-auto flex items-center justify-center rounded border border-white/20"><ArrowRight size={18} /></button></div>
    </article>)}</div>

    {createOpen && <div className="fixed inset-0 z-[200] bg-black/85 p-2 sm:p-5 flex items-center justify-center" onClick={(event) => { if (event.target === event.currentTarget && !submitting) setCreateOpen(false); }}>
      <div ref={createRef} role="dialog" aria-modal="true" aria-labelledby="publication-title" tabIndex={-1} className="w-full max-w-4xl max-h-[92dvh] overflow-y-auto bg-[#10191c] border border-white/20 rounded-xl p-4 sm:p-6">
        <div className="flex justify-between items-center gap-3 mb-4"><h2 id="publication-title" className="text-2xl font-semibold">Опубликовать код</h2><button aria-label="Закрыть публикацию" onClick={() => setCreateOpen(false)} className="min-w-11 min-h-11 flex justify-center items-center rounded hover:bg-white/10"><X size={20} /></button></div>
        <p className="text-sm text-gray-300 mb-4">Публикацию увидят участники сообщества. Черновик остаётся на устройстве до подтверждения отправки.</p>
        <form onSubmit={publish} className="space-y-4">
          <fieldset disabled={submitting} className="grid md:grid-cols-2 gap-4"><div className="space-y-4 min-w-0">
            <label className="block text-sm">Название<input required maxLength={100} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="block w-full min-h-11 mt-1 px-3 bg-black/30 border border-white/20 rounded text-base" /></label>
            <label className="block text-sm">Описание<textarea maxLength={500} rows={3} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} className="block w-full mt-1 p-3 bg-black/30 border border-white/20 rounded text-base" /></label>
            <label className="block text-sm">Теги через запятую<input value={draft.tags} maxLength={260} onChange={(event) => setDraft({ ...draft, tags: event.target.value })} className="block w-full min-h-11 mt-1 px-3 bg-black/30 border border-white/20 rounded text-base" /></label>
          </div><div className="min-w-0"><p className="text-sm mb-2">Код Python</p><CodeEditor initialCode={draft.code} onChange={(code) => setDraft((previous) => ({ ...previous, code }))} hideControls readOnly={submitting} draftKey="gallery:new" /></div></fieldset>
          {!userProfile && <p className="text-amber-100">Войди в аккаунт для публикации. Подготовить код можно без входа.</p>}
          {publicationError && <p role="alert" className="text-red-200">{publicationError}</p>}
          <div className="flex flex-wrap justify-end gap-3"><button type="button" onClick={() => setCreateOpen(false)} className="min-h-11 px-4 border border-white/20 rounded-lg">Сохранить черновик и закрыть</button><button type="submit" disabled={submitting || !userProfile} className="min-h-11 px-4 bg-brand-primary text-black rounded-lg font-semibold disabled:opacity-40">{submitting ? 'Отправка…' : 'Опубликовать'}</button></div>
        </form>
      </div>
    </div>}

    {selected && <div className="fixed inset-0 z-[200] bg-black/85 p-2 sm:p-5 flex items-center justify-center" onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
      <div ref={detailRef} role="dialog" aria-modal="true" aria-labelledby="snippet-title" tabIndex={-1} className="w-full max-w-6xl max-h-[92dvh] overflow-y-auto bg-[#10191c] border border-white/20 rounded-xl p-4 sm:p-6">
        <header className="flex justify-between items-start gap-4 mb-4"><div className="min-w-0"><h2 id="snippet-title" className="text-2xl font-semibold break-words">{selected.title}</h2><p className="text-gray-300 text-sm mt-1">Автор: {selected.authorName}</p></div><button onClick={() => setSelected(null)} aria-label="Закрыть просмотр кода" className="min-w-11 min-h-11 flex items-center justify-center rounded hover:bg-white/10"><X size={20} /></button></header>
        {selected.description && <p className="text-gray-200 mb-4 break-words">{selected.description}</p>}
        <div className="flex flex-wrap gap-2 mb-4">{reactionButtons(selected)}<button onClick={() => void share(selected.id)} className="min-h-11 px-3 flex items-center gap-2 border border-white/20 rounded"><Share2 size={16} />Ссылка</button><button onClick={() => collaborate(selected)} className="min-h-11 px-3 flex items-center gap-2 border border-white/20 rounded"><Users size={16} />Совместный редактор</button></div>
        {actionError && <p role="status" className="text-amber-200 mb-4">{actionError}</p>}
        <CodeEditor key={selected.id} initialCode={selected.code} draftKey={`gallery:${selected.id}`} />
        <section className="mt-6"><h3 className="font-semibold text-xl mb-3">Комментарии ({selected.commentCount ?? 0})</h3>
          {commentsLoading && <p role="status" className="text-gray-300">Загрузка комментариев…</p>}
          {commentsError && <div role="alert" className="text-amber-100"><p>{commentsError}</p><button onClick={() => void fetchComments(selected.id)} className="min-h-11 underline">Повторить загрузку комментариев</button></div>}
          {!commentsLoading && !commentsError && !comments.length && <p className="text-gray-300 text-sm">Комментариев пока нет.</p>}
          <div className="max-h-72 overflow-auto space-y-4 my-4">{comments.map((comment) => <div key={comment.id}><p className="text-sm font-semibold text-emerald-200">{comment.authorName}</p><p className="text-gray-200 whitespace-pre-wrap break-words">{comment.text}</p></div>)}</div>
          <form onSubmit={postComment} className="flex flex-wrap gap-2"><input aria-label="Комментарий" placeholder={userProfile ? 'Написать комментарий' : 'Войди, чтобы оставить комментарий'} value={commentDraft} disabled={!userProfile} maxLength={1000} onChange={(event) => setCommentDraft(event.target.value)} className="min-w-0 flex-1 min-h-11 px-3 bg-black/30 border border-white/20 rounded text-base" /><button type="submit" disabled={postingComment || !commentDraft.trim() || !userProfile} className="min-h-11 px-4 bg-brand-primary text-black rounded font-semibold disabled:opacity-40">{postingComment ? 'Отправка…' : 'Отправить'}</button></form>
        </section>
      </div>
    </div>}
  </div>;
};
