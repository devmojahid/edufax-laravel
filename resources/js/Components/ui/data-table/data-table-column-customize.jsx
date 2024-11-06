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
import { Settings2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Switch } from "@/Components/ui/switch";

export function DataTableColumnCustomize({ table }) {
  const [columns, setColumns] = React.useState(
    table.getAllColumns().filter((col) => col.getCanHide())
  );

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(columns);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColumns(items);
    table.setColumnOrder(items.map((col) => col.id));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Settings2 className="h-4 w-4 mr-2" />
          Customize
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Customize Columns</SheetTitle>
          <SheetDescription>
            Drag to reorder columns and toggle visibility
          </SheetDescription>
        </SheetHeader>

        <div className="py-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="columns">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {columns.map((column, index) => (
                    <Draggable
                      key={column.id}
                      draggableId={column.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg border"
                        >
                          <span className="font-medium">{column.id}</span>
                          <Switch
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <SheetFooter>
          <Button
            variant="outline"
            onClick={() => {
              table.resetColumnOrder();
              setColumns(
                table.getAllColumns().filter((col) => col.getCanHide())
              );
            }}
          >
            Reset to Default
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
