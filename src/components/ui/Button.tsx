import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'demo';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick, 
  disabled, 
  className = '' 
}) => {
  const baseClasses = "w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform focus:ring-2 focus:ring-offset-2 flex items-center justify-center min-h-[56px]";
  
  const variants = {
    primary: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl shadow-green-500/20 hover:shadow-green-500/30 focus:ring-green-400 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-none hover:scale-[1.02] active:scale-[0.98]",
    secondary: "backdrop-blur-md bg-white/60 border border-gray-200 text-gray-700 hover:bg-white/80 hover:border-gray-300 focus:ring-gray-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]",
    demo: "px-3 py-2 backdrop-blur-md bg-white/60 border border-gray-200 text-gray-700 rounded-xl text-xs hover:bg-white/80 hover:border-gray-300 font-medium shadow-md min-h-auto"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}; 