import { Header } from "@/components/header"
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumb"
import { ProductCatalog } from "@/components/product-catalog"
import { Footer } from "@/components/footer"
import { WhatsAppChat } from "@/components/whatsapp-chat"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <NavigationBreadcrumb />
      <main>
        <ProductCatalog />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  )
}
