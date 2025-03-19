// components/ui/tooltip.jsx
import * as React from "react";

const Tooltip = React.forwardRef(({ className, content, children, ...props }, ref) => {
  return (
    <div className="relative group" ref={ref} {...props}>
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover:block">
        <div className={`bg-slate-800 text-slate-100 text-xs px-2 py-1 rounded ${className}`}>
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-transparent border-t-slate-800"></div>
        </div>
      </div>
    </div>
  );
});

Tooltip.displayName = "Tooltip";

export { Tooltip };