"use client"

import { useTranslation } from "react-i18next"

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="fixed top-20 right-4 z-40 flex space-x-1 bg-card/90 backdrop-blur-sm p-1 rounded-lg border border-border shadow-lg">
      <button
        onClick={() => changeLanguage("en")}
        aria-label="Switch to English"
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
          i18n.language.startsWith("en")
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("hi")}
        aria-label="Switch to Hindi"
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
          i18n.language.startsWith("hi")
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        HI
      </button>
      <button
        onClick={() => changeLanguage("ta")}
        aria-label="Switch to Tamil"
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
          i18n.language.startsWith("ta")
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        TA
      </button>
    </div>
  )
}
