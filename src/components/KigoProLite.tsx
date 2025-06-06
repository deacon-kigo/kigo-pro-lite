'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, CheckCircle2, AlertTriangle, ArrowLeft, Receipt, Tag, Shield, Sparkles } from 'lucide-react';

// Type definitions
interface PromoCode {
  status: 'ACTIVE' | 'REDEEMED' | 'PENDING';
  customer: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  promo: string;
  accountNumber: string;
  discount: number;
  discountType: 'percent' | 'fixed';
  item: string;
  partId?: string;
  referenceNumber?: string;
}

interface ValidatedPromo extends PromoCode {
  code: string;
}

// Simulate the backend database of promo codes
const mockPromoCodes: Record<string, PromoCode> = {
  '8BCFM2': { 
    status: 'ACTIVE', 
    customer: 'Tim Farmer',
    firstName: 'Tim',
    lastName: 'Farmer', 
    email: 'tfarmer@example.com',
    mobile: '(555) 123-4567',
    promo: '20% Off Filters', 
    accountNumber: '1234',
    discount: 20,
    discountType: 'percent',
    item: 'Filters',
    partId: 'JDFILTER20',
    referenceNumber: '8BCFM2'
  },
  'JD5678OIL': { 
    status: 'ACTIVE', 
    customer: 'Sarah Johnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sjohnson@example.com',
    mobile: '(555) 987-6543', 
    promo: '15% Off Oil Changes', 
    accountNumber: '5678',
    discount: 15,
    discountType: 'percent',
    item: 'Oil Change Service'
  },
  'JD9012PARTS': { 
    status: 'REDEEMED', 
    customer: 'Mike Wilson',
    firstName: 'Mike',
    lastName: 'Wilson',
    email: 'mwilson@example.com',
    mobile: '(555) 555-0123', 
    promo: '10% Off Parts', 
    accountNumber: '9012',
    discount: 10,
    discountType: 'percent',
    item: 'Tractor Parts'
  },
  'JD7890REPAIR': {
    status: 'PENDING', 
    customer: 'Linda Martinez',
    firstName: 'Linda',
    lastName: 'Martinez',
    email: 'lmartinez@example.com',
    mobile: '(555) 444-5678',
    promo: '$50 Off Repair Service',
    accountNumber: '7890',
    discount: 50,
    discountType: 'fixed',
    item: 'Repair Services'
  }
};

// Available promotions for the dealer
const availablePromotions = [
  { code: 'SPRING25', name: 'Spring Service Special', description: '25% off maintenance packages', status: 'ACTIVE', expires: '2025-04-30' },
  { code: 'FILTER20', name: 'Filter Promotion', description: '20% off all filters', status: 'ACTIVE', expires: '2025-03-31' },
  { code: 'OIL15', name: 'Oil Change Deal', description: '15% off oil change service', status: 'ACTIVE', expires: '2025-06-15' },
  { code: 'PARTS10', name: 'Parts Discount', description: '10% off genuine John Deere parts', status: 'EXPIRED', expires: '2025-02-28' },
  { code: 'WINTER50', name: 'Winter Service', description: '$50 off winter preparation', status: 'EXPIRED', expires: '2025-01-31' }
];

// Application steps
const STEPS = {
  ENTER_CODE: 'enter_code',
  CONFIRM_REDEMPTION: 'confirm_redemption',
  REDEMPTION_SUCCESS: 'redemption_success',
  ENTER_INVOICE_DETAILS: 'enter_invoice_details',
  FINAL_CONFIRMATION: 'final_confirmation',
  COMPLETE: 'complete'
};

const KigoProLite = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.ENTER_CODE);
  const [promoCode, setPromoCode] = useState('');
  const [validatedPromo, setValidatedPromo] = useState<ValidatedPromo | null>(null);
  const [invoiceId, setInvoiceId] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localPromoCodes, setLocalPromoCodes] = useState<Record<string, PromoCode>>({...mockPromoCodes});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dealerName, setDealerName] = useState('Pape Machinery');
  const [dealerLocation, setDealerLocation] = useState('Kent, WA');
  const [showDealerEdit, setShowDealerEdit] = useState(false);
  
  // Refs for auto-focus
  const promoCodeRef = useRef<HTMLInputElement>(null);
  const invoiceIdRef = useRef<HTMLInputElement>(null);
  const discountAmountRef = useRef<HTMLInputElement>(null);

  // Auto-focus on step changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep === STEPS.ENTER_CODE && promoCodeRef.current) {
        promoCodeRef.current.focus();
      } else if (currentStep === STEPS.ENTER_INVOICE_DETAILS) {
        if (invoiceIdRef.current) {
          invoiceIdRef.current.focus();
        }
      }
    }, 600);
    
    return () => clearTimeout(timer);
  }, [currentStep]);

  const navigateToStep = (newStep: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const handlePromoCodeSubmit = () => {
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      const trimmedCode = promoCode.trim();
      
      if (!trimmedCode) {
        setError('Please enter a promo code');
        setIsLoading(false);
        return;
      }
      
      const promo = localPromoCodes[trimmedCode];
      
      if (!promo) {
        setError('Invalid promo code. Please check the code and try again.');
        setIsLoading(false);
        return;
      }
      
      if (promo.status === 'REDEEMED') {
        setError('This promo code has already been redeemed.');
        setIsLoading(false);
        return;
      }
      
      if (promo.status === 'PENDING') {
        setError('This promo code is pending approval. Please contact John Deere Corporate for assistance.');
        setIsLoading(false);
        return;
      }
      
      setValidatedPromo({ ...promo, code: trimmedCode });
      navigateToStep(STEPS.CONFIRM_REDEMPTION);
      setIsLoading(false);
    }, 1000);
  };

  const handleConfirmRedemption = () => {
    if (!validatedPromo) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setLocalPromoCodes(prev => ({
        ...prev,
        [validatedPromo.code]: {
          ...prev[validatedPromo.code],
          status: 'REDEEMED' as const
        }
      }));
      
      navigateToStep(STEPS.REDEMPTION_SUCCESS);
      setIsLoading(false);
    }, 1200);
  };

  const handleInvoiceSubmit = () => {
    setError('');
    
    if (!invoiceId.trim()) {
      setError('Please enter an invoice ID');
      return;
    }
    
    if (!discountAmount.trim()) {
      setError('Please enter the discount amount');
      return;
    }
    
    const discountPattern = /^\$?\d+(\.\d{1,2})?$/;
    if (!discountPattern.test(discountAmount.trim())) {
      setError('Please enter a valid discount amount (e.g., $9.40 or 9.40)');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      navigateToStep(STEPS.FINAL_CONFIRMATION);
      setIsLoading(false);
    }, 1000);
  };

  const handleFinalSubmit = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      navigateToStep(STEPS.COMPLETE);
      setIsLoading(false);
    }, 1000);
  };

  const handleStartOver = () => {
    setCurrentStep(STEPS.ENTER_CODE);
    setPromoCode('');
    setValidatedPromo(null);
    setInvoiceId('');
    setDiscountAmount('');
    setError('');
    setIsLoading(false);
  };

  const handleBack = () => {
    setError('');
    if (currentStep === STEPS.CONFIRM_REDEMPTION) {
      navigateToStep(STEPS.ENTER_CODE);
    } else if (currentStep === STEPS.ENTER_INVOICE_DETAILS) {
      navigateToStep(STEPS.REDEMPTION_SUCCESS);
    } else if (currentStep === STEPS.FINAL_CONFIRMATION) {
      navigateToStep(STEPS.ENTER_INVOICE_DETAILS);
    }
  };

  // Standardized button component
  const Button = ({ variant = 'primary', children, onClick, disabled, className = '' }: {
    variant?: 'primary' | 'secondary' | 'demo';
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
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

  const renderBackground = () => (
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

  const renderHeader = () => (
    <div className="relative z-10 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-lg">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-2xl flex items-center justify-center shadow-xl shadow-yellow-200/30">
                <span className="text-green-700 font-bold text-2xl">JD</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Retail Incentive Redemption Portal</h1>
              <p className="text-gray-600 text-sm font-medium">John Deere Dealer System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Jim Smith</p>
            <p className="text-xs text-gray-600">{dealerName} {dealerLocation}</p>
            <a href="#dealer-support" className="text-xs text-green-600 hover:text-green-700 font-medium">
              Dealer Support & FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgressBar = () => {
    const steps = [
      { key: STEPS.ENTER_CODE, label: 'Code', icon: Shield },
      { key: STEPS.CONFIRM_REDEMPTION, label: 'Confirm', icon: CheckCircle2 },
      { key: STEPS.REDEMPTION_SUCCESS, label: 'Instructions', icon: Receipt },
      { key: STEPS.ENTER_INVOICE_DETAILS, label: 'Details', icon: Tag },
      { key: STEPS.FINAL_CONFIRMATION, label: 'Verify', icon: AlertTriangle },
      { key: STEPS.COMPLETE, label: 'Complete', icon: Sparkles }
    ];
    
    const currentStepIndex = steps.findIndex(step => step.key === currentStep);
    
    return (
      <div className="relative z-10 backdrop-blur-xl bg-white/60 border-b border-gray-200/30">
        <div className="max-w-4xl mx-auto p-6">
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

  const renderAvailablePromotions = () => (
    <div className="backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-yellow-50/80 rounded-3xl p-6 border border-green-200/50 shadow-2xl shadow-green-200/20 sticky top-8">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-green-400/30">
          <Tag size={32} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Available Promotions</h3>
        <p className="text-sm text-gray-600">Quick lookup for current retail incentives</p>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {availablePromotions.map((promo, index) => (
          <div key={index} className={`relative overflow-hidden rounded-2xl border-2 shadow-lg transition-all duration-300 hover:scale-[1.02] ${
            promo.status === 'ACTIVE' 
              ? 'bg-white border-green-500 shadow-green-500/20' 
              : 'bg-gray-50 border-gray-300 shadow-gray-500/20'
          }`}>
            {/* Promotional Badge/Ribbon */}
            <div className="absolute top-0 right-0">
              <div className={`px-3 py-1 text-xs font-bold rounded-bl-xl ${
                promo.status === 'ACTIVE' ? 'bg-green-600 text-white' : 'bg-gray-500 text-white'
              }`}>
                {promo.status === 'ACTIVE' ? 'ACTIVE' : 'EXPIRED'}
              </div>
            </div>
            
            {/* Promotional Content */}
            <div className={`p-4 ${promo.status === 'ACTIVE' ? 'text-gray-800' : 'text-gray-600'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                    promo.status === 'ACTIVE' ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    <span className={`font-bold text-sm ${
                      promo.status === 'ACTIVE' ? 'text-green-600' : 'text-gray-600'
                    }`}>%</span>
                  </div>
                  <span className={`font-mono text-lg font-bold px-2 py-1 rounded-lg ${
                    promo.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
                  }`}>{promo.code}</span>
                </div>
              </div>
              
              <h4 className="font-bold text-lg mb-2 leading-tight">{promo.name}</h4>
              <p className={`text-sm mb-3 leading-relaxed ${
                promo.status === 'ACTIVE' ? 'text-gray-700' : 'text-gray-500'
              }`}>{promo.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <div className={`flex items-center rounded-lg px-2 py-1 ${
                  promo.status === 'ACTIVE' ? 'bg-gray-100' : 'bg-gray-200'
                }`}>
                  <span className="mr-1">📅</span>
                  <span className="font-medium">Expires: {promo.expires}</span>
                </div>
                {promo.status === 'ACTIVE' && (
                  <button 
                    onClick={() => setPromoCode(promo.code)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-1 rounded-lg transition-all duration-200 text-xs border border-green-500"
                  >
                    Use This Code
                  </button>
                )}
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className={`absolute bottom-0 left-0 w-full h-1 ${
              promo.status === 'ACTIVE' ? 'bg-gradient-to-r from-green-400 to-yellow-400' : 'bg-gray-300'
            }`}></div>
            {promo.status === 'ACTIVE' && (
              <>
                <div className="absolute top-2 left-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-green-400 rounded-full"></div>
              </>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-green-200">
        <p className="text-xs text-center text-gray-600 font-medium">
          ✨ Same promotions visible in customer Perks app
        </p>
      </div>
    </div>
  );

  const renderStepContainer = (children: React.ReactNode) => (
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
            <div className="backdrop-blur-xl bg-blue-50/60 rounded-3xl p-6 border border-blue-200/50 shadow-xl shadow-blue-200/20 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">Got a question or need assistance with promo code redemption?</p>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="tel:1-888-123-4567" 
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-center block hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:scale-[1.02]"
                >
                  📞 Call 1-888-123-4567
                </a>
                
                <button 
                  onClick={() => window.open('#dealer-chat', '_blank')}
                  className="w-full py-3 px-4 backdrop-blur-md bg-white/80 border border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-white/90 hover:border-blue-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  💬 Live Chat Support
                </button>
                
                <div className="pt-4 border-t border-blue-200">
                  <p className="text-xs text-blue-600 text-center font-medium">
                    Available 24/7 for dealer support
                  </p>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    Average response time: &lt; 2 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Available Promotions Panel */}
          <div className="lg:col-span-1">
            {renderAvailablePromotions()}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEnterCodeStep = () => renderStepContainer(
    <>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100/30 border border-green-200/50">
          <Shield size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Enter Promo Code</h2>
        <p className="text-gray-600 text-lg">Please enter the promo code shown by the customer</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="promoCode" className="block text-sm font-semibold text-gray-700 mb-3">
            Promo Code
          </label>
          <div className="relative">
            <input
              ref={promoCodeRef}
              id="promoCode"
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePromoCodeSubmit()}
              placeholder="Enter promo code..."
              className="w-full px-6 py-4 backdrop-blur-md bg-white/80 border border-gray-200 rounded-2xl text-lg font-mono text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-white/90 transition-all duration-300 shadow-lg"
              disabled={isLoading}
            />
          </div>
        </div>
        
        {error && (
          <div className="flex items-center p-4 backdrop-blur-md bg-red-50/80 border border-red-200 rounded-2xl shadow-lg">
            <AlertTriangle size={20} className="text-red-500 mr-3 flex-shrink-0" />
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}
        
        <Button
          onClick={handlePromoCodeSubmit}
          disabled={!promoCode.trim() || isLoading}
        >
          {isLoading ? (
            <div className="animate-spin w-6 h-6 border-3 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              Validate Code
              <ChevronRight size={20} className="ml-2" />
            </>
          )}
        </Button>
        
        {/* Quick demo buttons */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-4 text-center font-medium">Demo codes for testing:</p>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="demo" onClick={() => setPromoCode('8BCFM2')}>
              Valid
            </Button>
            <Button variant="demo" onClick={() => setPromoCode('JD9012PARTS')}>
              Redeemed
            </Button>
            <Button variant="demo" onClick={() => setPromoCode('JD7890REPAIR')}>
              Pending
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  const renderConfirmRedemptionStep = () => renderStepContainer(
    <>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100/30 border border-green-200/50 animate-pulse">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Valid Promotion</h2>
        <p className="text-gray-600 text-lg">Please confirm the details below and verify customer identity</p>
      </div>
      
      <div className="backdrop-blur-md bg-green-50/60 border border-green-200/50 rounded-2xl p-6 mb-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
        <div className="space-y-4">
          <div>
            <span className="text-sm font-semibold text-green-700">Promo Code:</span>
            <p className="font-mono text-xl font-bold text-gray-800 bg-white/60 rounded-lg px-3 py-1 mt-1 shadow-sm">{validatedPromo?.code}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-semibold text-green-700">First Name:</span>
              <p className="font-bold text-gray-800 text-lg">{validatedPromo?.firstName}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-green-700">Last Name:</span>
              <p className="font-bold text-gray-800 text-lg">{validatedPromo?.lastName}</p>
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold text-green-700">Email Address:</span>
            <p className="font-mono text-lg font-bold text-blue-600 bg-blue-50/60 rounded-lg px-3 py-1 mt-1">{validatedPromo?.email}</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-green-700">Mobile Number:</span>
            <p className="font-mono text-lg font-bold text-blue-600 bg-blue-50/60 rounded-lg px-3 py-1 mt-1">{validatedPromo?.mobile}</p>
            <p className="text-xs text-gray-600 mt-1">For high-value transactions, ask the customer to verify the email address or number associated with the account.</p>
          </div>
          <div>
            <span className="text-sm font-semibold text-green-700">Promotion:</span>
            <p className="font-bold text-yellow-600 text-lg">{validatedPromo?.promo}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button
          onClick={handleConfirmRedemption}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin w-6 h-6 border-3 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              Yes, Redeem This Promotion
              <CheckCircle2 size={20} className="ml-2" />
            </>
          )}
        </Button>
        
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={isLoading}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Enter Code
        </Button>
      </div>
    </>
  );

  const renderRedemptionSuccessStep = () => renderStepContainer(
    <>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100/30 border border-green-200/50 animate-bounce">
          <Receipt size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Apply the Promo Code</h2>
        <p className="text-gray-600 text-lg">Follow instructions below to enter the promo code as the part number in the invoice.</p>
      </div>
      
      <div className="backdrop-blur-md bg-green-50/60 border border-green-200/50 rounded-2xl p-6 mb-8 shadow-lg">
        <h3 className="font-bold text-green-700 mb-4 text-lg">Apply to Invoice:</h3>
        <div className="space-y-4 text-sm">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0 shadow-lg">1</div>
            <p className="text-green-800 font-medium">Use <span className="font-mono bg-green-100/60 px-2 py-1 rounded-lg text-green-900 font-bold">{validatedPromo?.partId || 'JDFILTER20'}</span> as the part ID in your system</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button onClick={() => navigateToStep(STEPS.ENTER_INVOICE_DETAILS)}>
          Continue to Invoice Details
          <ChevronRight size={20} className="ml-2" />
        </Button>
        
        <Button
          variant="secondary"
          onClick={handleBack}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Confirm
        </Button>
      </div>
    </>
  );

  const renderInvoiceDetailsStep = () => renderStepContainer(
    <>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100/30 border border-green-200/50">
          <Tag size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Invoice Details</h2>
        <p className="text-gray-600 text-lg">Enter the invoice ID and discount amount applied</p>
      </div>
      
      <div className="space-y-6">
        {/* Dealer Information Section */}
        <div className="backdrop-blur-md bg-blue-50/60 border border-blue-200/50 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-blue-800">Dealer Information</h3>
            <button
              onClick={() => setShowDealerEdit(!showDealerEdit)}
              className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 font-medium"
            >
              {showDealerEdit ? 'Save' : 'Change Location'}
            </button>
          </div>
          
          {!showDealerEdit ? (
            <div className="space-y-2">
              <div>
                <span className="text-sm font-semibold text-blue-700">Dealer Name:</span>
                <p className="font-bold text-gray-800 text-lg">{dealerName}</p>
              </div>
              <div>
                <span className="text-sm font-semibold text-blue-700">Location:</span>
                <p className="font-bold text-gray-800 text-lg">{dealerLocation}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-2">Dealer Name</label>
                <input
                  type="text"
                  value={dealerName}
                  onChange={(e) => setDealerName(e.target.value)}
                  className="w-full px-4 py-2 bg-white/80 border border-blue-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-700 mb-2">Location</label>
                <input
                  type="text"
                  value={dealerLocation}
                  onChange={(e) => setDealerLocation(e.target.value)}
                  placeholder="City, State"
                  className="w-full px-4 py-2 bg-white/80 border border-blue-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="invoiceId" className="block text-sm font-semibold text-gray-700 mb-3">
            Invoice ID
          </label>
          <input
            ref={invoiceIdRef}
            id="invoiceId"
            type="text"
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
            placeholder="Enter invoice ID..."
            className="w-full px-6 py-4 backdrop-blur-md bg-white/80 border border-gray-200 rounded-2xl text-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-white/90 transition-all duration-300 shadow-lg"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label htmlFor="discountAmount" className="block text-sm font-semibold text-gray-700 mb-3">
            Discount Amount Applied
          </label>
          <input
            ref={discountAmountRef}
            id="discountAmount"
            type="text"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            placeholder="e.g., $9.40"
            className="w-full px-6 py-4 backdrop-blur-md bg-white/80 border border-gray-200 rounded-2xl text-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-white/90 transition-all duration-300 shadow-lg"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-2 font-medium">Enter the discount amount that resulted from applying the promotion</p>
        </div>
        
        {error && (
          <div className="flex items-center p-4 backdrop-blur-md bg-red-50/80 border border-red-200 rounded-2xl shadow-lg">
            <AlertTriangle size={20} className="text-red-500 mr-3 flex-shrink-0" />
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}
        
        <div className="space-y-4 pt-4">
          <Button
            onClick={handleInvoiceSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin w-6 h-6 border-3 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                Complete Redemption
                <CheckCircle2 size={20} className="ml-2" />
              </>
            )}
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleBack}
            disabled={isLoading}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Instructions
          </Button>
        </div>
      </div>
    </>
  );

  const renderFinalConfirmationStep = () => renderStepContainer(
    <>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-100/30 border border-orange-200/50">
          <AlertTriangle size={40} className="text-orange-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Final Verification</h2>
        <p className="text-gray-600 text-lg">Review all transaction details before finalizing the redemption</p>
        <div className="inline-flex items-center mt-4 px-4 py-2 bg-red-50 border border-red-200 rounded-xl">
          <AlertTriangle size={16} className="text-red-600 mr-2" />
          <p className="text-red-700 text-sm font-semibold">This action will permanently invalidate the promo code</p>
        </div>
      </div>

      {/* Customer Information */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-blue-600 font-bold text-sm">1</span>
          </div>
          Customer Information
        </h3>
        <div className="backdrop-blur-md bg-blue-50/60 border border-blue-200/50 rounded-2xl p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">First Name</span>
              <p className="font-bold text-gray-800">{validatedPromo?.firstName}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Last Name</span>
              <p className="font-bold text-gray-800">{validatedPromo?.lastName}</p>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Email Address</span>
            <p className="font-mono text-sm text-blue-600 bg-blue-100/60 rounded-lg px-3 py-1 mt-1">{validatedPromo?.email}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Mobile Number</span>
            <p className="font-mono text-sm text-blue-600 bg-blue-100/60 rounded-lg px-3 py-1 mt-1">{validatedPromo?.mobile}</p>
          </div>
        </div>
      </div>

      {/* Promotion Details */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-green-600 font-bold text-sm">2</span>
          </div>
          Promotion Details
        </h3>
        <div className="backdrop-blur-md bg-green-50/60 border border-green-200/50 rounded-2xl p-4 space-y-3">
          <div>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Promo Code</span>
            <p className="font-mono text-xl font-bold text-gray-800 bg-white/60 rounded-lg px-3 py-2 mt-1">{validatedPromo?.code}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Promotion Description</span>
            <p className="font-bold text-green-600 text-lg">{validatedPromo?.promo}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Part ID Used</span>
            <p className="font-mono text-sm text-green-600 bg-green-100/60 rounded-lg px-3 py-1 mt-1">{validatedPromo?.partId}</p>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-purple-600 font-bold text-sm">3</span>
          </div>
          Invoice Details
        </h3>
        <div className="backdrop-blur-md bg-purple-50/60 border border-purple-200/50 rounded-2xl p-4 space-y-3">
          <div>
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Dealer</span>
            <p className="font-bold text-gray-800">{dealerName} - {dealerLocation}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Invoice ID</span>
            <p className="font-mono text-lg font-bold text-gray-800 bg-white/60 rounded-lg px-3 py-2 mt-1">{invoiceId}</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Discount Applied</span>
            <p className="font-bold text-purple-600 text-2xl">{discountAmount}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={handleFinalSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin w-6 h-6 border-3 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              Confirm Promo Code Applied
              <CheckCircle2 size={20} className="ml-2" />
            </>
          )}
        </Button>
        
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={isLoading}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Invoice Details
        </Button>
      </div>
    </>
  );

  const renderCompleteStep = () => renderStepContainer(
    <>
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100/30 border border-green-200/50 animate-bounce">
          <Sparkles size={48} className="text-yellow-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Redemption Complete!</h2>
        
        <div className="backdrop-blur-md bg-gray-50/60 rounded-2xl p-6 mb-8 border border-gray-200/50 shadow-lg">
          <div className="space-y-3 text-sm text-left">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Promo Code:</span>
              <span className="font-mono font-bold text-yellow-600">{validatedPromo?.code}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Customer:</span>
              <span className="font-semibold text-gray-800">{validatedPromo?.customer}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Invoice ID:</span>
              <span className="font-semibold text-gray-800">{invoiceId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Discount Applied:</span>
              <span className="font-bold text-green-600 text-lg">{discountAmount}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8 text-lg font-medium">
          The promotion has been successfully redeemed and recorded in the system.
        </p>
        
        <Button onClick={handleStartOver}>
          Redeem Another Promotion
        </Button>
      </div>
    </>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.ENTER_CODE:
        return renderEnterCodeStep();
      case STEPS.CONFIRM_REDEMPTION:
        return renderConfirmRedemptionStep();
      case STEPS.REDEMPTION_SUCCESS:
        return renderRedemptionSuccessStep();
      case STEPS.ENTER_INVOICE_DETAILS:
        return renderInvoiceDetailsStep();
      case STEPS.FINAL_CONFIRMATION:
        return renderFinalConfirmationStep();
      case STEPS.COMPLETE:
        return renderCompleteStep();
      default:
        return renderEnterCodeStep();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {renderBackground()}
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {renderHeader()}
        {renderProgressBar()}
        
        <div className="flex-1 py-12">
          {renderCurrentStep()}
        </div>
        
        <div className="backdrop-blur-xl bg-white/60 border-t border-gray-200/50 p-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs text-gray-500 font-medium">
              Kigo Pro Lite v2.0 | John Deere Promotion System
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default KigoProLite; 