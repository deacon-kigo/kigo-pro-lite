import React from 'react';

interface HeaderProps {
  dealerName: string;
  dealerLocation: string;
}

export const Header: React.FC<HeaderProps> = ({ dealerName, dealerLocation }) => (
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
        </div>
      </div>
    </div>
  </div>
); 