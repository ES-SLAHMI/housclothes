import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryGrid } from "@/components/category-grid"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { WhatsAppChat } from "@/components/whatsapp-chat"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <NewsletterSection />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  )
}
