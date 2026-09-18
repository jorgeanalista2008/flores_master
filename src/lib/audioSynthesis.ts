// Sintetizador Web Audio API para música romántica y efectos de sonido de Flores Amarillas

class MusicBoxAudio {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.35;
  private gainNode: GainNode | null = null;
  private loopTimer: NodeJS.Timeout | null = null;
  private scheduledOscillators: OscillatorNode[] = [];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Reproduce una nota con timbre dulce de cajita de música (campanitas / celesta)
  private playNote(freq: number, startTime: number, duration: number = 0.8) {
    if (!this.ctx) return;
    const now = startTime;

    // Oscilador fundamental (senoidal)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Oscilador de brillo armónico (triangular una octava arriba suave)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Envolvente de ganancia (ataque instantáneo y caída suave como caja de música)
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.3, now + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Segundo armónico muy suave
    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.05, now);
    osc2Gain.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.6));

    osc1.connect(noteGain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(noteGain);

    if (this.gainNode) {
      noteGain.connect(this.gainNode);
    } else {
      noteGain.connect(this.ctx.destination);
    }

    osc1.start(now);
    osc1.stop(now + duration);
    osc2.start(now);
    osc2.stop(now + duration);

    this.scheduledOscillators.push(osc1, osc2);
  }

  // Melodía inspirada en el motivo dulce de Flores Amarillas
  // Chords / Melody progression (D - A - Bm - G / E - F# - G - A...)
  private scheduleMelody(startOffset: number = 0): number {
    if (!this.ctx) return 0;
    const ctx = this.ctx;
    const start = ctx.currentTime + startOffset;

    // Frecuencias aproximadas (Escala de Re Mayor / Sol Mayor brillante)
    const N = {
      D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, Cs5: 554.37, D5: 587.33, E5: 659.25, Fs5: 739.99, G5: 783.99, A5: 880.00, B5: 987.77
    };

    // Secuencia de notas (nota, tiempo en compás, duración)
    const score: [number, number, number][] = [
      // Frase 1: "Él la estaba esperando con una flor amarilla..."
      [N.D5, 0.0, 0.5], [N.Fs5, 0.4, 0.5], [N.A5, 0.8, 0.6], [N.Fs5, 1.2, 0.5],
      [N.D5, 1.6, 0.5], [N.E5, 2.0, 0.7], [N.Fs5, 2.6, 0.6], [N.D5, 3.2, 0.8],
      // Bajos de acompañamiento dulce
      [N.D4, 0.0, 1.2], [N.A4, 0.8, 1.0], [N.D4, 1.6, 1.2], [N.A4, 2.4, 1.0],

      // Frase 2: "Ella lo estaba soñando con la luz en su pupila..."
      [N.B4, 4.0, 0.5], [N.D5, 4.4, 0.5], [N.G5, 4.8, 0.7], [N.Fs5, 5.4, 0.5],
      [N.E5, 6.0, 0.6], [N.D5, 6.6, 0.6], [N.Cs5, 7.2, 0.7],
      // Acompañamiento
      [N.G4, 4.0, 1.2], [N.D4, 4.8, 1.0], [N.A4, 5.6, 1.2], [N.E4, 6.4, 1.0],

      // Frase 3: Motivo del coro "Y te amaré... flores amarillas"
      [N.Fs5, 8.0, 0.6], [N.G5, 8.5, 0.5], [N.A5, 9.0, 0.9],
      [N.B5, 10.0, 0.6], [N.A5, 10.6, 0.6], [N.G5, 11.2, 0.6], [N.Fs5, 11.8, 0.8],
      [N.E5, 12.6, 0.5], [N.Fs5, 13.1, 0.5], [N.G5, 13.6, 0.8], [N.Fs5, 14.2, 0.6],
      [N.E5, 14.8, 0.6], [N.D5, 15.4, 1.4],
      // Acorde final brillante
      [N.D4, 15.4, 1.8], [N.Fs4, 15.6, 1.6], [N.A4, 15.8, 1.4], [N.D5, 16.0, 2.0]
    ];

    const totalDuration = 18.0; // Segundos por ciclo

    score.forEach(([freq, time, dur]) => {
      this.playNote(freq, start + time, dur);
    });

    return totalDuration;
  }

  public play() {
    if (this.isPlaying) return;
    try {
      const ctx = this.getContext();
      this.isPlaying = true;

      if (!this.gainNode) {
        this.gainNode = ctx.createGain();
        this.gainNode.gain.setValueAtTime(this.volume, ctx.currentTime);
        this.gainNode.connect(ctx.destination);
      }

      const loop = () => {
        if (!this.isPlaying) return;
        const duration = this.scheduleMelody(0.1);
        this.loopTimer = setTimeout(() => {
          if (this.isPlaying) {
            loop();
          }
        }, (duration - 0.2) * 1000);
      };

      loop();
    } catch (err) {
      console.warn('Audio play error:', err);
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    this.scheduledOscillators.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    this.scheduledOscillators = [];
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  // Efecto mágico de tintineo floral (campanita al hacer clic o abrir carta)
  public playChime() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6 arpegio mágico
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.65);
      });
    } catch {}
  }
}

export const musicBox = typeof window !== 'undefined' ? new MusicBoxAudio() : null;
