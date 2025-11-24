import React, { useState, useEffect } from 'react';
import { SynthPreset } from './types';
import { audioEngine } from './services/AudioEngine';
import Keyboard from './components/Keyboard';
import Display from './components/Display';
import Knob from './components/ui/Knob';
import Button from './components/ui/Button';
import Slider from './components/ui/Slider';

const App: React.FC = () => {
  const [volume, setVolume] = useState(70);
  const [tempo, setTempo] = useState(120);
  const [selectedPreset, setSelectedPreset] = useState<SynthPreset>(SynthPreset.PIANO);
  const [activeGroup, setActiveGroup] = useState<'STYLE' | 'KEYBOARD' | 'SOUND'>('KEYBOARD');
  const [transpose, setTranspose] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  // Initialize audio on first interaction
  const handleInteraction = () => {
    // This is often needed to unlock AudioContext in browsers
  };

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    audioEngine.setVolume(val);
  };

  const handlePresetSelect = (preset: SynthPreset) => {
    setSelectedPreset(preset);
    audioEngine.setPreset(preset);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Styles to force landscape mode if in portrait
  const containerStyle: React.CSSProperties = isPortrait ? {
    width: '100vh',
    height: '100vw',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(90deg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } : {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div 
      className="w-screen h-screen bg-black overflow-hidden relative" 
      onClick={handleInteraction}
    >
      <div style={containerStyle} className={isPortrait ? "p-4" : "p-2 sm:p-4"}>
        {/* Chassis */}
        <div className="w-full max-w-6xl aspect-[16/7] bg-[#2a2a2c] rounded-xl shadow-2xl relative border-t border-gray-600 flex flex-col overflow-hidden">
          
          {/* Top Speaker/Logo Bar */}
          <div className="h-[8%] bg-[#151515] w-full flex items-center justify-between px-6 border-b border-gray-700 shadow-md z-10">
              <div className="flex gap-1">
                  {[1,2,3,4].map(i => <div key={i} className="w-1 h-1 bg-gray-600 rounded-full"></div>)}
              </div>
              <div className="text-gray-300 font-display font-bold tracking-[0.2em] text-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                  KORGENESIS <span className="text-red-600 text-xs align-top">PRO</span>
              </div>
              <div className="flex gap-1">
                  {[1,2,3,4].map(i => <div key={i} className="w-1 h-1 bg-gray-600 rounded-full"></div>)}
              </div>
          </div>

          <div className="flex-1 flex flex-row relative">
              
              {/* LEFT CONTROL PANEL */}
              <div className="w-[55%] h-full bg-[#252527] relative p-2 flex flex-col gap-2">
                {/* Top Control Strip */}
                <div className="h-[25%] flex items-center justify-between bg-[#1e1e20] rounded-lg p-2 shadow-inner border border-gray-700">
                      <div className="flex gap-4">
                          <Knob label="MASTER VOL" value={volume} onChange={handleVolumeChange} size="lg" />
                          <Knob label="BALANCE" value={50} onChange={() => {}} size="sm" />
                      </div>
                      
                      <div className="flex gap-2 bg-[#151515] p-2 rounded border border-gray-600">
                          <Button label="STYLE" onClick={() => setActiveGroup('STYLE')} active={activeGroup === 'STYLE'} color="red" />
                          <Button label="SONG" onClick={() => setActiveGroup('SOUND')} active={activeGroup === 'SOUND'} color="green" />
                          <Button label="SETTING" onClick={() => {}} active={false} color="yellow" variant="square" />
                      </div>
                </div>

                <div className="flex-1 flex gap-2">
                    {/* Left Column: Mode/Tabs */}
                    <div className="w-[15%] flex flex-col gap-2 py-2">
                          <Button label="MENU" onClick={() => {}} variant="square" />
                          <Button label="EXIT" onClick={() => {}} variant="square" />
                          <div className="h-4"></div>
                          <Button label="TAB ◀" onClick={() => {}} variant="square" />
                          <Button label="TAB ▶" onClick={() => {}} variant="square" />
                    </div>

                    {/* Center: SCREEN */}
                    <div className="flex-1 relative">
                          <Display preset={selectedPreset} tempo={tempo} transpose={transpose} />
                    </div>

                      {/* Right Column: Sliders/Banks */}
                    <div className="w-[20%] flex flex-col items-center justify-between py-1 bg-[#1e1e20] rounded border border-gray-700">
                          <span className="text-[9px] text-gray-400 font-ui mb-1">ASSIGNABLE</span>
                          <div className="flex gap-2">
                              <Slider label="A" value={70} onChange={() => {}} />
                              <Slider label="B" value={40} onChange={() => {}} />
                          </div>
                    </div>
                </div>

                {/* Bottom Strip: Transport & Variation */}
                <div className="h-[25%] flex items-end gap-2 pb-1">
                      {/* Style Controls */}
                      <div className="flex flex-col gap-1 p-1 bg-[#1a1a1c] rounded border border-gray-700">
                          <span className="text-[8px] text-gray-500 text-center font-bold">STYLE CONTROL</span>
                          <div className="flex gap-1">
                              <Button label="INTRO 1" onClick={() => {}} variant="square" />
                              <Button label="INTRO 2" onClick={() => {}} variant="square" />
                              <Button label="VAR 1" onClick={() => {}} variant="square" active />
                              <Button label="VAR 2" onClick={() => {}} variant="square" />
                              <Button label="ENDING" onClick={() => {}} variant="square" />
                          </div>
                      </div>

                      {/* Transport */}
                      <div className="flex flex-col gap-1 p-1 bg-[#151515] rounded border border-gray-700 shadow-md">
                          <div className="flex gap-1">
                              <Button label="START/STOP" subLabel="SYNC" onClick={togglePlay} active={isPlaying} color="red" variant="long" />
                              <Button label="TEMPO -" onClick={() => setTempo(t => Math.max(40, t-5))} variant="square" />
                              <Button label="TEMPO +" onClick={() => setTempo(t => Math.min(240, t+5))} variant="square" />
                          </div>
                      </div>
                </div>
              </div>

              {/* RIGHT SIDE: PRESETS & KEYBOARD */}
              <div className="flex-1 flex flex-col bg-[#222] border-l border-black/50">
                  {/* Tone Select Buttons Grid */}
                  <div className="h-[40%] bg-[#2a2a2c] p-2 grid grid-cols-4 gap-1 content-start shadow-inner">
                      <span className="col-span-4 text-[9px] text-orange-500 border-b border-orange-900/50 mb-1">VOICE SELECT</span>
                      
                      <Button 
                          label="PIANO" 
                          active={selectedPreset === SynthPreset.PIANO} 
                          onClick={() => handlePresetSelect(SynthPreset.PIANO)} 
                          color="red"
                      />
                      <Button 
                          label="STRINGS" 
                          active={selectedPreset === SynthPreset.STRINGS} 
                          onClick={() => handlePresetSelect(SynthPreset.STRINGS)} 
                          color="red"
                      />
                      <Button 
                          label="ORGAN" 
                          active={selectedPreset === SynthPreset.ORGAN} 
                          onClick={() => handlePresetSelect(SynthPreset.ORGAN)} 
                          color="red"
                      />
                      <Button 
                          label="SYNTH" 
                          active={selectedPreset === SynthPreset.SYNTH} 
                          onClick={() => handlePresetSelect(SynthPreset.SYNTH)} 
                          color="red"
                      />
                      
                      {/* Filler buttons for aesthetics */}
                      <Button label="BRASS" onClick={() => {}} variant="square" />
                      <Button label="GUITAR" onClick={() => {}} variant="square" />
                      <Button label="PAD" onClick={() => {}} variant="square" />
                      <Button label="DRUMS" onClick={() => {}} variant="square" />
                      
                      <div className="col-span-4 flex justify-between items-center mt-2 px-2 border-t border-gray-700 pt-1">
                          <span className="text-[9px] text-gray-400">OCTAVE</span>
                          <div className="flex gap-1">
                              <Button label="DOWN" onClick={() => setTranspose(t => t-1)} variant="square" />
                              <Button label="UP" onClick={() => setTranspose(t => t+1)} variant="square" />
                          </div>
                      </div>
                  </div>

                  {/* THE KEYBOARD */}
                  <div className="flex-1 relative z-20">
                      <Keyboard onNotePlay={(n) => console.log(n)} />
                  </div>
              </div>

          </div>

          {/* Chassis Bottom/Footing */}
          <div className="h-4 bg-gradient-to-b from-[#1a1a1a] to-black w-full border-t border-gray-800"></div>

        </div>
      </div>
    </div>
  );
};

export default App;