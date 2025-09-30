"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import dynamic from "next/dynamic"
import { reports } from "@/lib/mock-data"

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const CircleMarker = dynamic(() => import("react-leaflet").then((mod) => mod.CircleMarker), { ssr: false })
const Circle = dynamic(() => import("react-leaflet").then((mod) => mod.Circle), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

interface Cluster {
  lat: number
  lng: number
  count: number
  intensity: number
}

export default function MapPage() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("ALL")
  const [showHeatmap, setShowHeatmap] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const allReports = [
    ...reports.OCEAN_DEBRIS,
    ...reports.TSUNAMI_WARNING,
    ...reports.CYCLONE_WARNING,
    ...reports.FLOOD_ALERT,
  ]

  const filteredReports = selectedType === "ALL" ? allReports : allReports.filter((r) => r.type === selectedType)

  const calculateClusters = (reports: typeof allReports): Cluster[] => {
    const clusters: Cluster[] = []
    const clusterRadius = 2 // degrees (roughly 200km)
    const processed = new Set<number>()

    reports.forEach((report, index) => {
      if (processed.has(index)) return

      const nearbyReports = reports.filter((r, i) => {
        if (processed.has(i)) return false
        const distance = Math.sqrt(Math.pow(r.lat - report.lat, 2) + Math.pow(r.lng - report.lng, 2))
        return distance <= clusterRadius
      })

      if (nearbyReports.length >= 2) {
        const avgLat = nearbyReports.reduce((sum, r) => sum + r.lat, 0) / nearbyReports.length
        const avgLng = nearbyReports.reduce((sum, r) => sum + r.lng, 0) / nearbyReports.length
        const avgIntensity = nearbyReports.reduce((sum, r) => sum + r.intensity, 0) / nearbyReports.length

        clusters.push({
          lat: avgLat,
          lng: avgLng,
          count: nearbyReports.length,
          intensity: avgIntensity,
        })

        nearbyReports.forEach((r) => {
          const idx = reports.indexOf(r)
          if (idx !== -1) processed.add(idx)
        })
      }
    })

    return clusters
  }

  const clusters = calculateClusters(filteredReports)

  const getColor = (type: string) => {
    switch (type) {
      case "OCEAN_DEBRIS":
        return "#f59e0b"
      case "TSUNAMI_WARNING":
        return "#ef4444"
      case "CYCLONE_WARNING":
        return "#f97316"
      case "FLOOD_ALERT":
        return "#06b6d4"
      default:
        return "#3b82f6"
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen px-4 py-16 flex items-center justify-center">
        <p className="text-muted-foreground">{t("loading_map")}</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-balance">{t("map_title")}</h1>
        <p className="text-center text-muted-foreground mb-6 text-pretty">{t("map_subtitle")}</p>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {[
            { key: "ALL", label: t("filter_all") },
            { key: "OCEAN_DEBRIS", label: t("ocean_debris") },
            { key: "TSUNAMI_WARNING", label: t("tsunami_warnings") },
            { key: "CYCLONE_WARNING", label: t("cyclone_warnings") },
            { key: "FLOOD_ALERT", label: t("flood_alerts") },
          ].map((type) => (
            <button
              key={type.key}
              onClick={() => setSelectedType(type.key)}
              className={`px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all hover:scale-105 ${
                selectedType === type.key
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card border-2 border-border hover:border-primary hover:bg-accent"
              }`}
            >
              {type.label}
            </button>
          ))}
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all hover:scale-105 ${
              showHeatmap
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-card border-2 border-border hover:border-primary hover:bg-accent"
            }`}
          >
            {showHeatmap ? "Hide Heatmap" : "Show Heatmap"}
          </button>
        </div>

        <div
          className="bg-card border-2 border-primary/30 rounded-lg overflow-hidden shadow-2xl"
          style={{ height: "70vh", minHeight: "500px" }}
        >
          <MapContainer
            center={[13.0827, 80.2707]}
            zoom={5}
            style={{ height: "100%", width: "100%", zIndex: 1 }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {showHeatmap &&
              clusters.map((cluster, idx) => {
                const baseRadius = 50000 * cluster.intensity // meters
                const color = "#ef4444" // red for danger zones

                return (
                  <div key={`cluster-${idx}`}>
                    {/* Outermost circle - most transparent */}
                    <Circle
                      center={[cluster.lat, cluster.lng]}
                      radius={baseRadius * 3}
                      pathOptions={{
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.05,
                        weight: 1,
                        opacity: 0.2,
                      }}
                    />
                    {/* Middle circle */}
                    <Circle
                      center={[cluster.lat, cluster.lng]}
                      radius={baseRadius * 2}
                      pathOptions={{
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.1,
                        weight: 1,
                        opacity: 0.3,
                      }}
                    />
                    {/* Inner circle */}
                    <Circle
                      center={[cluster.lat, cluster.lng]}
                      radius={baseRadius}
                      pathOptions={{
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.15,
                        weight: 2,
                        opacity: 0.4,
                      }}
                    >
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <h3 className="font-bold text-sm mb-1 text-foreground">Common Ground Cluster</h3>
                          <p className="text-xs mb-1 text-foreground">{cluster.count} reports in this area</p>
                          <p className="text-xs font-semibold mt-1 text-foreground">
                            Avg Intensity: {cluster.intensity.toFixed(2)}
                          </p>
                        </div>
                      </Popup>
                    </Circle>
                    {/* Core circle - most opaque */}
                    <Circle
                      center={[cluster.lat, cluster.lng]}
                      radius={baseRadius * 0.5}
                      pathOptions={{
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.25,
                        weight: 2,
                        opacity: 0.6,
                      }}
                    />
                  </div>
                )
              })}

            {filteredReports.map((report) => (
              <CircleMarker
                key={report.id}
                center={[report.lat, report.lng]}
                radius={8 + report.intensity * 4}
                fillColor={getColor(report.type)}
                color="#fff"
                weight={2}
                opacity={0.9}
                fillOpacity={0.7}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-bold text-sm mb-1 text-foreground">{report.type.replace(/_/g, " ")}</h3>
                    <p className="text-xs mb-1 text-foreground">{report.description}</p>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                    <p className="text-xs font-semibold mt-1 text-foreground">Intensity: {report.intensity}/10</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-card border-2 border-[#f59e0b]/30 rounded-lg p-3 md:p-4 hover:shadow-lg hover:shadow-[#f59e0b]/20 transition-all hover:scale-105">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: "#f59e0b" }} />
              <span className="text-xs md:text-sm font-medium">{t("ocean_debris")}</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-[#f59e0b]">{reports.OCEAN_DEBRIS.length}</p>
          </div>
          <div className="bg-card border-2 border-[#ef4444]/30 rounded-lg p-3 md:p-4 hover:shadow-lg hover:shadow-[#ef4444]/20 transition-all hover:scale-105">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: "#ef4444" }} />
              <span className="text-xs md:text-sm font-medium">{t("tsunami_warnings")}</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-[#ef4444]">{reports.TSUNAMI_WARNING.length}</p>
          </div>
          <div className="bg-card border-2 border-[#f97316]/30 rounded-lg p-3 md:p-4 hover:shadow-lg hover:shadow-[#f97316]/20 transition-all hover:scale-105">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: "#f97316" }} />
              <span className="text-xs md:text-sm font-medium">{t("cyclone_warnings")}</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-[#f97316]">{reports.CYCLONE_WARNING.length}</p>
          </div>
          <div className="bg-card border-2 border-[#06b6d4]/30 rounded-lg p-3 md:p-4 hover:shadow-lg hover:shadow-[#06b6d4]/20 transition-all hover:scale-105">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full" style={{ backgroundColor: "#06b6d4" }} />
              <span className="text-xs md:text-sm font-medium">{t("flood_alerts")}</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-[#06b6d4]">{reports.FLOOD_ALERT.length}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
