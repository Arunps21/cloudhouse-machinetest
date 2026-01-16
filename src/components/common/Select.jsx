import React, { forwardRef } from "react";
import { HiChevronDown } from "react-icons/hi2";

const Select = forwardRef(
  (
    {
      label,
      error,
      helperText,
      options = [],
      placeholder = "Select an option",
      className = "",
      containerClassName = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`space-y-1.5 ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
            block w-full rounded-lg border transition-all duration-200
            pl-4 pr-10 py-2.5
            appearance-none cursor-pointer
            ${
              error
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                : "border-slate-300 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500"
            }
            bg-white dark:bg-slate-800
            text-slate-900 dark:text-slate-100
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <HiChevronDown className="h-5 w-5 text-slate-400" />
          </div>
        </div>
        {(error || helperText) && (
          <p
            className={`text-sm ${error ? "text-rose-500" : "text-slate-500 dark:text-slate-400"}`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
