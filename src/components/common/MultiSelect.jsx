import React, { useState, useRef, useEffect } from 'react';
import { HiChevronDown, HiXMark, HiCheck } from 'react-icons/hi2';

const MultiSelect = ({
  label,
  options = [],
  value = [],
  onChange,
  placeholder = 'Select options',
  error,
  helperText,
  required = false,
  disabled = false,
  containerClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (optionValue) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (e, optionValue) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  const getSelectedLabels = () => {
    return value.map(v => options.find(o => o.value === v)?.label).filter(Boolean);
  };

  return (
    <div className={`space-y-1.5 ${containerClassName}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            min-h-[42px] w-full rounded-lg border transition-all duration-200
            px-3 py-2 cursor-pointer flex flex-wrap gap-1.5 items-center
            ${error 
              ? 'border-rose-500' 
              : isOpen 
                ? 'border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50' 
                : 'border-slate-300 dark:border-slate-600'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            bg-white dark:bg-slate-800
          `}
        >
          {value.length === 0 ? (
            <span className="text-slate-400 dark:text-slate-500 text-sm">{placeholder}</span>
          ) : (
            getSelectedLabels().map((label, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium
                  bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
              >
                {label}
                <button
                  type="button"
                  onClick={(e) => removeOption(e, value[index])}
                  className="hover:text-indigo-900 dark:hover:text-indigo-100"
                >
                  <HiXMark className="w-3.5 h-3.5" />
                </button>
              </span>
            ))
          )}
          <HiChevronDown 
            className={`ml-auto h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-hidden animate-slideDown">
            <div className="p-2 border-b border-slate-200 dark:border-slate-700">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-1.5 text-sm rounded-md border border-slate-200 dark:border-slate-600 
                  bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100
                  focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map(option => (
                  <div
                    key={option.value}
                    onClick={() => toggleOption(option.value)}
                    className={`
                      flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors
                      ${value.includes(option.value) 
                        ? 'bg-indigo-50 dark:bg-indigo-900/30' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    <div className={`
                      flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                      ${value.includes(option.value)
                        ? 'bg-indigo-500 border-indigo-500'
                        : 'border-slate-300 dark:border-slate-600'
                      }
                    `}>
                      {value.includes(option.value) && (
                        <HiCheck className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {option.color && (
                        <span className={`w-2 h-2 rounded-full ${option.color}`} />
                      )}
                      <span className="text-sm text-slate-900 dark:text-slate-100">{option.label}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p className={`text-sm ${error ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default MultiSelect;
