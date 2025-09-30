"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { reports as reportsImport } from "@/lib/mock-data"

export default function AnalyticsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [reports, setReports] = useState<typeof reportsImport | null>(null)

  useEffect(() => {
    setMounted(true)
    setReports(reportsImport)

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const isAdmin = localStorage.getItem("isAdmin") === "true"

    if (!isLoggedIn || !isAdmin) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("isAdmin")
    router.push("/home")
  }

  const hazardData = useMemo(() => {
    if (!reports) return []
    return [
      { name: t("ocean_debris"), count: reports.OCEAN_DEBRIS.length, color: "#f59e0b" },
      { name: t("tsunami_warnings"), count: reports.TSUNAMI_WARNING.length, color: "#ef4444" },
      { name: t("cyclone_warnings"), count: reports.CYCLONE_WARNING.length, color: "#f97316" },
      { name: t("flood_alerts"), count: reports.FLOOD_ALERT.length, color: "#06b6d4" },
    ]
  }, [t, reports])

  const timeSeriesData = useMemo(() => {
    if (!reports) return []

    const allReports = [
      ...reports.OCEAN_DEBRIS,
      ...reports.TSUNAMI_WARNING,
      ...reports.CYCLONE_WARNING,
      ...reports.FLOOD_ALERT,
    ]

    const monthlyData: Record<
      string,
      { month: string; count: number; debris: number; tsunami: number; cyclone: number; flood: number }
    > = {}

    allReports.forEach((report) => {
      const date = new Date(report.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          count: 0,
          debris: 0,
          tsunami: 0,
          cyclone: 0,
          flood: 0,
        }
      }

      monthlyData[monthKey].count++

      if (report.type === "OCEAN_DEBRIS") monthlyData[monthKey].debris++
      if (report.type === "TSUNAMI_WARNING") monthlyData[monthKey].tsunami++
      if (report.type === "CYCLONE_WARNING") monthlyData[monthKey].cyclone++
      if (report.type === "FLOOD_ALERT") monthlyData[monthKey].flood++
    })

    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month))
  }, [reports])

  const totalReports = hazardData.reduce((sum, item) => sum + item.count, 0)

  if (!mounted || !reports) {
    return (
      <main className="min-h-screen px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("analytics_title")}</h1>
            <p className="text-sm md:text-base text-muted-foreground">{t("analytics_subtitle")}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm md:text-base bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            {t("logout")}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-card border-2 border-primary/30 rounded-lg p-3 md:p-6 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">{t("total_reports")}</p>
            <p className="text-2xl md:text-3xl font-bold text-primary">{totalReports}</p>
          </div>
          <div className="bg-card border-2 border-[#f59e0b]/30 rounded-lg p-3 md:p-6 hover:shadow-lg hover:shadow-[#f59e0b]/20 hover:scale-105 transition-all">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">{t("ocean_debris")}</p>
            <p className="text-2xl md:text-3xl font-bold text-[#f59e0b]">{reports.OCEAN_DEBRIS.length}</p>
          </div>
          <div className="bg-card border-2 border-[#ef4444]/30 rounded-lg p-3 md:p-6 hover:shadow-lg hover:shadow-[#ef4444]/20 hover:scale-105 transition-all">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">{t("critical_warnings")}</p>
            <p className="text-2xl md:text-3xl font-bold text-[#ef4444]">
              {reports.TSUNAMI_WARNING.length + reports.CYCLONE_WARNING.length}
            </p>
          </div>
          <div className="bg-card border-2 border-[#06b6d4]/30 rounded-lg p-3 md:p-6 hover:shadow-lg hover:shadow-[#06b6d4]/20 hover:scale-105 transition-all">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">{t("flood_alerts")}</p>
            <p className="text-2xl md:text-3xl font-bold text-[#06b6d4]">{reports.FLOOD_ALERT.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Bar Chart - Hazard Distribution */}
          <div className="bg-card border-2 border-primary/20 rounded-lg p-4 md:p-6 shadow-xl">
            <h2 className="text-lg md:text-xl font-bold mb-4">{t("hazard_distribution")}</h2>
            <div style={{ width: "100%", height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hazardData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    style={{ fontSize: "11px" }}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      color: "#111827",
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {hazardData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart - Hazard Types */}
          <div className="bg-card border-2 border-primary/20 rounded-lg p-4 md:p-6 shadow-xl">
            <h2 className="text-lg md:text-xl font-bold mb-4">{t("hazard_types")}</h2>
            <div style={{ width: "100%", height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hazardData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="count"
                    style={{ fontSize: "12px", fontWeight: "bold" }}
                  >
                    {hazardData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      color: "#111827",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-card border-2 border-primary/20 rounded-lg p-4 md:p-6 shadow-xl mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">{t("hazard_trends")}</h2>
          <div style={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  style={{ fontSize: "11px" }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: "#111827",
                  }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "11px" }} />
                <Line
                  type="monotone"
                  dataKey="debris"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name={t("ocean_debris")}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="tsunami"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name={t("tsunami_warnings")}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="cyclone"
                  stroke="#f97316"
                  strokeWidth={2}
                  name={t("cyclone_warnings")}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="flood"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  name={t("flood_alerts")}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Reports Table */}
        <div className="bg-card border-2 border-primary/20 rounded-lg p-4 md:p-6 shadow-xl">
          <h2 className="text-lg md:text-xl font-bold mb-4">{t("recent_reports")}</h2>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-primary/20">
                  <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium">{t("type")}</th>
                  <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium">
                    {t("location")}
                  </th>
                  <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium">{t("date")}</th>
                  <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium">
                    {t("intensity")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...reports.OCEAN_DEBRIS.slice(0, 5)].map((report) => (
                  <tr key={report.id} className="border-b border-border/50 hover:bg-accent/10 transition-colors">
                    <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{report.type.replace(/_/g, " ")}</td>
                    <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">
                      {report.lat.toFixed(2)}, {report.lng.toFixed(2)}
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{report.date}</td>
                    <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">
                      {(report.intensity * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
