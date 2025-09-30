"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

export default function ReportPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [formData, setFormData] = useState({
    type: "OCEAN_DEBRIS",
    latitude: "",
    longitude: "",
    description: "",
    intensity: "0.5",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(t("report_success"))
    router.push("/map")
  }

  return (
    <main className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-center text-balance">{t("report_title")}</h1>
        <p className="text-center text-muted-foreground mb-6 md:mb-8 text-sm md:text-base text-pretty">
          {t("report_subtitle")}
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-card border-2 border-primary/20 rounded-lg p-4 md:p-8 space-y-4 md:space-y-6 shadow-xl"
        >
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-2">
              {t("hazard_type")} *
            </label>
            <select
              id="type"
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-input border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="OCEAN_DEBRIS">{t("ocean_debris")}</option>
              <option value="TSUNAMI_WARNING">{t("tsunami_warnings")}</option>
              <option value="CYCLONE_WARNING">{t("cyclone_warnings")}</option>
              <option value="FLOOD_ALERT">{t("flood_alerts")}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium mb-2">
                {t("latitude")} *
              </label>
              <input
                id="latitude"
                type="number"
                step="any"
                required
                placeholder="e.g., 13.0827"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-input border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium mb-2">
                {t("longitude")} *
              </label>
              <input
                id="longitude"
                type="number"
                step="any"
                required
                placeholder="e.g., 80.2707"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-input border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="intensity" className="block text-sm font-medium mb-2">
              {t("intensity")}: {formData.intensity}
            </label>
            <input
              id="intensity"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={formData.intensity}
              onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{t("intensity_low")}</span>
              <span>{t("intensity_medium")}</span>
              <span>{t("intensity_high")}</span>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              {t("description")} *
            </label>
            <textarea
              id="description"
              required
              rows={4}
              placeholder={t("description_placeholder")}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-input border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl hover:shadow-primary/30"
          >
            {t("submit_report")}
          </button>
        </form>
      </div>
    </main>
  )
}
