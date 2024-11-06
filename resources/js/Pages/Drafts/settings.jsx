import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Globe,
  Bell,
  Lock,
  CreditCard,
  Users,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Database,
  Zap,
  Sun,
  Moon,
  Search,
  Menu,
  Settings,
  LogOut,
  User,
  Edit,
  Trash,
  Camera,
  Upload,
  Download,
  AlertCircle,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare, // Instead of Slack
  Trello,
  FolderOpen, // Instead of Dropbox
  Chrome,
  FileText,
  Save,
  Eye,
  EyeOff,
  Info,
  Code,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const renderGeneralSection = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">General Information</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This information will appear on your invoice and will be used to
          calculate your shipping price.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="shopName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Shop name
            </label>
            <Controller
              name="shopName"
              control={control}
              defaultValue="Shofy"
              rules={{ required: "Shop name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="shopName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            {errors.shopName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shopName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Company
            </label>
            <Controller
              name="company"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Phone
            </label>
            <Controller
              name="phone"
              control={control}
              defaultValue="1800979769"
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Country
            </label>
            <Controller
              name="country"
              control={control}
              defaultValue="Australia"
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  id="country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Australia">Australia</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              )}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              State
            </label>
            <Controller
              name="state"
              control={control}
              defaultValue="Brighton VIC"
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="state"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              City
            </label>
            <Controller
              name="city"
              control={control}
              defaultValue="Brighton VIC"
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Address
            </label>
            <Controller
              name="address"
              control={control}
              defaultValue="502 New Street"
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
          </div>
          <div>
            <label
              htmlFor="taxId"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Tax ID
            </label>
            <Controller
              name="taxId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="taxId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Admin Email</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="adminEmail"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <Controller
              name="adminEmail"
              control={control}
              defaultValue="admin@botble.com"
              rules={{
                required: "Admin email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="adminEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            {errors.adminEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.adminEmail.message}
              </p>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You can add maximum 4 emails
          </p>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add more
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="mr-2 h-4 w-4" />
          Save settings
        </button>
      </div>
    </form>
  );

  const renderLicenseSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">License</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Licensed to Botble Technologies. Activated since Sep 25 2024.
      </p>
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
        <X className="mr-2 h-4 w-4" />
        Deactivate license
      </button>
    </div>
  );

  const renderAccountSection = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">My Account</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Profile Details</h3>
          <div className="flex items-center mb-4">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Profile Picture"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors mr-2">
                Change avatar
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                Delete avatar
              </button>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Name
            </label>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="fullName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username
            </label>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="accountEmail"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <Controller
              name="accountEmail"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="accountEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            {errors.accountEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.accountEmail.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                validate: (value) =>
                  value === control._formValues.password ||
                  "Passwords do not match",
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  id="confirmPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <Controller
              name="publicProfile"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <input
                  {...field}
                  type="checkbox"
                  id="publicProfile"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              )}
            />
            <label
              htmlFor="publicProfile"
              className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
            >
              Make my profile public
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="mr-2 h-4 w-4" />
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderIntegrationsSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          Integrations and connected apps
        </h2>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Plus className="mr-2 h-4 w-4" />
          Request integration
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Supercharge your workflow and connect the tools you use every day.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Linear", icon: FileText, connected: true },
          { name: "Code Repository", icon: Code, connected: true },
          { name: "Figma", icon: Trello, connected: true },
          { name: "Zapier", icon: Zap, connected: false },
          { name: "Notion", icon: FileText, connected: true },
          { name: "Slack", icon: MessageSquare, connected: true }, // Changed from Slack to MessageSquare
          { name: "Zendesk", icon: HelpCircle, connected: true },
          { name: "Atlassian JIRA", icon: Trello, connected: false },
          { name: "Dropbox", icon: FolderOpen, connected: true }, // Changed from Dropbox to FolderOpen
          { name: "Google Chrome", icon: Chrome, connected: true },
          { name: "Discord", icon: MessageCircle, connected: true },
          { name: "Google Drive", icon: Database, connected: false },
        ].map((app) => (
          <div
            key={app.name}
            className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-md"
          >
            <div className="flex items-center">
              <app.icon
                size={24}
                className="text-gray-500 dark:text-gray-400 mr-3"
              />
              <div>
                <h4 className="font-medium">{app.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {app.connected ? "Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  defaultChecked={app.connected}
                />
                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4 lg:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search settings..."
                className="py-2 px-4 pr-10 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Search
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <Bell size={20} />
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:inline">John Doe</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20 container mx-auto px-4 py-8 flex">
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg lg:relative lg:transform-none pt-20">
            <nav className="p-4">
              <ul className="space-y-2">
                {[
                  { name: "general", icon: Settings },
                  { name: "account", icon: User },
                  { name: "license", icon: FileText },
                  { name: "integrations", icon: Globe },
                  { name: "billing", icon: CreditCard },
                  { name: "notifications", icon: Bell },
                  { name: "security", icon: Lock },
                ].map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => setActiveSection(item.name)}
                      className={`flex items-center space-x-2 w-full p-2 rounded-md transition-colors ${
                        activeSection === item.name
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="capitalize">{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        <main className="flex-1 ml-0 lg:ml-64">
          <div className="space-y-6">
            {activeSection === "general" && renderGeneralSection()}
            {activeSection === "account" && renderAccountSection()}
            {activeSection === "license" && renderLicenseSection()}
            {activeSection === "integrations" && renderIntegrationsSection()}
            {/* Add other sections as needed */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
