import React, { forwardRef } from "react";

const TextArea = forwardRef(
  (
    {
      label,
      error,
      helperText,
      rows = 4,
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
        <textarea
          ref={ref}
          rows={rows}
          className={`
          block w-full rounded-lg border transition-all duration-200
          px-4 py-2.5
          ${
            error
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
              : "border-slate-300 dark:border-slate-600 focus:border-indigo-500 focus:ring-indigo-500"
          }
          bg-white dark:bg-slate-800
          text-slate-900 dark:text-slate-100
          placeholder:text-slate-400 dark:placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-opacity-50
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-none
          ${className}
        `}
          {...props}
        />
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

TextArea.displayName = "TextArea";

export default TextArea;
