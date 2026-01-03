"use client"

import { useState, useMemo } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Heart, ShoppingCart, Eye, Star, Filter, Grid, List, Search, X } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const products = [
  // Men's Shoes
  {
    id: 1,
    name: "Air Jordan 1 Retro High",
    nameAr: "إير جوردان 1 ريترو هاي",
    nameFr: "Air Jordan 1 Retro High",
    price: 100,
    originalPrice: 100,
    image: "/air-jordan-1-retro-high-sneakers.jpg",
    category: "mens-shoes",
    brand: "Nike",
    rating: 4.8,
    reviews: 124,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Black/Red", "White/Blue"],
    isNew: true,
    isSale: true,
  },
  {
    id: 2,
    name: "Nike Dunk Low",
    nameAr: "نايك دانك لو",
    nameFr: "Nike Dunk Low",
    price: 100,
    image: "/nike-dunk-low-sneakers.jpg",
    category: "mens-shoes",
    brand: "Nike",
    rating: 4.6,
    reviews: 89,
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ["White/Black", "Navy/White"],
    isNew: false,
    isSale: false,
  },
  {
    id: 3,
    name: "Men's Running Shoes",
    nameAr: "أحذية جري رجالية",
    nameFr: "Chaussures de course homme",
    price: 100,
    image: "/mens-running-shoes.jpg",
    category: "mens-shoes",
    brand: "Nike",
    rating: 4.7,
    reviews: 156,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Black", "Navy", "Gray"],
    isNew: true,
    isSale: false,
  },
  {
    id: 4,
    name: "Men's Basketball Shoes",
    nameAr: "أحذية كرة سلة رجالية",
    nameFr: "Chaussures de basket homme",
    price: 100,
    image: "/mens-basketball-shoes.jpg",
    category: "mens-shoes",
    brand: "Adidas",
    rating: 4.8,
    reviews: 203,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ["Black/White", "Red/Black"],
    isNew: false,
    isSale: true,
    originalPrice: 100,
  },
  // Women's Shoes
  {
    id: 5,
    name: "Women's Casual Sneakers",
    nameAr: "أحذية رياضية نسائية كاجوال",
    nameFr: "Baskets décontractées femme",
    price: 100,
    image: "/womens-casual-sneakers.jpg",
    category: "womens-shoes",
    brand: "Adidas",
    rating: 4.6,
    reviews: 142,
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["White", "Pink", "Gray"],
    isNew: true,
    isSale: false,
  },
  {
    id: 6,
    name: "Women's Fashion Sneakers",
    nameAr: "أحذية رياضية نسائية أنيقة",
    nameFr: "Baskets mode femme",
    price: 100,
    image: "/womens-fashion-sneakers.jpg",
    category: "womens-shoes",
    brand: "Nike",
    rating: 4.7,
    reviews: 98,
    sizes: [36, 37, 38, 39, 40, 41],
    colors: ["Black", "White", "Beige"],
    isNew: false,
    isSale: true,
    originalPrice: 100,
  },
  // Children's Shoes
  {
    id: 7,
    name: "Children's Colorful Sneakers",
    nameAr: "أحذية رياضية ملونة للأطفال",
    nameFr: "Baskets colorées enfant",
    price: 100,
    image: "/childrens-colorful-sneakers.jpg",
    category: "childrens-shoes",
    brand: "Nike",
    rating: 4.5,
    reviews: 87,
    sizes: [28, 29, 30, 31, 32, 33, 34, 35],
    colors: ["Blue/Red", "Pink/Purple", "Green/Yellow"],
    isNew: true,
    isSale: false,
  },
  {
    id: 8,
    name: "Children's Sports Shoes",
    nameAr: "أحذية رياضية للأطفال",
    nameFr: "Chaussures de sport enfant",
    price: 100,
    image: "/childrens-sports-shoes.jpg",
    category: "childrens-shoes",
    brand: "Adidas",
    rating: 4.4,
    reviews: 65,
    sizes: [28, 29, 30, 31, 32, 33, 34, 35],
    colors: ["Black/White", "Navy/Orange"],
    isNew: false,
    isSale: true,
    originalPrice: 100,
  },
  // Men's Clothing
  {
    id: 9,
    name: "Premium Cotton T-Shirt",
    nameAr: "تيشيرت قطني فاخر",
    nameFr: "T-shirt en coton premium",
    price: 100,
    image: "/mens-premium-cotton-tshirt.jpg",
    category: "mens-clothes",
    brand: "Nike",
    rating: 4.6,
    reviews: 145,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Gray"],
    isNew: true,
    isSale: false,
  },
  {
    id: 10,
    name: "Classic Denim Jeans",
    nameAr: "جينز دنيم كلاسيكي",
    nameFr: "Jean denim classique",
    price: 100,
    image: "/mens-classic-denim-jeans.jpg",
    category: "mens-clothes",
    brand: "Levi's",
    rating: 4.7,
    reviews: 203,
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    isNew: false,
    isSale: true,
    originalPrice: 100,
  },
  {
    id: 11,
    name: "Casual Polo Shirt",
    nameAr: "قميص بولو كاجوال",
    nameFr: "Polo décontracté",
    price: 100,
    image: "/mens-casual-polo-shirt.jpg",
    category: "mens-clothes",
    brand: "Lacoste",
    rating: 4.5,
    reviews: 98,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "White", "Red", "Green"],
    isNew: false,
    isSale: false,
  },
  {
    id: 12,
    name: "Zip-Up Hoodie",
    nameAr: "هودي بسحاب",
    nameFr: "Sweat à capuche zippé",
    price: 100,
    image: "/mens-zip-up-hoodie.jpg",
    category: "mens-clothes",
    brand: "Adidas",
    rating: 4.8,
    reviews: 167,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "Navy", "Burgundy"],
    isNew: true,
    isSale: false,
  },
  {
    id: 13,
    name: "Casual Chino Pants",
    nameAr: "بنطلون تشينو كاجوال",
    nameFr: "Pantalon chino décontracté",
    price: 100,
    image: "/mens-casual-chino-pants.jpg",
    category: "mens-clothes",
    brand: "Tommy Hilfiger",
    rating: 4.4,
    reviews: 134,
    sizes: ["30", "32", "34", "36", "38", "40"],
    colors: ["Khaki", "Navy", "Black", "Olive"],
    isNew: false,
    isSale: true,
    originalPrice: 100,
  },
  {
    id: 14,
    name: "Bomber Jacket",
    nameAr: "جاكيت بومبر",
    nameFr: "Veste bomber",
    price: 100,
    image: "/mens-bomber-jacket.jpg",
    category: "mens-clothes",
    brand: "Alpha Industries",
    rating: 4.7,
    reviews: 89,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Olive", "Navy", "Burgundy"],
    isNew: true,
    isSale: false,
  },
  {
    id: 15,
    name: "Flannel Shirt",
    nameAr: "قميص فلانيل",
    nameFr: "Chemise en flanelle",
    price: 100,
    image: "/mens-flannel-shirt.jpg",
    category: "mens-clothes",
    brand: "Uniqlo",
    rating: 4.6,
    reviews: 156,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red/Black", "Blue/White", "Green/Black"],
    isNew: false,
    isSale: false,
  },
  {
    id: 16,
    name: "Track Pants",
    nameAr: "بنطلون رياضي",
    nameFr: "Pantalon de survêtement",
    price: 100,
    image: "/mens-track-pants.jpg",
    category: "mens-clothes",
    brand: "Nike",
    rating: 4.5,
    reviews: 112,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Gray", "Dark Green"],
    isNew: false,
    isSale: true,
    originalPrice: 100,
  },
  // Original products with updated IDs
  {
    id: 17,
    name: "Adidas Yeezy Boost 350",
    nameAr: "أديداس يزي بوست 350",
    nameFr: "Adidas Yeezy Boost 350",
    price: 100,
    image: "/adidas-yeezy-boost-350-sneakers.jpg",
    category: "sneakers",
    brand: "Adidas",
    rating: 4.9,
    reviews: 203,
    sizes: [40, 41, 42, 43, 44],
    colors: ["Cream White", "Core Black"],
    isNew: true,
    isSale: false,
  },
  {
    id: 18,
    name: "Supreme Box Logo Hoodie",
    nameAr: "سوبريم بوكس لوجو هودي",
    nameFr: "Supreme Box Logo Hoodie",
    price: 100,
    image: "/supreme-box-logo-hoodie-streetwear.jpg",
    category: "streetwear",
    brand: "Supreme",
    rating: 4.7,
    reviews: 156,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Red", "Navy"],
    isNew: true,
    isSale: false,
  },
  {
    id: 19,
    name: "Off-White Industrial Belt",
    nameAr: "أوف وايت حزام صناعي",
    nameFr: "Ceinture industrielle Off-White",
    price: 100,
    image: "/off-white-industrial-belt-accessory.jpg",
    category: "accessories",
    brand: "Off-White",
    rating: 4.5,
    reviews: 78,
    sizes: ["One Size"],
    colors: ["Yellow", "Black"],
    isNew: false,
    isSale: true,
    originalPrice: 100,
  },
  {
    id: 20,
    name: "Travis Scott x Nike",
    nameAr: "ترافيس سكوت × نايك",
    nameFr: "Travis Scott x Nike",
    price: 100,
    image: "/travis-scott-nike-collaboration-sneakers.jpg",
    category: "limited",
    brand: "Nike",
    rating: 4.9,
    reviews: 89,
    sizes: [41, 42, 43, 44],
    colors: ["Brown/Pink"],
    isNew: true,
    isSale: false,
  },
]

const categories = [
  { id: "all", name: "All Products", nameAr: "جميع المنتجات", nameFr: "Tous les produits" },
  { id: "mens-shoes", name: "Men's Shoes", nameAr: "أحذية رجالية", nameFr: "Chaussures Homme" },
  { id: "womens-shoes", name: "Women's Shoes", nameAr: "أحذية نسائية", nameFr: "Chaussures Femme" },
  { id: "childrens-shoes", name: "Children's Shoes", nameAr: "أحذية أطفال", nameFr: "Chaussures Enfant" },
  { id: "mens-clothes", name: "Men's Clothes", nameAr: "ملابس رجالية", nameFr: "Vêtements Homme" },
  { id: "sneakers", name: "Sneakers", nameAr: "أحذية رياضية", nameFr: "Baskets" },
  { id: "streetwear", name: "Streetwear", nameAr: "أزياء شبابية", nameFr: "Mode urbaine" },
  { id: "accessories", name: "Accessories", nameAr: "إكسسوارات", nameFr: "Accessoires" },
  { id: "limited", name: "Limited Edition", nameAr: "إصدار محدود", nameFr: "Édition limitée" },
]

const brands = [
  "Nike",
  "Adidas",
  "Supreme",
  "Off-White",
  "Jordan",
  "Yeezy",
  "Levi's",
  "Lacoste",
  "Tommy Hilfiger",
  "Alpha Industries",
  "Uniqlo",
]

export function ProductCatalog() {
  const { t, language } = useLanguage()
  const { addToCart } = useCart() // Added cart context
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handleQuickAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      nameAr: product.nameAr,
      nameFr: product.nameFr,
      price: product.price,
      image: product.image,
      size: product.sizes[0].toString(), // Default to first available size
      color: product.colors[0], // Default to first available color
      brand: product.brand,
    })

    toast.success(`${getProductName(product)} added to cart!`)
  }

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameAr.includes(searchQuery) ||
        product.nameFr.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedBrands, priceRange, sortBy])

  const getProductName = (product: (typeof products)[0]) => {
    switch (language) {
      case "ar":
        return product.nameAr
      case "fr":
        return product.nameFr
      default:
        return product.name
    }
  }

  const getCategoryName = (category: (typeof categories)[0]) => {
    switch (language) {
      case "ar":
        return category.nameAr
      case "fr":
        return category.nameFr
      default:
        return category.name
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">{t("products")}</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Discover our complete collection of premium sneakers and streetwear
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Toggle */}
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="sm:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex gap-6 lg:gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`w-full sm:w-80 space-y-6 ${showFilters ? "block" : "hidden sm:block"} ${showFilters ? "fixed inset-0 z-50 bg-background p-4 overflow-y-auto sm:relative sm:inset-auto sm:z-auto sm:bg-transparent sm:p-0 sm:overflow-visible" : ""}`}
        >
          {showFilters && (
            <div className="flex justify-between items-center sm:hidden mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className="w-full justify-start text-sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {getCategoryName(category)}
                </Button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-semibold mb-4">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <label
                    htmlFor={brand}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-4">Price Range</h3>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={5000}
                min={0}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  {priceRange[0]} {t("currency")}
                </span>
                <span>
                  {priceRange[1]} {t("currency")}
                </span>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="sm:hidden pt-4 border-t">
              <Button onClick={() => setShowFilters(false)} className="w-full">
                Apply Filters
              </Button>
            </div>
          )}
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <Link href={`/products/${product.id}`}>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={getProductName(product)}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                          <Badge variant="secondary" className="bg-green-500 text-white">
                            New
                          </Badge>
                        )}
                        {product.isSale && <Badge variant="destructive">Sale</Badge>}
                      </div>

                      {/* Wishlist Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                          }`}
                        />
                      </Button>

                      {/* Hover Actions */}
                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 text-sm px-3"
                            onClick={() => handleQuickAddToCart(product)} // Added click handler
                          >
                            <ShoppingCart className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{t("addToCart")}</span>
                          </Button>
                          <Button variant="outline" size="sm" asChild className="flex-shrink-0 bg-transparent">
                            <Link href={`/products/${product.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1 hover:text-primary transition-colors">
                          {getProductName(product)}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">
                          {product.price} {t("currency")}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice} {t("currency")}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
                      <div className="relative w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-lg">
                        <Link href={`/products/${product.id}`}>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={getProductName(product)}
                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                      </div>

                      <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <Link href={`/products/${product.id}`}>
                              <h3 className="font-semibold text-sm sm:text-lg hover:text-primary transition-colors line-clamp-2">
                                {getProductName(product)}
                              </h3>
                            </Link>
                            <p className="text-xs sm:text-sm text-muted-foreground">{product.brand}</p>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleWishlist(product.id)}
                            className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
                          >
                            <Heart
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                              }`}
                            />
                          </Button>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground">({product.reviews})</span>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg sm:text-xl font-bold text-primary">
                              {product.price} {t("currency")}
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                                {product.originalPrice} {t("currency")}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 sm:flex-none text-xs sm:text-sm px-2 sm:px-4"
                              onClick={() => handleQuickAddToCart(product)} // Added click handler
                            >
                              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                              <span className="hidden sm:inline truncate">{t("addToCart")}</span>
                              <span className="sm:hidden">Add</span>
                            </Button>
                            <Button variant="outline" size="sm" asChild className="bg-transparent flex-shrink-0">
                              <Link href={`/products/${product.id}`}>
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedBrands([])
                  setPriceRange([0, 5000])
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
