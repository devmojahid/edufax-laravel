import React, { useState } from "react";
import { apps } from "./data";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { PlusCircle } from "lucide-react";
import { CustomLink } from "@/Components/Others/CustomButton";

const Index = () => {
  const [appType, setAppType] = useState("all");
  const [sort, setSort] = useState("ascending");

  const filteredApps = apps
    .sort((a, b) => {
      if (sort === "ascending") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    })
    .filter((app) => {
      if (appType === "all") return true;
      if (appType === "connected") return app.connected;
      if (appType === "notConnected") return !app.connected;
    });
  return (
    <AdminLayout>
      <Head title="Generators" />
      <Card className="title-card">
        <CardHeader className="title-card-head">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generators</CardTitle>
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
      <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredApps.map((app) => (
          <li
            key={app.name}
            className="rounded-lg border p-4 hover:shadow-md genertor-card"
          >
            <div className="mb-8 flex items-center justify-between">
              <div
                className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
              >
                {app.logo}
              </div>

              <CustomLink
                href={app.connected ? app.url : ""}
                variant="outline"
                size="sm"
                className={`${
                  app.connected
                    ? "border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900"
                    : ""
                }`}
              >
                {app.connected ? "Start journey " : "Coming soon"}
              </CustomLink>
            </div>
            <div>
              <h2 className="mb-1 font-semibold">{app.name}</h2>
              <p className="line-clamp-3 text-gray-500">{app.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default Index;
