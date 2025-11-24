import React from 'react';
import { SynthPreset } from '../types';
import { Music, Mic, Settings, Volume2 } from 'lucide-react';

interface DisplayProps {
  preset: SynthPreset;
  tempo: number;
  transpose: number;
}

const Display: React.FC<DisplayProps> = ({ preset, tempo, transpose }) => {
  return (
    <div className="w-full h-full bg-black p-1 rounded-sm shadow-screen border-2 border-gray-600">
      {/* LCD Inner Panel */}
      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 relative overflow-hidden flex flex-row">
        
        {/* Sidebar (Virtual Tabs) */}
        <div className="w-8 h-full bg-slate-800 border-r border-slate-600 flex flex-col items-center py-2 space-y-4">
          <div className="bg-orange-600 w-1 h-6 rounded-full shadow-[0_0_5px_rgba(234,88,12,0.8)]"></div>
          <Music size={12} className="text-gray-400" />
          <Mic size={12} className="text-gray-400" />
          <Settings size={12} className="text-gray-400" />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-2 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-600 pb-1 mb-2">
            <span className="text-orange-500 font-display text-xs tracking-wider">MAIN PAGE</span>
            <div className="flex items-center gap-2">
               <span className="text-[10px] text-gray-400 font-mono">CHORD: <span className="text-white">C Maj7</span></span>
            </div>
          </div>

          {/* Slots */}
          <div className="flex-1 grid grid-cols-1 gap-1">
            {/* Slot 1 (Selected) */}
            <div className="bg-gradient-to-r from-orange-900/40 to-transparent border-l-2 border-orange-500 p-1 flex items-center justify-between">
               <div className="flex flex-col">
                 <span className="text-[9px] text-orange-400 font-bold">UP1</span>
                 <span className="text-xs text-white font-ui tracking-wide drop-shadow-md">{preset}</span>
               </div>
               <div className="flex flex-col items-end">
                 <span className="text-[8px] text-gray-400">VOL</span>
                 <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
                   <div className="w-3/4 h-full bg-green-500"></div>
                 </div>
               </div>
            </div>

            {/* Slot 2 */}
            <div className="bg-slate-800/30 p-1 flex items-center justify-between opacity-60">
               <div className="flex flex-col">
                 <span className="text-[9px] text-blue-400 font-bold">UP2</span>
                 <span className="text-xs text-white font-ui">Soft Strings</span>
               </div>
               <span className="text-[8px] text-gray-400">MUTE</span>
            </div>
             {/* Slot 3 */}
             <div className="bg-slate-800/30 p-1 flex items-center justify-between opacity-60">
               <div className="flex flex-col">
                 <span className="text-[9px] text-blue-400 font-bold">LOW</span>
                 <span className="text-xs text-white font-ui">Ac. Bass</span>
               </div>
               <span className="text-[8px] text-gray-400">MUTE</span>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-2 pt-1 border-t border-slate-600 flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[9px] text-gray-400">STYLE</span>
              <span className="text-xs text-white font-display">8 Beat Pop</span>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-gray-400">TEMPO</span>
                <span className="text-xs text-yellow-400 font-mono">{tempo}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[8px] text-gray-400">TRANS</span>
                <span className="text-xs text-yellow-400 font-mono">{transpose > 0 ? '+' : ''}{transpose}</span>
              </div>
               <div className="flex flex-col items-center">
                <span className="text-[8px] text-gray-400">METER</span>
                <span className="text-xs text-yellow-400 font-mono">4/4</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Display;