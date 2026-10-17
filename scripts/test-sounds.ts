import assert from 'node:assert/strict';

let now = 1000;
let started = 0;
let stopped = 0;
let resumed = 0;
let resumeMode: 'resolve' | 'reject' | 'defer' = 'resolve';
let resolveResume: (() => void) | undefined;
const records = new Map<string, string>();
const handlers = new Map<string, (event: unknown) => void>();
const contexts: Context[] = [];
const generated: Float32Array[] = [];
const gains: number[] = [];
const automation = () => ({
  setValueAtTime(value: number) { gains.push(value); },
  setTargetAtTime(value: number) { gains.push(value); },
  cancelScheduledValues() {},
});
class Context {
  state: 'suspended' | 'running' | 'closed' = 'suspended';
  currentTime = 1; sampleRate = 48000; destination = {};
  constructor() { contexts.push(this); }
  createBuffer(_channels: number, length: number) {
    const samples = new Float32Array(length); generated.push(samples);
    return { getChannelData: () => samples };
  }
  createBufferSource() {
    return { buffer: null, onended: null, connect() {}, disconnect() {}, start() { started++; }, stop() { stopped++; } };
  }
  createGain() { return { gain: automation(), connect() {}, disconnect() {} }; }
  createDynamicsCompressor() {
    return { threshold: automation(), knee: automation(), ratio: automation(), attack: automation(), release: automation(), connect() {} };
  }
  resume() {
    resumed++;
    if (resumeMode === 'reject') return Promise.reject(new Error('Autoplay denied'));
    if (resumeMode === 'defer') return new Promise<void>(resolve => { resolveResume = () => { this.state = 'running'; resolve(); }; });
    this.state = 'running'; return Promise.resolve();
  }
}
class Control {
  constructor(public disabled = false, public silent = false) {}
  closest(selector: string) { return selector === '[data-ui-sound="off"]' ? (this.silent ? this : null) : this; }
  matches() { return this.disabled; }
}
Object.assign(globalThis, {
  performance: { now: () => now }, Element: Control,
  window: { AudioContext: Context, localStorage: { getItem: (key: string) => records.get(key) ?? null, setItem: (key: string, value: string) => records.set(key, value) } },
  document: { addEventListener: (name: string, fn: (event: unknown) => void) => handlers.set(name, fn), removeEventListener: (name: string) => handlers.delete(name) },
});
const { playSound, previewSound, toggleMute, getIsMuted, installInteractionSounds, getSoundVolume, setSoundVolume } = await import('../src/utils/sounds');
const settle = async () => { await Promise.resolve(); await Promise.resolve(); };

assert.equal(getIsMuted(), true);
assert.equal(getSoundVolume(), .65);
assert.equal(await previewSound(), 'muted');
playSound('click');
assert.equal(contexts.length, 0, 'No context or cue before opt-in, even for preview');
assert.equal(toggleMute(), false);
assert.equal(records.get('studypy_muted'), 'false');
setSoundVolume(0);
assert.equal(await previewSound(), 'silent');
assert.equal(contexts.length, 0, 'Zero-volume preview creates no context');
assert.equal(setSoundVolume(.7), .7);
assert.equal(records.get('studypy_sound_volume'), '0.7');
assert.equal(setSoundVolume(NaN), .7);
assert.equal(setSoundVolume(2), 1);
assert.equal(setSoundVolume(-2), 0);
setSoundVolume(.65);

resumeMode = 'reject';
assert.equal(await previewSound(), 'blocked');
assert.equal(started, 0, 'Failed autoplay is reported without a source');
resumeMode = 'resolve';
playSound('click');
await settle();
assert.equal(started, 1, 'The next gesture retries resume without consuming the failed cue throttle');
assert.equal(resumed, 2);
assert.equal(contexts[0].state, 'running');
playSound('click');
assert.equal(started, 1, 'Global and local handlers cannot duplicate one click');
playSound('typing');
playSound('success');
assert.equal(started, 4, 'Typing, click and success have independent throttles');
assert.equal(await previewSound(), 'played');
assert.equal(started, 5, 'An explicit preview is not swallowed by an ordinary click');

for (const samples of generated) {
  const peak = Math.max(...samples.map(Math.abs));
  const rms = Math.sqrt(samples.reduce((sum, value) => sum + value * value, 0) / samples.length);
  assert.ok(peak > .77 && peak < .79, 'Tap normalization retains predictable headroom');
  assert.ok(rms > .08 && rms < .35, 'The generated tap has a meaningful short body');
  assert.equal(Math.abs(samples[0]), 0, 'Attack begins without an impulse');
  assert.ok(Math.abs(samples[samples.length - 1]) < .00001, 'Tail ends without a click discontinuity');
}
assert.ok(gains.includes(.65), 'Saved master volume reaches the graph');
assert.ok(gains.includes(-14) && gains.includes(3), 'Output compression keeps overlapping cues controlled');
assert.equal(toggleMute(), true);
assert.ok(stopped >= 5, 'Muting stops every scheduled/active source');
assert.equal(records.get('studypy_muted'), 'true');
now += 100;
playSound('success');
assert.equal(await previewSound(), 'muted');
assert.equal(started, 5);

// A pending resume cannot replay old feedback after mute/unmute.
toggleMute();
contexts[0].state = 'suspended';
resumeMode = 'defer';
playSound('message');
playSound('message');
assert.equal(resumed, 3, 'Only one resume request for the same pending cue');
toggleMute(); toggleMute();
resolveResume!();
await settle();
assert.equal(started, 5, 'A cue queued before mute stays cancelled after unmuting');
resumeMode = 'resolve';
now += 100;
playSound('message');
assert.equal(started, 6, 'Muted pending cues do not consume the successful-play throttle');
contexts[0].state = 'suspended';
resumeMode = 'defer';
assert.equal(await previewSound('buy'), 'blocked', 'A browser that never settles resume cannot leave preview pending forever');
resolveResume!();
await settle();
assert.equal(started, 6, 'Late resume after timeout cannot play an obsolete cue');
resumeMode = 'resolve';
contexts[0].state = 'closed';
now += 100;
assert.equal(await previewSound('typing'), 'played');
assert.equal(contexts.length, 2, 'A closed context is recreated and resumes');

const remove = installInteractionSounds();
assert.equal(handlers.size, 1);
now += 100;
const beforeControls = started;
handlers.get('click')!({ target: new Control(true) });
handlers.get('click')!({ target: new Control(false, true) });
assert.equal(started, beforeControls, 'Disabled and silent controls do not play');
handlers.get('click')!({ target: new Control(), detail: 0 });
assert.equal(started, beforeControls + 1, 'Keyboard activation has the same feedback');
remove();
assert.equal(handlers.size, 0);
toggleMute();
assert.equal(getIsMuted(), true, 'Cleanup leaves the app muted');
console.log('Sound behavior passed: default mute, persisted opt-in/volume, zero volume, bounded tap PCM, compression, rejected/pending resume, independent throttle, explicit preview, cancellation, context recovery and keyboard controls.');
