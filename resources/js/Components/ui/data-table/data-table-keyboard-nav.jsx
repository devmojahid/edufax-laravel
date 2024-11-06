import React, { useEffect, useCallback } from "react";

export function useTableKeyboardNav({ table, onRowAction }) {
  const [focusedCell, setFocusedCell] = React.useState({
    rowIndex: 0,
    colIndex: 0,
  });

  const handleKeyDown = useCallback(
    (e) => {
      const { rowIndex, colIndex } = focusedCell;
      const rows = table.getRowModel().rows;
      const cols = table.getAllColumns();

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          if (rowIndex > 0) {
            setFocusedCell({ rowIndex: rowIndex - 1, colIndex });
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (rowIndex < rows.length - 1) {
            setFocusedCell({ rowIndex: rowIndex + 1, colIndex });
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (colIndex > 0) {
            setFocusedCell({ rowIndex, colIndex: colIndex - 1 });
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (colIndex < cols.length - 1) {
            setFocusedCell({ rowIndex, colIndex: colIndex + 1 });
          }
          break;
        case "Enter":
          e.preventDefault();
          const row = rows[rowIndex];
          if (row) {
            onRowAction?.(row);
          }
          break;
        case "Space":
          e.preventDefault();
          const row = rows[rowIndex];
          if (row) {
            row.toggleSelected();
          }
          break;
      }
    },
    [focusedCell, table, onRowAction]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    focusedCell,
    setFocusedCell,
  };
}
