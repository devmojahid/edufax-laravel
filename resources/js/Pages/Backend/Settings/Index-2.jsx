import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Switch } from "@/Components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Toast } from "@/Components/ui/toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Settings as SettingsIcon,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
  DollarSign,
  CreditCard,
  Bell,
  Lock,
  Shield,
  FileText,
  Save,
  Plus,
  X,
  Upload,
  Eye,
  EyeOff,
  ChevronRight,
  Home,
} from "lucide-react";

const Breadcrumb = ({ items }) => (
  <nav aria-label="Breadcrumb" className="mb-6">
    <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
          {index === items.length - 1 ? (
            <span className="font-medium text-foreground">{item.label}</span>
          ) : (
            <a
              href={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.icon && <item.icon className="h-4 w-4 mr-1 inline" />}
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

const MediaUploader = ({ onUpload, currentImage = null }) => {
  const [preview, setPreview] = useState(currentImage);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
          {preview ? (
            <div className="relative w-full h-full">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white text-sm">Click to change</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    // General Settings
    siteName: "My Awesome Site",
    siteDescription: "",
    siteEmail: "",
    sitePhone: "",
    siteAddress: "",
    siteLogo: null,
    siteFavicon: null,

    // Company Information
    companyName: "",
    companyRegistration: "",
    taxNumber: "",

    // Mail Settings
    mailDriver: "smtp",
    mailHost: "",
    mailPort: "",
    mailUsername: "",
    mailPassword: "",
    mailEncryption: "tls",

    // Social Media
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },

    // Payment Settings
    currency: "USD",
    paymentMethods: [],

    // Security Settings
    twoFactorAuth: false,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSymbols: true,
    },

    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    notificationTypes: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/admin/settings", {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        setToastMessage("Settings updated successfully!");
        setShowToast(true);
      },
      onError: () => {
        setToastMessage("Failed to update settings.");
        setShowToast(true);
      },
    });
  };

  return (
    <AdminLayout>
      <Head title="Settings" />

      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/admin/dashboard", icon: Home },
            { label: "Settings", icon: SettingsIcon },
          ]}
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <Button type="submit" form="settings-form">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <form id="settings-form" onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="flex flex-wrap bg-muted p-1 rounded-lg">
              {[
                { value: "general", label: "General", icon: SettingsIcon },
                { value: "company", label: "Company", icon: Building },
                { value: "mail", label: "Mail", icon: Mail },
                { value: "payment", label: "Payment", icon: CreditCard },
                { value: "security", label: "Security", icon: Shield },
                { value: "notifications", label: "Notifications", icon: Bell },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 flex items-center justify-center capitalize px-3 py-1.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={data.siteName}
                        onChange={(e) => setData("siteName", e.target.value)}
                      />
                      {errors.siteName && (
                        <p className="text-red-500 text-sm">
                          {errors.siteName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="siteEmail">Site Email</Label>
                      <Input
                        id="siteEmail"
                        type="email"
                        value={data.siteEmail}
                        onChange={(e) => setData("siteEmail", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sitePhone">Phone Number</Label>
                      <Input
                        id="sitePhone"
                        value={data.sitePhone}
                        onChange={(e) => setData("sitePhone", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="siteAddress">Address</Label>
                      <Textarea
                        id="siteAddress"
                        value={data.siteAddress}
                        onChange={(e) => setData("siteAddress", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Site Logo</Label>
                      <MediaUploader
                        onUpload={(file) => setData("siteLogo", file)}
                        currentImage={data.siteLogo}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Favicon</Label>
                      <MediaUploader
                        onUpload={(file) => setData("siteFavicon", file)}
                        currentImage={data.siteFavicon}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={data.companyName}
                        onChange={(e) => setData("companyName", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyRegistration">
                        Registration Number
                      </Label>
                      <Input
                        id="companyRegistration"
                        value={data.companyRegistration}
                        onChange={(e) =>
                          setData("companyRegistration", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taxNumber">Tax Number</Label>
                      <Input
                        id="taxNumber"
                        value={data.taxNumber}
                        onChange={(e) => setData("taxNumber", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mail">
              <Card>
                <CardHeader>
                  <CardTitle>Mail Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="mailDriver">Mail Driver</Label>
                      <Select
                        value={data.mailDriver}
                        onValueChange={(value) => setData("mailDriver", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select mail driver" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smtp">SMTP</SelectItem>
                          <SelectItem value="mailgun">Mailgun</SelectItem>
                          <SelectItem value="ses">Amazon SES</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mailHost">Mail Host</Label>
                      <Input
                        id="mailHost"
                        value={data.mailHost}
                        onChange={(e) => setData("mailHost", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mailPort">Mail Port</Label>
                      <Input
                        id="mailPort"
                        value={data.mailPort}
                        onChange={(e) => setData("mailPort", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mailUsername">Username</Label>
                      <Input
                        id="mailUsername"
                        value={data.mailUsername}
                        onChange={(e) =>
                          setData("mailUsername", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mailPassword">Password</Label>
                      <div className="relative">
                        <Input
                          id="mailPassword"
                          type={showPassword ? "text" : "password"}
                          value={data.mailPassword}
                          onChange={(e) =>
                            setData("mailPassword", e.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mailEncryption">Encryption</Label>
                      <Select
                        value={data.mailEncryption}
                        onValueChange={(value) =>
                          setData("mailEncryption", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select encryption" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select
                        value={data.currency}
                        onValueChange={(value) => setData("currency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="twoFactorAuth"
                      checked={data.twoFactorAuth}
                      onCheckedChange={(checked) =>
                        setData("twoFactorAuth", checked)
                      }
                    />
                    <Label htmlFor="twoFactorAuth">
                      Enable Two-Factor Authentication
                    </Label>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password Policy</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="requireUppercase"
                          checked={data.passwordPolicy.requireUppercase}
                          onCheckedChange={(checked) =>
                            setData("passwordPolicy", {
                              ...data.passwordPolicy,
                              requireUppercase: checked,
                            })
                          }
                        />
                        <Label htmlFor="requireUppercase">
                          Require uppercase letters
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="requireNumbers"
                          checked={data.passwordPolicy.requireNumbers}
                          onCheckedChange={(checked) =>
                            setData("passwordPolicy", {
                              ...data.passwordPolicy,
                              requireNumbers: checked,
                            })
                          }
                        />
                        <Label htmlFor="requireNumbers">Require numbers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="requireSymbols"
                          checked={data.passwordPolicy.requireSymbols}
                          onCheckedChange={(checked) =>
                            setData("passwordPolicy", {
                              ...data.passwordPolicy,
                              requireSymbols: checked,
                            })
                          }
                        />
                        <Label htmlFor="requireSymbols">
                          Require special characters
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="emailNotifications"
                      checked={data.emailNotifications}
                      onCheckedChange={(checked) =>
                        setData("emailNotifications", checked)
                      }
                    />
                    <Label htmlFor="emailNotifications">
                      Enable Email Notifications
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="pushNotifications"
                      checked={data.pushNotifications}
                      onCheckedChange={(checked) =>
                        setData("pushNotifications", checked)
                      }
                    />
                    <Label htmlFor="pushNotifications">
                      Enable Push Notifications
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>

        {showToast && (
          <Toast
            title="Notification"
            description={toastMessage}
            action={
              <Button onClick={() => setShowToast(false)}>Dismiss</Button>
            }
          />
        )}
      </div>
    </AdminLayout>
  );
}
