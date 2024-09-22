import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { TooltipProvider } from "@/Components/ui/tooltip";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Bot, CornerDownLeft, Settings } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/Components/ui/card";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/Components/ui/drawer";
import { Head } from "@inertiajs/react";

const Index = () => {
  return (
    <AdminLayout>
      <TooltipProvider>
        <Head title="Ai Image" />
        <Card className="title-card">
          <CardHeader className="title-card-head">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="size-5" />
                  <span>AI Image Generator</span>
                </CardTitle>
              </div>
              <div>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Settings className="size-4" />
                      <span className="sr-only">Settings</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent className="max-h-[80vh]">
                    <DrawerHeader>
                      <DrawerTitle>Configuration</DrawerTitle>
                      <DrawerDescription>
                        Configure the settings for the model and messages.
                      </DrawerDescription>
                    </DrawerHeader>
                    <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          Settings
                        </legend>
                        <div className="grid gap-3">
                          <Label htmlFor="temperature">Temperature</Label>
                          <Input
                            id="temperature"
                            type="number"
                            placeholder="0.4"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="role">Role</Label>
                          <Select
                            defaultValue="system"
                            className="border border-gray-300"
                          >
                            <SelectTrigger
                              className="border border-gray-300"
                              style={{ border: "1px solid #e0e2e3" }}
                            >
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="system">System</SelectItem>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="assistant">
                                Assistant
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="content">Content</Label>
                          <Textarea id="content" placeholder="You are a..." />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="top-p">Top P</Label>
                          <Input id="top-p" type="number" placeholder="0.7" />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="top-k">Top K</Label>
                          <Input id="top-k" type="number" placeholder="0.0" />
                        </div>
                      </fieldset>
                    </form>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className="grid h-screen w-full">
          <div className="flex flex-col">
            <div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
              <div
                className="relative hidden flex-col items-start gap-8 md:flex"
                x-chunk="dashboard-03-chunk-0"
              >
                <form className="grid w-full items-start gap-6">
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">
                      Settings
                    </legend>
                    <div className="grid gap-3">
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input id="temperature" type="number" placeholder="0.4" />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="system">
                        <SelectTrigger
                          className="border border-gray-300"
                          style={{ border: "1px solid #e0e2e3" }}
                        >
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">System</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="assistant">Assistant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="You are a..."
                        className="min-h-[9.5rem]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="top-p">Top P</Label>
                        <Input id="top-p" type="number" placeholder="0.7" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="top-k">Top K</Label>
                        <Input id="top-k" type="number" placeholder="0.0" />
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
              <div className="relative flex flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 overflow-hidden h-[32rem]">
                <div className="h-[28rem] overflow-y-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    <div>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://pagedone.io/asset/uploads/1688025668.png"
                        alt="Gallery image"
                      />
                    </div>
                    <div>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://pagedone.io/asset/uploads/1688029344.png"
                        alt="Gallery image"
                      />
                    </div>
                    <div>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://pagedone.io/asset/uploads/1688029370.png"
                        alt="Gallery image"
                      />
                    </div>
                    <div>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://pagedone.io/asset/uploads/1688029384.png"
                        alt="Gallery image"
                      />
                    </div>
                    <div>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://pagedone.io/asset/uploads/1688029394.png"
                        alt="Gallery image"
                      />
                    </div>
                    <div>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://pagedone.io/asset/uploads/1688029408.png"
                        alt="Gallery image"
                      />
                    </div>
                    <div>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://pagedone.io/asset/uploads/1688029408.png"
                        alt="Gallery image"
                      />
                    </div>
                    <div>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://pagedone.io/asset/uploads/1688029408.png"
                        alt="Gallery image"
                      />
                    </div>
                    <div>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://pagedone.io/asset/uploads/1688029408.png"
                        alt="Gallery image"
                      />
                    </div>
                    <div>
                      <img
                        className="h-auto max-w-full rounded-lg"
                        src="https://pagedone.io/asset/uploads/1688029408.png"
                        alt="Gallery image"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1" />
                <div className="h-18 mb-3 mt-4">
                  <form
                    className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                    x-chunk="dashboard-03-chunk-1"
                  >
                    <Label htmlFor="message" className="sr-only">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Type your message here..."
                      className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    />
                    <div className="flex items-center p-3 pt-0">
                      <Button
                        type="submit"
                        size="sm"
                        className="ml-auto gap-1.5"
                      >
                        Send Message
                        <CornerDownLeft className="size-3.5" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </AdminLayout>
  );
};

export default Index;
