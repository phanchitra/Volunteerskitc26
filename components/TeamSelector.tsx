import React from 'react';
import { TEAMS } from '../constants';

interface TeamSelectorProps {
  label: string;
  hint: string;
  selectedTeam: string;
  onChange: (team: string) => void;
  required?: boolean;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ label, hint, selectedTeam, onChange, required }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{hint}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TEAMS.map((team) => (
          <label
            key={team}
            className={`
              relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1
              ${selectedTeam === team 
                ? 'border-brand-start bg-blue-50 dark:bg-blue-900/20 shadow-lg' 
                : 'border-gray-200 dark:border-gray-700 hover:border-brand-start/50 hover:bg-gray-50 dark:hover:bg-gray-800'}
            `}
          >
            <input
              type="radio"
              name="team"
              value={team}
              checked={selectedTeam === team}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-brand-start border-gray-300 focus:ring-brand-start"
            />
            <span className={`ml-3 text-sm font-medium ${selectedTeam === team ? 'text-brand-start font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
              {team}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TeamSelector;