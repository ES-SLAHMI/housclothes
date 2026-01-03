"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ShoppingCart, Share2, Star, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { toast } from "sonner"

interface ProductDetailsProps {
  productId: string
}

// Mock product data - in real app, this would come from API/database
const getProduct = (id: string) => {
  const products = [
    {
      id: 1,
      name: "Air Jordan 1 Retro High",
      nameAr: "إير جوردان 1 ريترو هاي",
      nameFr: "Air Jordan 1 Retro High",
      price: 100,
      originalPrice: 100,
      images: [
        "/air-jordan-1-retro-high-sneakers.jpg",
        "/air-jordan-1-retro-high-sneakers.jpg",
        "/air-jordan-1-retro-high-sneakers.jpg",
      ],
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
        Closure: "Lace-up",
        "Style Code": "555088-061",
      },
    },
    {
      id: 2,
      name: "Nike Dunk Low",
      nameAr: "نايك دانك لو",
      nameFr: "Nike Dunk Low",
      price: 100,
      originalPrice: null,
      images: ["/nike-dunk-low-sneakers.jpg", "/nike-dunk-low-sneakers.jpg", "/nike-dunk-low-sneakers.jpg"],
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
        Closure: "Lace-up",
        "Style Code": "DD1391-100",
      },
    },
    {
      id: 3,
      name: "Men's Running Shoes",
      nameAr: "أحذية جري رجالية",
      nameFr: "Chaussures de course homme",
      price: 100,
      originalPrice: null,
      images: ["/mens-running-shoes.jpg", "/mens-running-shoes.jpg", "/mens-running-shoes.jpg"],
      category: "mens-shoes",
      brand: "Nike",
      rating: 4.7,
      reviews: 156,
      sizes: [40, 41, 42, 43, 44, 45],
      colors: ["Black", "Navy", "Gray"],
      isNew: true,
      isSale: false,
      description: "High-performance running shoes designed for comfort and speed.",
      descriptionAr: "أحذية جري عالية الأداء مصممة للراحة والسرعة.",
      descriptionFr: "Chaussures de course haute performance conçues pour le confort et la vitesse.",
      specifications: {
        "Upper Material": "Mesh and Synthetic",
        "Sole Material": "EVA Foam",
        Closure: "Lace-up",
        "Style Code": "RUN-001",
      },
    },
    {
      id: 4,
      name: "Men's Basketball Shoes",
      nameAr: "أحذية كرة سلة رجالية",
      nameFr: "Chaussures de basket homme",
      price: 100,
      originalPrice: 100,
      images: ["/mens-basketball-shoes.jpg", "/mens-basketball-shoes.jpg", "/mens-basketball-shoes.jpg"],
      category: "mens-shoes",
      brand: "Adidas",
      rating: 4.8,
      reviews: 203,
      sizes: [40, 41, 42, 43, 44, 45],
      colors: ["Black/White", "Red/Black"],
      isNew: false,
      isSale: true,
      description: "Professional basketball shoes with superior grip and ankle support.",
      descriptionAr: "أحذية كرة سلة احترافية مع قبضة فائقة ودعم الكاحل.",
      descriptionFr: "Chaussures de basket professionnelles avec adhérence supérieure et soutien de la cheville.",
      specifications: {
        "Upper Material": "Synthetic Leather",
        "Sole Material": "Rubber",
        Closure: "Lace-up",
        "Style Code": "BASK-001",
      },
    },
    {
      id: 5,
      name: "Women's Casual Sneakers",
      nameAr: "أحذية رياضية نسائية كاجوال",
      nameFr: "Baskets décontractées femme",
      price: 100,
      originalPrice: null,
      images: ["/womens-casual-sneakers.jpg", "/womens-casual-sneakers.jpg", "/womens-casual-sneakers.jpg"],
      category: "womens-shoes",
      brand: "Adidas",
      rating: 4.6,
      reviews: 142,
      sizes: [36, 37, 38, 39, 40, 41],
      colors: ["White", "Pink", "Gray"],
      isNew: true,
      isSale: false,
      description: "Comfortable casual sneakers perfect for everyday wear.",
      descriptionAr: "أحذية رياضية كاجوال مريحة مثالية للارتداء اليومي.",
      descriptionFr: "Baskets décontractées confortables parfaites pour un usage quotidien.",
      specifications: {
        "Upper Material": "Canvas and Synthetic",
        "Sole Material": "Rubber",
        Closure: "Lace-up",
        "Style Code": "WOM-CAS-001",
      },
    },
    {
      id: 6,
      name: "Women's Fashion Sneakers",
      nameAr: "أحذية رياضية نسائية أنيقة",
      nameFr: "Baskets mode femme",
      price: 100,
      originalPrice: 100,
      images: ["/womens-fashion-sneakers.jpg", "/womens-fashion-sneakers.jpg", "/womens-fashion-sneakers.jpg"],
      category: "womens-shoes",
      brand: "Nike",
      rating: 4.7,
      reviews: 98,
      sizes: [36, 37, 38, 39, 40, 41],
      colors: ["Black", "White", "Beige"],
      isNew: false,
      isSale: true,
      description: "Stylish fashion sneakers that combine comfort with trendy design.",
      descriptionAr: "أحذية رياضية أنيقة تجمع بين الراحة والتصميم العصري.",
      descriptionFr: "Baskets mode élégantes qui allient confort et design tendance.",
      specifications: {
        "Upper Material": "Premium Leather",
        "Sole Material": "Rubber",
        Closure: "Lace-up",
        "Style Code": "WOM-FASH-001",
      },
    },
    {
      id: 7,
      name: "Children's Colorful Sneakers",
      nameAr: "أحذية رياضية ملونة للأطفال",
      nameFr: "Baskets colorées enfant",
      price: 100,
      originalPrice: null,
      images: [
        "/childrens-colorful-sneakers.jpg",
        "/childrens-colorful-sneakers.jpg",
        "/childrens-colorful-sneakers.jpg",
      ],
      category: "childrens-shoes",
      brand: "Nike",
      rating: 4.5,
      reviews: 87,
      sizes: [28, 29, 30, 31, 32, 33, 34, 35],
      colors: ["Blue/Red", "Pink/Purple", "Green/Yellow"],
      isNew: true,
      isSale: false,
      description: "Bright and colorful sneakers designed specifically for active children.",
      descriptionAr: "أحذية رياضية مشرقة وملونة مصممة خصيصاً للأطفال النشطين.",
      descriptionFr: "Baskets lumineuses et colorées conçues spécialement pour les enfants actifs.",
      specifications: {
        "Upper Material": "Synthetic and Mesh",
        "Sole Material": "EVA",
        Closure: "Velcro and Lace",
        "Style Code": "KIDS-COL-001",
      },
    },
    {
      id: 8,
      name: "Children's Sports Shoes",
      nameAr: "أحذية رياضية للأطفال",
      nameFr: "Chaussures de sport enfant",
      price: 100,
      originalPrice: 100,
      images: ["/childrens-sports-shoes.jpg", "/childrens-sports-shoes.jpg", "/childrens-sports-shoes.jpg"],
      category: "childrens-shoes",
      brand: "Adidas",
      rating: 4.4,
      reviews: 65,
      sizes: [28, 29, 30, 31, 32, 33, 34, 35],
      colors: ["Black/White", "Navy/Orange"],
      isNew: false,
      isSale: true,
      description: "Durable sports shoes built for children's active lifestyle.",
      descriptionAr: "أحذية رياضية متينة مصممة لنمط حياة الأطفال النشط.",
      descriptionFr: "Chaussures de sport durables conçues pour le mode de vie actif des enfants.",
      specifications: {
        "Upper Material": "Synthetic Leather",
        "Sole Material": "Rubber",
        Closure: "Velcro",
        "Style Code": "KIDS-SPT-001",
      },
    },
    {
      id: 13,
      name: "Premium Cotton T-Shirt",
      nameAr: "تيشيرت قطني فاخر",
      nameFr: "T-shirt en coton premium",
      price: 100,
      originalPrice: null,
      images: ["/mens-premium-cotton-tshirt.jpg", "/mens-premium-cotton-tshirt.jpg", "/mens-premium-cotton-tshirt.jpg"],
      category: "mens-clothes",
      brand: "Nike",
      rating: 4.6,
      reviews: 145,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "White", "Navy", "Gray"],
      isNew: true,
      isSale: false,
      description: "Premium cotton t-shirt with superior comfort and durability.",
      descriptionAr: "تيشيرت قطني فاخر مع راحة ومتانة فائقة.",
      descriptionFr: "T-shirt en coton premium avec un confort et une durabilité supérieurs.",
      specifications: {
        Material: "100% Premium Cotton",
        Fit: "Regular",
        "Care Instructions": "Machine wash cold",
        "Style Code": "NIKE-CT-001",
      },
    },
    {
      id: 14,
      name: "Classic Denim Jeans",
      nameAr: "جينز دنيم كلاسيكي",
      nameFr: "Jean denim classique",
      price: 100,
      originalPrice: 100,
      images: ["/mens-classic-denim-jeans.jpg", "/mens-classic-denim-jeans.jpg", "/mens-classic-denim-jeans.jpg"],
      category: "mens-clothes",
      brand: "Levi's",
      rating: 4.7,
      reviews: 203,
      sizes: ["30", "32", "34", "36", "38", "40"],
      colors: ["Dark Blue", "Light Blue", "Black"],
      isNew: false,
      isSale: true,
      description: "Classic denim jeans with timeless style and perfect fit.",
      descriptionAr: "جينز دنيم كلاسيكي بأسلوب خالد ومقاس مثالي.",
      descriptionFr: "Jean denim classique avec un style intemporel et une coupe parfaite.",
      specifications: {
        Material: "100% Cotton Denim",
        Fit: "Straight",
        "Care Instructions": "Machine wash cold",
        "Style Code": "LEVI-501-001",
      },
    },
    {
      id: 15,
      name: "Casual Polo Shirt",
      nameAr: "قميص بولو كاجوال",
      nameFr: "Polo décontracté",
      price: 100,
      originalPrice: null,
      images: ["/mens-casual-polo-shirt.jpg", "/mens-casual-polo-shirt.jpg", "/mens-casual-polo-shirt.jpg"],
      category: "mens-clothes",
      brand: "Lacoste",
      rating: 4.5,
      reviews: 98,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Navy", "White", "Red", "Green"],
      isNew: false,
      isSale: false,
      description: "Classic polo shirt perfect for casual and semi-formal occasions.",
      descriptionAr: "قميص بولو كلاسيكي مثالي للمناسبات الكاجوال وشبه الرسمية.",
      descriptionFr: "Polo classique parfait pour les occasions décontractées et semi-formelles.",
      specifications: {
        Material: "100% Cotton Piqué",
        Fit: "Regular",
        "Care Instructions": "Machine wash warm",
        "Style Code": "LACO-POLO-001",
      },
    },
    {
      id: 16,
      name: "Zip-Up Hoodie",
      nameAr: "هودي بسحاب",
      nameFr: "Sweat à capuche zippé",
      price: 100,
      originalPrice: null,
      images: ["/mens-zip-up-hoodie.jpg", "/mens-zip-up-hoodie.jpg", "/mens-zip-up-hoodie.jpg"],
      category: "mens-clothes",
      brand: "Adidas",
      rating: 4.8,
      reviews: 167,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Gray", "Navy", "Burgundy"],
      isNew: true,
      isSale: false,
      description: "Comfortable zip-up hoodie with modern design and premium materials.",
      descriptionAr: "هودي بسحاب مريح بتصميم عصري ومواد فاخرة.",
      descriptionFr: "Sweat à capuche zippé confortable avec un design moderne et des matériaux premium.",
      specifications: {
        Material: "Cotton Blend Fleece",
        Fit: "Regular",
        "Care Instructions": "Machine wash cold",
        "Style Code": "ADIDAS-ZIP-001",
      },
    },
    {
      id: 17,
      name: "Casual Chino Pants",
      nameAr: "بنطلون تشينو كاجوال",
      nameFr: "Pantalon chino décontracté",
      price: 100,
      originalPrice: 100,
      images: ["/mens-casual-chino-pants.jpg", "/mens-casual-chino-pants.jpg", "/mens-casual-chino-pants.jpg"],
      category: "mens-clothes",
      brand: "Tommy Hilfiger",
      rating: 4.4,
      reviews: 134,
      sizes: ["30", "32", "34", "36", "38", "40"],
      colors: ["Khaki", "Navy", "Black", "Olive"],
      isNew: false,
      isSale: true,
      description: "Versatile chino pants suitable for both casual and business casual wear.",
      descriptionAr: "بنطلون تشينو متعدد الاستخدامات مناسب للارتداء الكاجوال والعمل الكاجوال.",
      descriptionFr: "Pantalon chino polyvalent adapté aux tenues décontractées et business casual.",
      specifications: {
        Material: "Cotton Twill",
        Fit: "Slim",
        "Care Instructions": "Machine wash cold",
        "Style Code": "TH-CHINO-001",
      },
    },
    {
      id: 18,
      name: "Bomber Jacket",
      nameAr: "جاكيت بومبر",
      nameFr: "Veste bomber",
      price: 100,
      originalPrice: null,
      images: ["/mens-bomber-jacket.jpg", "/mens-bomber-jacket.jpg", "/mens-bomber-jacket.jpg"],
      category: "mens-clothes",
      brand: "Alpha Industries",
      rating: 4.7,
      reviews: 89,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Olive", "Navy", "Burgundy"],
      isNew: true,
      isSale: false,
      description: "Classic bomber jacket with authentic military-inspired design.",
      descriptionAr: "جاكيت بومبر كلاسيكي بتصميم مستوحى من الطراز العسكري الأصيل.",
      descriptionFr: "Veste bomber classique avec un design authentique d'inspiration militaire.",
      specifications: {
        Material: "Nylon Shell",
        Lining: "Polyester",
        "Care Instructions": "Dry clean only",
        "Style Code": "ALPHA-BOMB-001",
      },
    },
    {
      id: 19,
      name: "Flannel Shirt",
      nameAr: "قميص فلانيل",
      nameFr: "Chemise en flanelle",
      price: 100,
      originalPrice: null,
      images: ["/mens-flannel-shirt.jpg", "/mens-flannel-shirt.jpg", "/mens-flannel-shirt.jpg"],
      category: "mens-clothes",
      brand: "Uniqlo",
      rating: 4.6,
      reviews: 156,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Red/Black", "Blue/White", "Green/Black"],
      isNew: false,
      isSale: false,
      description: "Soft flannel shirt perfect for layering and casual wear.",
      descriptionAr: "قميص فلانيل ناعم مثالي للطبقات والارتداء الكاجوال.",
      descriptionFr: "Chemise en flanelle douce parfaite pour les superpositions et le port décontracté.",
      specifications: {
        Material: "100% Cotton Flannel",
        Fit: "Regular",
        "Care Instructions": "Machine wash warm",
        "Style Code": "UNIQLO-FLAN-001",
      },
    },
    {
      id: 20,
      name: "Track Pants",
      nameAr: "بنطلون رياضي",
      nameFr: "Pantalon de survêtement",
      price: 100,
      originalPrice: 100,
      images: ["/mens-track-pants.jpg", "/mens-track-pants.jpg", "/mens-track-pants.jpg"],
      category: "mens-clothes",
      brand: "Nike",
      rating: 4.5,
      reviews: 112,
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Navy", "Gray", "Dark Green"],
      isNew: false,
      isSale: true,
      description: "Comfortable track pants ideal for sports and casual wear.",
      descriptionAr: "بنطلون رياضي مريح مثالي للرياضة والارتداء الكاجوال.",
      descriptionFr: "Pantalon de survêtement confortable idéal pour le sport et le port décontracté.",
      specifications: {
        Material: "Polyester Blend",
        Fit: "Athletic",
        "Care Instructions": "Machine wash cold",
        "Style Code": "NIKE-TRACK-001",
      },
    },
    {
      id: 21,
      name: "Adidas Yeezy Boost 350",
      nameAr: "أديداس يزي بوست 350",
      nameFr: "Adidas Yeezy Boost 350",
      price: 100,
      originalPrice: null,
      images: [
        "/adidas-yeezy-boost-350-sneakers.jpg",
        "/adidas-yeezy-boost-350-sneakers.jpg",
        "/adidas-yeezy-boost-350-sneakers.jpg",
      ],
      category: "sneakers",
      brand: "Adidas",
      rating: 4.9,
      reviews: 203,
      sizes: [40, 41, 42, 43, 44],
      colors: ["Cream White", "Core Black"],
      isNew: true,
      isSale: false,
      description: "The Yeezy Boost 350 V2 features an upper composed of re-engineered Primeknit.",
      descriptionAr: "يزي بوست 350 في 2 يتميز بجزء علوي مكون من برايم نيت المعاد هندسته.",
      descriptionFr: "La Yeezy Boost 350 V2 présente une tige composée de Primeknit réingénierie.",
      specifications: {
        "Upper Material": "Primeknit",
        "Sole Material": "Boost",
        Closure: "Lace-up",
        "Style Code": "CP9366",
      },
    },
    {
      id: 22,
      name: "Supreme Box Logo Hoodie",
      nameAr: "سوبريم بوكس لوجو هودي",
      nameFr: "Supreme Box Logo Hoodie",
      price: 100,
      originalPrice: null,
      images: [
        "/supreme-box-logo-hoodie-streetwear.jpg",
        "/supreme-box-logo-hoodie-streetwear.jpg",
        "/supreme-box-logo-hoodie-streetwear.jpg",
      ],
      category: "streetwear",
      brand: "Supreme",
      rating: 4.7,
      reviews: 156,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Red", "Navy"],
      isNew: true,
      isSale: false,
      description: "Classic Supreme Box Logo hoodie made from premium cotton fleece.",
      descriptionAr: "هودي سوبريم بوكس لوجو كلاسيكي مصنوع من صوف القطن الممتاز.",
      descriptionFr: "Sweat à capuche classique Supreme Box Logo en molleton de coton premium.",
      specifications: {
        Material: "Cotton Fleece",
        Fit: "Regular",
        Closure: "Pullover",
        "Style Code": "FW23-001",
      },
    },
    {
      id: 23,
      name: "Off-White Industrial Belt",
      nameAr: "أوف وايت حزام صناعي",
      nameFr: "Ceinture industrielle Off-White",
      price: 100,
      originalPrice: 100,
      images: [
        "/off-white-industrial-belt-accessory.jpg",
        "/off-white-industrial-belt-accessory.jpg",
        "/off-white-industrial-belt-accessory.jpg",
      ],
      category: "accessories",
      brand: "Off-White",
      rating: 4.5,
      reviews: 78,
      sizes: ["One Size"],
      colors: ["Yellow", "Black"],
      isNew: false,
      isSale: true,
      description: "Iconic Off-White industrial belt with signature branding and design.",
      descriptionAr: "حزام أوف وايت الصناعي الأيقوني مع العلامة التجارية والتصميم المميز.",
      descriptionFr: "Ceinture industrielle emblématique Off-White avec marquage et design signature.",
      specifications: {
        Material: "Polyester Webbing",
        Length: "200cm",
        Width: "3.5cm",
        "Style Code": "OWRB009R21FAB001",
      },
    },
    {
      id: 24,
      name: "Travis Scott x Nike",
      nameAr: "ترافيس سكوت × نايك",
      nameFr: "Travis Scott x Nike",
      price: 100,
      originalPrice: null,
      images: [
        "/travis-scott-nike-collaboration-sneakers.jpg",
        "/travis-scott-nike-collaboration-sneakers.jpg",
        "/travis-scott-nike-collaboration-sneakers.jpg",
      ],
      category: "limited",
      brand: "Nike",
      rating: 4.9,
      reviews: 89,
      sizes: [41, 42, 43, 44],
      colors: ["Brown/Pink"],
      isNew: true,
      isSale: false,
      description: "Limited edition Travis Scott x Nike collaboration with unique design elements.",
      descriptionAr: "إصدار محدود من تعاون ترافيس سكوت × نايك مع عناصر تصميم فريدة.",
      descriptionFr: "Édition limitée de la collaboration Travis Scott x Nike avec des éléments de design uniques.",
      specifications: {
        "Upper Material": "Suede and Leather",
        "Sole Material": "Rubber",
        Closure: "Lace-up",
        "Style Code": "DH7138-201",
      },
    },
  ]

  return products.find((p) => p.id === Number.parseInt(id))
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const { t, language } = useLanguage()
  const { addToCart } = useCart() // Using cart context
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = getProduct(productId)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
      </div>
    )
  }

  const getProductName = () => {
    switch (language) {
      case "ar":
        return product.nameAr
      case "fr":
        return product.nameFr
      default:
        return product.name
    }
  }

  const getProductDescription = () => {
    switch (language) {
      case "ar":
        return product.descriptionAr
      case "fr":
        return product.descriptionFr
      default:
        return product.description
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size")
      return
    }
    if (!selectedColor) {
      toast.error("Please select a color")
      return
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        nameAr: product.nameAr,
        nameFr: product.nameFr,
        price: product.price,
        image: product.images[0],
        size: selectedSize.toString(),
        color: selectedColor,
        brand: product.brand,
      })
    }

    toast.success(`${getProductName()} added to cart!`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-accent/10">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={getProductName()}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${getProductName()} ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.isNew && (
                <Badge variant="secondary" className="bg-green-500 text-white">
                  New
                </Badge>
              )}
              {product.isSale && <Badge variant="destructive">Sale</Badge>}
            </div>

            <h1 className="text-3xl font-bold mb-2">{getProductName()}</h1>
            <p className="text-lg text-muted-foreground mb-4">{product.brand}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">
                {product.price} {t("currency")}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.originalPrice} {t("currency")}
                </span>
              )}
              {product.isSale && (
                <Badge variant="destructive">
                  Save {product.originalPrice! - product.price} {t("currency")}
                </Badge>
              )}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-3">{t("size")}</h3>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className="aspect-square"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-3">{t("color")}</h3>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">{t("quantity")}</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full text-sm sm:text-base px-4 sm:px-6"
              onClick={handleAddToCart} // Added click handler
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="truncate">
                {t("addToCart")} - {product.price * quantity} {t("currency")}
              </span>
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 bg-transparent text-xs sm:text-sm px-2 sm:px-4"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                />
                <span className="hidden sm:inline">Wishlist</span>
                <span className="sm:hidden">♡</span>
              </Button>
              <Button variant="outline" size="lg" className="text-xs sm:text-sm px-2 sm:px-4 bg-transparent">
                <Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Share</span>
                <span className="sm:hidden">↗</span>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">Orders over 500 DH</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Authentic</p>
              <p className="text-xs text-muted-foreground">100% Genuine</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Easy Returns</p>
              <p className="text-xs text-muted-foreground">30 days return</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">{t("description")}</TabsTrigger>
            <TabsTrigger value="specifications">{t("specifications")}</TabsTrigger>
            <TabsTrigger value="reviews">{t("reviews")}</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{getProductDescription()}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b last:border-b-0">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Reviews coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
