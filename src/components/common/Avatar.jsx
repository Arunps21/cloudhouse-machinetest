import React from "react";

const Avatar = ({ name, src, size = "md", color, className = "" }) => {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generate consistent color based on name
  const getColorFromName = (name) => {
    if (color) return color;
    const colors = [
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-rose-500",
      "bg-orange-500",
      "bg-amber-500",
      "bg-emerald-500",
      "bg-teal-500",
      "bg-cyan-500",
      "bg-blue-500",
    ];
    if (!name) return colors[0];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name || "Avatar"}
        className={`
          ${sizes[size]}
          rounded-full object-cover ring-2 ring-white dark:ring-slate-800
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        ${sizes[size]}
        ${getColorFromName(name)}
        rounded-full flex items-center justify-center font-semibold text-white
        ring-2 ring-white dark:ring-slate-800 flex-shrink-0
        ${className}
      `}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
