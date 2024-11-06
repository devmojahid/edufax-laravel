import React from "react";
import { DataTableActions } from "./data-table-actions";

export function DataTableHeader({
  title,
  description,
  onAdd,
  onExport,
  onImport,
  onPrint,
  onExportPDF,
  enableAdd = true,
  enableExport = true,
  enableImport = true,
  enablePrint = true,
  enablePDF = true,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 px-1">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      <DataTableActions
        onAdd={onAdd}
        onExport={onExport}
        onImport={onImport}
        onPrint={onPrint}
        onExportPDF={onExportPDF}
        enableAdd={enableAdd}
        enableExport={enableExport}
        enableImport={enableImport}
        enablePrint={enablePrint}
        enablePDF={enablePDF}
      />
    </div>
  );
}
