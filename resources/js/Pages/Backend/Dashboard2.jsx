import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Menu,
  Search,
  User,
  Home,
  ShoppingCart,
  Users,
  Settings,
  Package,
  FileText,
  Globe,
  DollarSign,
  BarChart2,
  PieChart,
  Activity,
  HelpCircle,
  LogOut,
  Layers,
  CreditCard,
  MessageSquare,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { TooltipProvider, Tooltip } from "@/Components/ui/tooltip";

const lineChartData = [
  { name: "Jan 01", value: 200 },
  { name: "03 Jan", value: 400 },
  { name: "05 Jan", value: 300 },
  { name: "07 Jan", value: 500 },
  { name: "09 Jan", value: 350 },
  { name: "11 Jan", value: 450 },
  { name: "13 Jan", value: 400 },
  { name: "15 Jan", value: 600 },
  { name: "17 Jan", value: 500 },
  { name: "19 Jan", value: 550 },
  { name: "21 Jan", value: 650 },
  { name: "23 Jan", value: 600 },
  { name: "25 Jan", value: 700 },
  { name: "27 Jan", value: 750 },
  { name: "29 Jan", value: 800 },
];

const pieChartData = [
  { name: "Food", value: 35 },
  { name: "Grocery", value: 25 },
  { name: "Fashion", value: 20 },
  { name: "Electronic", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const barChartData = [
  { name: "1", value: 20 },
  { name: "5", value: 35 },
  { name: "9", value: 25 },
  { name: "13", value: 40 },
  { name: "17", value: 30 },
  { name: "21", value: 45 },
  { name: "25", value: 35 },
  { name: "29", value: 50 },
];

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const MenuItem = ({
    icon: Icon,
    label,
    active,
    hasSubmenu = false,
    onClick,
  }) => (
    <div className={`mb-1 ${hasSubmenu ? "pl-4" : ""}`}>
      <a
        className={`flex items-center py-2 px-4 rounded-lg ${
          active
            ? "bg-green-100 text-green-600"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        href="#"
        onClick={onClick}
      >
        <Icon className="h-5 w-5 mr-3" />
        <span className="flex-1 text-sm">{label}</span>
        {hasSubmenu && <ChevronRight className="h-4 w-4" />}
      </a>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="flex items-center justify-start h-16 bg-white px-6 border-b border-gray-200">
            <Package className="h-8 w-8 text-green-500" />
            <span className="text-gray-800 text-2xl font-semibold ml-2">
              Grostore
            </span>
          </div>
          <div className="mt-5 px-4">
            <div className="flex items-center bg-gray-100 rounded-lg p-2">
              <img
                className="h-8 w-8 rounded-full"
                src="/placeholder.svg?height=32&width=32"
                alt="User avatar"
              />
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-800">
                  Aminul Islam
                </p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
          <nav className="mt-5 px-2">
            <MenuItem
              icon={Home}
              label="Dashboards"
              active={activeMenu === "dashboard"}
              onClick={() => setActiveMenu("dashboard")}
            />
            <MenuItem
              icon={Package}
              label="Product"
              hasSubmenu
              onClick={() => setActiveMenu("product")}
            />
            <MenuItem
              icon={ShoppingCart}
              label="Orders"
              hasSubmenu
              onClick={() => setActiveMenu("orders")}
            />
            <MenuItem
              icon={Users}
              label="Seller"
              onClick={() => setActiveMenu("seller")}
            />
            <MenuItem
              icon={Users}
              label="Customers"
              onClick={() => setActiveMenu("customers")}
            />
            <MenuItem
              icon={FileText}
              label="Supports"
              onClick={() => setActiveMenu("supports")}
            />
            <MenuItem
              icon={Globe}
              label="Localization"
              hasSubmenu
              onClick={() => setActiveMenu("localization")}
            />
            <MenuItem
              icon={Layers}
              label="Components"
              hasSubmenu
              onClick={() => setActiveMenu("components")}
            />
            <MenuItem
              icon={FileText}
              label="Pages"
              hasSubmenu
              onClick={() => setActiveMenu("pages")}
            />
            <MenuItem
              icon={CreditCard}
              label="Payments"
              onClick={() => setActiveMenu("payments")}
            />
            <MenuItem
              icon={MessageSquare}
              label="Chat"
              onClick={() => setActiveMenu("chat")}
            />
            <MenuItem
              icon={Calendar}
              label="Calendar"
              onClick={() => setActiveMenu("calendar")}
            />
            <MenuItem
              icon={Settings}
              label="Settings"
              onClick={() => setActiveMenu("settings")}
            />
          </nav>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 focus:outline-none lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="relative mx-4 lg:mx-0">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search className="h-5 w-5 text-gray-500" />
                </span>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 w-full"
                />
              </div>
            </div>
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Spanish</DropdownMenuItem>
                  <DropdownMenuItem>French</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>New order received</DropdownMenuItem>
                  <DropdownMenuItem>Product out of stock</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="/placeholder.svg?height=32&width=32"
                      alt="Your avatar"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-gray-700 text-3xl font-medium">
                  eCommerce Dashboard
                </h3>
                <Button className="bg-green-500 hover:bg-green-600">
                  + Add Product
                </Button>
              </div>

              <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Earning
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$69,700</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Top 5 Products Sale
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$60,700</div>
                    <p className="text-xs text-muted-foreground">
                      +10.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Customers This Month
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">35,460</div>
                    <p className="text-xs text-muted-foreground">
                      +5.7% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Products
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,300</div>
                    <p className="text-xs text-muted-foreground">
                      +12.3% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <Card className="w-full md:w-2/3">
                  <CardHeader>
                    <CardTitle>Sales This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card className="w-full md:w-1/3">
                  <CardHeader>
                    <CardTitle>Top 5 Products Sale</CardTitle>
                  </CardHeader>
                  {/* <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {{pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent> */}
                </Card>
              </div>

              <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Order
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,586</div>
                    <p className="text-xs text-muted-foreground">
                      +15.6% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Order Pending
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,586</div>
                    <p className="text-xs text-muted-foreground">
                      +2.3% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Order Processing
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,586</div>
                    <p className="text-xs text-muted-foreground">
                      +8.7% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Delivered
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,586</div>
                    <p className="text-xs text-muted-foreground">
                      +11.9% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          <th className="px-4 py-2">Product</th>
                          <th className="px-4 py-2">Category</th>
                          <th className="px-4 py-2">Price</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <tr key={item} className="border-b">
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src="/placeholder.svg?height=40&width=40"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    Almond Nut Dried restore
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-gray-900">
                                Food, grocery
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="success">$75.50</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Dashboard;
