/** Browser-side checks provide learning feedback, not a trusted competitive result. */
export interface PythonTest {
  stdin?: string[];
  setup?: string;
  expression?: string;
  expectedOutput?: string;
  /** Output of the checked function call, independent of main-program stdout. */
  expectedCallOutput?: string;
  expectedValue?: unknown;
  description?: string;
}

export interface ExecutionStep {
  line: number;
  variables: Record<string, unknown>;
  output: string;
  event: 'line' | 'return' | 'exception';
  functionName: string;
}

export interface PythonTestResult {
  passed: boolean;
  message: string;
  actualOutput: string;
  actualCallOutput?: string;
  actualValue?: unknown;
  error?: string;
}

export interface PythonRunResult {
  status: 'completed' | 'error' | 'cancelled' | 'timeout';
  output: string;
  error?: string;
  tests: PythonTestResult[];
  passed: boolean;
  value?: unknown;
  steps?: ExecutionStep[];
  traceTruncated?: boolean;
}

export interface PythonRunOptions {
  code: string;
  tests?: PythonTest[];
  stdin?: string[];
  setup?: string;
  expression?: string;
  trace?: boolean;
  timeoutMs?: number;
  outputLimit?: number;
  signal?: AbortSignal;
  onStatus?: (status: 'loading' | 'running') => void;
}

export type WorkerRequest = Omit<PythonRunOptions, 'signal' | 'onStatus'>;
export type WorkerResponse = { type: 'ready' } | { type: 'result'; result: PythonRunResult };
