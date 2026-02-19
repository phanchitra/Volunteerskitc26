import React from 'react';
import { RotateCcw, Download, Send, ArrowLeft, ArrowRight } from 'lucide-react';
import { Translations } from '../types';

interface FormFooterProps {
  t: Translations;
  onReset: () => void;
  onExport: () => void;
  isSubmitting: boolean;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
}

const FormFooter: React.FC<FormFooterProps> = ({ 
  t, 
  onReset, 
  onExport, 
  isSubmitting, 
  currentStep, 
  totalSteps,
  onNext,
  onBack
}) => {
  return (
    <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Actions (Reset/Export) */}
        <div className="flex gap-4 w-full md:w-auto order-2 md:order-1 justify-center md:justify-start">
          <button 
            type="button" 
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-sm font-semibold"
            title={t.resetForm}
          >
            <RotateCcw size={18} />
            <span className="hidden sm:inline">{t.resetForm}</span>
          </button>
          
          <button 
            type="button" 
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors text-sm font-semibold"
            title={t.exportPDF}
          >
            <Download size={18} />
            <span className="hidden sm:inline">{t.exportPDF}</span>
          </button>
        </div>

        {/* Navigation Actions */}
        <div className="flex gap-4 w-full md:w-auto order-1 md:order-2">
          {currentStep > 1 && (
            <button 
              type="button" 
              onClick={onBack}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={20} />
              {t.back}
            </button>
          )}

          {currentStep < totalSteps ? (
            <button 
              type="button" 
              onClick={onNext}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              {t.next}
              <ArrowRight size={20} />
            </button>
          ) : (
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-brand-start to-brand-end text-white px-10 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t.submitting}
                </>
              ) : (
                <>
                  <Send size={20} />
                  {t.submitApp}
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile-only Step Text */}
      <div className="md:hidden mt-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
        {t.step} {currentStep} {t.of} {totalSteps}
      </div>
    </div>
  );
};

export default FormFooter;