import { Layout } from "@/Layouts/Partials/Layout";
import React from "react";
import ContentLayout from "../ContentLayout";
// Data table
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/Others/CustomButton";
import { IconList } from "@tabler/icons-react";
import EditForm from "./Partials/Edit/Form";
  
const Create = ({user}) => {
  return (
    <ContentLayout>
      <Head title="Create User" />
      <Layout.Body>
      <div id="data-table-toolbar">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
            <div className="flex items-center justify-center">
              <h3 className="text-xl font-semibold">
                Edit user
              </h3>
            </div>
          </div>
            <Link href={route('users.index')} className="flex items-center justify-center">
              <Button
                variant="outline"
                leftSection={<IconList className="h-4 w-4" />}
              >
                All Users
              </Button>
            </Link>
        </div>
      </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0 h-screen">
            <EditForm user={user} />
        </div>
      </Layout.Body>
    </ContentLayout>
  );
};

export default Create;
