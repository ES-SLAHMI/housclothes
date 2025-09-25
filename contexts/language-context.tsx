"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type Language, type translations, getTranslation, isRTL } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.en) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("ar") // Default to Arabic

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["ar", "fr", "en"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem("language", language)

    // Update document direction and lang attribute
    document.documentElement.dir = isRTL(language) ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const t = (key: keyof typeof translations.en): string => {
    return getTranslation(language, key)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isRTL: isRTL(language),
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
