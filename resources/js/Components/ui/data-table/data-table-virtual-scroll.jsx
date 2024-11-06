import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export function DataTableVirtualScroll({ rows, renderRow, estimateSize = 35 }) {
  const parentRef = React.useRef(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 10,
  });

  return (
    <div
      ref={parentRef}
      className="max-h-[calc(100vh-300px)] overflow-auto"
      style={{
        contain: "strict",
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {renderRow(rows[virtualRow.index], virtualRow.index)}
          </div>
        ))}
      </div>
    </div>
  );
}
