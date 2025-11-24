import React, { useState } from 'react';

interface KnobProps {
  label: string;
  min?: number;
  max?: number;
  value: number;
  onChange: (val: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

const Knob: React.FC<KnobProps> = ({ label, min = 0, max = 100, value, onChange, size = 'md' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startValue, setStartValue] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartValue(value);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = startY - e.clientY;
      const range = max - min;
      // Sensitivity: 1px = 1 unit
      let newValue = startValue + (deltaY);
      newValue = Math.max(min, Math.min(max, newValue));
      onChange(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startY, startValue, min, max, onChange]);

  // Calculate rotation angle (-135deg to 135deg)
  const percentage = (value - min) / (max - min);
  const angle = -135 + (percentage * 270);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div 
        className={`relative rounded-full bg-gradient-to-br from-gray-300 to-gray-600 shadow-knob cursor-ns-resize ${sizeClasses[size]}`}
        onMouseDown={handleMouseDown}
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-gray-500 opacity-50"></div>
        
        {/* The rotating part */}
        <div 
          className="absolute inset-1 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 border border-gray-400 shadow-inner"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {/* Indicator Dot */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]"></div>
          
          {/* Grip Texture */}
          <div className="absolute inset-2 border-2 border-dashed border-gray-400 rounded-full opacity-30"></div>
        </div>
      </div>
      <span className="text-[10px] text-gray-300 font-ui uppercase tracking-wider select-none text-center leading-tight">
        {label}
      </span>
    </div>
  );
};

export default Knob;