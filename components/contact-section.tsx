"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Store",
    titleAr: "زر متجرنا",
    titleFr: "Visitez notre magasin",
    details: "123 Mohammed V Boulevard, Casablanca 20000, Morocco",
    detailsAr: "123 شارع محمد الخامس، الدار البيضاء 20000، المغرب",
    detailsFr: "123 Boulevard Mohammed V, Casablanca 20000, Maroc",
  },
  {
    icon: Phone,
    title: "Call Us",
    titleAr: "اتصل بنا",
    titleFr: "Appelez-nous",
    details: "+212 6 12 34 56 78",
    detailsAr: "+212 6 12 34 56 78",
    detailsFr: "+212 6 12 34 56 78",
  },
  {
    icon: Mail,
    title: "Email Us",
    titleAr: "راسلنا",
    titleFr: "Écrivez-nous",
    details: "info@houseofkickz.ma",
    detailsAr: "info@houseofkickz.ma",
    detailsFr: "info@houseofkickz.ma",
  },
  {
    icon: Clock,
    title: "Store Hours",
    titleAr: "ساعات العمل",
    titleFr: "Heures d'ouverture",
    details: "Mon-Sat: 10AM-10PM, Sun: 2PM-9PM",
    detailsAr: "الإثنين-السبت: 10ص-10م، الأحد: 2م-9م",
    detailsFr: "Lun-Sam: 10h-22h, Dim: 14h-21h",
  },
]

const inquiryTypes = [
  { value: "general", label: "General Inquiry", labelAr: "استفسار عام", labelFr: "Demande générale" },
  { value: "product", label: "Product Question", labelAr: "سؤال عن المنتج", labelFr: "Question produit" },
  { value: "order", label: "Order Status", labelAr: "حالة الطلب", labelFr: "Statut commande" },
  { value: "return", label: "Return/Exchange", labelAr: "إرجاع/استبدال", labelFr: "Retour/Échange" },
  { value: "partnership", label: "Partnership", labelAr: "شراكة", labelFr: "Partenariat" },
]

export function ContactSection() {
  const { language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const getContactTitle = (contact: (typeof contactInfo)[0]) => {
    switch (language) {
      case "ar":
        return contact.titleAr
      case "fr":
        return contact.titleFr
      default:
        return contact.title
    }
  }

  const getContactDetails = (contact: (typeof contactInfo)[0]) => {
    switch (language) {
      case "ar":
        return contact.detailsAr
      case "fr":
        return contact.detailsFr
      default:
        return contact.details
    }
  }

  const getInquiryLabel = (inquiry: (typeof inquiryTypes)[0]) => {
    switch (language) {
      case "ar":
        return inquiry.labelAr
      case "fr":
        return inquiry.labelFr
      default:
        return inquiry.label
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about our products or need assistance? We're here to help you find the perfect kicks and gear.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <contact.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{getContactTitle(contact)}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{getContactDetails(contact)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Chat
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+212 6XX XXX XXX" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="inquiryType">Inquiry Type *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {getInquiryLabel(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" required />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      required
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Find Our Store</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-[16/9] bg-muted rounded-b-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Interactive map would be integrated here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  123 Mohammed V Boulevard, Casablanca 20000, Morocco
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
