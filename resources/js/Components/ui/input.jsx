import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef((props, ref) => {
  const { className, type, ...rest } = props;
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className
      )}
      ref={ref}
      {...rest}
    />
  );
});

Input.displayName = "Input";

export { Input };