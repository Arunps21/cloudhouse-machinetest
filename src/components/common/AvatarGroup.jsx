import React from "react";
import Avatar from "./Avatar";

const AvatarGroup = ({ users = [], max = 3, size = "md", className = "" }) => {
  const displayUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  const overlapClasses = {
    xs: "-ml-1.5",
    sm: "-ml-2",
    md: "-ml-3",
    lg: "-ml-4",
    xl: "-ml-5",
  };

  const countSizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  return (
    <div className={`flex items-center ${className}`}>
      {displayUsers.map((user, index) => (
        <div
          key={user.id}
          className={index > 0 ? overlapClasses[size] : ""}
          style={{ zIndex: displayUsers.length - index }}
        >
          <Avatar
            name={user.name}
            src={user.avatar}
            color={user.color}
            size={size}
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={`
            ${overlapClasses[size]}
            ${countSizes[size]}
            rounded-full bg-slate-200 dark:bg-slate-600 
            flex items-center justify-center font-semibold 
            text-slate-600 dark:text-slate-200
            ring-2 ring-white dark:ring-slate-800
          `}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
