import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  ShoppingBag,
  DollarSign,
  ShoppingCart,
  Package,
  RefreshCcw,
  Wallet,
  Users,
  UserCog,
  BarChart2,
  Calendar,
  Settings,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 280 },
  { name: "May", value: 590 },
  { name: "Jun", value: 320 },
  { name: "Jul", value: 600 },
];

const barChartData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 28 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 56 },
  { name: "Sat", value: 68 },
  { name: "Sun", value: 40 },
];

const pieChartData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Food", value: 300 },
  { name: "Books", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  {
    name: "Products",
    icon: ShoppingBag,
    submenu: [
      { name: "All Products", icon: Package },
      { name: "Add Product", icon: ShoppingBag },
      { name: "Categories", icon: LayoutDashboard },
    ],
  },
  { name: "POS System", icon: DollarSign },
  { name: "Orders", icon: ShoppingCart, badge: "New" },
  {
    name: "Inventory",
    icon: Package,
    submenu: [
      { name: "Stock Management", icon: Package },
      { name: "Suppliers", icon: Users },
    ],
  },
  { name: "Refunds", icon: RefreshCcw },
  { name: "Rewards & Wallet", icon: Wallet },
  { name: "Analytics", icon: BarChart2 },
  { name: "Calendar", icon: Calendar },
];

const userItems = [
  { name: "Customers", icon: Users },
  { name: "Employee Staffs", icon: UserCog },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    // Initialize theme
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <div className={`flex h-screen overflow-hidden bg-background ${theme}`}>
      {/* Sidebar for desktop */}
      <aside
        className={`hidden lg:flex lg:flex-col ${
          sidebarOpen ? "lg:w-64" : "lg:w-20"
        } border-r transition-all duration-300 ease-in-out overflow-y-auto bg-card`}
      >
        <SidebarContent sidebarOpen={sidebarOpen} />
      </aside>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={toggleSidebar}
          ></div>
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card">
            <SidebarContent
              sidebarOpen={true}
              mobile={true}
              closeSidebar={toggleSidebar}
            />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-card border-b">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("English")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("Spanish")}>
                  Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("French")}>
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-background p-4">
          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value="$69,700"
              change="+20.1%"
              icon={DollarSign}
            />
            <StatCard
              title="Subscriptions"
              value="35,460"
              change="+180.1%"
              icon={Users}
            />
            <StatCard
              title="Sales"
              value="$60,700"
              change="+19%"
              icon={ShoppingCart}
            />
            <StatCard
              title="Active Now"
              value="573"
              change="+201"
              icon={Users}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="revenue" className="w-full">
                  <TabsList>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                  </TabsList>
                  <TabsContent value="revenue">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#22c55e"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="sales">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#22c55e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex flex-wrap justify-center">
                  {pieChartData.map((entry, index) => (
                    <div
                      key={`legend-${index}`}
                      className="flex items-center mx-2 mb-2"
                    >
                      <div
                        className="w-3 h-3 mr-1"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium">Order ID</th>
                        <th className="pb-2 text-left font-medium">Customer</th>
                        <th className="pb-2 text-left font-medium">Product</th>
                        <th className="pb-2 text-left font-medium">Amount</th>
                        <th className="pb-2 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: "1234",
                          customer: "John Doe",
                          product: "Premium Headphones",
                          amount: "$299.99",
                          status: "Completed",
                        },
                        {
                          id: "1235",
                          customer: "Jane Smith",
                          product: "Wireless Mouse",
                          amount: "$49.99",
                          status: "Processing",
                        },
                        {
                          id: "1236",
                          customer: "Bob Johnson",
                          product: "Gaming Keyboard",
                          amount: "$129.99",
                          status: "Shipped",
                        },
                        {
                          id: "1237",
                          customer: "Alice Brown",
                          product: "USB-C Cable",
                          amount: "$19.99",
                          status: "Completed",
                        },
                        {
                          id: "1238",
                          customer: "Charlie Wilson",
                          product: "Smart Watch",
                          amount: "$199.99",
                          status: "Processing",
                        },
                      ].map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-2">{order.id}</td>
                          <td className="py-2">{order.customer}</td>
                          <td className="py-2">{order.product}</td>
                          <td className="py-2">{order.amount}</td>
                          <td className="py-2">
                            <span
                              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                order.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {order.status}
                            </span>
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
  );
}
function SidebarContent({ sidebarOpen, mobile, closeSidebar }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4">
        <span className="text-2xl font-bold text-primary">Grostore</span>
        {mobile && (
          <Button variant="ghost" size="icon" onClick={closeSidebar}>
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {menuItems.map((item) =>
            item.submenu ? (
              <Collapsible key={item.name}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {sidebarOpen && item.name}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Button
                      key={subItem.name}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <subItem.icon className="mr-2 h-4 w-4" />
                      {sidebarOpen && subItem.name}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {sidebarOpen && item.name}
                {item.badge && (
                  <span className="ml-auto rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </Button>
            )
          )}
        </div>
        <div className="py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Users
          </h2>
          <div className="space-y-1">
            {userItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {sidebarOpen && item.name}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

function StatCard({ title, value, change, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}
