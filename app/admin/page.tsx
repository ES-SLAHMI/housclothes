import { Suspense } from "react"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
          <AdminDashboard />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}