import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import {
  MoreVertical,
  Download,
  Upload,
  Plus,
  FileDown,
  FileUp,
  Printer,
  FileText,
} from "lucide-react";

export function DataTableActions({
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
    <div className="flex items-center gap-2">
      {/* Desktop view */}
      <div className="hidden md:flex items-center gap-2">
        {enableAdd && (
          <Button size="sm" onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        )}
        {enableExport && (
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </div>

      {/* Mobile view */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="md:hidden">
          <Button variant="outline" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {enableAdd && (
            <DropdownMenuItem onClick={onAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </DropdownMenuItem>
          )}
          {enableExport && (
            <DropdownMenuItem onClick={onExport}>
              <FileDown className="h-4 w-4 mr-2" />
              Export Excel
            </DropdownMenuItem>
          )}
          {enablePDF && (
            <DropdownMenuItem onClick={onExportPDF}>
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </DropdownMenuItem>
          )}
          {enableImport && (
            <DropdownMenuItem onClick={onImport}>
              <FileUp className="h-4 w-4 mr-2" />
              Import Data
            </DropdownMenuItem>
          )}
          {enablePrint && (
            <DropdownMenuItem onClick={onPrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
