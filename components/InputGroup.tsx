import React from 'react';

interface InputGroupProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  options?: string[]; // For select inputs
  isTextArea?: boolean;
  rows?: number;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  hint,
  options,
  isTextArea,
  rows = 3
}) => {
  return (
    <div className="mb-6 relative group">
      <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300 group-focus-within:text-brand-start transition-colors">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-brand-start focus:ring-4 focus:ring-brand-start/10 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      ) : options ? (
        <div className="relative">
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-brand-start focus:ring-4 focus:ring-brand-start/10 transition-all duration-300 text-gray-900 dark:text-white appearance-none cursor-pointer"
          >
             {options.map(opt => (
               <option key={opt} value={opt}>{opt}</option>
             ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-brand-start focus:ring-4 focus:ring-brand-start/10 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      )}
      
      {hint && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p>}
    </div>
  );
};

export default InputGroup;