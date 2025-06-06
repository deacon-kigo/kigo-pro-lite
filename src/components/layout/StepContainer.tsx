import React from 'react';
import { SupportPanel } from '../panels/SupportPanel';

interface StepContainerProps {
  children: React.ReactNode;
}

export const StepContainer: React.FC<StepContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 pt-4 pb-8">
      <div className="max-w-2xl mx-auto px-6">
        {/* Main Content Area - Centered */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-green-200/20 border border-white/50 p-8">
          {children}
        </div>
        
        {/* Support Panel - Bottom Placement */}
        <SupportPanel />
      </div>
    </div>
  );
}; 