"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    customer: [
      { name: "FAQ", href: "/faq" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Size Guide", href: "/size-guide" },
    ],
    categories: [
      { name: "Sneakers", href: "/products?category=sneakers" },
      { name: "Streetwear", href: "/products?category=streetwear" },
      { name: "Accessories", href: "/products?category=accessories" },
      { name: "Limited Edition", href: "/products?category=limited" },
    ],
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary-foreground text-primary font-bold text-lg sm:text-xl">
                HK
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">House of Kickz</h3>
                <p className="text-xs sm:text-sm text-primary-foreground/80">Morocco</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your premier destination for authentic sneakers and streetwear in Morocco. Quality, style, and
              authenticity guaranteed.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Casablanca, Morocco</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+212 6 12 34 56 78</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@houseofkickz.ma</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {footerLinks.customer.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-primary-foreground/20 pt-8 sm:pt-12 mb-8 sm:mb-12">
          <div className="max-w-md mx-auto text-center">
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
              />
              <button className="px-6 py-2 bg-primary-foreground text-primary rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-primary-foreground/20 pt-8 sm:pt-12 mb-8 sm:mb-12">
          <div className="text-center">
            <h4 className="font-semibold mb-4">Accepted Payment Methods</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-lg p-2 flex items-center justify-center w-16 h-10">
                <span className="text-xs font-bold text-gray-800">VISA</span>
              </div>
              <div className="bg-white rounded-lg p-2 flex items-center justify-center w-16 h-10">
                <span className="text-xs font-bold text-gray-800">MC</span>
              </div>
              <div className="bg-white rounded-lg p-2 flex items-center justify-center w-16 h-10">
                <span className="text-xs font-bold text-green-600">CIH</span>
              </div>
              <div className="bg-white rounded-lg p-2 flex items-center justify-center w-16 h-10">
                <span className="text-xs font-bold text-red-600">BMCE</span>
              </div>
              <div className="bg-white rounded-lg p-2 flex items-center justify-center w-16 h-10">
                <span className="text-xs font-bold text-blue-600">BMCI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/80">
            <p>&copy; 2025 House of Kickz Morocco. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
