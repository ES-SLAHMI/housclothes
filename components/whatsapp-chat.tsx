"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const whatsappNumber = "+212612345678" // Replace with actual WhatsApp number
  const defaultMessage = "Hello! I'm interested in your products."

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(defaultMessage)}`
    window.open(url, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-lg border p-4 w-80 animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">House of Kickz</h4>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Hi there! How can we help you today?</p>
          <Button onClick={openWhatsApp} className="w-full bg-green-500 hover:bg-green-600 text-white" size="sm">
            Start Chat
          </Button>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}
