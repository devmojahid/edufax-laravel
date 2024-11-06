import React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";

export function DataTableRowGroup({ row, indent = 0 }) {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={cn("h-6 w-6 p-0 hover:bg-transparent", {
          "ml-4": indent > 0,
        })}
        onClick={() => row.toggleExpanded()}
      >
        {row.getIsExpanded() ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      <span className="ml-2 flex items-center space-x-2">
        <span className="font-medium">{row.original.groupName}</span>
        <span className="text-muted-foreground">
          ({row.subRows?.length || 0} items)
        </span>
      </span>
    </>
  );
}
