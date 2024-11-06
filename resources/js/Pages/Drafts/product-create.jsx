import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Checkbox } from "@/Components/ui/checkbox";
import { Switch } from "@/Components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Separator } from "@/Components/ui/separator";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Toast } from "@/Components/ui/toast";
import { Slider } from "@/Components/ui/slider";
import { Badge } from "@/Components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";
import {
  X,
  Plus,
  Upload,
  Image as ImageIcon,
  Calendar as CalendarIcon,
  ChevronRight,
  Home,
  Tag,
  Paperclip,
  DollarSign,
  Package,
  Truck,
  Search,
  AlertCircle,
  Save,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";

const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  permalink: z.string().min(1, { message: "Permalink is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  shortDescription: z.string().max(200, {
    message: "Short description should be 200 characters or less",
  }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  salePrice: z
    .number()
    .min(0, { message: "Sale price must be a positive number" })
    .optional(),
  sku: z.string().min(1, { message: "SKU is required" }),
  barcode: z.string().optional(),
  quantity: z
    .number()
    .int()
    .min(0, { message: "Quantity must be a positive integer" }),
  allowBackorders: z.boolean(),
  categories: z
    .array(z.string())
    .min(1, { message: "Select at least one category" }),
  tags: z.array(z.string()),
  status: z.enum(["draft", "published", "archived"]),
  featuredImage: z.string().optional(),
  galleryImages: z.array(z.string()),
  seoTitle: z
    .string()
    .max(60, { message: "SEO title should be 60 characters or less" }),
  seoDescription: z
    .string()
    .max(160, { message: "SEO description should be 160 characters or less" }),
  weight: z.number().min(0, { message: "Weight must be a positive number" }),
  dimensions: z.object({
    length: z.number().min(0),
    width: z.number().min(0),
    height: z.number().min(0),
  }),
  attributes: z.array(
    z.object({
      name: z.string().min(1, { message: "Attribute name is required" }),
      value: z.string().min(1, { message: "Attribute value is required" }),
    })
  ),
  variants: z.array(
    z.object({
      name: z.string().min(1, { message: "Variant name is required" }),
      price: z
        .number()
        .min(0, { message: "Variant price must be a positive number" }),
      sku: z.string().min(1, { message: "Variant SKU is required" }),
      quantity: z
        .number()
        .int()
        .min(0, { message: "Variant quantity must be a positive integer" }),
    })
  ),
  relatedProducts: z.array(z.string()),
  taxClass: z.string(),
  shippingClass: z.string(),
});

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

const MediaUploader = ({
  onUpload,
  maxFiles = 5,
  acceptedFileTypes = { "image/*": [".jpeg", ".png", ".jpg", ".gif"] },
}) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.slice(0, maxFiles - prevFiles.length),
      ]);
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        onUpload(acceptedFiles.map((file) => URL.createObjectURL(file)));
      }, 2000);
    },
    [onUpload, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: maxFiles,
  });

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-muted-foreground/25 hover:border-primary/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground mb-2">
            {isDragActive
              ? "Drop the files here"
              : "Drag 'n' drop files here, or click to select files"}
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: Images, Videos, PDFs (Max {maxFiles} files, 10MB each)
          </p>
        </div>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded file ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                    <div className="w-3/4 bg-white rounded-full h-2">
                      <div
                        className="bg-primary h-full rounded-full animate-progress"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function ProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [name, setName] = useState("");
  const [permalink, setPermalink] = useState(
    "https://shofy.bottle.com/products/"
  );
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Published");
  const [store, setStore] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [priceSale, setPriceSale] = useState("");
  const [costPerItem, setCostPerItem] = useState("");
  const [barcode, setBarcode] = useState("");

  // Add these new handler functions
  const handleSave = () => {
    console.log("Saving product...");
  };

  const handleSaveAndExit = () => {
    console.log("Saving product and exiting...");
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      permalink: "",
      description: "",
      shortDescription: "",
      price: 0,
      salePrice: 0,
      sku: "",
      barcode: "",
      quantity: 0,
      allowBackorders: false,
      categories: [],
      tags: [],
      status: "draft",
      featuredImage: "",
      galleryImages: [],
      seoTitle: "",
      seoDescription: "",
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      attributes: [],
      variants: [],
      relatedProducts: [],
      taxClass: "",
      shippingClass: "",
    },
  });

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributes",
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const watchName = watch("name");
  const watchSeoTitle = watch("seoTitle");
  const watchSeoDescription = watch("seoDescription");

  useEffect(() => {
    if (watchName) {
      setValue("permalink", watchName.toLowerCase().replace(/ /g, "-"));
    }
  }, [watchName, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitting(false);
    setToastMessage("Product saved successfully!");
    setShowToast(true);
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard", icon: Home },
            { label: "Products", href: "/products", icon: Package },
            { label: "New Product", icon: Plus },
          ]}
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            New Product
          </h1>
          <div className="flex space-x-2">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Button>
            <Button type="submit" form="product-form" disabled={isSubmitting}>
              <Save className="" />
              {isSubmitting ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </div>
        {/* add others code hear */}
        <div className="">
          <div className="border-b border-gray-200">
            <form className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-md shadow overflow-hidden p-4 sm:p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          type="text"
                          {...register("name")}
                          className="w-full"
                          placeholder="Enter product name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="content"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Content
                        </label>
                        <Textarea
                          id="content"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          className="w-full min-h-[200px]"
                          placeholder="Enter product content"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shortDescription">
                          Short Description
                        </Label>
                        <Textarea
                          id="shortDescription"
                          {...register("shortDescription")}
                          className="w-full"
                        />
                        {errors.shortDescription && (
                          <p className="text-red-500 text-sm">
                            {errors.shortDescription.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Gallery Images</Label>
                        <MediaUploader
                          onUpload={(files) => {
                            setValue("galleryImages", [
                              ...watch("galleryImages"),
                              ...files,
                            ]);
                          }}
                          maxFiles={5}
                        />
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium text-gray-900">
                          Product Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <label
                              htmlFor="sku"
                              className="block text-sm font-medium text-gray-700"
                            >
                              SKU
                            </label>
                            <input
                              id="sku"
                              type="text"
                              value={sku}
                              onChange={(e) => setSku(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                              placeholder="Enter SKU"
                            />
                          </div>
                          <div className="space-y-4">
                            <label
                              htmlFor="barcode"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Barcode
                            </label>
                            <input
                              id="barcode"
                              type="text"
                              value={barcode}
                              onChange={(e) => setBarcode(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                              placeholder="Enter barcode"
                            />
                          </div>
                          <div className="space-y-4">
                            <label
                              htmlFor="price"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Price
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                $
                              </span>
                              <input
                                id="price"
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <label
                              htmlFor="priceSale"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Sale Price
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                $
                              </span>
                              <input
                                id="priceSale"
                                type="text"
                                value={priceSale}
                                onChange={(e) => setPriceSale(e.target.value)}
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                                placeholder="0.00"
                              />
                            </div>
                            <p className="text-sm text-gray-500">
                              Leave blank to disable sale price
                            </p>
                          </div>
                        </div>
                      </div>

                      {attributeFields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex items-end space-x-2"
                        >
                          <div className="flex-1">
                            <Label htmlFor={`attributes.${index}.name`}>
                              Name
                            </Label>
                            <Input {...register(`attributes.${index}.name`)} />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={`attributes.${index}.value`}>
                              Value
                            </Label>
                            <Input {...register(`attributes.${index}.value`)} />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => removeAttribute(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => appendAttribute({ name: "", value: "" })}
                      >
                        Add Attribute
                      </Button>

                      <div>
                        {variantFields.map((field, index) => (
                          <div
                            key={field.id}
                            className="space-y-4 p-4 border rounded-md"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-medium">
                                Variant {index + 1}
                              </h4>
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => removeVariant(index)}
                              >
                                Remove
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`variants.${index}.name`}>
                                  Name
                                </Label>
                                <Input
                                  {...register(`variants.${index}.name`)}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`variants.${index}.price`}>
                                  Price
                                </Label>
                                <Input
                                  type="number"
                                  {...register(`variants.${index}.price`, {
                                    valueAsNumber: true,
                                  })}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`variants.${index}.sku`}>
                                  SKU
                                </Label>
                                <Input {...register(`variants.${index}.sku`)} />
                              </div>
                              <div>
                                <Label htmlFor={`variants.${index}.quantity`}>
                                  Quantity
                                </Label>
                                <Input
                                  type="number"
                                  {...register(`variants.${index}.quantity`, {
                                    valueAsNumber: true,
                                  })}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            appendVariant({
                              name: "",
                              price: 0,
                              sku: "",
                              quantity: 0,
                            })
                          }
                        >
                          Add Variant
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-md shadow overflow-hidden p-4 sm:p-6">
                    <div className="card-header mb-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        Search Engine Optimize
                      </h4>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="seoTitle">SEO Title</Label>
                        <Input
                          id="seoTitle"
                          {...register("seoTitle")}
                          className="w-full"
                        />
                        <p className="text-sm text-muted-foreground">
                          {watchSeoTitle.length}/60 characters
                        </p>
                        {errors.seoTitle && (
                          <p className="text-red-500 text-sm">
                            {errors.seoTitle.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="seoDescription">SEO Description</Label>
                        <Textarea
                          id="seoDescription"
                          {...register("seoDescription")}
                          className="w-full"
                        />
                        <p className="text-sm text-muted-foreground">
                          {watchSeoDescription.length}/160 characters
                        </p>
                        {errors.seoDescription && (
                          <p className="text-red-500 text-sm">
                            {errors.seoDescription.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 lg:space-y-8">
                  <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Status
                    </h3>
                    <div className="relative">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Store</h3>
                    <div className="relative">
                      <select
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                      >
                        <option value="">Select a store...</option>
                        <option value="store1">Store 1</option>
                        <option value="store2">Store 2</option>
                        <option value="store3">Store 3</option>
                      </select>
                      <ChevronDown className="absolute  right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Featured Product
                      </h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isFeatured}
                          onChange={(e) => setIsFeatured(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {["Electronics", "Laptop", "Tablet"].map((category) => (
                        <label
                          key={category}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Brand</h3>
                    <div className="relative">
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out">
                        <option value="">Select a brand...</option>
                        <option value="brand1">Brand 1</option>
                        <option value="brand2">Brand 2</option>
                        <option value="brand3">Brand 3</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md space-y-4 transition-all duration-200 ease-in-out hover:shadow-lg">
                    <div className="space-y-2">
                      <Label>Featured Image</Label>
                      <MediaUploader
                        onUpload={(files) => {
                          if (files.length > 0) {
                            setValue("featuredImage", files[0]);
                          }
                        }}
                        maxFiles={1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="p-6 sm:p-10 bg-gray-50 rounded-b-xl">
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Save
              </button>
              <button
                onClick={handleSaveAndExit}
                className="px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
              >
                Save & Exit
              </button>
            </div>
          </div>
        </div>
        <form
          id="product-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="flex flex-wrap bg-muted p-1 rounded-lg">
              {[
                { value: "general", label: "General", icon: Tag },
                { value: "media", label: "Media", icon: ImageIcon },
                { value: "pricing", label: "Pricing", icon: DollarSign },
                { value: "inventory", label: "Inventory", icon: Package },
                { value: "attributes", label: "Attributes", icon: Plus },
                { value: "variants", label: "Variants", icon: Package },
                { value: "related", label: "Related", icon: Search },
                { value: "shipping", label: "Shipping", icon: Truck },
                { value: "seo", label: "SEO", icon: Search },
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
                  <CardTitle>General Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      className="max-w-md"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="permalink">Permalink</Label>
                    <Input
                      id="permalink"
                      {...register("permalink")}
                      className="max-w-md"
                    />
                    {errors.permalink && (
                      <p className="text-red-500 text-sm">
                        {errors.permalink.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      {...register("description")}
                      className="min-h-[200px]"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Textarea
                      id="shortDescription"
                      {...register("shortDescription")}
                      className="max-w-md"
                    />
                    {errors.shortDescription && (
                      <p className="text-red-500 text-sm">
                        {errors.shortDescription.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Categories</Label>
                    <Controller
                      name="categories"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) =>
                            field.onChange([...field.value, value])
                          }
                          value={field.value[field.value.length - 1]}
                        >
                          <SelectTrigger className="max-w-md flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <SelectValue placeholder="Select categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">
                              Electronics
                            </SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="books">Books</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.categories && (
                      <p className="text-red-500 text-sm">
                        {errors.categories.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <Input
                            placeholder="Add a tag and press Enter"
                            className="max-w-md"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const newTag = e.currentTarget.value.trim();
                                if (newTag && !field.value.includes(newTag)) {
                                  field.onChange([...field.value, newTag]);
                                  e.currentTarget.value = "";
                                }
                              }
                            }}
                          />
                          <div className="flex flex-wrap gap-2 mt-2">
                            {field.value.map((tag, index) => (
                              <Badge key={index} variant="secondary">
                                {tag}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-1 p-0 h-auto"
                                  onClick={() =>
                                    field.onChange(
                                      field.value.filter((_, i) => i !== index)
                                    )
                                  }
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex space-x-4"
                        >
                          {["draft", "published", "archived"].map((status) => (
                            <div
                              key={status}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={status} id={status} />
                              <Label htmlFor={status} className="capitalize">
                                {status}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Featured Image</Label>
                    <MediaUploader
                      onUpload={(files) => {
                        if (files.length > 0) {
                          setValue("featuredImage", files[0]);
                        }
                      }}
                      maxFiles={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gallery Images</Label>
                    <MediaUploader
                      onUpload={(files) => {
                        setValue("galleryImages", [
                          ...watch("galleryImages"),
                          ...files,
                        ]);
                      }}
                      maxFiles={5}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Regular Price</Label>
                    <Input
                      type="number"
                      id="price"
                      {...register("price", { valueAsNumber: true })}
                      className="max-w-md"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Sale Price</Label>
                    <Input
                      type="number"
                      id="salePrice"
                      {...register("salePrice", { valueAsNumber: true })}
                      className="max-w-md"
                    />
                    {errors.salePrice && (
                      <p className="text-red-500 text-sm">
                        {errors.salePrice.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Tax Class</Label>
                    <Controller
                      name="taxClass"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="max-w-md">
                            <SelectValue placeholder="Select tax class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="reduced">Reduced</SelectItem>
                            <SelectItem value="zero">Zero</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" {...register("sku")} className="max-w-md" />
                    {errors.sku && (
                      <p className="text-red-500 text-sm">
                        {errors.sku.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      id="barcode"
                      {...register("barcode")}
                      className="max-w-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      type="number"
                      id="quantity"
                      {...register("quantity", { valueAsNumber: true })}
                      className="max-w-md"
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allowBackorders"
                      {...register("allowBackorders")}
                    />
                    <Label htmlFor="allowBackorders">Allow Backorders</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attributes">
              <Card>
                <CardHeader>
                  <CardTitle>Attributes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {attributeFields.map((field, index) => (
                    <div key={field.id} className="flex items-end space-x-2">
                      <div className="flex-1">
                        <Label htmlFor={`attributes.${index}.name`}>Name</Label>
                        <Input {...register(`attributes.${index}.name`)} />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={`attributes.${index}.value`}>
                          Value
                        </Label>
                        <Input {...register(`attributes.${index}.value`)} />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeAttribute(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendAttribute({ name: "", value: "" })}
                  >
                    Add Attribute
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variants">
              <Card>
                <CardHeader>
                  <CardTitle>Variants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {variantFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="space-y-4 p-4 border rounded-md"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium">
                          Variant {index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removeVariant(index)}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`variants.${index}.name`}>Name</Label>
                          <Input {...register(`variants.${index}.name`)} />
                        </div>
                        <div>
                          <Label htmlFor={`variants.${index}.price`}>
                            Price
                          </Label>
                          <Input
                            type="number"
                            {...register(`variants.${index}.price`, {
                              valueAsNumber: true,
                            })}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`variants.${index}.sku`}>SKU</Label>
                          <Input {...register(`variants.${index}.sku`)} />
                        </div>
                        <div>
                          <Label htmlFor={`variants.${index}.quantity`}>
                            Quantity
                          </Label>
                          <Input
                            type="number"
                            {...register(`variants.${index}.quantity`, {
                              valueAsNumber: true,
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      appendVariant({
                        name: "",
                        price: 0,
                        sku: "",
                        quantity: 0,
                      })
                    }
                  >
                    Add Variant
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related">
              <Card>
                <CardHeader>
                  <CardTitle>Related Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Controller
                    name="relatedProducts"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) =>
                          field.onChange([...field.value, value])
                        }
                        value={field.value[field.value.length - 1]}
                      >
                        <SelectTrigger className="max-w-md">
                          <SelectValue placeholder="Select related products" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product1">Product 1</SelectItem>
                          <SelectItem value="product2">Product 2</SelectItem>
                          <SelectItem value="product3">Product 3</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <div className="flex flex-wrap gap-2">
                    {watch("relatedProducts").map((product, index) => (
                      <Badge key={index} variant="secondary">
                        {product}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 p-0 h-auto"
                          onClick={() => {
                            const newRelatedProducts = [
                              ...watch("relatedProducts"),
                            ];
                            newRelatedProducts.splice(index, 1);
                            setValue("relatedProducts", newRelatedProducts);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      type="number"
                      id="weight"
                      {...register("weight", { valueAsNumber: true })}
                      className="max-w-md"
                    />
                    {errors.weight && (
                      <p className="text-red-500 text-sm">
                        {errors.weight.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dimensions.length">Length (cm)</Label>
                      <Input
                        type="number"
                        id="dimensions.length"
                        {...register("dimensions.length", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dimensions.width">Width (cm)</Label>
                      <Input
                        type="number"
                        id="dimensions.width"
                        {...register("dimensions.width", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dimensions.height">Height (cm)</Label>
                      <Input
                        type="number"
                        id="dimensions.height"
                        {...register("dimensions.height", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Shipping Class</Label>
                    <Controller
                      name="shippingClass"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="max-w-m">
                            <SelectValue placeholder="Select shipping class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="express">Express</SelectItem>
                            <SelectItem value="overnight">Overnight</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>SEO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">SEO Title</Label>
                    <Input
                      id="seoTitle"
                      {...register("seoTitle")}
                      className="max-w-md"
                    />
                    <p className="text-sm text-muted-foreground">
                      {watchSeoTitle.length}/60 characters
                    </p>
                    {errors.seoTitle && (
                      <p className="text-red-500 text-sm">
                        {errors.seoTitle.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">SEO Description</Label>
                    <Textarea
                      id="seoDescription"
                      {...register("seoDescription")}
                      className="max-w-md"
                    />
                    <p className="text-sm text-muted-foreground">
                      {watchSeoDescription.length}/160 characters
                    </p>
                    {errors.seoDescription && (
                      <p className="text-red-500 text-sm">
                        {errors.seoDescription.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>

        {showToast && (
          <Toast
            title="Success"
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
