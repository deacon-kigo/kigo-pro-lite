import React from 'react';

export const DealerSupportPanel: React.FC = () => (
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
); 