'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, CheckCircle2, AlertTriangle, ArrowLeft, Receipt, Tag, Shield, Sparkles } from 'lucide-react';

// Components
import { Background } from './layout/Background';
import { Header } from './layout/Header';
import { StepContainer } from './layout/StepContainer';
import { Button } from './ui/Button';

// Constants and Data
import { STEPS, type StepType } from '../constants/steps';

// Type definitions
interface PromoCode {
  status: 'ACTIVE' | 'REDEEMED' | 'PENDING' | 'EXPIRED';
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

// Mock data for demo purposes - replace with actual API calls for production
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
    item: 'Oil Change Service',
    partId: 'JDOIL15'
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
    item: 'Tractor Parts',
    partId: 'JDPARTS10'
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
    item: 'Repair Services',
    partId: 'JDREPAIR50'
  },
  'EXPIRED123': {
    status: 'EXPIRED',
    customer: 'Test Customer',
    firstName: 'Test',
    lastName: 'Customer',
    email: 'test@example.com',
    mobile: '(555) 000-0000',
    promo: '25% Off (Expired)',
    accountNumber: '0000',
    discount: 25,
    discountType: 'percent',
    item: 'Expired Promotion',
    partId: 'EXPIRED25'
  }
};

interface ValidatedPromo extends PromoCode {
  code: string;
}

const KigoProLite = () => {
  const [currentStep, setCurrentStep] = useState<StepType>(STEPS.ENTER_CODE);
  const [promoCode, setPromoCode] = useState('');
  const [validatedPromo, setValidatedPromo] = useState<ValidatedPromo | null>(null);
  const [invoiceId, setInvoiceId] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [dealerName, setDealerName] = useState('Pape Machinery');
  const [dealerLocation, setDealerLocation] = useState('Kent, WA');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  
  // Refs for auto-focus
  const promoCodeRef = useRef<HTMLInputElement>(null);
  const invoiceIdRef = useRef<HTMLInputElement>(null);

  // Smooth step transition function
  const navigateToStep = (newStep: StepType) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  // Set error with shake animation
  const setErrorWithShake = (errorMessage: string) => {
    setError(errorMessage);
    setErrorShake(true);
    setTimeout(() => setErrorShake(false), 500);
  };

  // Auto-focus on step changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep === STEPS.ENTER_CODE && promoCodeRef.current) {
        promoCodeRef.current.focus();
      } else if (currentStep === STEPS.ENTER_INVOICE_DETAILS && invoiceIdRef.current) {
        invoiceIdRef.current.focus();
      }
    }, 400);
    
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handlePromoCodeSubmit = () => {
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      const trimmedCode = promoCode.trim();
      
      if (!trimmedCode) {
        setErrorWithShake('Please enter a promo code');
        setIsLoading(false);
        return;
      }
      
      const promo = mockPromoCodes[trimmedCode];
      
      if (!promo) {
        setErrorWithShake('Invalid promo code. Please check the code and try again.');
        setIsLoading(false);
        return;
      }
      
      if (promo.status === 'REDEEMED') {
        setErrorWithShake('This promo code has already been redeemed.');
        setIsLoading(false);
        return;
      }
      
      if (promo.status === 'EXPIRED') {
        setErrorWithShake('This promo code has expired.');
        setIsLoading(false);
        return;
      }
      
      if (promo.status === 'PENDING') {
        setErrorWithShake('This promo code is pending approval. Please contact John Deere Corporate for assistance.');
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
      // Note: In demo mode, we don't actually mark as redeemed
      // In production, this would update the backend
      navigateToStep(STEPS.REDEMPTION_SUCCESS);
      setIsLoading(false);
    }, 1000);
  };

  const handleInvoiceSubmit = () => {
    if (!invoiceId.trim()) {
      setErrorWithShake('Please enter invoice ID');
      return;
    }
    
    if (!discountAmount.trim()) {
      setErrorWithShake('Please enter discount amount');
      return;
    }
    
    // Basic validation for discount format
    const trimmedAmount = discountAmount.trim();
    if (!trimmedAmount.match(/^(\$?\d+(\.\d{1,2})?|\d+%)$/)) {
      setErrorWithShake('Please enter a valid discount amount (e.g., $9.40 or 20%)');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      // Note: In demo mode, we just simulate completion
      // In production, this would submit to backend
      navigateToStep(STEPS.COMPLETE);
      setIsLoading(false);
    }, 1000);
  };

  const handleStartOver = () => {
    navigateToStep(STEPS.ENTER_CODE);
    setPromoCode('');
    setValidatedPromo(null);
    setInvoiceId('');
    setDiscountAmount('');
    setError('');
    setIsLoading(false);
  };

  const handleBack = () => {
    setError(''); // Clear any errors when navigating back
    
    switch (currentStep) {
      case STEPS.CONFIRM_REDEMPTION:
        navigateToStep(STEPS.ENTER_CODE);
        break;
      case STEPS.ENTER_INVOICE_DETAILS:
        navigateToStep(STEPS.REDEMPTION_SUCCESS);
        break;
      default:
        break;
    }
  };

  const renderEnterCodeStep = () => (
    <StepContainer currentStep={currentStep} isTransitioning={isTransitioning}>
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200/30">
          <Shield size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Enter Promo Code</h2>
        <p className="text-gray-600 text-lg mb-8">Enter the customer's promo code to validate and redeem</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Promo Code
          </label>
          <input
            ref={promoCodeRef}
            type="text"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value.toUpperCase());
              if (error) setError(''); // Clear error when user starts typing
            }}
            onKeyPress={(e) => e.key === 'Enter' && handlePromoCodeSubmit()}
            className="w-full px-4 py-3 text-lg font-mono text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-400/30 focus:border-green-500 transition-all duration-200 placeholder-gray-500"
            placeholder="e.g., 8BCFM2"
          />
        </div>

        {error && (
          <div className={`flex items-center p-4 bg-red-50 border border-red-200 rounded-xl ${errorShake ? 'animate-shake' : ''}`}>
            <AlertTriangle size={16} className="text-red-600 mr-2 flex-shrink-0" />
            <p className="text-red-700 text-sm font-bold">{error}</p>
          </div>
        )}

        <Button
          onClick={handlePromoCodeSubmit}
          disabled={isLoading || !promoCode.trim()}
          className="w-full"
        >
          {isLoading ? (
            <div className="animate-spin w-6 h-6 border-3 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              Validate Promo Code
              <ChevronRight size={20} className="ml-2" />
            </>
          )}
        </Button>


      </div>
    </StepContainer>
  );

  const renderConfirmRedemptionStep = () => (
    <StepContainer currentStep={currentStep} isTransitioning={isTransitioning}>
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200/30">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">This promo code is valid</h2>
        <p className="text-gray-600 text-lg mb-6">Please verify the customer information below and confirm redemption. This unique promo code can only be used once.</p>
        
        <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-xl mb-8">
          <AlertTriangle size={16} className="text-red-600 mr-2" />
          <p className="text-red-700 text-sm font-semibold">This action will permanently invalidate the promo code</p>
        </div>
      </div>

      {/* Customer Information */}
      <div className="bg-blue-50/60 border border-blue-200/50 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Customer Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-blue-700 font-semibold">First Name:</span>
            <div className="bg-white/80 rounded-xl px-3 py-2 mt-1 border border-white/50">
              <p className="font-bold text-gray-800">{validatedPromo?.firstName}</p>
            </div>
          </div>
          <div>
            <span className="text-blue-700 font-semibold">Last Name:</span>
            <div className="bg-white/80 rounded-xl px-3 py-2 mt-1 border border-white/50">
              <p className="font-bold text-gray-800">{validatedPromo?.lastName}</p>
            </div>
          </div>
          <div className="col-span-2">
            <span className="text-blue-700 font-semibold">Email:</span>
            <div className="bg-white/80 rounded-xl px-3 py-2 mt-1 border border-white/50">
              <p className="font-bold text-gray-800">{validatedPromo?.email}</p>
            </div>
          </div>
          <div className="col-span-2">
            <span className="text-blue-700 font-semibold">Mobile:</span>
            <div className="bg-white/80 rounded-xl px-3 py-2 mt-1 border border-white/50">
              <p className="font-bold text-gray-800">{validatedPromo?.mobile}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Promotion Details */}
      <div className="bg-green-50/60 border border-green-200/50 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Promotion Details</h3>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-green-700 font-semibold">Promo Code:</span>
            <div className="bg-white/80 rounded-xl px-3 py-2 mt-1 border border-white/50">
              <p className="font-mono text-xl font-bold text-gray-800">{validatedPromo?.code}</p>
            </div>
          </div>
          <div>
            <span className="text-green-700 font-semibold">Promotion:</span>
            <div className="bg-white/80 rounded-xl px-3 py-2 mt-1 border border-white/50">
              <p className="font-bold text-gray-800 text-lg">{validatedPromo?.promo}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Button
          onClick={handleConfirmRedemption}
          disabled={isLoading}
          className="w-full"
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
          className="w-full"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Enter Code
        </Button>
      </div>
    </StepContainer>
  );

  const renderRedemptionSuccessStep = () => (
    <StepContainer currentStep={currentStep} isTransitioning={isTransitioning}>
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-200/30">
          <Receipt size={40} className="text-yellow-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Enter the promotion part ID</h2>
        <p className="text-gray-600 text-lg mb-8">Use this specific part ID (not the original promo code) when applying the promotion in your dealer invoice system</p>
      </div>

      <div className="bg-yellow-50/60 border border-yellow-200/50 rounded-2xl p-6 mb-8">
        <div className="text-center">
          <span className="text-yellow-700 font-semibold text-sm">Part ID to use in invoice system:</span>
          <p className="font-mono text-3xl font-bold text-gray-800 mt-2 mb-4">{validatedPromo?.partId || 'JDPROMO'}</p>
          <div className="text-sm text-gray-600">
            <p className="mb-2">1. Enter this Part ID in your dealer invoice system</p>
            <p className="mb-2">2. Apply the promotion to the customer's eligible items</p>
            <p>3. Process the invoice with the discount applied</p>
          </div>
        </div>
      </div>

      <Button
        onClick={() => navigateToStep(STEPS.ENTER_INVOICE_DETAILS)}
        className="w-full"
      >
        I've Applied the Promotion
        <ChevronRight size={20} className="ml-2" />
      </Button>
    </StepContainer>
  );

  const renderInvoiceDetailsStep = () => (
    <StepContainer currentStep={currentStep} isTransitioning={isTransitioning}>
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-200/30">
          <Tag size={40} className="text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Invoice Details</h2>
        <p className="text-gray-600 text-lg mb-8">Enter the invoice details to complete the redemption</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Invoice ID
          </label>
          <input
            ref={invoiceIdRef}
            type="text"
            value={invoiceId}
            onChange={(e) => {
              setInvoiceId(e.target.value);
              if (error) setError(''); // Clear error when user starts typing
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleInvoiceSubmit()}
            className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-400/30 focus:border-purple-500 transition-all duration-200 placeholder-gray-500"
            placeholder="e.g., INV-2024-001"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter the discount amount that resulted from applying the [{validatedPromo?.partId || 'PROMOTION_CODE'}] promotion
          </label>
          <input
            type="text"
            value={discountAmount}
            onChange={(e) => {
              setDiscountAmount(e.target.value);
              if (error) setError(''); // Clear error when user starts typing
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleInvoiceSubmit()}
            className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-400/30 focus:border-purple-500 transition-all duration-200 placeholder-gray-500"
            placeholder="e.g., $9.40 or 20%"
          />
        </div>

        {error && (
          <div className={`flex items-center p-4 bg-red-50 border border-red-200 rounded-xl ${errorShake ? 'animate-shake' : ''}`}>
            <AlertTriangle size={16} className="text-red-600 mr-2 flex-shrink-0" />
            <p className="text-red-700 text-sm font-bold">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={handleInvoiceSubmit}
            disabled={!invoiceId.trim() || !discountAmount.trim()}
            className="w-full"
          >
            Complete Redemption
            <CheckCircle2 size={20} className="ml-2" />
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleBack}
            className="w-full"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Instructions
          </Button>
        </div>
      </div>
    </StepContainer>
  );

  const renderCompleteStep = () => (
    <StepContainer currentStep={currentStep} isTransitioning={isTransitioning}>
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100/30 border border-green-200/50 animate-bounce">
          <Sparkles size={48} className="text-yellow-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Redemption Complete!</h2>
        
        <div className="bg-gray-50/60 rounded-2xl p-6 mb-8 border border-gray-200/50 shadow-lg text-left">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Promo Code:</span>
              <span className="font-mono font-bold text-yellow-600">{validatedPromo?.code}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Customer:</span>
              <span className="font-bold text-gray-800">{validatedPromo?.customer}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Invoice ID:</span>
              <span className="font-bold text-gray-800">{invoiceId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Discount Applied:</span>
              <span className="font-bold text-green-600 text-lg">{discountAmount}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8 text-lg font-medium">
          The promotion has been successfully redeemed and recorded in the system. This promo code has been permanently invalidated and cannot be used again.
        </p>
        
        <Button onClick={handleStartOver} className="w-full">
          Redeem Another Promotion
        </Button>
      </div>
    </StepContainer>
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
      case STEPS.COMPLETE:
        return renderCompleteStep();
      default:
        return renderEnterCodeStep();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      
      <div className="relative z-10 min-h-screen">
        <div className="pt-6">
          <Header dealerName={dealerName} dealerLocation={dealerLocation} />
        </div>
        
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default KigoProLite; 