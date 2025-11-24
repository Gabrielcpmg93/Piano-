import React from 'react';
import { NOTES } from '../constants';
import { audioEngine } from '../services/AudioEngine';

interface KeyboardProps {
  onNotePlay: (note: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onNotePlay }) => {
  const [activeNotes, setActiveNotes] = React.useState<Set<string>>(new Set());

  const handleNoteStart = (note: typeof NOTES[0]) => {
    audioEngine.playNote(note.frequency);
    setActiveNotes(prev => new Set(prev).add(note.name));
    onNotePlay(note.name);
  };

  const handleNoteStop = (note: typeof NOTES[0]) => {
    audioEngine.stopNote(note.frequency);
    setActiveNotes(prev => {
      const next = new Set(prev);
      next.delete(note.name);
      return next;
    });
  };

  return (
    <div className="relative h-full flex select-none overflow-hidden bg-black pl-1 border-t-4 border-red-900 shadow-[inset_0_5px_10px_rgba(0,0,0,0.8)]">
      {/* Red Felt Strip at the top of keys */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-red-800 z-0 shadow-inner"></div>
      
      {NOTES.map((note, index) => {
        const isActive = activeNotes.has(note.name);
        
        if (note.type === 'white') {
          return (
            <div
              key={note.name}
              onMouseDown={() => handleNoteStart(note)}
              onMouseUp={() => handleNoteStop(note)}
              onMouseLeave={() => handleNoteStop(note)}
              onTouchStart={(e) => { e.preventDefault(); handleNoteStart(note); }}
              onTouchEnd={(e) => { e.preventDefault(); handleNoteStop(note); }}
              className={`
                relative z-10 flex-1 h-full
                border-x border-b border-gray-400 rounded-b-sm
                active:scale-[0.99] origin-top transition-transform duration-75
                ${isActive 
                  ? 'bg-gray-200 shadow-[inset_0_5px_10px_rgba(0,0,0,0.2)]' 
                  : 'bg-gradient-to-b from-white via-gray-100 to-gray-200 shadow-[inset_-2px_-5px_10px_rgba(0,0,0,0.1)]'
                }
              `}
            >
              {/* Key label just for learning */}
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-gray-400 font-mono opacity-50">
                {note.name}
              </span>
            </div>
          );
        } else {
          // Black key positioning
          return (
            <div
              key={note.name}
              onMouseDown={() => handleNoteStart(note)}
              onMouseUp={() => handleNoteStop(note)}
              onMouseLeave={() => handleNoteStop(note)}
              onTouchStart={(e) => { e.preventDefault(); handleNoteStart(note); }}
              onTouchEnd={(e) => { e.preventDefault(); handleNoteStop(note); }}
              className={`
                absolute z-20 h-[60%] w-[6%] -ml-[3%]
                rounded-b-sm border-x border-b border-black
                active:scale-y-[0.98] origin-top transition-transform duration-75
                ${isActive
                   ? 'bg-gray-800 bg-none'
                   : 'bg-gradient-to-b from-black via-gray-800 to-gray-900 shadow-[2px_2px_5px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.2)]'
                }
              `}
              style={{ 
                left: `${((index) / NOTES.length) * 100 + 2}%` // Approximate positioning logic
              }}
            ></div>
          );
        }
      })}
    </div>
  );
};

export default Keyboard;