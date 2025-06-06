'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, CheckCircle2, AlertTriangle, ArrowLeft, Receipt, Tag, Shield, Sparkles } from 'lucide-react';

// Components
import { Background } from './layout/Background';
import { Header } from './layout/Header';
import { ProgressBar } from './layout/ProgressBar';
import { StepContainer } from './layout/StepContainer';
import { Button } from './ui/Button';

// Constants and Data
import { STEPS, type StepType } from '../constants/steps';

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

// Mock data
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
  const [localPromoCodes, setLocalPromoCodes] = useState<Record<string, PromoCode>>({...mockPromoCodes});
  const [dealerName, setDealerName] = useState('Pape Machinery');
  const [dealerLocation, setDealerLocation] = useState('Kent, WA');
  
  // Refs for auto-focus
  const promoCodeRef = useRef<HTMLInputElement>(null);
  const invoiceIdRef = useRef<HTMLInputElement>(null);

  // Auto-focus on step changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep === STEPS.ENTER_CODE && promoCodeRef.current) {
        promoCodeRef.current.focus();
      } else if (currentStep === STEPS.ENTER_INVOICE_DETAILS && invoiceIdRef.current) {
        invoiceIdRef.current.focus();
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentStep]);

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
      setCurrentStep(STEPS.CONFIRM_REDEMPTION);
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
      
      setCurrentStep(STEPS.REDEMPTION_SUCCESS);
      setIsLoading(false);
    }, 1000);
  };

  const handleInvoiceSubmit = () => {
    if (!invoiceId.trim()) {
      setError('Please enter an invoice ID');
      return;
    }
    
    if (!discountAmount.trim()) {
      setError('Please enter the discount amount');
      return;
    }
    
    setError('');
    setCurrentStep(STEPS.COMPLETE);
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
    switch (currentStep) {
      case STEPS.CONFIRM_REDEMPTION:
        setCurrentStep(STEPS.ENTER_CODE);
        break;
      case STEPS.ENTER_INVOICE_DETAILS:
        setCurrentStep(STEPS.REDEMPTION_SUCCESS);
        break;
      default:
        break;
    }
  };

  const renderEnterCodeStep = () => (
    <StepContainer>
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
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            onKeyPress={(e) => e.key === 'Enter' && handlePromoCodeSubmit()}
            className="w-full px-4 py-3 text-lg font-mono text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-400/30 focus:border-green-500 transition-all duration-200 placeholder-gray-500"
            placeholder="e.g., 8BCFM2"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm font-medium">{error}</p>
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

        {/* Demo buttons */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-500 mb-3 font-medium">Quick test codes:</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(mockPromoCodes).map(code => (
              <Button
                key={code}
                variant="demo"
                onClick={() => setPromoCode(code)}
                className="text-xs py-2"
              >
                {code}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </StepContainer>
  );

  const renderConfirmRedemptionStep = () => (
    <StepContainer>
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200/30">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">This promo code is valid</h2>
        <p className="text-gray-600 text-lg mb-6">Please verify the customer information below and confirm redemption</p>
        
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
            <p className="font-bold text-gray-800">{validatedPromo?.firstName}</p>
          </div>
          <div>
            <span className="text-blue-700 font-semibold">Last Name:</span>
            <p className="font-bold text-gray-800">{validatedPromo?.lastName}</p>
          </div>
          <div className="col-span-2">
            <span className="text-blue-700 font-semibold">Email:</span>
            <p className="font-mono text-blue-600">{validatedPromo?.email}</p>
          </div>
          <div className="col-span-2">
            <span className="text-blue-700 font-semibold">Mobile:</span>
            <p className="font-mono text-blue-600">{validatedPromo?.mobile}</p>
          </div>
        </div>
      </div>

      {/* Promotion Details */}
      <div className="bg-green-50/60 border border-green-200/50 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Promotion Details</h3>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-green-700 font-semibold">Promo Code:</span>
            <p className="font-mono text-xl font-bold text-gray-800">{validatedPromo?.code}</p>
          </div>
          <div>
            <span className="text-green-700 font-semibold">Promotion:</span>
            <p className="font-bold text-green-600 text-lg">{validatedPromo?.promo}</p>
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
    <StepContainer>
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-200/30">
          <Receipt size={40} className="text-yellow-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Enter the promotion part ID</h2>
        <p className="text-gray-600 text-lg mb-8">Use this part ID (not the promo code) when entering the promotion in your invoice system</p>
      </div>

      <div className="bg-yellow-50/60 border border-yellow-200/50 rounded-2xl p-6 mb-8">
        <div className="text-center">
          <span className="text-yellow-700 font-semibold text-sm">Part ID to use in invoice system:</span>
          <p className="font-mono text-3xl font-bold text-gray-800 mt-2 mb-4">{validatedPromo?.partId || 'JDPROMO'}</p>
          <div className="text-sm text-gray-600">
            <p className="mb-2">1. Enter this Part ID in your invoice system</p>
            <p className="mb-2">2. Apply the promotion to the appropriate items</p>
            <p>3. Complete the invoice and proceed to the next step</p>
          </div>
        </div>
      </div>

      <Button
        onClick={() => setCurrentStep(STEPS.ENTER_INVOICE_DETAILS)}
        className="w-full"
      >
        I've Applied the Promotion
        <ChevronRight size={20} className="ml-2" />
      </Button>
    </StepContainer>
  );

  const renderInvoiceDetailsStep = () => (
    <StepContainer>
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
            onChange={(e) => setInvoiceId(e.target.value)}
            className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-400/30 focus:border-purple-500 transition-all duration-200 placeholder-gray-500"
            placeholder="e.g., INV-2024-001"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter the discount amount that resulted from applying the [{validatedPromo?.partId}] promotion
          </label>
          <input
            type="text"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            className="w-full px-4 py-3 text-gray-800 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-400/30 focus:border-purple-500 transition-all duration-200 placeholder-gray-500"
            placeholder="e.g., $9.40 or 20%"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm font-medium">{error}</p>
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
    <StepContainer>
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
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header dealerName={dealerName} dealerLocation={dealerLocation} />
        <ProgressBar currentStep={currentStep} />
        
        <div className="flex-1 py-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default KigoProLite; 