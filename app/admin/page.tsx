import { AdminDashboard } from "@/components/admin-dashboard"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  )
}