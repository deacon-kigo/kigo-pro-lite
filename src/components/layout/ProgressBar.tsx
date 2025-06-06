import React from 'react';
import { ChevronRight, CheckCircle2, AlertTriangle, ArrowLeft, Receipt, Tag, Shield, Sparkles } from 'lucide-react';
import { STEPS } from '../../constants/steps';

interface ProgressBarProps {
  currentStep: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { key: STEPS.ENTER_CODE, label: 'Code', icon: Shield },
    { key: STEPS.CONFIRM_REDEMPTION, label: 'Confirm', icon: CheckCircle2 },
    { key: STEPS.REDEMPTION_SUCCESS, label: 'Instructions', icon: Receipt },
    { key: STEPS.ENTER_INVOICE_DETAILS, label: 'Details', icon: Tag },
    { key: STEPS.COMPLETE, label: 'Complete', icon: Sparkles }
  ];
  
  const currentStepIndex = steps.findIndex(step => step.key === currentStep);
  
  return (
    <div className="relative z-10">
      <div className="max-w-2xl mx-auto px-6 pb-6">
        <div className="flex justify-between items-center relative">
          {/* Progress line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-green-400 to-yellow-400 -translate-y-1/2 transition-all duration-1000 ease-out"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            
            return (
              <div key={step.key} className="relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-1000 ease-out transform shadow-lg ${
                  isActive 
                    ? 'bg-gradient-to-br from-green-400 to-green-500 scale-110 shadow-green-400/30' 
                    : isCompleted
                      ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-green-500/20'
                      : 'bg-white border-2 border-gray-200 shadow-gray-200/50'
                }`}>
                  <Icon size={isActive ? 20 : 16} className={`${
                    isActive || isCompleted ? 'text-white' : 'text-gray-400'
                  } transition-all duration-500`} />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <p className={`text-xs font-medium transition-all duration-500 ${
                    isActive ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 