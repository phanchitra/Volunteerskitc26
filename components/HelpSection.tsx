import React from 'react';
import { HelpCircle, Mail, MessageCircle, Facebook } from 'lucide-react';
import { Translations } from '../types';

interface HelpSectionProps {
  t: Translations;
}

const HelpSection: React.FC<HelpSectionProps> = ({ t }) => {
  return (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-white">
        <HelpCircle className="w-6 h-6 text-brand-start" />
        <h3 className="text-xl font-bold">{t.needHelp}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{t.helpText}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="mailto:studentsassociation.itc@gmail.com" className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-center transition-colors group">
          <Mail className="w-6 h-6 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Email</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">studentsassociation.itc</span>
        </a>
        
        <a href="https://t.me/sovisalsun" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-center transition-colors group">
          <MessageCircle className="w-6 h-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Telegram</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">@SKITCservice</span>
        </a>

        <a href="https://web.facebook.com/SAITC.edu.kh" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-center transition-colors group">
          <Facebook className="w-6 h-6 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Facebook</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">SAITC Page</span>
        </a>
      </div>
    </div>
  );
};

export default HelpSection;