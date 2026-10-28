/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Synthesized audio manager using Web Audio API for 2000s Korean casual game feel
class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private sfxVol: number = 0.8;
  private bgmVol: number = 0.4;
  private bgmInterval: NodeJS.Timeout | null = null;
  private isBgmPlaying: boolean = false;

  constructor() {}

  public initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isBgmPlaying) {
      this.stopBGM();
    } else if (!muted && !this.isBgmPlaying && typeof window !== 'undefined') {
      this.startBGM();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolumes(sfx: number, bgm: number) {
    this.sfxVol = Math.max(0, Math.min(1, sfx / 100));
    this.bgmVol = Math.max(0, Math.min(1, bgm / 100));
  }

  public setBgmVolume(val: number) {
    this.bgmVol = Math.max(0, Math.min(1, val / 100));
  }

  public setSfxVolume(val: number) {
    this.sfxVol = Math.max(0, Math.min(1, val / 100));
  }

  public playClick() {
    this.playJellyPop();
  }

  public playChime() {
    this.playSuccessChime();
  }

  public playFanfare() {
    this.playSuccessChime();
  }

  // Bouncy jelly button click ("뿅")
  public playJellyPop() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.25 * this.sfxVol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Typewriter text click (타닥타닥)
  public playTypewriter() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800 + Math.random() * 200, now);

    gain.gain.setValueAtTime(0.08 * this.sfxVol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  // Knife chopping on cutting board (탁! 탁!)
  public playChop() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(260 + Math.random() * 60, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.06);

    gain.gain.setValueAtTime(0.3 * this.sfxVol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  // Water pouring / draining
  public playWaterPour() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(360, now + 0.14);

    gain.gain.setValueAtTime(0.2 * this.sfxVol, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);
  }

  // Boiling bubble sound
  public playBoilBubble() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startFreq = 240 + Math.random() * 140;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 1.6, now + 0.07);

    gain.gain.setValueAtTime(0.18 * this.sfxVol, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  // Sizzle sound for frying pan
  public playSizzle() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(700 + Math.random() * 300, now);

    gain.gain.setValueAtTime(0.15 * this.sfxVol, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Topping drop (plop)
  public playToppingDrop() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(270, now + 0.1);

    gain.gain.setValueAtTime(0.3 * this.sfxVol, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Timer ding (불 끄기)
  public playTimerDing() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now); // B5 bell
    osc.frequency.exponentialRampToValueAtTime(493.88, now + 0.35);

    gain.gain.setValueAtTime(0.35 * this.sfxVol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Coin collect
  public playCoin() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [987.77, 1318.51].forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const start = now + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.25 * this.sfxVol, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(start);
      osc.stop(start + 0.2);
    });
  }

  // Combo burst chime (rising notes based on combo count)
  public playCombo(combo: number) {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const baseFreq = 440 * Math.pow(1.12, Math.min(10, combo));
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.12);

    gain.gain.setValueAtTime(0.35 * this.sfxVol, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Heart affinity increase chime
  public playHeartChime() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const start = now + idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.25 * this.sfxVol, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(start);
      osc.stop(start + 0.25);
    });
  }

  // Perfect 5-star fanfare
  public playSuccessChime() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const start = now + i * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.3 * this.sfxVol, start);
      gain.gain.exponentialRampToValueAtTime(0.005, start + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(start);
      osc.stop(start + 0.35);
    });
  }

  // Mistake sound
  public playMistake() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.3);

    gain.gain.setValueAtTime(0.2 * this.sfxVol, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Camera shutter snap
  public playCameraShutter() {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(950, now);
    osc1.frequency.exponentialRampToValueAtTime(220, now + 0.04);
    gain1.gain.setValueAtTime(0.3 * this.sfxVol, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.04);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1500, now + 0.06);
    osc2.frequency.exponentialRampToValueAtTime(450, now + 0.16);
    gain2.gain.setValueAtTime(0.35 * this.sfxVol, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.06);
    osc2.stop(now + 0.16);
  }

  // Cheol-woong vocal reaction sound (pitch shifts depending on mood)
  public playCheolwoongVoice(mood: 'normal' | 'smile' | 'touched' | 'shocked' | 'pout' | 'serious' | 'sleepy' = 'normal') {
    if (this.isMuted || this.sfxVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const moodFreqs = {
      normal: 360,
      smile: 520,
      touched: 480,
      shocked: 240,
      pout: 300,
      serious: 280,
      sleepy: 200,
    };

    const freq = moodFreqs[mood] || 360;
    osc.type = mood === 'shocked' ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.linearRampToValueAtTime(freq + (mood === 'smile' ? 80 : -40), now + 0.09);

    gain.gain.setValueAtTime(0.25 * this.sfxVol, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Synthesized cozy background music loop (Korean casual arcade style)
  public startBGM() {
    if (this.isBgmPlaying || this.isMuted || this.bgmVol <= 0) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isBgmPlaying = true;
    const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // C D E G A C (Pentatonic)
    let step = 0;

    this.bgmInterval = setInterval(() => {
      if (this.isMuted || this.bgmVol <= 0 || !this.ctx) return;
      const now = this.ctx.currentTime;
      const note = scale[step % scale.length];
      step++;

      // Gentle soft marimba-like pluck
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now);

      const vol = 0.07 * this.bgmVol;
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    }, 450);
  }

  public stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.isBgmPlaying = false;
  }
}

export const soundManager = new SoundManager();
