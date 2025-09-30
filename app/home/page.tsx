"use client"

import { useTranslation } from "react-i18next"
import {
  FaWater,
  FaExclamationTriangle,
  FaMapMarkedAlt,
  FaUniversalAccess,
  FaKeyboard,
  FaMobileAlt,
  FaEye,
} from "react-icons/fa"
import Link from "next/link"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-[var(--ocean-blue)] via-[var(--deep-teal)] to-[var(--royal-gold)] bg-clip-text text-transparent">
          {t("homepage_title")}
        </h1>
        <p className="text-lg md:text-2xl mb-4 text-muted-foreground text-balance">{t("homepage_subtitle")}</p>
        <p className="text-sm md:text-lg mb-12 text-muted-foreground max-w-2xl mx-auto text-pretty">
          {t("homepage_about")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          <Link href="/report" className="group">
            <div className="bg-card border-2 border-border rounded-lg p-4 md:p-6 hover:border-[var(--coral)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--coral)]/30 hover:scale-105">
              <FaExclamationTriangle className="text-3xl md:text-4xl text-[var(--coral)] mb-3 md:mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t("report_hazard")}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{t("report_hazard_desc")}</p>
            </div>
          </Link>

          <Link href="/map" className="group">
            <div className="bg-card border-2 border-border rounded-lg p-4 md:p-6 hover:border-[var(--deep-teal)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--deep-teal)]/30 hover:scale-105">
              <FaMapMarkedAlt className="text-3xl md:text-4xl text-[var(--deep-teal)] mb-3 md:mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t("crisis_map")}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{t("crisis_map_desc")}</p>
            </div>
          </Link>

          <Link href="/tutorial" className="group">
            <div className="bg-card border-2 border-border rounded-lg p-4 md:p-6 hover:border-[var(--ocean-blue)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--ocean-blue)]/30 hover:scale-105">
              <FaWater className="text-3xl md:text-4xl text-[var(--ocean-blue)] mb-3 md:mb-4 mx-auto group-hover:scale-110 transition-transform" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">{t("how_to_use")}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{t("how_to_use_desc")}</p>
            </div>
          </Link>
        </div>

        <div className="bg-card/50 border-2 border-primary/20 rounded-lg p-6 md:p-8 mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4">{t("about_platform")}</h2>
          <p className="text-sm md:text-base text-muted-foreground text-pretty leading-relaxed">
            {t("about_platform_desc")}
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/30 rounded-lg p-6 md:p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaUniversalAccess className="text-3xl md:text-4xl text-primary" />
            <h2 className="text-xl md:text-2xl font-bold">{t("accessibility_features")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-3 bg-card/50 p-4 rounded-lg border border-primary/20">
              <FaEye className="text-xl text-primary mt-1 flex-shrink-0" />
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t("accessibility_1")}</p>
            </div>

            <div className="flex items-start gap-3 bg-card/50 p-4 rounded-lg border border-primary/20">
              <FaKeyboard className="text-xl text-primary mt-1 flex-shrink-0" />
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t("accessibility_2")}</p>
            </div>

            <div className="flex items-start gap-3 bg-card/50 p-4 rounded-lg border border-primary/20">
              <FaUniversalAccess className="text-xl text-primary mt-1 flex-shrink-0" />
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t("accessibility_3")}</p>
            </div>

            <div className="flex items-start gap-3 bg-card/50 p-4 rounded-lg border border-primary/20">
              <FaMobileAlt className="text-xl text-primary mt-1 flex-shrink-0" />
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{t("accessibility_4")}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-primary/20">
            <p className="text-xs md:text-sm text-muted-foreground text-center">
              <span className="font-semibold text-primary">Compliant with:</span> WCAG 2.1 Level AA • GIGW (Guidelines
              for Indian Government Websites) • Section 508
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
