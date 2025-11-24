import { SynthPreset } from '../types';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private oscillators: Map<number, { osc: OscillatorNode; gain: GainNode }> = new Map();
  private masterGain: GainNode | null = null;
  private preset: SynthPreset = SynthPreset.PIANO;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.4;
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public setPreset(preset: SynthPreset) {
    this.preset = preset;
  }

  public setVolume(val: number) {
    if (this.masterGain) {
      // Linear volume control
      this.masterGain.gain.value = val / 100;
    }
  }

  public playNote(frequency: number) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    if (this.oscillators.has(frequency)) return; // Already playing

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Sound Design based on preset
    switch (this.preset) {
      case SynthPreset.PIANO:
        osc.type = 'triangle';
        break;
      case SynthPreset.STRINGS:
        osc.type = 'sawtooth';
        break;
      case SynthPreset.SYNTH:
        osc.type = 'square';
        break;
      case SynthPreset.ORGAN:
        osc.type = 'sine';
        break;
      default:
        osc.type = 'sine';
    }

    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
    
    // Envelope: Attack
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();

    this.oscillators.set(frequency, { osc, gain });
  }

  public stopNote(frequency: number) {
    if (!this.ctx) return;
    const active = this.oscillators.get(frequency);
    if (active) {
      // Envelope: Release
      const { osc, gain } = active;
      const releaseTime = this.preset === SynthPreset.STRINGS ? 0.5 : 0.1;
      
      gain.gain.cancelScheduledValues(this.ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + releaseTime);
      
      osc.stop(this.ctx.currentTime + releaseTime);
      setTimeout(() => {
        osc.disconnect();
        gain.disconnect();
      }, releaseTime * 1000 + 100);
      
      this.oscillators.delete(frequency);
    }
  }
}

export const audioEngine = new AudioEngine();