"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const categories = [
  {
    id: "mens-shoes",
    name: "Men's Shoes",
    nameAr: "أحذية رجالية",
    nameFr: "Chaussures Homme",
    image: "/mens-sneakers-collection-display.jpg",
    count: "200+ Products",
    countAr: "200+ منتج",
    countFr: "200+ Produits",
  },
  {
    id: "womens-shoes",
    name: "Women's Shoes",
    nameAr: "أحذية نسائية",
    nameFr: "Chaussures Femme",
    image: "/womens-sneakers-collection-display.jpg",
    count: "180+ Products",
    countAr: "180+ منتج",
    countFr: "180+ Produits",
  },
  {
    id: "childrens-shoes",
    name: "Children's Shoes",
    nameAr: "أحذية أطفال",
    nameFr: "Chaussures Enfant",
    image: "/childrens-sneakers-collection-display.jpg",
    count: "120+ Products",
    countAr: "120+ منتج",
    countFr: "120+ Produits",
  },
  {
    id: "mens-clothes",
    name: "Men's Clothes",
    nameAr: "ملابس رجالية",
    nameFr: "Vêtements Homme",
    image: "/mens-clothing-collection-display.jpg",
    count: "150+ Products",
    countAr: "150+ منتج",
    countFr: "150+ Produits",
  },
  {
    id: "sneakers",
    name: "Sneakers",
    nameAr: "أحذية رياضية",
    nameFr: "Baskets",
    image: "/premium-sneakers-collection-display.jpg",
    count: "150+ Products",
    countAr: "150+ منتج",
    countFr: "150+ Produits",
  },
  {
    id: "streetwear",
    name: "Streetwear",
    nameAr: "أزياء شبابية",
    nameFr: "Mode urbaine",
    image: "/urban-streetwear-clothing-collection.jpg",
    count: "80+ Products",
    countAr: "80+ منتج",
    countFr: "80+ Produits",
  },
  {
    id: "accessories",
    name: "Accessories",
    nameAr: "إكسسوارات",
    nameFr: "Accessoires",
    image: "/streetwear-accessories-caps-bags.jpg",
    count: "45+ Products",
    countAr: "45+ منتج",
    countFr: "45+ Produits",
  },
]

export function CategoryGrid() {
  const { t, language } = useLanguage()

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

  const getCategoryCount = (category: (typeof categories)[0]) => {
    switch (language) {
      case "ar":
        return category.countAr
      case "fr":
        return category.countFr
      default:
        return category.count
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Shop by Category</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Discover our curated collection of premium sneakers and streetwear
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={getCategoryName(category)}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1">{getCategoryName(category)}</h3>
                    <p className="text-white/80 text-sm mb-2 sm:mb-3">{getCategoryCount(category)}</p>
                    <Button asChild size="sm" variant="secondary" className="w-full text-xs sm:text-sm">
                      <Link href={`/products?category=${category.id}`}>{t("viewAll")}</Link>
                    </Button>
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
