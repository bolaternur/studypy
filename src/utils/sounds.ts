import { readString, writeString, STORAGE_KEYS } from './storage';

export type SoundName = 'success' | 'click' | 'levelUp' | 'message' | 'buy' | 'typing' | 'error';
export type SoundPlaybackResult = 'played' | 'muted' | 'silent' | 'unavailable' | 'blocked';

const VOLUME_KEY = 'studypy_sound_volume';
const DEFAULT_VOLUME = .65;
const storedVolume = readString(VOLUME_KEY);
const parsedVolume = storedVolume === null || storedVolume.trim() === '' ? NaN : Number(storedVolume);
let volume = Number.isFinite(parsedVolume) && parsedVolume >= 0 && parsedVolume <= 1 ? parsedVolume : DEFAULT_VOLUME;
let isMuted = readString(STORAGE_KEYS.muted) !== 'false';
let context: AudioContext | null = null;
let output: GainNode | null = null;
let compressor: DynamicsCompressorNode | null = null;
let generation = 0;
const voices = new Set<AudioBufferSourceNode>();
const lastPlayed = new Map<SoundName, number>();
const pending = new Set<SoundName>();
const buffers = new Map<string, AudioBuffer>();
const cues: Record<SoundName, { pitches: number[]; gain: number; duration: number }> = {
  click: { pitches: [185], gain: .72, duration: .085 },
  typing: { pitches: [225], gain: .52, duration: .06 },
  success: { pitches: [240, 300], gain: .64, duration: .11 },
  levelUp: { pitches: [210, 270, 330], gain: .62, duration: .12 },
  message: { pitches: [260], gain: .62, duration: .1 },
  buy: { pitches: [225, 285], gain: .62, duration: .1 },
  error: { pitches: [145], gain: .64, duration: .1 },
};

/** A short wooden/key tap: low-passed noise and a damped body, rather than an alert beep. */
function tapBuffer(audio: AudioContext, pitch: number, duration: number): AudioBuffer {
  const key = pitch + ':' + duration;
  const cached = buffers.get(key);
  if (cached) return cached;
  const buffer = audio.createBuffer(1, Math.ceil(duration * audio.sampleRate), audio.sampleRate);
  const samples = buffer.getChannelData(0);
  let seed = 123456789 + pitch;
  let softNoise = 0;
  let peak = 0;
  const cutoff = 1 - Math.exp(-2 * Math.PI * 1800 / audio.sampleRate);
  for (let i = 0; i < samples.length; i++) {
    const time = i / audio.sampleRate;
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    const noise = (seed >>> 0) / 2147483648 - 1;
    softNoise += cutoff * (noise - softNoise);
    const attack = Math.min(1, time / .0025);
    const tail = Math.max(0, 1 - time / duration);
    const body = Math.sin(2 * Math.PI * pitch * time) * Math.exp(-time * 62)
      + .22 * Math.sin(2 * Math.PI * pitch * 2.37 * time) * Math.exp(-time * 95);
    samples[i] = attack * tail * tail * (.52 * body + .9 * softNoise * Math.exp(-time * 115));
    peak = Math.max(peak, Math.abs(samples[i]));
  }
  // Predictable headroom across devices/sample rates; the master volume controls loudness.
  if (peak > 0) for (let i = 0; i < samples.length; i++) samples[i] *= .78 / peak;
  buffers.set(key, buffer);
  return buffer;
}

function audioContext(): AudioContext | null {
  if (context && context.state !== 'closed') return context;
  if (typeof window === 'undefined') return null;
  const Audio = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Audio) return null;
  context = new Audio();
  buffers.clear();
  output = context.createGain();
  output.gain.setValueAtTime(isMuted ? 0 : volume, context.currentTime);
  compressor = context.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-14, context.currentTime);
  compressor.knee.setValueAtTime(16, context.currentTime);
  compressor.ratio.setValueAtTime(3, context.currentTime);
  compressor.attack.setValueAtTime(.004, context.currentTime);
  compressor.release.setValueAtTime(.08, context.currentTime);
  output.connect(compressor);
  compressor.connect(context.destination);
  return context;
}

function updateVolume(): void {
  if (!context || !output || context.state === 'closed') return;
  output.gain.cancelScheduledValues(context.currentTime);
  output.gain.setTargetAtTime(isMuted ? 0 : volume, context.currentTime, .012);
}

export const getIsMuted = (): boolean => isMuted;
export const getSoundVolume = (): number => volume;

/** Normalized 0..1 volume, persisted independently from the on/off setting. */
export const setSoundVolume = (next: number): number => {
  if (!Number.isFinite(next)) return volume;
  volume = Math.max(0, Math.min(1, next));
  writeString(VOLUME_KEY, String(volume));
  updateVolume();
  return volume;
};

export const toggleMute = (): boolean => {
  isMuted = !isMuted;
  generation++;
  writeString(STORAGE_KEYS.muted, String(isMuted));
  updateVolume();
  if (isMuted) {
    for (const voice of voices) { try { voice.stop(); } catch { /* Already ended. */ } }
    voices.clear();
  }
  // Keep an already-unlocked context available: suspend/resume racing with the
  // next click used to lose its sound. A muted app starts no new sources.
  return isMuted;
};

async function requestSound(type: SoundName, preview: boolean): Promise<SoundPlaybackResult> {
  if (isMuted) return 'muted';
  if (volume === 0) return 'silent';
  const now = performance.now();
  if (!preview && (pending.has(type) || now - (lastPlayed.get(type) ?? -Infinity) < (type === 'typing' ? 70 : 85))) return 'silent';
  const requestedGeneration = generation;
  if (!preview) pending.add(type);
  try {
    const audio = audioContext();
    if (!audio || !output) return 'unavailable';
    // Invoked synchronously from the original gesture; do not delay resume behind a timer.
    if (audio.state !== 'running') {
      let timer: ReturnType<typeof setTimeout> | undefined;
      try {
        const resumed = await Promise.race([
          audio.resume().then(() => true, () => false),
          new Promise<boolean>(resolve => { timer = setTimeout(() => resolve(false), 2000); }),
        ]);
        if (!resumed) return 'blocked';
      } catch { return 'blocked'; }
      finally { if (timer !== undefined) clearTimeout(timer); }
    }
    if (isMuted || requestedGeneration !== generation) return 'muted';
    if (volume === 0) return 'silent';
    if (audio.state !== 'running' || audio !== context) return 'blocked';
    const cue = cues[type];
    const start = audio.currentTime;
    cue.pitches.forEach((pitch, index) => {
      const source = audio.createBufferSource();
      const gain = audio.createGain();
      source.buffer = tapBuffer(audio, pitch, cue.duration);
      gain.gain.setValueAtTime(cue.gain, start);
      source.connect(gain);
      gain.connect(output!);
      voices.add(source);
      source.onended = () => { voices.delete(source); source.disconnect(); gain.disconnect(); };
      source.start(start + index * .075);
    });
    lastPlayed.set(type, performance.now());
    return 'played';
  } catch { return 'unavailable'; }
  finally { if (!preview) pending.delete(type); }
}

/** Optional local feedback, never enabled before opt-in. Different cue types do not suppress each other. */
export const playSound = (type: SoundName): void => { void requestSound(type, false); };

/** Explicit UI preview bypasses duplicate-click throttling, but honors mute and zero volume. */
export const previewSound = (type: SoundName = 'click'): Promise<SoundPlaybackResult> => requestSound(type, true);

/** Native clicks include activation with Enter/Space; text entry stays quiet. */
export function installInteractionSounds() {
  const click = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const control = event.target.closest<HTMLElement>('button,a[href],summary,select,input[type="checkbox"],input[type="radio"],[role="button"]');
    if (!control || control.closest('[data-ui-sound="off"]') || control.matches(':disabled,[aria-disabled="true"]')) return;
    playSound('click');
  };
  document.addEventListener('click', click, true);
  return () => document.removeEventListener('click', click, true);
}
