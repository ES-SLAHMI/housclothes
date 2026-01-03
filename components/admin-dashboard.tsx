"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Plus, Save, X, Upload, Eye } from "lucide-react"
import { toast } from "sonner"

interface Product {
  id: number
  name: string
  nameAr: string
  nameFr: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand: string
  rating: number
  reviews: number
  sizes: (string | number)[]
  colors: string[]
  isNew: boolean
  isSale: boolean
  description: string
  descriptionAr: string
  descriptionFr: string
  specifications: Record<string, string>
}

const categories = [
  { id: "mens-shoes", name: "Men's Shoes", nameAr: "أحذية رجالية", nameFr: "Chaussures Homme" },
  { id: "womens-shoes", name: "Women's Shoes", nameAr: "أحذية نسائية", nameFr: "Chaussures Femme" },
  { id: "childrens-shoes", name: "Children's Shoes", nameAr: "أحذية أطفال", nameFr: "Chaussures Enfant" },
  { id: "mens-clothes", name: "Men's Clothes", nameAr: "ملابس رجالية", nameFr: "Vêtements Homme" },
  { id: "sneakers", name: "Sneakers", nameAr: "أحذية رياضية", nameFr: "Baskets" },
  { id: "streetwear", name: "Streetwear", nameAr: "أزياء شبابية", nameFr: "Mode urbaine" },
  { id: "accessories", name: "Accessories", nameAr: "إكسسوارات", nameFr: "Accessoires" },
  { id: "limited", name: "Limited Edition", nameAr: "إصدار محدود", nameFr: "Édition limitée" },
]

const brands = ["Nike", "Adidas", "Supreme", "Off-White", "Jordan", "Yeezy", "Levi's", "Lacoste", "Tommy Hilfiger", "Alpha Industries", "Uniqlo", "Converse"]

// Mock initial products data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High",
    nameAr: "إير جوردان 1 ريترو هاي",
    nameFr: "Air Jordan 1 Retro High",
    price: 1299,
    originalPrice: 1499,
    image: "/air-jordan-1-retro-high-sneakers.jpg",
    category: "mens-shoes",
    brand: "Nike",
    rating: 4.8,
    reviews: 124,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Black/Red", "White/Blue"],
    isNew: true,
    isSale: true,
    description: "The Air Jordan 1 Retro High brings back the classic silhouette that started it all.",
    descriptionAr: "إير جوردان 1 ريترو هاي يعيد الشكل الكلاسيكي الذي بدأ كل شيء.",
    descriptionFr: "L'Air Jordan 1 Retro High ramène la silhouette classique qui a tout commencé.",
    specifications: {
      "Upper Material": "Premium Leather",
      "Sole Material": "Rubber",
      "Closure": "Lace-up",
      "Style Code": "555088-061",
    },
  },
  {
    id: 2,
    name: "Nike Dunk Low",
    nameAr: "نايك دانك لو",
    nameFr: "Nike Dunk Low",
    price: 899,
    image: "/nike-dunk-low-sneakers.jpg",
    category: "mens-shoes",
    brand: "Nike",
    rating: 4.6,
    reviews: 89,
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ["White/Black", "Navy/White"],
    isNew: false,
    isSale: false,
    description: "The Nike Dunk Low returns with crisp overlays and original team colors.",
    descriptionAr: "نايك دانك لو يعود بطبقات واضحة وألوان الفريق الأصلية.",
    descriptionFr: "La Nike Dunk Low revient avec des superpositions nettes et les couleurs d'équipe originales.",
    specifications: {
      "Upper Material": "Leather and Synthetic",
      "Sole Material": "Rubber",
      "Closure": "Lace-up",
      "Style Code": "DD1391-100",
    },
  },
]

export function AdminDashboard() {
  const { language } = useLanguage()
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddingNew, setIsAddingNew] = useState(false)

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("admin-products")
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts))
      } catch (error) {
        console.error("Error loading products:", error)
      }
    }
  }, [])

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("admin-products", JSON.stringify(products))
  }, [products])

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const getCategoryName = (category: typeof categories[0]) => {
    switch (language) {
      case "ar":
        return category.nameAr
      case "fr":
        return category.nameFr
      default:
        return category.name
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product })
    setIsAddingNew(false)
    setIsDialogOpen(true)
  }

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      name: "",
      nameAr: "",
      nameFr: "",
      price: 0,
      image: "",
      category: "mens-shoes",
      brand: "Nike",
      rating: 4.5,
      reviews: 0,
      sizes: [],
      colors: [],
      isNew: false,
      isSale: false,
      description: "",
      descriptionAr: "",
      descriptionFr: "",
      specifications: {},
    }
    setEditingProduct(newProduct)
    setIsAddingNew(true)
    setIsDialogOpen(true)
  }

  const handleSaveProduct = () => {
    if (!editingProduct) return

    if (!editingProduct.name || !editingProduct.nameAr || !editingProduct.nameFr) {
      toast.error("Please fill in all name fields")
      return
    }

    if (editingProduct.price <= 0) {
      toast.error("Price must be greater than 0")
      return
    }

    if (isAddingNew) {
      setProducts(prev => [...prev, editingProduct])
      toast.success("Product added successfully!")
    } else {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p))
      toast.success("Product updated successfully!")
    }

    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.success("Product deleted successfully!")
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && editingProduct) {
      // In a real app, you would upload to a server
      // For now, we'll use a placeholder URL
      const imageUrl = `/placeholder-${file.name}`
      setEditingProduct({ ...editingProduct, image: imageUrl })
      toast.success("Image uploaded successfully!")
    }
  }

  const updateProductField = (field: keyof Product, value: any) => {
    if (!editingProduct) return
    setEditingProduct({ ...editingProduct, [field]: value })
  }

  const addSize = (size: string) => {
    if (!editingProduct || !size) return
    const newSizes = [...editingProduct.sizes, size]
    setEditingProduct({ ...editingProduct, sizes: newSizes })
  }

  const removeSize = (index: number) => {
    if (!editingProduct) return
    const newSizes = editingProduct.sizes.filter((_, i) => i !== index)
    setEditingProduct({ ...editingProduct, sizes: newSizes })
  }

  const addColor = (color: string) => {
    if (!editingProduct || !color) return
    const newColors = [...editingProduct.colors, color]
    setEditingProduct({ ...editingProduct, colors: newColors })
  }

  const removeColor = (index: number) => {
    if (!editingProduct) return
    const newColors = editingProduct.colors.filter((_, i) => i !== index)
    setEditingProduct({ ...editingProduct, colors: newColors })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your products, categories, and inventory</p>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Category Filter and Add Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {getCategoryName(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleAddProduct} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Products ({filteredProducts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="w-12 h-12 overflow-hidden rounded-lg">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.nameAr}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {categories.find(c => c.id === product.category)?.name || product.category}
                        </TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{product.price} MAD</p>
                            {product.originalPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                {product.originalPrice} MAD
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {product.isNew && (
                              <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                                New
                              </Badge>
                            )}
                            {product.isSale && (
                              <Badge variant="destructive" className="text-xs">
                                Sale
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold">{products.length}</h3>
                  <p className="text-muted-foreground">Total Products</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold">{categories.length}</h3>
                  <p className="text-muted-foreground">Categories</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold">{brands.length}</h3>
                  <p className="text-muted-foreground">Brands</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit/Add Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isAddingNew ? "Add New Product" : "Edit Product"}
            </DialogTitle>
          </DialogHeader>

          {editingProduct && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name (English)</Label>
                  <Input
                    id="name"
                    value={editingProduct.name}
                    onChange={(e) => updateProductField("name", e.target.value)}
                    placeholder="Product name in English"
                  />
                </div>
                <div>
                  <Label htmlFor="nameAr">Name (Arabic)</Label>
                  <Input
                    id="nameAr"
                    value={editingProduct.nameAr}
                    onChange={(e) => updateProductField("nameAr", e.target.value)}
                    placeholder="اسم المنتج بالعربية"
                    dir="rtl"
                  />
                </div>
                <div>
                  <Label htmlFor="nameFr">Name (French)</Label>
                  <Input
                    id="nameFr"
                    value={editingProduct.nameFr}
                    onChange={(e) => updateProductField("nameFr", e.target.value)}
                    placeholder="Nom du produit en français"
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Select
                    value={editingProduct.brand}
                    onValueChange={(value) => updateProductField("brand", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Category and Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={editingProduct.category}
                    onValueChange={(value) => updateProductField("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Price (MAD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => updateProductField("price", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price (MAD)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={editingProduct.originalPrice || ""}
                    onChange={(e) => updateProductField("originalPrice", e.target.value ? Number(e.target.value) : undefined)}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input
                    id="image"
                    value={editingProduct.image}
                    onChange={(e) => updateProductField("image", e.target.value)}
                    placeholder="Image URL"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Button type="button" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
                {editingProduct.image && (
                  <div className="mt-2 w-24 h-24 overflow-hidden rounded-lg">
                    <img
                      src={editingProduct.image}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description (English)</Label>
                  <Textarea
                    id="description"
                    value={editingProduct.description}
                    onChange={(e) => updateProductField("description", e.target.value)}
                    placeholder="Product description in English"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="descriptionAr">Description (Arabic)</Label>
                  <Textarea
                    id="descriptionAr"
                    value={editingProduct.descriptionAr}
                    onChange={(e) => updateProductField("descriptionAr", e.target.value)}
                    placeholder="وصف المنتج بالعربية"
                    dir="rtl"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="descriptionFr">Description (French)</Label>
                  <Textarea
                    id="descriptionFr"
                    value={editingProduct.descriptionFr}
                    onChange={(e) => updateProductField("descriptionFr", e.target.value)}
                    placeholder="Description du produit en français"
                    rows={3}
                  />
                </div>
              </div>

              {/* Sizes and Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Sizes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editingProduct.sizes.map((size, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {size}
                        <button
                          type="button"
                          onClick={() => removeSize(index)}
                          className="ml-1 text-destructive hover:text-destructive/80"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Add size"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addSize((e.target as HTMLInputElement).value)
                          ;(e.target as HTMLInputElement).value = ""
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label>Colors</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editingProduct.colors.map((color, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {color}
                        <button
                          type="button"
                          onClick={() => removeColor(index)}
                          className="ml-1 text-destructive hover:text-destructive/80"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Add color"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addColor((e.target as HTMLInputElement).value)
                          ;(e.target as HTMLInputElement).value = ""
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Status Toggles */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingProduct.isNew}
                    onChange={(e) => updateProductField("isNew", e.target.checked)}
                  />
                  <span>New Product</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingProduct.isSale}
                    onChange={(e) => updateProductField("isSale", e.target.checked)}
                  />
                  <span>On Sale</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProduct}>
                  <Save className="h-4 w-4 mr-2" />
                  {isAddingNew ? "Add Product" : "Save Changes"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}