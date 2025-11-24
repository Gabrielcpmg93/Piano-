export interface Note {
  name: string;
  frequency: number;
  type: 'white' | 'black';
  key: string; // Keyboard mapping
}

export enum SynthPreset {
  PIANO = 'Grand Piano',
  STRINGS = 'Soft Strings',
  SYNTH = 'Super Saw',
  ORGAN = 'Jazz Organ',
  CHOIR = 'Choir Aahs'
}

export interface ControlState {
  tempo: number;
  volume: number;
  transpose: number;
  selectedPreset: SynthPreset;
  isPlaying: boolean;
  activeStyle: string;
}
