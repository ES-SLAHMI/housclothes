import { Header } from "@/components/header"
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumb"
import { CheckoutForm } from "@/components/checkout-form"
import { Footer } from "@/components/footer"
import { WhatsAppChat } from "@/components/whatsapp-chat"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <NavigationBreadcrumb />
      <main>
        <CheckoutForm />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  )
}
