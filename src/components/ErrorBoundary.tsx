import { Component, type ErrorInfo, type ReactNode } from 'react';
import { RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches render-time failures — including a lazy route chunk that fails to
 * load on a flaky connection — so a single broken screen cannot leave the
 * visitor staring at a blank document.
 *
 * Deliberately shows the error message but no stack and no user identifiers:
 * this text ends up in screenshots and support tickets.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[StudyPy] Unhandled render error:', error.message, info.componentStack);
  }

  private handleRetry = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div
        role="alert"
        className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center"
      >
        <div>
          <p className="type-eyebrow mb-5">что-то пошло не так</p>
          <h1 className="type-display text-[clamp(2rem,6vw,3.75rem)]">
            Экран не загрузился
          </h1>
          <p className="mx-auto mt-6 max-w-md leading-relaxed text-ink-50">
            Обычно помогает перезагрузка — часть страницы могла не догрузиться
            из-за обрыва сети.
          </p>
          <p className="mx-auto mt-4 max-w-md font-mono text-xs text-ink-30">
            {error.message}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={this.handleRetry}
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-400 px-7 py-3.5 font-semibold text-[#04070a] transition-transform hover:scale-[1.03]"
          >
            <RotateCcw className="h-4 w-4" />
            Попробовать снова
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-hairline px-7 py-3.5 font-medium text-ink-70 transition-colors hover:border-emerald-400/40 hover:text-ink-100"
          >
            <Home className="h-4 w-4" />
            На главную
          </a>
        </div>
      </div>
    );
  }
}
