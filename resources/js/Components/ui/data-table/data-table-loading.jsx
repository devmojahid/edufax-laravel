import React from "react";
import { Loader2 } from "lucide-react";

export function DataTableLoading({ columnCount }) {
  return (
    <div className="flex flex-col space-y-3 p-8">
      <div className="flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            {Array.from({ length: columnCount }).map((_, j) => (
              <div
                key={j}
                className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
