import { Header } from "@/components/header"
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumb"
import { ShoppingCart } from "@/components/shopping-cart"
import { Footer } from "@/components/footer"
import { WhatsAppChat } from "@/components/whatsapp-chat"

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <NavigationBreadcrumb />
      <main>
        <ShoppingCart />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  )
}
