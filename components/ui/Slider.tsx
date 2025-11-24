import React from 'react';

interface SliderProps {
  label: string;
  value: number; // 0-100
  onChange: (val: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col items-center h-32 w-8">
       <span className="text-[8px] text-gray-400 font-ui uppercase mb-1">{label}</span>
      <div className="relative flex-1 w-2 bg-black rounded-full shadow-inner border border-gray-700">
        <div className="absolute top-1 bottom-1 left-0 right-0">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute -left-3 h-full w-8 opacity-0 cursor-ns-resize z-20 appearance-none"
            style={{ writingMode: 'vertical-lr', direction: 'rtl' }} // Hack for vertical range
          />
          {/* Handle Visual */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-6 h-10 bg-gradient-to-t from-gray-800 via-gray-400 to-gray-200 rounded-sm shadow-md border border-gray-600 pointer-events-none z-10"
            style={{ bottom: `${value}%`, transform: 'translateX(-50%) translateY(50%)' }}
          >
             <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;