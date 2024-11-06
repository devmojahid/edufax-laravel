import React, { useCallback } from "react";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";

export function DataTableColumnResize({ table, storeKey }) {
  const [columnSizes, setColumnSizes] = useLocalStorage(
    `table-column-sizes-${storeKey}`,
    {}
  );

  const handleColumnResize = useCallback(
    (columnId, size) => {
      setColumnSizes((prev) => ({
        ...prev,
        [columnId]: size,
      }));
    },
    [setColumnSizes]
  );

  React.useEffect(() => {
    // Apply stored column sizes on mount
    if (columnSizes) {
      Object.entries(columnSizes).forEach(([columnId, size]) => {
        const column = table.getColumn(columnId);
        if (column) {
          column.setSize(size);
        }
      });
    }
  }, [table, columnSizes]);

  return (
    <div
      className="absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity"
      onMouseDown={(e) => {
        const startX = e.pageX;
        const startWidth = table.getColumn(column.id).getSize();

        const handleMouseMove = (e) => {
          const width = Math.max(50, startWidth + (e.pageX - startX));
          table.getColumn(column.id).setSize(width);
          handleColumnResize(column.id, width);
        };

        const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }}
    />
  );
}
