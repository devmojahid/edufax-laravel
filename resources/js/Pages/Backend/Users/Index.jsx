import React from "react";
// Data table
import { DataTable } from "./Partials/List/data-table";
import { columns } from "./Partials/List/columns";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "@inertiajs/react";
import { CustomLink } from "@/Components/Others/CustomButton";
import { IconPencilPlus } from "@tabler/icons-react";
import { Input } from "@/Components/ui/input";

const Index = ({ users }) => {
  const othersInfo = {
    name: "Users",
    createLink: route("users.create"),
    createText: "Create User",
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
              <CustomLink
                href={othersInfo.createLink}
                variant="secondary"
                leftSection={<IconPencilPlus className="h-4 w-4" />}
              >
                Create User
              </CustomLink>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0 h-screen">
        <DataTable
          data={users.data}
          columns={columns}
          othersInfo={othersInfo}
        />
      </div>
    </AdminLayout>
  );
};

export default Index;
