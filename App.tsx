import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Language, FormData, INITIAL_FORM_DATA } from './types';
import { TRANSLATIONS, SCRIPT_URL } from './constants';
import InputGroup from './components/InputGroup';
import TeamSelector from './components/TeamSelector';
import SectionWrapper from './components/SectionWrapper';
import Header from './components/Header';
import SuccessView from './components/SuccessView';
import HelpSection from './components/HelpSection';
import FormFooter from './components/FormFooter';
import WelcomeScreen from './components/WelcomeScreen';

const TOTAL_STEPS = 5;

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isStarted, setIsStarted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const t = TRANSLATIONS[lang];

  // Dark Mode Effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Progress Calculation
  const calculateProgress = useCallback(() => {
    const totalFields = 16;
    let filled = 0;
    
    if (formData.fullNameKhmer) filled++;
    if (formData.fullNameLatin) filled++;
    if (formData.gender) filled++;
    if (formData.dateOfBirth) filled++;
    if (formData.yearOfStudy) filled++;
    if (formData.department) filled++;
    if (formData.university) filled++;
    if (formData.phone) filled++;
    if (formData.email) filled++;
    if (formData.telegram) filled++;
    if (formData.team) filled++;
    if (formData.experience) filled++;
    if (formData.skills) filled++;
    if (formData.motivation) filled++;
    if (formData.availability) filled++;
    if (formData.weeklyCommitment) filled++;
    if (formData.studentId) filled++; 
    if (formData.address) filled++;

    const percentage = Math.min(100, Math.round((filled / totalFields) * 100));
    setProgress(percentage);
  }, [formData]);

  useEffect(() => {
    calculateProgress();
  }, [formData, calculateProgress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (team: string) => {
    setFormData(prev => ({ ...prev, team }));
  };

  const localTimestampAsiaPhnomPenh = () => {
    try {
      return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Phnom_Penh',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }).format(new Date());
    } catch (e) {
      return new Date().toISOString();
    }
  };

  const handleNext = () => {
    // Check validation for current step fields using built-in HTML validation
    if (formRef.current && formRef.current.reportValidity()) {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== TOTAL_STEPS) return;

    setStatus('submitting');

    const payload = {
      sheetId: "1-CRGrnkYt6YyXtgN45_UaRzQbHBkpvkiZiO6TBeL1MQ",
      source: 'skitc26-volunteer',
      timestamp: localTimestampAsiaPhnomPenh(),
      userAgent: navigator.userAgent,
      ...formData
    };

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      alert('There might have been an issue connecting to the server. If this persists, please contact us.');
      setStatus('idle');
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
      setStatus('idle');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExport = () => {
    const txt = `SANGKRANTA TECHNO 2026 - VOLUNTEER REGISTRATION
===============================================

PERSONAL INFORMATION
--------------------
Full Name (Khmer): ${formData.fullNameKhmer || 'Not provided'}
Full Name (Latin): ${formData.fullNameLatin || 'Not provided'}
Gender: ${formData.gender || 'Not provided'}
Date of Birth: ${formData.dateOfBirth || 'Not provided'}

ACADEMIC INFORMATION
--------------------
Year of Study: ${formData.yearOfStudy || 'Not provided'}
Department/Major: ${formData.department || 'Not provided'}
University: ${formData.university || 'Not provided'}
Student ID: ${formData.studentId || 'Not provided'}

CONTACT INFORMATION
-------------------
Phone Number: ${formData.phone || 'Not provided'}
Email Address: ${formData.email || 'Not provided'}
Telegram Username: ${formData.telegram || 'Not provided'}
Address: ${formData.address || 'Not provided'}

VOLUNTEER PREFERENCES
---------------------
Preferred Team: ${formData.team || 'Not selected'}
Previous Experience: ${formData.experience || 'Not provided'}
Skills & Talents: ${formData.skills || 'Not provided'}
Motivation: ${formData.motivation || 'Not provided'}

AVAILABILITY & COMMITMENT
-------------------------
Event Availability: ${formData.availability || 'Not provided'}
Weekly Commitment: ${formData.weeklyCommitment || 'Not provided'}
Commitment Statement: ${formData.commitmentStatement || 'Not provided'}

Generated on: ${localTimestampAsiaPhnomPenh()}
User ID: SKITC-2026
`;
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skitc26-volunteer-registration.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (status === 'success') {
    return <SuccessView t={t} onReset={() => { setStatus('idle'); setFormData(INITIAL_FORM_DATA); setCurrentStep(1); setIsStarted(false); }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] animate-gradient-x">
      
      {!isStarted ? (
        <WelcomeScreen 
          t={t} 
          onStart={() => setIsStarted(true)} 
          lang={lang} 
          setLang={setLang} 
          isDark={isDark} 
          setIsDark={setIsDark} 
        />
      ) : (
        <div className="py-10 px-4 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <Header 
            t={t} 
            lang={lang} 
            setLang={setLang} 
            isDark={isDark} 
            setIsDark={setIsDark} 
            progress={progress} 
          />

          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl flex flex-col min-h-[500px]" 
          >
            
            <div className="flex-grow">
              {/* Step Indicators (Desktop) */}
              <div className="hidden md:flex items-center justify-between mb-8 px-4">
                 {[1, 2, 3, 4, 5].map(step => (
                   <div key={step} className="flex items-center">
                     <div className={`
                       w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                       ${currentStep === step ? 'bg-brand-start text-white scale-110 shadow-lg' : 
                         currentStep > step ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}
                     `}>
                       {currentStep > step ? '✓' : step}
                     </div>
                     {step < 5 && (
                       <div className={`w-12 h-1 mx-2 rounded-full transition-colors duration-300 ${currentStep > step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                     )}
                   </div>
                 ))}
              </div>

              {/* Mobile Step Indicator */}
              <div className="md:hidden mb-6 text-sm font-semibold text-brand-start uppercase tracking-wider text-center">
                {t.step} {currentStep} {t.of} {TOTAL_STEPS}
              </div>

              {currentStep === 1 && (
                <SectionWrapper number={1} title={t.personalInfo} variant="blue">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 animate-fade-in-up">
                    <InputGroup label={t.fullNameKhmer} name="fullNameKhmer" value={formData.fullNameKhmer} onChange={handleChange} placeholder="បញ្ចូលឈ្មោះពេញជាភាសាខ្មែរ" required />
                    <InputGroup label={t.fullNameLatin} name="fullNameLatin" value={formData.fullNameLatin} onChange={handleChange} placeholder="Latin Name" required />
                    <InputGroup label={t.gender} name="gender" value={formData.gender} onChange={handleChange} options={[t.select, t.male, t.female, t.other]} required />
                    <InputGroup label={t.dateOfBirth} name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
                  </div>
                </SectionWrapper>
              )}

              {currentStep === 2 && (
                <SectionWrapper number={2} title={t.academicInfo} variant="purple">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 animate-fade-in-up">
                    <InputGroup label={t.yearOfStudy} name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} options={[t.select, "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Graduate"]} required />
                    <InputGroup label={t.department} name="department" value={formData.department} onChange={handleChange} placeholder="e.g. GIC, GCA" required />
                    <InputGroup label={t.university} name="university" value={formData.university} onChange={handleChange} placeholder="Institute Name" required />
                    <InputGroup label={t.studentId} name="studentId" value={formData.studentId} onChange={handleChange} placeholder="e.g. e2020..." />
                  </div>
                </SectionWrapper>
              )}

              {currentStep === 3 && (
                <SectionWrapper number={3} title={t.contactInfo} variant="pink">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 animate-fade-in-up">
                    <InputGroup label={t.phoneNumber} name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+855 ..." required />
                    <InputGroup label={t.emailAddress} name="email" type="email" value={formData.email} onChange={handleChange} placeholder="student@example.com" required />
                    <InputGroup label={t.telegramUsername} name="telegram" value={formData.telegram} onChange={handleChange} placeholder="https://t.me/username" required hint="Full URL or Username" />
                    <InputGroup label={t.address} name="address" value={formData.address} onChange={handleChange} placeholder="Phnom Penh..." />
                  </div>
                </SectionWrapper>
              )}

              {currentStep === 4 && (
                <SectionWrapper number={4} title={t.interestsExp} variant="orange">
                  <div className="animate-fade-in-up">
                    <TeamSelector 
                      label={t.preferredTeam} 
                      hint={t.selectTeam} 
                      selectedTeam={formData.team} 
                      onChange={handleTeamChange} 
                      required
                    />
                    <InputGroup label={t.previousExp} name="experience" isTextArea value={formData.experience} onChange={handleChange} placeholder="..." required />
                    <InputGroup label={t.skills} name="skills" value={formData.skills} onChange={handleChange} placeholder="Design, Coding, etc." required />
                    <InputGroup label={t.motivation} name="motivation" isTextArea value={formData.motivation} onChange={handleChange} placeholder="Why join us?" required />
                  </div>
                </SectionWrapper>
              )}

              {currentStep === 5 && (
                <SectionWrapper number={5} title={t.availability} variant="teal">
                  <div className="animate-fade-in-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                      <InputGroup label={t.eventAvailability} name="availability" value={formData.availability} onChange={handleChange} options={[t.select, "Full time (all days)", "Partial (specific days)", "Flexible"]} required />
                      <InputGroup label={t.weeklyCommitment} name="weeklyCommitment" value={formData.weeklyCommitment} onChange={handleChange} options={[t.select, "1-5 hours", "6-10 hours", "11-15 hours", "16+ hours"]} required />
                    </div>
                    <InputGroup label={t.commitmentStatement} name="commitmentStatement" isTextArea value={formData.commitmentStatement} onChange={handleChange} placeholder="I commit to..." required />
                  </div>
                </SectionWrapper>
              )}
            </div>

            <FormFooter 
              t={t} 
              onReset={handleReset} 
              onExport={handleExport} 
              isSubmitting={status === 'submitting'}
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              onNext={handleNext}
              onBack={handleBack}
            />
          </form>

          <HelpSection t={t} />

          <div className="text-center pb-8">
            <p className="text-white/80 text-sm font-medium">© 2026 Sangkranta Techno — Volunteer Registration System. Built for ITC.</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default App;