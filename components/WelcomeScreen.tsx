import React from 'react';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import { Language, Translations } from '../types';

interface WelcomeScreenProps {
  t: Translations;
  onStart: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ t, onStart, lang, setLang, isDark, setIsDark }) => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/5 dark:bg-black/20 pointer-events-none" />

      {/* Navbar/Controls */}
      <div className="relative z-10 flex justify-end p-6 gap-3">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all transform hover:scale-105"
          title={isDark ? t.lightMode : t.darkMode}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="relative">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-sm font-bold text-white focus:outline-none cursor-pointer transition-all"
          >
            <option value="en" className="text-gray-900 dark:text-gray-100">English</option>
            <option value="km" className="text-gray-900 dark:text-gray-100">ភាសាខ្មែរ</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-white">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10 animate-fade-in-up">
        <div className="mb-10 relative">
          <div className="absolute -inset-10 bg-white/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <img 
            src="https://uploads.onecompiler.io/4478e2a8t/44e45ubu4/logo02.png" 
            alt="Sangkranta Techno Logo" 
            className="w-56 h-56 md:w-80 md:h-80 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] relative transform hover:scale-105 transition-transform duration-500" 
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-md tracking-tight">
          Sangkranta Techno 2026
        </h1>
        
        <p className="text-lg md:text-2xl text-white/90 mb-12 max-w-2xl font-medium leading-relaxed drop-shadow-sm">
          {t.subtitle}
        </p>

        <button 
          onClick={onStart}
          className="group flex items-center gap-3 bg-white text-brand-start hover:text-brand-end px-10 py-5 rounded-full font-bold text-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 transition-all duration-300"
        >
          {t.startRegistration}
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Footer */}
      <div className="p-6 text-center z-10">
        <p className="text-white/60 text-sm font-medium">© 2026 Institute of Technology of Cambodia</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;