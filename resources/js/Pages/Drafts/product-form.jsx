import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "@inertiajs/react";
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

  const { data, setData, post, processing, errors } = useForm({
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
  });

  useEffect(() => {
    if (data.name) {
      setData("permalink", data.name.toLowerCase().replace(/ /g, "-"));
    }
  }, [data.name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    post("/products", {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        setIsSubmitting(false);
        setToastMessage("Product saved successfully!");
        setShowToast(true);
      },
      onError: () => {
        setIsSubmitting(false);
        setToastMessage("An error occurred while saving the product.");
        setShowToast(true);
      },
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
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
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
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
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="max-w-md"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="permalink">Permalink</Label>
                  <Input
                    id="permalink"
                    value={data.permalink}
                    onChange={(e) => setData("permalink", e.target.value)}
                    className="max-w-md"
                  />
                  {errors.permalink && (
                    <p className="text-red-500 text-sm">{errors.permalink}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="min-h-[200px]"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    value={data.shortDescription}
                    onChange={(e) =>
                      setData("shortDescription", e.target.value)
                    }
                    className="max-w-md"
                  />
                  {errors.shortDescription && (
                    <p className="text-red-500 text-sm">
                      {errors.shortDescription}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Categories</Label>
                  <Select
                    value={data.categories[data.categories.length - 1]}
                    onValueChange={(value) =>
                      setData("categories", [...data.categories, value])
                    }
                  >
                    <SelectTrigger className="max-w-md">
                      <SelectValue placeholder="Select categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.categories && (
                    <p className="text-red-500 text-sm">{errors.categories}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div>
                    <Input
                      placeholder="Add a tag and press Enter"
                      className="max-w-md"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const newTag = e.currentTarget.value.trim();
                          if (newTag && !data.tags.includes(newTag)) {
                            setData("tags", [...data.tags, newTag]);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {data.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 p-0 h-auto"
                            onClick={() => {
                              const newTags = [...data.tags];
                              newTags.splice(index, 1);
                              setData("tags", newTags);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <RadioGroup
                    value={data.status}
                    onValueChange={(value) => setData("status", value)}
                  >
                    {["draft", "published", "archived"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <RadioGroupItem value={status} id={status} />
                        <Label htmlFor={status} className="capitalize">
                          {status}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
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
                        setData("featuredImage", files[0]);
                      }
                    }}
                    maxFiles={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Gallery Images</Label>
                  <MediaUploader
                    onUpload={(files) => {
                      setData("galleryImages", [
                        ...data.galleryImages,
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
                    value={data.price}
                    onChange={(e) => setData("price", e.target.value)}
                    className="max-w-md"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salePrice">Sale Price</Label>
                  <Input
                    type="number"
                    id="salePrice"
                    value={data.salePrice}
                    onChange={(e) => setData("salePrice", e.target.value)}
                    className="max-w-md"
                  />
                  {errors.salePrice && (
                    <p className="text-red-500 text-sm">{errors.salePrice}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Tax Class</Label>
                  <Select
                    value={data.taxClass}
                    onValueChange={(value) => setData("taxClass", value)}
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
                  <Input
                    id="sku"
                    value={data.sku}
                    onChange={(e) => setData("sku", e.target.value)}
                    className="max-w-md"
                  />
                  {errors.sku && (
                    <p className="text-red-500 text-sm">{errors.sku}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input
                    id="barcode"
                    value={data.barcode}
                    onChange={(e) => setData("barcode", e.target.value)}
                    className="max-w-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    type="number"
                    id="quantity"
                    value={data.quantity}
                    onChange={(e) => setData("quantity", e.target.value)}
                    className="max-w-md"
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm">{errors.quantity}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="allowBackorders"
                    checked={data.allowBackorders}
                    onCheckedChange={(value) =>
                      setData("allowBackorders", value)
                    }
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
                {data.attributes.map((attribute, index) => (
                  <div key={index} className="flex items-end space-x-2">
                    <div className="flex-1">
                      <Label htmlFor={`attributes.${index}.name`}>Name</Label>
                      <Input
                        value={attribute.name}
                        onChange={(e) => {
                          const newAttributes = [...data.attributes];
                          newAttributes[index].name = e.target.value;
                          setData("attributes", newAttributes);
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`attributes.${index}.value`}>Value</Label>
                      <Input
                        value={attribute.value}
                        onChange={(e) => {
                          const newAttributes = [...data.attributes];
                          newAttributes[index].value = e.target.value;
                          setData("attributes", newAttributes);
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        const newAttributes = [...data.attributes];
                        newAttributes.splice(index, 1);
                        setData("attributes", newAttributes);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setData("attributes", [
                      ...data.attributes,
                      { name: "", value: "" },
                    ])
                  }
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
                {data.variants.map((variant, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium">
                        Variant {index + 1}
                      </h4>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          const newVariants = [...data.variants];
                          newVariants.splice(index, 1);
                          setData("variants", newVariants);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`variants.${index}.name`}>Name</Label>
                        <Input
                          value={variant.name}
                          onChange={(e) => {
                            const newVariants = [...data.variants];
                            newVariants[index].name = e.target.value;
                            setData("variants", newVariants);
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`variants.${index}.price`}>Price</Label>
                        <Input
                          type="number"
                          value={variant.price}
                          onChange={(e) => {
                            const newVariants = [...data.variants];
                            newVariants[index].price = e.target.value;
                            setData("variants", newVariants);
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`variants.${index}.sku`}>SKU</Label>
                        <Input
                          value={variant.sku}
                          onChange={(e) => {
                            const newVariants = [...data.variants];
                            newVariants[index].sku = e.target.value;
                            setData("variants", newVariants);
                          }}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`variants.${index}.quantity`}>
                          Quantity
                        </Label>
                        <Input
                          type="number"
                          value={variant.quantity}
                          onChange={(e) => {
                            const newVariants = [...data.variants];
                            newVariants[index].quantity = e.target.value;
                            setData("variants", newVariants);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setData("variants", [
                      ...data.variants,
                      { name: "", price: 0, sku: "", quantity: 0 },
                    ])
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
                <Select
                  value={data.relatedProducts[data.relatedProducts.length - 1]}
                  onValueChange={(value) =>
                    setData("relatedProducts", [...data.relatedProducts, value])
                  }
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
                <div className="flex flex-wrap gap-2">
                  {data.relatedProducts.map((product, index) => (
                    <Badge key={index} variant="secondary">
                      {product}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 p-0 h-auto"
                        onClick={() => {
                          const newRelatedProducts = [...data.relatedProducts];
                          newRelatedProducts.splice(index, 1);
                          setData("relatedProducts", newRelatedProducts);
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
                    value={data.weight}
                    onChange={(e) => setData("weight", e.target.value)}
                    className="max-w-md"
                  />
                  {errors.weight && (
                    <p className="text-red-500 text-sm">{errors.weight}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dimensions.length">Length (cm)</Label>
                    <Input
                      type="number"
                      id="dimensions.length"
                      value={data.dimensions.length}
                      onChange={(e) =>
                        setData("dimensions.length", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions.width">Width (cm)</Label>
                    <Input
                      type="number"
                      id="dimensions.width"
                      value={data.dimensions.width}
                      onChange={(e) =>
                        setData("dimensions.width", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions.height">Height (cm)</Label>
                    <Input
                      type="number"
                      id="dimensions.height"
                      value={data.dimensions.height}
                      onChange={(e) =>
                        setData("dimensions.height", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Shipping Class</Label>
                  <Select
                    value={data.shippingClass}
                    onValueChange={(value) => setData("shippingClass", value)}
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
                    value={data.seoTitle}
                    onChange={(e) => setData("seoTitle", e.target.value)}
                    className="max-w-md"
                  />
                  <p className="text-sm text-muted-foreground">
                    {data.seoTitle.length}/60 characters
                  </p>
                  {errors.seoTitle && (
                    <p className="text-red-500 text-sm">{errors.seoTitle}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={data.seoDescription}
                    onChange={(e) => setData("seoDescription", e.target.value)}
                    className="max-w-md"
                  />
                  <p className="text-sm text-muted-foreground">
                    {data.seoDescription.length}/160 characters
                  </p>
                  {errors.seoDescription && (
                    <p className="text-red-500 text-sm">
                      {errors.seoDescription}
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
          action={<Button onClick={() => setShowToast(false)}>Dismiss</Button>}
        />
      )}
    </div>
  );
}
