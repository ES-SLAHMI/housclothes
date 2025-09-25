export type Language = "ar" | "fr" | "en"

export interface Translations {
  // Navigation
  home: string
  products: string
  about: string
  contact: string
  faq: string
  cart: string

  // Hero Section
  heroTitle: string
  heroSubtitle: string
  shopNow: string

  // Product Section
  featuredProducts: string
  newArrivals: string
  bestSellers: string
  viewAll: string
  addToCart: string
  quickView: string

  // Product Details
  size: string
  color: string
  quantity: string
  description: string
  specifications: string
  reviews: string

  // Checkout
  checkout: string
  subtotal: string
  shipping: string
  total: string
  proceedToPayment: string

  // Footer
  newsletter: string
  enterEmail: string
  subscribe: string
  followUs: string
  paymentMethods: string

  // FAQ
  frequentlyAskedQuestions: string

  // Common
  search: string
  loading: string
  error: string
  success: string
  currency: string
}

export const translations: Record<Language, Translations> = {
  ar: {
    // Navigation
    home: "الرئيسية",
    products: "المنتجات",
    about: "حولنا",
    contact: "اتصل بنا",
    faq: "الأسئلة الشائعة",
    cart: "السلة",

    // Hero Section
    heroTitle: "بيت الكيكز المغرب",
    heroSubtitle: "اكتشف أحدث الأحذية الرياضية والأزياء الشبابية",
    shopNow: "تسوق الآن",

    // Product Section
    featuredProducts: "المنتجات المميزة",
    newArrivals: "الوافدات الجديدة",
    bestSellers: "الأكثر مبيعاً",
    viewAll: "عرض الكل",
    addToCart: "أضف للسلة",
    quickView: "عرض سريع",

    // Product Details
    size: "المقاس",
    color: "اللون",
    quantity: "الكمية",
    description: "الوصف",
    specifications: "المواصفات",
    reviews: "التقييمات",

    // Checkout
    checkout: "الدفع",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    total: "المجموع",
    proceedToPayment: "متابعة الدفع",

    // Footer
    newsletter: "النشرة الإخبارية",
    enterEmail: "أدخل بريدك الإلكتروني",
    subscribe: "اشترك",
    followUs: "تابعنا",
    paymentMethods: "طرق الدفع",

    // FAQ
    frequentlyAskedQuestions: "الأسئلة الشائعة",

    // Common
    search: "بحث",
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    currency: "درهم",
  },
  fr: {
    // Navigation
    home: "Accueil",
    products: "Produits",
    about: "À propos",
    contact: "Contact",
    faq: "FAQ",
    cart: "Panier",

    // Hero Section
    heroTitle: "House of Kickz Maroc",
    heroSubtitle: "Découvrez les dernières sneakers et mode streetwear",
    shopNow: "Acheter maintenant",

    // Product Section
    featuredProducts: "Produits vedettes",
    newArrivals: "Nouveautés",
    bestSellers: "Meilleures ventes",
    viewAll: "Voir tout",
    addToCart: "Ajouter au panier",
    quickView: "Aperçu rapide",

    // Product Details
    size: "Taille",
    color: "Couleur",
    quantity: "Quantité",
    description: "Description",
    specifications: "Spécifications",
    reviews: "Avis",

    // Checkout
    checkout: "Commander",
    subtotal: "Sous-total",
    shipping: "Livraison",
    total: "Total",
    proceedToPayment: "Procéder au paiement",

    // Footer
    newsletter: "Newsletter",
    enterEmail: "Entrez votre email",
    subscribe: "S'abonner",
    followUs: "Suivez-nous",
    paymentMethods: "Méthodes de paiement",

    // FAQ
    frequentlyAskedQuestions: "Questions fréquemment posées",

    // Common
    search: "Rechercher",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    currency: "DH",
  },
  en: {
    // Navigation
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    faq: "FAQ",
    cart: "Cart",

    // Hero Section
    heroTitle: "House of Kickz Morocco",
    heroSubtitle: "Discover the latest sneakers and streetwear fashion",
    shopNow: "Shop Now",

    // Product Section
    featuredProducts: "Featured Products",
    newArrivals: "New Arrivals",
    bestSellers: "Best Sellers",
    viewAll: "View All",
    addToCart: "Add to Cart",
    quickView: "Quick View",

    // Product Details
    size: "Size",
    color: "Color",
    quantity: "Quantity",
    description: "Description",
    specifications: "Specifications",
    reviews: "Reviews",

    // Checkout
    checkout: "Checkout",
    subtotal: "Subtotal",
    shipping: "Shipping",
    total: "Total",
    proceedToPayment: "Proceed to Payment",

    // Footer
    newsletter: "Newsletter",
    enterEmail: "Enter your email",
    subscribe: "Subscribe",
    followUs: "Follow Us",
    paymentMethods: "Payment Methods",

    // FAQ
    frequentlyAskedQuestions: "Frequently Asked Questions",

    // Common
    search: "Search",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    currency: "MAD",
  },
}

export const getTranslation = (language: Language, key: keyof Translations): string => {
  return translations[language][key] || translations.en[key]
}

export const isRTL = (language: Language): boolean => {
  return language === "ar"
}
