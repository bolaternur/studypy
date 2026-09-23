import { readString, writeString, STORAGE_KEYS } from './storage';

const sounds = {
  success: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  levelUp: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3',
  message: 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
  buy: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3',
  typing: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3',
};

export type SoundName = keyof typeof sounds;

let isMuted = readString(STORAGE_KEYS.muted) === 'true';
const audioCache = new Map<SoundName, HTMLAudioElement>();

/**
 * Audio elements are created on first use rather than at import time.
 * Eagerly constructing all seven cost every visitor seven cross-origin
 * requests before they had clicked anything — and muted visitors never
 * need them at all.
 */
const getAudio = (type: SoundName): HTMLAudioElement | null => {
  const cached = audioCache.get(type);
  if (cached) return cached;

  if (typeof Audio === 'undefined') return null;

  const audio = new Audio(sounds[type]);
  audio.preload = 'auto';
  audio.volume = 0.3;
  audioCache.set(type, audio);
  return audio;
};

export const toggleMute = (): boolean => {
  isMuted = !isMuted;
  writeString(STORAGE_KEYS.muted, String(isMuted));

  if (isMuted) {
    for (const audio of audioCache.values()) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
  return isMuted;
};

export const getIsMuted = (): boolean => isMuted;

export const playSound = (type: SoundName): void => {
  if (isMuted) return;

  try {
    const audio = getAudio(type);
    if (!audio) return;

    // Cloning lets the same cue overlap with itself on rapid interactions.
    const clone = audio.cloneNode() as HTMLAudioElement;
    clone.volume = 0.3;
    // Autoplay is blocked until the first gesture; that rejection is expected.
    void clone.play().catch(() => undefined);
  } catch {
    /* audio is a nicety — never let it break an interaction */
  }
};
