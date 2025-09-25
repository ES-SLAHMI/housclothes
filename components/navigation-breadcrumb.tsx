"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"

interface NavigationBreadcrumbProps {
  items?: { label: string; href?: string }[]
}

export function NavigationBreadcrumb({ items }: NavigationBreadcrumbProps) {
  const pathname = usePathname()
  const { t, isRTL } = useLanguage()

  // Generate breadcrumb items from pathname if not provided
  const breadcrumbItems = items || generateBreadcrumbItems(pathname, t)

  if (breadcrumbItems.length <= 1) return null

  return (
    <div className="container mx-auto px-4 py-4 border-b">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              {item.href && index < breadcrumbItems.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
              {index < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                </BreadcrumbSeparator>
              )}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

function generateBreadcrumbItems(pathname: string, t: (key: string) => string): { label: string; href?: string }[] {
  const segments = pathname.split("/").filter(Boolean)
  const items: { label: string; href?: string }[] = [{ label: t("home"), href: "/" }]

  let currentPath = ""
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1

    // Map common segments to translations
    const segmentTranslations: Record<string, string> = {
      products: t("products"),
      about: t("about"),
      contact: t("contact"),
      faq: t("faq"),
      checkout: t("checkout"),
    }

    items.push({
      label: segmentTranslations[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: isLast ? undefined : currentPath,
    })
  })

  return items
}
