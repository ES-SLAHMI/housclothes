import { Header } from "@/components/header"
import { NavigationBreadcrumb } from "@/components/navigation-breadcrumb"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { WhatsAppChat } from "@/components/whatsapp-chat"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <NavigationBreadcrumb />
      <main>
        <AboutSection />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  )
}
