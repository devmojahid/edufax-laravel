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
import { Layers, ChevronDown } from "lucide-react";

export function DataTableColumnGroup({ table, groups }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Layers className="mr-2 h-4 w-4" />
          Groups
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Column Groups</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {groups.map((group) => (
          <DropdownMenuItem
            key={group.id}
            onClick={() => {
              const columns = table
                .getAllColumns()
                .filter((col) => group.columns.includes(col.id));
              columns.forEach((col) => col.toggleVisibility(true));
              table
                .getAllColumns()
                .filter((col) => !group.columns.includes(col.id))
                .forEach((col) => col.toggleVisibility(false));
            }}
          >
            {group.title}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            table.getAllColumns().forEach((col) => col.toggleVisibility(true));
          }}
        >
          Show All
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .forEach((col) => col.toggleVisibility(false));
          }}
        >
          Hide All
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
