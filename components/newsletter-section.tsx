"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift, Truck, Percent } from "lucide-react"

export function NewsletterSection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubscribed(true)
    setEmail("")
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const benefits = [
    {
      icon: Percent,
      title: "Exclusive Discounts",
      titleAr: "خصومات حصرية",
      titleFr: "Remises exclusives",
      description: "Get up to 30% off on new arrivals",
      descriptionAr: "احصل على خصم يصل إلى 30% على الوافدات الجديدة",
      descriptionFr: "Obtenez jusqu'à 30% de réduction sur les nouveautés",
    },
    {
      icon: Gift,
      title: "Early Access",
      titleAr: "وصول مبكر",
      titleFr: "Accès anticipé",
      description: "Be the first to shop limited editions",
      descriptionAr: "كن أول من يتسوق الإصدارات المحدودة",
      descriptionFr: "Soyez le premier à acheter les éditions limitées",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      titleAr: "شحن مجاني",
      titleFr: "Livraison gratuite",
      description: "Free delivery on all newsletter orders",
      descriptionAr: "توصيل مجاني على جميع طلبات المشتركين",
      descriptionFr: "Livraison gratuite sur toutes les commandes",
    },
  ]

  const getBenefitTitle = (benefit: (typeof benefits)[0]) => {
    switch (
      t("home") // Using t() to get current language
    ) {
      case "الرئيسية":
        return benefit.titleAr
      case "Accueil":
        return benefit.titleFr
      default:
        return benefit.title
    }
  }

  const getBenefitDescription = (benefit: (typeof benefits)[0]) => {
    switch (t("home")) {
      case "الرئيسية":
        return benefit.descriptionAr
      case "Accueil":
        return benefit.descriptionFr
      default:
        return benefit.description
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-8 w-8" />
                <h2 className="text-3xl lg:text-4xl font-bold">{t("newsletter")}</h2>
              </div>
              <p className="text-xl text-primary-foreground/80">
                Stay updated with the latest drops, exclusive offers, and streetwear trends
              </p>
            </div>

            {/* Newsletter Form */}
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                {isSubscribed ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white text-xl">✓</span>
                    </div>
                    <p className="text-primary-foreground font-semibold">
                      {t("success")}! Welcome to House of Kickz family
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-3">
                      <Input
                        type="email"
                        placeholder={t("enterEmail")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60"
                      />
                      <Button type="submit" variant="secondary" className="px-8">
                        {t("subscribe")}
                      </Button>
                    </div>
                    <p className="text-sm text-primary-foreground/60">
                      By subscribing, you agree to our privacy policy and terms of service
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{getBenefitTitle(benefit)}</h3>
                  <p className="text-primary-foreground/80">{getBenefitDescription(benefit)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
