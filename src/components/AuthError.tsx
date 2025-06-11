'use client';

import React from 'react';
import { Shield, AlertTriangle, LogIn } from 'lucide-react';
import Image from 'next/image';

// Components
import { Background } from './layout/Background';
import { Button } from './ui/Button';

export const AuthError: React.FC = () => {
  const handleAuthenticate = () => {
    // Redirect to SAML/auth endpoint
    window.location.href = '/api/auth/signin';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-center">
              <div className="relative mr-6">
                <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl shadow-green-200/20 border border-white/50">
                  <Image
                    src="/john-deere-with-name.svg"
                    alt="John Deere"
                    width={120}
                    height={22}
                    className="h-6 w-auto"
                    priority
                  />
                </div>

              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Retail Incentive Redemption Portal</h1>
                <p className="text-gray-600 text-sm font-medium">Access Restricted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
          <div className="max-w-md w-full">
            <div className="backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-white/50 shadow-2xl shadow-gray-200/20">
              
              {/* Error Icon */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-200/30 border border-red-200/50">
                  <Shield size={40} className="text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Access Denied</h2>
                <p className="text-gray-600 text-lg">Authentication required to access this portal</p>
              </div>

              {/* Error Message */}
              <div className="bg-red-50/60 border border-red-200/50 rounded-2xl p-6 mb-8">
                <div className="flex items-start">
                  <AlertTriangle size={20} className="text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-red-800 mb-2">Authorization Required</h3>
                    <p className="text-red-700 text-sm leading-relaxed">
                      This portal is restricted to authorized John Deere dealers only. 
                      You must be signed in with valid dealer credentials to access the promo code redemption system.
                    </p>
                  </div>
                </div>
              </div>

              {/* Authentication Button */}
              <div className="text-center">
                <Button
                  onClick={handleAuthenticate}
                  className="w-full"
                >
                  <LogIn size={20} className="mr-2" />
                  Sign In with Dealer Credentials
                </Button>
                <p className="text-xs text-gray-500 mt-3">
                  You'll be redirected to the secure John Deere authentication portal
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="backdrop-blur-xl bg-white/60 border-t border-gray-200/50 p-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs text-gray-500 font-medium">
              John Deere Dealer Portal | Secure Access Required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 