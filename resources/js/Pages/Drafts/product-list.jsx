import React, { useState, useEffect, useCallback } from "react";
import { router, useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { DataTable } from "@/Components/ui/data-table/data-table";
import { DataTableHeader } from "@/Components/ui/data-table/data-table-header";
import toast from "react-hot-toast";
import { Badge } from "@/Components/ui/badge";
import {
  Eye,
  Pencil,
  Trash,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";

export default function ProductList({ products, filters }) {
  const [isLoading, setIsLoading] = useState(false);

  // Inertia form for search and filters
  const { data, setData, post, processing } = useForm({
    search: filters?.search || "",
    sort: filters?.sort || "",
    direction: filters?.direction || "asc",
    filters: filters?.filters || {},
    page: 1,
    per_page: 10,
  });

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (data.search !== filters?.search) {
        post(route("drafts.products.index"), {
          preserveState: true,
          preserveScroll: true,
        });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [data.search]);

  // Table state change handlers
  const handlePaginationChange = useCallback(
    ({ pageIndex, pageSize }) => {
      const newPage = pageIndex + 1; // Convert 0-based to 1-based pagination

      setData((prev) => ({
        ...prev,
        page: newPage,
        per_page: pageSize,
      }));

      // Show loading toast
      const loadingToast = toast.loading("Loading data...");

      post(route("drafts.products.index"), {
        preserveState: true,
        preserveScroll: true,
        data: {
          ...data,
          page: newPage,
          per_page: pageSize,
        },
        onSuccess: () => {
          toast.success("Data updated", { id: loadingToast });
        },
        onError: () => {
          toast.error("Failed to load data", { id: loadingToast });
        },
      });
    },
    [data]
  );

  const handleSortingChange = useCallback((sorting) => {
    if (Array.isArray(sorting) && sorting.length > 0) {
      setData((prev) => ({
        ...prev,
        sort: sorting[0].id,
        direction: sorting[0].desc ? "desc" : "asc",
      }));

      post(route("drafts.products.index"), {
        preserveState: true,
        preserveScroll: true,
      });
    } else {
      setData((prev) => ({
        ...prev,
        sort: "",
        direction: "asc",
      }));

      post(route("drafts.products.index"), {
        preserveState: true,
        preserveScroll: true,
      });
    }
  }, []);

  const handleFilterChange = useCallback(
    (filters) => {
      if (!filters) return;

      const newFilters = filters.reduce((acc, filter) => {
        if (filter && filter.id) {
          acc[filter.id] = filter.value;
        }
        return acc;
      }, {});

      setData((prev) => ({
        ...prev,
        filters: newFilters,
        page: 1, // Reset to first page on filter change
      }));

      const loadingToast = toast.loading("Applying filters...");

      post(route("drafts.products.index"), {
        preserveState: true,
        preserveScroll: true,
        only: ["products", "filters"],
        data: {
          ...data,
          filters: newFilters,
          page: 1,
        },
        onSuccess: () => {
          toast.success("Filters applied", { id: loadingToast });
        },
        onError: () => {
          toast.error("Failed to apply filters", { id: loadingToast });
        },
      });
    },
    [data]
  );

  // Bulk actions
  const handleBulkDelete = async (selectedIds) => {
    if (!selectedIds || selectedIds.length === 0) return;

    const loadingToast = toast.loading(
      `Deleting ${selectedIds.length} items...`
    );

    post(
      route("drafts.products.bulk-delete"),
      {
        ids: selectedIds,
      },
      {
        onSuccess: () => {
          toast.success(`Successfully deleted ${selectedIds.length} items`, {
            id: loadingToast,
          });
        },
        onError: () => {
          toast.error("Failed to delete items", { id: loadingToast });
        },
        preserveScroll: true,
      }
    );
  };

  // Export handlers
  const handleExport = () => {
    const loadingToast = toast.loading("Exporting data...");

    post(
      route("drafts.products.export"),
      {},
      {
        onSuccess: () => {
          toast.success("Export completed", { id: loadingToast });
        },
        onError: () => {
          toast.error("Export failed", { id: loadingToast });
        },
      }
    );
  };

  const handleImport = (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const loadingToast = toast.loading("Importing data...");

    post(route("drafts.products.import"), formData, {
      forceFormData: true,
      onSuccess: () => {
        toast.success("Import completed", { id: loadingToast });
      },
      onError: () => {
        toast.error("Import failed", { id: loadingToast });
      },
    });
  };

  // Define columns
  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSorted === "asc")}
            className="-ml-4 hover:bg-transparent"
          >
            Title
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="font-medium">{row.getValue("title")}</span>
          </div>
        );
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSorted === "asc")}
            className="-ml-4 hover:bg-transparent"
          >
            Price
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSorted === "asc")}
            className="-ml-4 hover:bg-transparent"
          >
            Status
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge
            variant={status === "active" ? "success" : "secondary"}
            className="capitalize"
          >
            {status}
          </Badge>
        );
      },
      enableSorting: true,
      enableHiding: true,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  router.get(route("admin.products.show", product.id))
                }
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.get(route("admin.products.edit", product.id))
                }
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(product.id)}
                className="text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  // Single item delete handler
  const handleDelete = (id) => {
    const loadingToast = toast.loading("Deleting item...");

    router.delete(route("admin.products.destroy", id), {
      onSuccess: () => {
        toast.success("Item deleted successfully", { id: loadingToast });
      },
      onError: () => {
        toast.error("Failed to delete item", { id: loadingToast });
      },
      preserveScroll: true,
    });
  };

  // Add print handler
  const handlePrint = useCallback(() => {
    const loadingToast = toast.loading("Preparing print view...");

    // Store current document title
    const originalTitle = document.title;

    // Set print-specific title
    document.title = `Products List - ${new Date().toLocaleDateString()}`;

    // Print the document
    window.print();

    // Restore original title
    document.title = originalTitle;

    toast.success("Print prepared", { id: loadingToast });
  }, []);

  // Add PDF export handler
  const handleExportPDF = useCallback(() => {
    const loadingToast = toast.loading("Generating PDF...");

    router.post(
      route("admin.products.export-pdf"),
      {},
      {
        onSuccess: () => {
          toast.success("PDF generated successfully", { id: loadingToast });
        },
        onError: () => {
          toast.error("Failed to generate PDF", { id: loadingToast });
        },
      }
    );
  }, []);

  // Add print styles
  useEffect(() => {
    // Add print styles dynamically
    const style = document.createElement("style");
    style.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        #printable-table, #printable-table * {
          visibility: visible;
        }
        #printable-table {
          position: absolute;
          left: 0;
          top: 0;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Handle search
  const handleSearch = useCallback(
    (value) => {
      setData((prev) => ({
        ...prev,
        search: value,
        page: 1, // Reset to first page on search
        filters: {}, // Reset filters on new search
      }));

      const loadingToast = toast.loading("Searching...");

      post(route("drafts.products.index"), {
        preserveState: true,
        preserveScroll: true,
        only: ["products", "filters"],
        data: {
          search: value,
          page: 1,
          per_page: data.per_page,
          sort: data.sort,
          direction: data.direction,
        },
        onSuccess: () => {
          toast.success("Search completed", { id: loadingToast });
        },
        onError: () => {
          toast.error("Search failed", { id: loadingToast });
        },
      });
    },
    [data.per_page, data.sort, data.direction]
  );

  // Handle reset
  const handleReset = useCallback(() => {
    setData({
      search: "",
      sort: "",
      direction: "asc",
      filters: {},
      page: 1,
      per_page: 10,
    });

    const loadingToast = toast.loading("Resetting...");

    post(route("drafts.products.index"), {
      preserveState: true,
      preserveScroll: true,
      only: ["products", "filters"],
      data: {
        search: "",
        page: 1,
        per_page: 10,
        sort: "",
        direction: "asc",
        filters: {},
      },
      onSuccess: () => {
        toast.success("Reset completed", { id: loadingToast });
      },
      onError: () => {
        toast.error("Reset failed", { id: loadingToast });
      },
    });
  }, []);

  // Update the DataTable props
  <DataTable
    // ... other props
    onGlobalFilterChange={handleSearch}
    searchableColumns={[
      {
        id: "title",
        title: "Name",
      },
      {
        id: "status",
        title: "Status",
      },
      // Add more searchable columns as needed
    ]}
  />;

  // ... rest of your component remains similar

  return (
    <>
      <Head title="Products" />
      <AdminLayout>
        <div className="flex flex-col space-y-4">
          <DataTableHeader
            title="Products"
            description="Manage your products inventory"
            onAdd={() => router.get(route("drafts.products.create"))}
            onExport={handleExport}
            onImport={handleImport}
            onPrint={handlePrint}
            onExportPDF={handleExportPDF}
          />

          <div id="printable-table">
            <DataTable
              columns={columns}
              data={products?.data || []}
              pageCount={Math.ceil(
                (products?.meta?.total || 0) / (products?.meta?.per_page || 10)
              )}
              initialPageSize={products?.meta?.per_page || 10}
              initialPageIndex={(products?.meta?.current_page || 1) - 1}
              onPaginationChange={handlePaginationChange}
              onSortingChange={handleSortingChange}
              onFilterChange={handleFilterChange}
              onGlobalFilterChange={handleSearch}
              onReset={handleReset}
              filterableColumns={[
                {
                  id: "status",
                  title: "Status",
                  options: [
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                  ],
                },
              ]}
              searchableColumns={[
                {
                  id: "title",
                  title: "Name",
                },
                {
                  id: "status",
                  title: "Status",
                },
                // Add more searchable columns as needed
              ]}
              stickyHeader
              striped
              enableRowSelection
              enableMultiSort={false}
              enableColumnResizing
              enableColumnOrdering
              enablePinning
              enableFullScreen
              enableDensityToggle
              storeStateKey="products-table"
              isLoading={processing}
              enableBulkActions
              onBulkDelete={handleBulkDelete}
            />
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
