async (page) => {
  // Run in a separate Playwright CLI session; this fixture never mounts the app or uses Firebase.
  const origin = new URL(page.url().startsWith('http') ? page.url() : 'http://127.0.0.1:3000').origin;
  const fixture = origin + '/__sound-smoke.html';
  await page.route(fixture, route => route.fulfill({ contentType: 'text/html', body: '<!doctype html><meta charset="utf-8"><title>StudyPy sound test</title><button id="enable">Enable explicitly and preview</button><button id="preview">Preview</button><button id="mute">Mute</button>' }));
  await page.goto(fixture);
  const initial = await page.evaluate(async () => {
    localStorage.removeItem('studypy_muted');
    localStorage.removeItem('pyquest_muted');
    localStorage.removeItem('studypy_sound_volume');
    const probe = window.__audioProbe = { contexts: [], sources: [], compressors: [], analysers: [], peakRMS: 0, results: [] };
    const NativeAudio = window.AudioContext;
    window.AudioContext = class extends NativeAudio {
      constructor(...args) { super(...args); probe.contexts.push(this); }
      createDynamicsCompressor() {
        const node = super.createDynamicsCompressor();
        const connect = node.connect.bind(node);
        const analyser = this.createAnalyser();
        analyser.fftSize = 1024;
        node.connect = (...args) => { connect(analyser); analyser.connect(...args); return args[0]; };
        probe.compressors.push(node); probe.analysers.push(analyser);
        return node;
      }
      createBufferSource() { const node = super.createBufferSource(); probe.sources.push(node); return node; }
    };
    probe.module = await import('/src/utils/sounds.ts');
    probe.poll = setInterval(() => {
      for (const analyser of probe.analysers) {
        const samples = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(samples);
        const rms = Math.sqrt(samples.reduce((sum, value) => sum + value * value, 0) / samples.length);
        probe.peakRMS = Math.max(probe.peakRMS, rms);
      }
    }, 3);
    document.querySelector('#enable').onclick = () => { if (probe.module.getIsMuted()) probe.module.toggleMute(); void probe.module.previewSound().then(result => probe.results.push(result)); };
    document.querySelector('#preview').onclick = () => void probe.module.previewSound().then(result => probe.results.push(result));
    document.querySelector('#mute').onclick = () => probe.module.toggleMute();
    const status = await probe.module.previewSound();
    return { status, contexts: probe.contexts.length, muted: probe.module.getIsMuted(), volume: probe.module.getSoundVolume() };
  });
  if (initial.status !== 'muted' || initial.contexts !== 0 || !initial.muted || initial.volume !== .65) throw new Error('Default must be off without creating Web Audio: ' + JSON.stringify(initial));
  await page.locator('#enable').click();
  await page.waitForFunction(() => window.__audioProbe.results.length === 1);
  await page.waitForFunction(() => window.__audioProbe.peakRMS > .02, null, { timeout: 4000 });
  const running = await page.evaluate(() => {
    const p = window.__audioProbe;
    return { state: p.contexts[0].state, result: p.results[0], rms: p.peakRMS, sources: p.sources.length };
  });
  if (running.state !== 'running' || running.result !== 'played' || running.rms < .02) throw new Error('First gesture must produce measurable Web Audio: ' + JSON.stringify(running));
  const behavior = await page.evaluate(async () => {
    const p = window.__audioProbe, audio = p.contexts[0], module = p.module;
    await audio.suspend();
    document.querySelector('#preview').textContent = 'Resume and preview';
    module.setSoundVolume(.4);
    return { suspended: audio.state, storedVolume: localStorage.getItem('studypy_sound_volume') };
  });
  if (behavior.suspended !== 'suspended' || behavior.storedVolume !== '0.4') throw new Error('Suspension/volume setup failed');
  await page.locator('#preview').click();
  await page.waitForFunction(() => window.__audioProbe.results.length === 2);
  const resumed = await page.evaluate(() => ({ state: window.__audioProbe.contexts[0].state, result: window.__audioProbe.results[1] }));
  if (resumed.state !== 'running' || resumed.result !== 'played') throw new Error('Gesture must resume the actual context');
  await page.waitForTimeout(100);
  const independent = await page.evaluate(async () => {
    const p = window.__audioProbe, module = p.module;
    const before = p.sources.length;
    module.playSound('click'); module.playSound('click'); module.playSound('typing'); module.playSound('success');
    const created = p.sources.length - before;
    module.setSoundVolume(0);
    const zero = await module.previewSound();
    return { created, zero, zeroStored: localStorage.getItem('studypy_sound_volume') };
  });
  if (independent.created !== 4 || independent.zero !== 'silent' || independent.zeroStored !== '0') throw new Error('Throttle/zero volume failed: ' + JSON.stringify(independent));
  await page.locator('#mute').click();
  const muted = await page.evaluate(async () => {
    const p = window.__audioProbe; p.module.setSoundVolume(.65);
    const before = p.sources.length;
    const status = await p.module.previewSound();
    return { status, unchangedSources: p.sources.length === before, storedMute: localStorage.getItem('studypy_muted') };
  });
  if (muted.status !== 'muted' || !muted.unchangedSources || muted.storedMute !== 'true') throw new Error('Mute did not persist/stop preview');

  // Listening artifact: render the exact generated live source buffers through the same gain/compressor settings offline.
  // This is an audio sample, separate from the running-context/analyser assertions above.
  const wave = await page.evaluate(async () => {
    const p = window.__audioProbe;
    const click = p.sources[0].buffer;
    const typing = p.sources.find(source => source.buffer.duration < .07).buffer;
    const offline = new OfflineAudioContext(1, 48000 * 2, 48000);
    const master = offline.createGain(); master.gain.value = .65;
    const compressor = offline.createDynamicsCompressor();
    for (const name of ['threshold', 'knee', 'ratio', 'attack', 'release']) compressor[name].value = p.compressors[0][name].value;
    master.connect(compressor); compressor.connect(offline.destination);
    const add = (buffer, at, level) => { const source = offline.createBufferSource(); const gain = offline.createGain(); source.buffer = buffer; gain.gain.value = level; source.connect(gain); gain.connect(master); source.start(at); };
    add(click, .1, .72); add(click, .5, .72);
    for (const at of [.95, 1.08, 1.21, 1.34]) add(typing, at, .52);
    const rendered = await offline.startRendering();
    const data = rendered.getChannelData(0);
    const bytes = new Uint8Array(44 + data.length * 2), view = new DataView(bytes.buffer);
    const ascii = (at, text) => { for (let i = 0; i < text.length; i++) view.setUint8(at + i, text.charCodeAt(i)); };
    ascii(0, 'RIFF'); view.setUint32(4, bytes.length - 8, true); ascii(8, 'WAVE'); ascii(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true); view.setUint32(24, 48000, true); view.setUint32(28, 96000, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true); ascii(36, 'data'); view.setUint32(40, data.length * 2, true);
    for (let i = 0; i < data.length; i++) view.setInt16(44 + i * 2, Math.round(Math.max(-1, Math.min(1, data[i])) * 32767), true);
    let binary = ''; for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
    clearInterval(p.poll);
    return { base64: btoa(binary), bytes: bytes.length, peak: Math.max(...data.map(Math.abs)), rms: Math.sqrt(data.reduce((sum, value) => sum + value * value, 0) / data.length) };
  });
  await page.reload();
  const persisted = await page.evaluate(async () => { const module = await import('/src/utils/sounds.ts'); return { muted: module.getIsMuted(), volume: module.getSoundVolume(), status: await module.previewSound() }; });
  if (!persisted.muted || persisted.volume !== .65 || persisted.status !== 'muted') throw new Error('Reload must preserve the explicit mute and volume');
  return { passed: true, initial, running, resumed, independent, muted, persisted, listeningArtifact: { ...wave, note: 'Offline PCM of the same live-generated buffers and graph settings; not a recording of physical speakers.' } };
}
