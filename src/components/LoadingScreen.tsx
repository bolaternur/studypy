/** SVG Ring adapted from Griffin Johnston / ldrs (MIT).
 * Critical shared styles live in index.html so bootstrap paints before app JS.
 * Source and license: docs/loader-attribution.md.
 */
export function LoadingScreen({ message = 'Загружаем раздел…' }: { message?: string }) {
  return (
    <div className="studypy-loading-screen" role="status" aria-live="polite" aria-busy="true">
      <p className="studypy-loading-brand">StudyPy</p>
      <svg className="studypy-loading-ring" viewBox="0 0 40 40" width="44" height="44" aria-hidden="true" focusable="false">
        <circle className="studypy-loading-ring__track" cx="20" cy="20" r="17" pathLength="100" strokeWidth="3" fill="none" />
        <circle className="studypy-loading-ring__arc" cx="20" cy="20" r="17" pathLength="100" strokeWidth="3" fill="none" />
      </svg>
      <p className="studypy-loading-label">{message}</p>
      <div className="studypy-loading-recovery">
        <p>Загрузка дольше обычного. Проверь подключение или обнови страницу.</p>
        <button type="button" className="studypy-loading-retry" onClick={() => window.location.reload()}>Обновить страницу</button>
      </div>
    </div>
  );
}
