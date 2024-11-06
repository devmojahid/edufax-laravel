import React from "react";
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
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Filter, Plus, X } from "lucide-react";

export function DataTableAdvancedFilter({
  columns,
  onApplyFilters,
  onClearFilters,
  initialFilters = [],
}) {
  const [filters, setFilters] = useState(initialFilters);
  const [open, setOpen] = useState(false);

  const addFilter = () => {
    setFilters((prev) => [
      ...prev,
      { column: "", operator: "equals", value: "" },
    ]);
  };

  const removeFilter = (index) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFilter = (index, field, value) => {
    setFilters((prev) =>
      prev.map((filter, i) =>
        i === index ? { ...filter, [field]: value } : filter
      )
    );
  };

  const handleApply = () => {
    onApplyFilters(filters);
    setOpen(false);
  };

  const handleClear = () => {
    setFilters([]);
    onClearFilters();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Create complex filters with multiple conditions
          </SheetDescription>
        </SheetHeader>

        <div className="py-4 space-y-4">
          {filters.map((filter, index) => (
            <div key={index} className="flex items-center gap-2">
              <Select
                value={filter.column}
                onValueChange={(value) => updateFilter(index, "column", value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filter.operator}
                onValueChange={(value) =>
                  updateFilter(index, "operator", value)
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equals">Equals</SelectItem>
                  <SelectItem value="contains">Contains</SelectItem>
                  <SelectItem value="startsWith">Starts with</SelectItem>
                  <SelectItem value="endsWith">Ends with</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Value"
                value={filter.value}
                onChange={(e) => updateFilter(index, "value", e.target.value)}
                className="flex-1"
              />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFilter(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={addFilter}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Filter
          </Button>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={handleClear}>
            Clear All
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
