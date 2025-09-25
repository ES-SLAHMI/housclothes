import { Header } from "@/components/header"
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumb"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppChat } from "@/components/whatsapp-chat"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <NavigationBreadcrumb />
      <main>
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  )
}
