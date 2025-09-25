import { Header } from "@/components/header"
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumb"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { Footer } from "@/components/footer"
import { WhatsAppChat } from "@/components/whatsapp-chat"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <NavigationBreadcrumb />
      <main>
        <ProductDetails productId={params.id} />
        <RelatedProducts />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  )
}
