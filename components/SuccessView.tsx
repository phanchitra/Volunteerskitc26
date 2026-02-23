import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Translations } from '../types';

interface SuccessViewProps {
  t: Translations;
  onReset: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ t, onReset }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] animate-gradient-x">
      <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center animate-fade-in-up">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.appSubmitted}</h2>
        <p className="text-gray-600 mb-6 text-lg">{t.thankYou}</p>
        
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
          <p className="text-blue-800 font-medium mb-3">Join our volunteer group on Telegram:</p>
          <a 
            href="https://t.me/+-mlqjrm4lyg4Mjk1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0088cc] hover:bg-[#0077b5] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.37-.48 1.02-.73 4-1.74 6.67-2.88 8.01-3.43 3.81-1.56 4.6-1.83 5.12-1.84.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.02.19z"/>
            </svg>
            Join Telegram Group
          </a>
        </div>

        <button 
          onClick={onReset}
          className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          Submit Another Response
        </button>
      </div>
    </div>
  );
};

export default SuccessView;
