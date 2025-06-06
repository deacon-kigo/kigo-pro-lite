import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  dealerName: string;
  dealerLocation: string;
}

export const Header: React.FC<HeaderProps> = ({ dealerName, dealerLocation }) => (
  <div className="relative z-10">
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
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
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Retail Incentive Redemption Portal</h1>
            <p className="text-gray-600 text-sm font-medium">Dealer System</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">Jim Smith</p>
          <p className="text-xs text-gray-600">{dealerName} • {dealerLocation}</p>
        </div>
      </div>
    </div>
  </div>
); 