"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, Truck, CreditCard, RotateCcw, Shield } from "lucide-react"
import { useState } from "react"

const faqCategories = [
  {
    id: "shipping",
    name: "Shipping & Delivery",
    nameAr: "الشحن والتوصيل",
    nameFr: "Livraison",
    icon: Truck,
    color: "bg-blue-500",
  },
  {
    id: "payment",
    name: "Payment & Pricing",
    nameAr: "الدفع والأسعار",
    nameFr: "Paiement",
    icon: CreditCard,
    color: "bg-green-500",
  },
  {
    id: "returns",
    name: "Returns & Exchanges",
    nameAr: "الإرجاع والاستبدال",
    nameFr: "Retours",
    icon: RotateCcw,
    color: "bg-orange-500",
  },
  {
    id: "authenticity",
    name: "Authenticity & Quality",
    nameAr: "الأصالة والجودة",
    nameFr: "Authenticité",
    icon: Shield,
    color: "bg-purple-500",
  },
]

const faqs = [
  {
    id: 1,
    category: "shipping",
    question: "How long does shipping take within Morocco?",
    questionAr: "كم من الوقت يستغرق الشحن داخل المغرب؟",
    questionFr: "Combien de temps prend la livraison au Maroc?",
    answer:
      "We offer fast shipping across Morocco. Orders are typically delivered within 2-4 business days for major cities (Casablanca, Rabat, Marrakech) and 3-7 business days for other locations.",
    answerAr:
      "نقدم شحن سريع في جميع أنحاء المغرب. عادة ما يتم تسليم الطلبات خلال 2-4 أيام عمل للمدن الكبرى (الدار البيضاء، الرباط، مراكش) و 3-7 أيام عمل للمواقع الأخرى.",
    answerFr:
      "Nous offrons une livraison rapide à travers le Maroc. Les commandes sont généralement livrées dans les 2-4 jours ouvrables pour les grandes villes (Casablanca, Rabat, Marrakech) et 3-7 jours ouvrables pour les autres endroits.",
  },
  {
    id: 2,
    category: "shipping",
    question: "Do you offer free shipping?",
    questionAr: "هل تقدمون شحن مجاني؟",
    questionFr: "Offrez-vous la livraison gratuite?",
    answer: "Yes! We offer free shipping on all orders over 500 MAD. For orders under 500 MAD, shipping costs 50 MAD.",
    answerAr:
      "نعم! نقدم شحن مجاني على جميع الطلبات التي تزيد عن 500 درهم. للطلبات أقل من 500 درهم، تكلفة الشحن 50 درهم.",
    answerFr:
      "Oui! Nous offrons la livraison gratuite sur toutes les commandes de plus de 500 MAD. Pour les commandes inférieures à 500 MAD, les frais de livraison sont de 50 MAD.",
  },
  {
    id: 3,
    category: "payment",
    question: "What payment methods do you accept?",
    questionAr: "ما هي طرق الدفع التي تقبلونها؟",
    questionFr: "Quels modes de paiement acceptez-vous?",
    answer:
      "We accept various payment methods including credit/debit cards (Visa, Mastercard), cash on delivery, and bank transfers from major Moroccan banks (CIH, Attijariwafa, BMCE, Banque Populaire).",
    answerAr:
      "نقبل طرق دفع مختلفة بما في ذلك بطاقات الائتمان/الخصم (فيزا، ماستركارد)، الدفع عند التسليم، والتحويلات المصرفية من البنوك المغربية الكبرى (CIH، التجاري وفا، BMCE، البنك الشعبي).",
    answerFr:
      "Nous acceptons divers modes de paiement incluant les cartes de crédit/débit (Visa, Mastercard), le paiement à la livraison, et les virements bancaires des principales banques marocaines (CIH, Attijariwafa, BMCE, Banque Populaire).",
  },
  {
    id: 4,
    category: "payment",
    question: "Are your prices in Moroccan Dirhams?",
    questionAr: "هل أسعاركم بالدرهم المغربي؟",
    questionFr: "Vos prix sont-ils en dirhams marocains?",
    answer:
      "Yes, all our prices are displayed in Moroccan Dirhams (MAD). We don't charge any additional conversion fees.",
    answerAr: "نعم، جميع أسعارنا معروضة بالدرهم المغربي. لا نفرض أي رسوم تحويل إضافية.",
    answerFr:
      "Oui, tous nos prix sont affichés en dirhams marocains (MAD). Nous ne facturons aucun frais de conversion supplémentaire.",
  },
  {
    id: 5,
    category: "returns",
    question: "What is your return policy?",
    questionAr: "ما هي سياسة الإرجاع الخاصة بكم؟",
    questionFr: "Quelle est votre politique de retour?",
    answer:
      "We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are free for defective items, while customer returns have a 50 MAD processing fee.",
    answerAr:
      "نقدم سياسة إرجاع لمدة 30 يومًا للعناصر غير المستعملة في حالتها الأصلية مع العلامات المرفقة. الإرجاع مجاني للعناصر المعيبة، بينما إرجاع العملاء له رسوم معالجة 50 درهم.",
    answerFr:
      "Nous offrons une politique de retour de 30 jours pour les articles non portés dans leur état d'origine avec les étiquettes attachées. Les retours sont gratuits pour les articles défectueux, tandis que les retours clients ont des frais de traitement de 50 MAD.",
  },
  {
    id: 6,
    category: "returns",
    question: "How do I exchange for a different size?",
    questionAr: "كيف يمكنني الاستبدال بمقاس مختلف؟",
    questionFr: "Comment échanger pour une taille différente?",
    answer:
      "Size exchanges are free within 14 days of purchase. Contact our customer service team, and we'll arrange pickup of the original item and delivery of the new size.",
    answerAr:
      "استبدال المقاسات مجاني خلال 14 يومًا من الشراء. اتصل بفريق خدمة العملاء، وسنرتب استلام العنصر الأصلي وتسليم المقاس الجديد.",
    answerFr:
      "Les échanges de taille sont gratuits dans les 14 jours suivant l'achat. Contactez notre équipe de service client, et nous organiserons la collecte de l'article original et la livraison de la nouvelle taille.",
  },
  {
    id: 7,
    category: "authenticity",
    question: "How do I know the products are authentic?",
    questionAr: "كيف أعرف أن المنتجات أصلية؟",
    questionFr: "Comment savoir si les produits sont authentiques?",
    answer:
      "All our products are 100% authentic and sourced directly from authorized distributors. Each item comes with authenticity verification and original packaging. We also provide a certificate of authenticity upon request.",
    answerAr:
      "جميع منتجاتنا أصلية 100% ومصدرها مباشرة من الموزعين المعتمدين. كل عنصر يأتي مع التحقق من الأصالة والتغليف الأصلي. نقدم أيضًا شهادة أصالة عند الطلب.",
    answerFr:
      "Tous nos produits sont 100% authentiques et proviennent directement de distributeurs autorisés. Chaque article est livré avec vérification d'authenticité et emballage d'origine. Nous fournissons également un certificat d'authenticité sur demande.",
  },
  {
    id: 8,
    category: "authenticity",
    question: "Do you offer warranty on your products?",
    questionAr: "هل تقدمون ضمان على منتجاتكم؟",
    questionFr: "Offrez-vous une garantie sur vos produits?",
    answer:
      "Yes, we offer a 6-month warranty against manufacturing defects for all footwear and a 3-month warranty for apparel and accessories. This covers material and workmanship issues but not normal wear and tear.",
    answerAr:
      "نعم، نقدم ضمان 6 أشهر ضد عيوب التصنيع لجميع الأحذية وضمان 3 أشهر للملابس والإكسسوارات. هذا يغطي مشاكل المواد والصناعة ولكن ليس التآكل العادي.",
    answerFr:
      "Oui, nous offrons une garantie de 6 mois contre les défauts de fabrication pour toutes les chaussures et une garantie de 3 mois pour les vêtements et accessoires. Cela couvre les problèmes de matériaux et de fabrication mais pas l'usure normale.",
  },
]

export function FAQSection() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getQuestion = (faq: (typeof faqs)[0]) => {
    switch (language) {
      case "ar":
        return faq.questionAr
      case "fr":
        return faq.questionFr
      default:
        return faq.question
    }
  }

  const getAnswer = (faq: (typeof faqs)[0]) => {
    switch (language) {
      case "ar":
        return faq.answerAr
      case "fr":
        return faq.answerFr
      default:
        return faq.answer
    }
  }

  const getCategoryName = (category: (typeof faqCategories)[0]) => {
    switch (language) {
      case "ar":
        return category.nameAr
      case "fr":
        return category.nameFr
      default:
        return category.name
    }
  }

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      getQuestion(faq).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getAnswer(faq).toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{t("frequentlyAskedQuestions")}</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Find answers to common questions about our products, shipping, returns, and more
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6 sm:mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="bg-transparent text-xs sm:text-sm"
          size="sm"
        >
          All Categories
        </Button>
        {faqCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
            size="sm"
          >
            <category.icon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{getCategoryName(category)}</span>
            <span className="sm:hidden">{getCategoryName(category).split(" ")[0]}</span>
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Category Cards */}
        <div className="lg:col-span-1 order-last lg:order-first">
          <h3 className="font-semibold mb-4 text-center lg:text-left">Browse by Category</h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {faqCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === category.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${category.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <category.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-xs sm:text-sm line-clamp-2">{getCategoryName(category)}</h4>
                      <p className="text-xs text-muted-foreground">
                        {faqs.filter((faq) => faq.category === category.id).length} questions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="lg:col-span-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base sm:text-lg text-muted-foreground mb-4">No FAQs found matching your search</p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {filteredFaqs.map((faq) => {
                const category = faqCategories.find((cat) => cat.id === faq.category)
                return (
                  <AccordionItem key={faq.id} value={faq.id.toString()} className="border rounded-lg px-4 sm:px-6">
                    <AccordionTrigger className="text-left hover:no-underline py-4 sm:py-6">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 w-full">
                        {category && (
                          <Badge
                            variant="secondary"
                            className={`${category.color} text-white flex-shrink-0 self-start text-xs`}
                          >
                            <category.icon className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">{getCategoryName(category)}</span>
                            <span className="sm:hidden">{getCategoryName(category).split(" ")[0]}</span>
                          </Badge>
                        )}
                        <span className="font-medium text-sm sm:text-base text-left">{getQuestion(faq)}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 sm:pb-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {getAnswer(faq)}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          )}
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-12 sm:mt-16 text-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 sm:p-8">
            <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold text-base sm:text-lg mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
              Can't find what you're looking for? Our customer support team is here to help.
            </p>
            <div className="space-y-3">
              <Button className="w-full text-sm sm:text-base">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with Support
              </Button>
              <Button variant="outline" className="w-full bg-transparent text-sm sm:text-base">
                Email: support@houseofkickz.ma
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
