"use client"

import { useTranslation } from "react-i18next"
import { FaMapMarkedAlt, FaExclamationTriangle, FaChartBar, FaLanguage } from "react-icons/fa"

export default function TutorialPage() {
  const { t } = useTranslation()

  return (
    <main className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-center text-balance">{t("tutorial_title")}</h1>
        <p className="text-center text-muted-foreground mb-8 md:mb-12 text-sm md:text-base text-pretty">
          {t("tutorial_subtitle")}
        </p>

        <div className="space-y-6 md:space-y-8">
          <div className="bg-card border-2 border-[var(--coral)]/30 rounded-lg p-4 md:p-6 hover:shadow-lg hover:shadow-[var(--coral)]/20 hover:scale-[1.02] transition-all">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-[var(--coral)]/20 p-2 md:p-3 rounded-lg flex-shrink-0">
                <FaExclamationTriangle className="text-xl md:text-2xl text-[var(--coral)]" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-bold mb-2">{t("tutorial_step1_title")}</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t("tutorial_step1_desc")}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border-2 border-[var(--deep-teal)]/30 rounded-lg p-4 md:p-6 hover:shadow-lg hover:shadow-[var(--deep-teal)]/20 hover:scale-[1.02] transition-all">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-[var(--deep-teal)]/20 p-2 md:p-3 rounded-lg flex-shrink-0">
                <FaMapMarkedAlt className="text-xl md:text-2xl text-[var(--deep-teal)]" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-bold mb-2">{t("tutorial_step2_title")}</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t("tutorial_step2_desc")}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border-2 border-[var(--ocean-blue)]/30 rounded-lg p-4 md:p-6 hover:shadow-lg hover:shadow-[var(--ocean-blue)]/20 hover:scale-[1.02] transition-all">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-[var(--ocean-blue)]/20 p-2 md:p-3 rounded-lg flex-shrink-0">
                <FaChartBar className="text-xl md:text-2xl text-[var(--ocean-blue)]" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-bold mb-2">{t("tutorial_step3_title")}</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t("tutorial_step3_desc")}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border-2 border-[var(--royal-gold)]/30 rounded-lg p-4 md:p-6 hover:shadow-lg hover:shadow-[var(--royal-gold)]/20 hover:scale-[1.02] transition-all">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-[var(--royal-gold)]/20 p-2 md:p-3 rounded-lg flex-shrink-0">
                <FaLanguage className="text-xl md:text-2xl text-[var(--royal-gold)]" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-bold mb-2">{t("tutorial_step4_title")}</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t("tutorial_step4_desc")}</p>
              </div>
            </div>
          </div>

          <div className="bg-accent/20 border-2 border-accent rounded-lg p-4 md:p-6 shadow-lg">
            <h2 className="text-lg md:text-xl font-bold mb-3">{t("accessibility_features")}</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1 flex-shrink-0">•</span>
                <span className="text-sm md:text-base">{t("accessibility_1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1 flex-shrink-0">•</span>
                <span className="text-sm md:text-base">{t("accessibility_2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1 flex-shrink-0">•</span>
                <span className="text-sm md:text-base">{t("accessibility_3")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1 flex-shrink-0">•</span>
                <span className="text-sm md:text-base">{t("accessibility_4")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
