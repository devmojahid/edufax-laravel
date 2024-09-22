import React from "react";
// Data table
import { DataTable } from "./Partials/List/data-table";
import { columns } from "./Partials/List/columns";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { PlusCircle } from "lucide-react";

const Index = ({ plugins }) => {
  const othersInfo = {
    name: "Plugins",
    createLink: route("users.create"),
    createText: "Add Plugin",
    search: true,
    searchIdentifier: "name",
  };
  return (
    <AdminLayout>
      <Head title="Users" />
      <Card className="title-card">
        <CardHeader className="title-card-head">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
            </div>
            <div>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0 h-screen">
        <DataTable data={plugins} columns={columns} othersInfo={othersInfo} />
      </div>
    </AdminLayout>
  );
};

export default Index;
