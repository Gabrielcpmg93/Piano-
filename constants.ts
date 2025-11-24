import { Note } from './types';

// Generate 2 octaves starting from C3
export const NOTES: Note[] = [
  { name: 'C3', frequency: 130.81, type: 'white', key: 'z' },
  { name: 'C#3', frequency: 138.59, type: 'black', key: 's' },
  { name: 'D3', frequency: 146.83, type: 'white', key: 'x' },
  { name: 'D#3', frequency: 155.56, type: 'black', key: 'd' },
  { name: 'E3', frequency: 164.81, type: 'white', key: 'c' },
  { name: 'F3', frequency: 174.61, type: 'white', key: 'v' },
  { name: 'F#3', frequency: 185.00, type: 'black', key: 'g' },
  { name: 'G3', frequency: 196.00, type: 'white', key: 'b' },
  { name: 'G#3', frequency: 207.65, type: 'black', key: 'h' },
  { name: 'A3', frequency: 220.00, type: 'white', key: 'n' },
  { name: 'A#3', frequency: 233.08, type: 'black', key: 'j' },
  { name: 'B3', frequency: 246.94, type: 'white', key: 'm' },
  
  { name: 'C4', frequency: 261.63, type: 'white', key: 'q' },
  { name: 'C#4', frequency: 277.18, type: 'black', key: '2' },
  { name: 'D4', frequency: 293.66, type: 'white', key: 'w' },
  { name: 'D#4', frequency: 311.13, type: 'black', key: '3' },
  { name: 'E4', frequency: 329.63, type: 'white', key: 'e' },
  { name: 'F4', frequency: 349.23, type: 'white', key: 'r' },
  { name: 'F#4', frequency: 369.99, type: 'black', key: '5' },
  { name: 'G4', frequency: 392.00, type: 'white', key: 't' },
  { name: 'G#4', frequency: 415.30, type: 'black', key: '6' },
  { name: 'A4', frequency: 440.00, type: 'white', key: 'y' },
  { name: 'A#4', frequency: 466.16, type: 'black', key: '7' },
  { name: 'B4', frequency: 493.88, type: 'white', key: 'u' },
  { name: 'C5', frequency: 523.25, type: 'white', key: 'i' },
];