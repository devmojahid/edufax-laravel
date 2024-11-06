import { DataTable } from "@/Components/ui/data-table/data-table";

export function createDataTable(config) {
  return function CustomDataTable(props) {
    const mergedConfig = {
      ...config,
      ...props,
      columns: [...(config.columns || []), ...(props.columns || [])],
    };

    return <DataTable {...mergedConfig} />;
  };
}
