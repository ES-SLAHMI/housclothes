"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, Truck, Shield, Headphones } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className={`space-y-6 lg:space-y-8 text-center lg:text-left ${isRTL ? "lg:order-2" : ""}`}>
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit mx-auto lg:mx-0">
                New Collection 2024
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-balance leading-tight">
                {t("heroTitle")}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-lg mx-auto lg:mx-0">
                {t("heroSubtitle")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                <Link href="/products">
                  {t("shopNow")}
                  <ArrowRight className={`ml-2 h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base sm:text-lg px-6 sm:px-8 bg-transparent w-full sm:w-auto"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-4 lg:gap-6 pt-6 lg:pt-8 border-t justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-xs sm:text-sm justify-center lg:justify-start">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm justify-center lg:justify-start">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span>Authentic Products</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm justify-center lg:justify-start">
                <Headphones className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm justify-center lg:justify-start">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current flex-shrink-0" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className={`relative order-first lg:order-none ${isRTL ? "lg:order-1" : ""}`}>
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-[4/5] rounded-xl lg:rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/20">
              <img
                src="/modern-sneakers-collection-hero-image-with-urban-s.jpg"
                alt="House of Kickz Morocco - Premium Sneakers Collection"
                className="object-cover w-full h-full"
              />

              {/* Floating Cards */}
              <div className="absolute top-3 sm:top-6 left-3 sm:left-6 bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Authentic</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">Verified</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg">
                <div className="text-center">
                  <p className="text-base sm:text-lg font-bold text-primary">500+</p>
                  <p className="text-xs text-muted-foreground">Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-20 h-20 sm:w-32 sm:h-32 bg-accent/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
