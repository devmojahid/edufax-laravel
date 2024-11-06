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
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Search, Plus, X } from "lucide-react";

const OPERATORS = {
  text: [
    { label: "Contains", value: "contains" },
    { label: "Equals", value: "equals" },
    { label: "Starts with", value: "startsWith" },
    { label: "Ends with", value: "endsWith" },
  ],
  number: [
    { label: "Equals", value: "equals" },
    { label: "Greater than", value: "gt" },
    { label: "Less than", value: "lt" },
    { label: "Between", value: "between" },
  ],
  date: [
    { label: "Equals", value: "equals" },
    { label: "After", value: "after" },
    { label: "Before", value: "before" },
    { label: "Between", value: "between" },
  ],
};

export function DataTableAdvancedSearch({
  columns,
  onSearch,
  onReset,
  initialCriteria = [],
}) {
  const [searchCriteria, setSearchCriteria] = useState(initialCriteria);

  const addCriteria = () => {
    setSearchCriteria((prev) => [
      ...prev,
      { column: "", operator: "contains", value: "", value2: "" },
    ]);
  };

  const removeCriteria = (index) => {
    setSearchCriteria((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCriteria = (index, field, value) => {
    setSearchCriteria((prev) =>
      prev.map((criteria, i) =>
        i === index ? { ...criteria, [field]: value } : criteria
      )
    );
  };

  const handleSearch = () => {
    onSearch(searchCriteria);
  };

  const handleReset = () => {
    setSearchCriteria([]);
    onReset();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Search className="mr-2 h-4 w-4" />
          Advanced Search
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Advanced Search</SheetTitle>
          <SheetDescription>
            Build complex search queries with multiple conditions
          </SheetDescription>
        </SheetHeader>

        <div className="py-4 space-y-4">
          {searchCriteria.map((criteria, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Select
                  value={criteria.column}
                  onValueChange={(value) =>
                    updateCriteria(index, "column", value)
                  }
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
                  value={criteria.operator}
                  onValueChange={(value) =>
                    updateCriteria(index, "operator", value)
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {OPERATORS[
                      columns.find((col) => col.id === criteria.column)?.type ||
                        "text"
                    ].map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex-1">
                  <Input
                    placeholder="Value"
                    value={criteria.value}
                    onChange={(e) =>
                      updateCriteria(index, "value", e.target.value)
                    }
                  />
                </div>

                {criteria.operator === "between" && (
                  <div className="flex-1">
                    <Input
                      placeholder="Second Value"
                      value={criteria.value2}
                      onChange={(e) =>
                        updateCriteria(index, "value2", e.target.value)
                      }
                    />
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCriteria(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={addCriteria}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Condition
          </Button>
        </div>

        <SheetFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSearch}>Search</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
