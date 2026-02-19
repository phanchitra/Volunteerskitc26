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
        <p className="text-gray-600 mb-8 text-lg">{t.thankYou}</p>
        <button 
          onClick={onReset}
          className="bg-[#667eea] hover:bg-[#764ba2] text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Submit Another Response
        </button>
      </div>
    </div>
  );
};

export default SuccessView;