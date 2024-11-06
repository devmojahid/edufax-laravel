import { createDataTable } from "@/factories/createDataTable";
import { formatCurrency } from "@/lib/utils";

const columns = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatCurrency(row.getValue("price")),
  },
  // ... other columns
];

const config = {
  columns,
  filterableColumns: [
    {
      id: "status",
      title: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ],
  searchableColumns: [
    {
      id: "title",
      title: "Name",
    },
  ],
  // Default configuration for products
  enableRowSelection: true,
  enableColumnResizing: true,
  stickyHeader: true,
  striped: true,
};

export const ProductDataTable = createDataTable(config);
