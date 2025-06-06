import React from 'react';

export const Background: React.FC = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
    {/* Subtle floating shapes */}
    <div className="absolute top-20 left-20 w-64 h-64 bg-green-100/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
    <div className="absolute top-40 right-32 w-48 h-48 bg-yellow-100/40 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed"></div>
    <div className="absolute bottom-32 left-32 w-56 h-56 bg-green-50/50 rounded-full mix-blend-multiply filter blur-xl animate-float-slow"></div>
    
    {/* Subtle grid overlay */}
    <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: `linear-gradient(rgba(54,124,43,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(54,124,43,0.1) 1px, transparent 1px)`,
      backgroundSize: '32px 32px'
    }}></div>
  </div>
); 