import React from "react";

const Skeleton = ({ variant = "text", width, height, className = "" }) => {
  const variants = {
    text: "h-4 rounded",
    title: "h-6 rounded w-3/4",
    avatar: "w-10 h-10 rounded-full",
    thumbnail: "w-full aspect-video rounded-lg",
    card: "w-full h-40 rounded-xl",
    button: "h-10 w-24 rounded-lg",
  };

  return (
    <div
      className={`
        bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%] animate-shimmer
        ${variants[variant]}
        ${className}
      `}
      style={{
        width: width || undefined,
        height: height || undefined,
      }}
    />
  );
};

// Pre-built skeleton layouts
export const ProjectCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4">
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <Skeleton variant="title" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
      <Skeleton className="w-20 h-6 rounded-full" />
    </div>
    <div className="space-y-2">
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-4/5" />
    </div>
    <div className="flex items-center gap-4">
      <Skeleton className="w-full h-2 rounded-full" />
    </div>
    <div className="flex items-center justify-between pt-4">
      <div className="flex -space-x-2">
        <Skeleton variant="avatar" className="w-8 h-8" />
        <Skeleton variant="avatar" className="w-8 h-8" />
        <Skeleton variant="avatar" className="w-8 h-8" />
      </div>
      <Skeleton className="w-24 h-4 rounded" />
    </div>
  </div>
);

export const DashboardStatSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton className="w-16 h-8 rounded" />
      </div>
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <tr className="border-b border-slate-200 dark:border-slate-700">
    <td className="px-6 py-4">
      <Skeleton variant="text" className="w-32" />
    </td>
    <td className="px-6 py-4">
      <Skeleton className="w-20 h-6 rounded-full" />
    </td>
    <td className="px-6 py-4">
      <Skeleton className="w-16 h-6 rounded-full" />
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <Skeleton className="w-full h-2 rounded-full max-w-24" />
        <Skeleton className="w-10 h-4 rounded" />
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex -space-x-2">
        <Skeleton variant="avatar" className="w-8 h-8" />
        <Skeleton variant="avatar" className="w-8 h-8" />
      </div>
    </td>
    <td className="px-6 py-4">
      <Skeleton className="w-24 h-4 rounded" />
    </td>
  </tr>
);

export default Skeleton;
