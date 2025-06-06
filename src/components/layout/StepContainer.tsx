import React from 'react';
import { SupportPanel } from '../panels/SupportPanel';
import { ProgressBar } from './ProgressBar';

interface StepContainerProps {
  children: React.ReactNode;
  currentStep: string;
}

export const StepContainer: React.FC<StepContainerProps> = ({ children, currentStep }) => {
  return (
    <div className="bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 min-h-screen pt-4 pb-8">
      <div className="max-w-2xl mx-auto px-6">
        {/* Progress Bar - Inside gradient */}
        <ProgressBar currentStep={currentStep} />
        
        {/* Main Content Area - Integrated with stepper */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-green-200/20 border border-white/50 p-8 mt-8">
          {children}
        </div>
        
        {/* Support Panel - Bottom Placement */}
        <SupportPanel />
      </div>
    </div>
  );
}; 