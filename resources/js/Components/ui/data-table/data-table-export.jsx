import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Download } from "lucide-react";

export function DataTableExport({ table, onExport }) {
  const [selectedColumns, setSelectedColumns] = useState(
    table.getAllColumns().map((col) => col.id)
  );
  const [exportFormat, setExportFormat] = useState("xlsx");

  const handleExport = () => {
    onExport({
      columns: selectedColumns,
      format: exportFormat,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Export Data</SheetTitle>
          <SheetDescription>
            Choose columns and format for export
          </SheetDescription>
        </SheetHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Export Format</h4>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Columns to Export</h4>
            <div className="space-y-2">
              {table.getAllColumns().map((column) => (
                <div key={column.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedColumns.includes(column.id)}
                    onCheckedChange={(checked) => {
                      setSelectedColumns((prev) =>
                        checked
                          ? [...prev, column.id]
                          : prev.filter((id) => id !== column.id)
                      );
                    }}
                  />
                  <label className="text-sm">{column.id}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={handleExport}>
            Export Selected
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
