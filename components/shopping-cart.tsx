"use client"

import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ShoppingCart() {
  const { t, language } = useLanguage()
  const { items, updateQuantity, removeFromCart } = useCart() // Using cart context instead of local state

  const getItemName = (item: any) => {
    switch (language) {
      case "ar":
        return item.nameAr
      case "fr":
        return item.nameFr
      default:
        return item.name
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to get started</p>
          <Button asChild size="lg">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("cart")}</h1>
        <p className="text-muted-foreground">{items.length} items in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item.id}-${item.size}-${item.color}`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={getItemName(item)}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{getItemName(item)}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                          <span>
                            {t("size")}: {item.size}
                          </span>
                          <span>
                            {t("color")}: {item.color}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id, item.size, item.color)} // Using cart context method
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} // Using cart context method
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} // Using cart context method
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-lg">
                          {item.price * item.quantity} {t("currency")}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-muted-foreground">
                            {item.price} {t("currency")} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{t("subtotal")}</span>
                <span>
                  {subtotal} {t("currency")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>{t("shipping")}</span>
                <span>
                  {shipping === 0 ? (
                    <Badge variant="secondary" className="bg-green-500 text-white">
                      Free
                    </Badge>
                  ) : (
                    `${shipping} ${t("currency")}`
                  )}
                </span>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-muted-foreground">
                  Add {500 - subtotal} {t("currency")} more for free shipping
                </p>
              )}

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>{t("total")}</span>
                <span>
                  {total} {t("currency")}
                </span>
              </div>

              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">
                  {t("proceedToPayment")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
