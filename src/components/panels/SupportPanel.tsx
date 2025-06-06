import React from 'react';
import { Mail } from 'lucide-react';

export const SupportPanel: React.FC = () => {
  return (
    <div className="w-full mt-8 p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl shadow-blue-200/20">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Need Help?
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Contact our support team for assistance with promo code redemptions.
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-green-400" />
          <a 
            href="mailto:support@johndeere.com" 
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            support@johndeere.com
          </a>
        </div>
      </div>
    </div>
  );
}; 