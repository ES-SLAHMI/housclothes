"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star } from "lucide-react"
import Link from "next/link"

const relatedProducts = [
  {
    id: 2,
    name: "Nike Dunk Low",
    nameAr: "نايك دانك لو",
    nameFr: "Nike Dunk Low",
    price: 899,
    image: "/nike-dunk-low-sneakers.jpg",
    rating: 4.6,
    reviews: 89,
    isNew: false,
    isSale: false,
  },
  {
    id: 3,
    name: "Adidas Yeezy Boost 350",
    nameAr: "أديداس يزي بوست 350",
    nameFr: "Adidas Yeezy Boost 350",
    price: 1899,
    image: "/adidas-yeezy-boost-350-sneakers.jpg",
    rating: 4.9,
    reviews: 203,
    isNew: true,
    isSale: false,
  },
  {
    id: 4,
    name: "Converse Chuck Taylor",
    nameAr: "كونفيرس تشاك تايلور",
    nameFr: "Converse Chuck Taylor",
    price: 599,
    image: "/converse-chuck-taylor-all-star-sneakers.jpg",
    rating: 4.4,
    reviews: 67,
    isNew: false,
    isSale: false,
  },
]

export function RelatedProducts() {
  const { t, language } = useLanguage()

  const getProductName = (product: (typeof relatedProducts)[0]) => {
    switch (language) {
      case "ar":
        return product.nameAr
      case "fr":
        return product.nameFr
      default:
        return product.name
    }
  }

  return (
    <section className="py-16 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">You Might Also Like</h2>
          <p className="text-lg text-muted-foreground">Similar products that other customers loved</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
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
                  <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </Button>

                  {/* Hover Actions */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {t("addToCart")}
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
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
