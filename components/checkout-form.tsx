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
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Truck, Mail, Lock } from "lucide-react"

const moroccanCities = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tangier",
  "Agadir",
  "Meknes",
  "Oujda",
  "Kenitra",
  "Tetouan",
  "Safi",
  "Mohammedia",
  "Khouribga",
  "Beni Mellal",
  "El Jadida",
]

const mockCartItems = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High",
    price: 100,
    quantity: 1,
    image: "/air-jordan-1-retro-high-sneakers.jpg",
  },
  {
    id: 2,
    name: "Nike Dunk Low",
    price: 100,
    quantity: 2,
    image: "/nike-dunk-low-sneakers.jpg",
  },
]

export function CheckoutForm() {
  const { t } = useLanguage()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, this would handle the actual payment processing
    alert("Order placed successfully! (This is a demo)")
    setIsProcessing(false)
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t("checkout")}</h1>
        <p className="text-muted-foreground">Complete your order</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm">
                      First Name *
                    </Label>
                    <Input id="firstName" required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm">
                      Last Name *
                    </Label>
                    <Input id="lastName" required className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">
                    Email Address *
                  </Label>
                  <Input id="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm">
                    Phone Number *
                  </Label>
                  <Input id="phone" type="tel" placeholder="+212 6XX XXX XXX" required className="mt-1" />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-sm">
                    Street Address *
                  </Label>
                  <Input id="address" required className="mt-1" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm">
                      City *
                    </Label>
                    <Select required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {moroccanCities.map((city) => (
                          <SelectItem key={city} value={city.toLowerCase()}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-sm">
                      Postal Code
                    </Label>
                    <Input id="postalCode" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes" className="text-sm">
                    Delivery Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special delivery instructions..."
                    className="mt-1 resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 sm:p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="text-sm sm:text-base">Credit/Debit Card</span>
                        <div className="flex gap-1 sm:gap-2">
                          <div className="w-8 h-5 sm:w-10 sm:h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            VISA
                          </div>
                          <div className="w-8 h-5 sm:w-10 sm:h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            MC
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 sm:p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer text-sm sm:text-base">
                      Cash on Delivery
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 sm:p-4 border rounded-lg">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer text-sm sm:text-base">
                      Bank Transfer
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 p-3 sm:p-4 bg-accent/5 rounded-lg">
                    <div>
                      <Label htmlFor="cardNumber" className="text-sm">
                        Card Number *
                      </Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-sm">
                          Expiry Date *
                        </Label>
                        <Input id="expiry" placeholder="MM/YY" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-sm">
                          CVV *
                        </Label>
                        <Input id="cvv" placeholder="123" required className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName" className="text-sm">
                        Cardholder Name *
                      </Label>
                      <Input id="cardName" required className="mt-1" />
                    </div>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="p-3 sm:p-4 bg-accent/5 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">Bank Transfer Details</h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <p>
                        <strong>Bank:</strong> Attijariwafa Bank
                      </p>
                      <p>
                        <strong>Account:</strong> 007 780 0001234567890 12
                      </p>
                      <p>
                        <strong>SWIFT:</strong> BCMAMAMC
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Please include your order number in the transfer reference.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-first lg:order-none">
            <Card className="lg:sticky lg:top-8">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {mockCartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs sm:text-sm line-clamp-2">{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs sm:text-sm text-muted-foreground">Qty: {item.quantity}</span>
                          <span className="font-medium text-sm sm:text-base">
                            {item.price * item.quantity} {t("currency")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>{t("subtotal")}</span>
                    <span>
                      {subtotal} {t("currency")}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm sm:text-base">
                    <span>{t("shipping")}</span>
                    <span>
                      {shipping === 0 ? (
                        <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                          Free
                        </Badge>
                      ) : (
                        `${shipping} ${t("currency")}`
                      )}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-base sm:text-lg font-bold">
                    <span>{t("total")}</span>
                    <span>
                      {total} {t("currency")}
                    </span>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required className="mt-0.5" />
                  <Label htmlFor="terms" className="text-xs sm:text-sm leading-relaxed">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>

                {/* Place Order Button */}
                <Button type="submit" size="lg" className="w-full text-sm sm:text-base" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Place Order - {total} {t("currency")}
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your payment information is secure and encrypted
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
