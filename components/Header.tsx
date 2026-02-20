import React from 'react';
import { Sun, Moon, Calendar, MapPin } from 'lucide-react';
import { Language, Translations } from '../types';

interface HeaderProps {
  t: Translations;
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  progress: number;
}

const Header: React.FC<HeaderProps> = ({ t, lang, setLang, isDark, setIsDark, progress }) => {
  return (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-6">
          <img src="https://uploads.onecompiler.io/4478e2a8t/44e45ubu4/SAITC_Finishing-DzUXow4g.png" alt="SAITC" className="w-16 h-16 object-cover rounded-xl shadow-md transform hover:scale-105 transition-transform" />
          <img src="https://uploads.onecompiler.io/4478e2a8t/44e45ubu4/cropped-Logo-ITC-768x753-DgU1i94U.png" alt="ITC" className="w-16 h-16 object-cover rounded-xl shadow-md transform hover:scale-105 transition-transform" />
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
            title={isDark ? t.lightMode : t.darkMode}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-transparent text-sm font-semibold text-gray-700 dark:text-gray-200 focus:outline-none focus:border-brand-start cursor-pointer"
            >
              <option value="en" className="dark:bg-gray-800">English</option>
              <option value="km" className="dark:bg-gray-800">ភាសាខ្មែរ</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-start to-brand-end mb-3">
          {t.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium">
          {t.subtitle}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm font-bold text-gray-600 dark:text-gray-400">
          <span>{t.formProgress}</span>
          <span className="text-brand-start">{progress}% {t.complete}</span>
        </div>
        <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-start to-brand-end transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-1">
          Auto-saved locally (draft)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex flex-col items-center justify-center text-center border border-blue-100 dark:border-blue-800">
          <Calendar className="w-8 h-8 text-brand-start mb-2" />
          <h3 className="font-bold text-gray-800 dark:text-gray-100">{t.eventDates}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Coming Soon</p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex flex-col items-center justify-center text-center border border-purple-100 dark:border-purple-800">
          <MapPin className="w-8 h-8 text-brand-end mb-2" />
          <h3 className="font-bold text-gray-800 dark:text-gray-100">{t.location}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">ITC, Phnom Penh, Cambodia</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
