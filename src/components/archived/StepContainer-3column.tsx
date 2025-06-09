import React from 'react';
import { DealerSupportPanel } from '../panels/DealerSupportPanel';
import { AvailablePromotionsPanel } from './AvailablePromotionsPanel';

interface StepContainerProps {
  children: React.ReactNode;
  isTransitioning: boolean;
  onSelectPromoCode: (code: string) => void;
}

export const StepContainer: React.FC<StepContainerProps> = ({ 
  children, 
  isTransitioning, 
  onSelectPromoCode 
}) => (
  <div className={`transition-all duration-500 ease-out ${
    isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
  }`}>
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main form content */}
        <div className="lg:col-span-1">
          <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-white/50 shadow-2xl shadow-gray-200/20">
            {children}
          </div>
        </div>
        
        {/* Dealer Support Panel */}
        <div className="lg:col-span-1">
          <DealerSupportPanel />
        </div>
        
        {/* Available Promotions Panel */}
        <div className="lg:col-span-1">
          <AvailablePromotionsPanel onSelectPromoCode={onSelectPromoCode} />
        </div>
      </div>
    </div>
  </div>
); 