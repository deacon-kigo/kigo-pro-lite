import React from 'react';
import { Tag } from 'lucide-react';
import { availablePromotions } from '../../data/mockData';

interface AvailablePromotionsPanelProps {
  onSelectPromoCode: (code: string) => void;
}

export const AvailablePromotionsPanel: React.FC<AvailablePromotionsPanelProps> = ({ onSelectPromoCode }) => (
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
                  onClick={() => onSelectPromoCode(promo.code)}
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