import React from 'react';

interface ButtonProps {
  label: string;
  subLabel?: string;
  active?: boolean;
  color?: 'red' | 'green' | 'yellow';
  onClick: () => void;
  variant?: 'long' | 'square';
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  subLabel, 
  active = false, 
  color = 'red', 
  onClick,
  variant = 'long'
}) => {
  const ledColors = {
    red: active ? 'bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.8)]' : 'bg-red-900',
    green: active ? 'bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.8)]' : 'bg-green-900',
    yellow: active ? 'bg-yellow-400 shadow-[0_0_8px_2px_rgba(250,204,21,0.8)]' : 'bg-yellow-900',
  };

  const widthClass = variant === 'long' ? 'w-24' : 'w-12';
  const heightClass = 'h-8';

  return (
    <button 
      className={`group relative flex flex-col items-center justify-center ${widthClass} ${heightClass} 
      bg-gradient-to-b from-gray-600 to-gray-800 
      border-t border-l border-gray-500 border-b-2 border-r-2 border-b-black border-r-black 
      active:border-t-black active:border-l-black active:border-b-gray-600 active:border-r-gray-600 active:bg-gray-800
      rounded-sm shadow-md transition-all duration-75 active:translate-y-px`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 w-full px-1">
        {/* LED Indicator */}
        <div className={`w-3 h-1.5 rounded-sm ${ledColors[color]} transition-colors duration-200 border border-black/30`}></div>
        
        {/* Text */}
        <div className="flex flex-col items-start leading-none">
          <span className="text-[9px] font-bold text-gray-100 font-ui uppercase tracking-tighter whitespace-nowrap drop-shadow-md">
            {label}
          </span>
          {subLabel && (
            <span className="text-[7px] text-gray-400 font-ui uppercase tracking-tighter">
              {subLabel}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default Button;