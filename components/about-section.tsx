"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Users, Shield, Truck, Award, MapPin } from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    titleAr: "الأصالة مضمونة",
    titleFr: "Authenticité garantie",
    description: "Every product is 100% authentic, sourced directly from authorized distributors",
    descriptionAr: "كل منتج أصلي 100%، مصدره مباشرة من الموزعين المعتمدين",
    descriptionFr: "Chaque produit est 100% authentique, provenant directement de distributeurs autorisés",
  },
  {
    icon: Heart,
    title: "Passion for Sneakers",
    titleAr: "شغف بالأحذية الرياضية",
    titleFr: "Passion pour les sneakers",
    description: "We're sneaker enthusiasts who understand the culture and community",
    descriptionAr: "نحن عشاق الأحذية الرياضية الذين يفهمون الثقافة والمجتمع",
    descriptionFr: "Nous sommes des passionnés de sneakers qui comprennent la culture et la communauté",
  },
  {
    icon: Users,
    title: "Community First",
    titleAr: "المجتمع أولاً",
    titleFr: "La communauté d'abord",
    description: "Building Morocco's premier streetwear and sneaker community",
    descriptionAr: "بناء مجتمع الأزياء الشبابية والأحذية الرياضية الأول في المغرب",
    descriptionFr: "Construire la première communauté streetwear et sneakers du Maroc",
  },
  {
    icon: Truck,
    title: "Fast & Reliable",
    titleAr: "سريع وموثوق",
    titleFr: "Rapide et fiable",
    description: "Quick delivery across Morocco with careful handling of every order",
    descriptionAr: "توصيل سريع في جميع أنحاء المغرب مع التعامل الحذر مع كل طلب",
    descriptionFr: "Livraison rapide à travers le Maroc avec un soin particulier pour chaque commande",
  },
]

const stats = [
  { number: "10,000+", label: "Happy Customers", labelAr: "عميل سعيد", labelFr: "Clients satisfaits" },
  { number: "500+", label: "Products", labelAr: "منتج", labelFr: "Produits" },
  { number: "50+", label: "Brands", labelAr: "علامة تجارية", labelFr: "Marques" },
  { number: "12", label: "Cities Served", labelAr: "مدينة نخدمها", labelFr: "Villes desservies" },
]

export function AboutSection() {
  const { language } = useLanguage()

  const getValueTitle = (value: (typeof values)[0]) => {
    switch (language) {
      case "ar":
        return value.titleAr
      case "fr":
        return value.titleFr
      default:
        return value.title
    }
  }

  const getValueDescription = (value: (typeof values)[0]) => {
    switch (language) {
      case "ar":
        return value.descriptionAr
      case "fr":
        return value.descriptionFr
      default:
        return value.description
    }
  }

  const getStatLabel = (stat: (typeof stats)[0]) => {
    switch (language) {
      case "ar":
        return stat.labelAr
      case "fr":
        return stat.labelFr
      default:
        return stat.label
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">
          About House of Kickz
        </Badge>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
          Morocco's Premier Destination for Authentic Sneakers & Streetwear
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          Founded with a passion for sneaker culture and streetwear fashion, House of Kickz Morocco brings you the
          latest and greatest from the world's most coveted brands, right here in Morocco.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.number}</div>
            <div className="text-muted-foreground">{getStatLabel(stat)}</div>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              House of Kickz Morocco was born from a simple observation: Morocco's sneaker and streetwear enthusiasts
              deserved better access to authentic, premium products without the hassle of international shipping or
              concerns about authenticity.
            </p>
            <p>
              What started as a small operation in Casablanca has grown into Morocco's most trusted destination for
              sneaker culture. We've built relationships with authorized distributors worldwide to ensure every product
              that reaches our customers is 100% authentic.
            </p>
            <p>
              Today, we serve customers across Morocco, from the bustling streets of Casablanca to the historic medinas
              of Marrakech, bringing the global sneaker culture to the heart of North Africa.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/products">Explore Our Collection</Link>
          </Button>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/20">
            <img
              src="/house-of-kickz-morocco-store-interior.jpg"
              alt="House of Kickz Morocco Store"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-semibold text-sm">Casablanca, Morocco</p>
                <p className="text-xs text-muted-foreground">Our Flagship Store</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do at House of Kickz Morocco
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{getValueTitle(value)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{getValueDescription(value)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-12 text-center">
          <Award className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto text-pretty">
            To democratize access to authentic sneakers and streetwear in Morocco, building a community where passion
            for style meets uncompromising quality and service.
          </p>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Ready to Join the Community?</h2>
        <p className="text-muted-foreground mb-8">Have questions or want to learn more about House of Kickz Morocco?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="bg-transparent">
            <Link href="/faq">View FAQ</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
