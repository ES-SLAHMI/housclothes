import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/contexts/language-context"
import { CartProvider } from "@/contexts/cart-context"
import { Toaster } from "sonner"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "House of Kickz Morocco - Premium Sneakers & Streetwear",
  description:
    "Discover the latest sneakers and streetwear fashion in Morocco. Authentic brands, premium quality, fast delivery.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <LanguageProvider>
            <CartProvider>
              {children}
              <Toaster position="top-right" />
            </CartProvider>
          </LanguageProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
