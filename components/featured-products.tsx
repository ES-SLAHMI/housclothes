"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const products = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High",
    nameAr: "إير جوردان 1 ريترو هاي",
    nameFr: "Air Jordan 1 Retro High",
    price: 100,
    originalPrice: 100,
    image: "/air-jordan-1-retro-high-sneakers.jpg",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isSale: true,
    brand: "Nike",
    sizes: ["42", "43", "44"],
    colors: ["Black/Red", "White/Blue"],
  },
  {
    id: 2,
    name: "Nike Dunk Low",
    nameAr: "نايك دانك لو",
    nameFr: "Nike Dunk Low",
    price: 100,
    image: "/nike-dunk-low-sneakers.jpg",
    rating: 4.6,
    reviews: 89,
    isNew: false,
    isSale: false,
    brand: "Nike",
    sizes: ["42", "43", "44"],
    colors: ["White/Black"],
  },
  {
    id: 3,
    name: "Adidas Yeezy Boost 350",
    nameAr: "أديداس يزي بوست 350",
    nameFr: "Adidas Yeezy Boost 350",
    price: 100,
    image: "/adidas-yeezy-boost-350-sneakers.jpg",
    rating: 4.9,
    reviews: 203,
    isNew: true,
    isSale: false,
    brand: "Adidas",
    sizes: ["42", "43", "44"],
    colors: ["Cream White"],
  },
  {
    id: 4,
    name: "Converse Chuck Taylor",
    nameAr: "كونفيرس تشاك تايلور",
    nameFr: "Converse Chuck Taylor",
    price: 100,
    image: "/converse-chuck-taylor-all-star-sneakers.jpg",
    rating: 4.4,
    reviews: 67,
    isNew: false,
    isSale: false,
    brand: "Converse",
    sizes: ["42", "43", "44"],
    colors: ["Black", "White"],
  },
]

export function FeaturedProducts() {
  const { t, language } = useLanguage()
  const { addToCart } = useCart() // Added cart context
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

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

  const handleQuickAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      nameAr: product.nameAr,
      nameFr: product.nameFr,
      price: product.price,
      image: product.image,
      size: product.sizes[0], // Default to first available size
      color: product.colors[0], // Default to first available color
      brand: product.brand,
    })

    toast.success(`${getProductName(product)} added to cart!`)
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{t("featuredProducts")}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Handpicked selection of the most popular sneakers and streetwear
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={getProductName(product)}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2">
                    {product.isNew && (
                      <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                        {t("newArrivals")}
                      </Badge>
                    )}
                    {product.isSale && (
                      <Badge variant="destructive" className="text-xs">
                        Sale
                      </Badge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/80 hover:bg-white h-8 w-8 sm:h-10 sm:w-10"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>

                  {/* Hover Actions */}
                  <div className="absolute inset-x-2 sm:inset-x-3 bottom-2 sm:bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-1 sm:gap-2">
                      <Button
                        size="sm"
                        className="flex-1 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4"
                        onClick={() => handleQuickAddToCart(product)} // Added click handler
                      >
                        <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                        <span className="hidden sm:inline truncate">{t("addToCart")}</span>
                        <span className="sm:hidden">Add</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 bg-transparent flex-shrink-0"
                      >
                        <Link href={`/products/${product.id}`}>
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-lg mb-2 line-clamp-1">{getProductName(product)}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
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

                  {/* Price */}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="bg-transparent">
            <Link href="/products">{t("viewAll")} Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
