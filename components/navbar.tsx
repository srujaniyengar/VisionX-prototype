"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"
import { useTheme } from "next-themes"
import { FaSun, FaMoon, FaHome, FaExclamationTriangle, FaMapMarkedAlt, FaBook, FaChartBar } from "react-icons/fa"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { label: t("nav_home"), link: "/home", icon: FaHome },
    { label: t("nav_report"), link: "/report", icon: FaExclamationTriangle },
    { label: t("nav_map"), link: "/map", icon: FaMapMarkedAlt },
    { label: t("nav_tutorial"), link: "/tutorial", icon: FaBook },
    { label: t("nav_admin"), link: "/analytics", icon: FaChartBar },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold bg-gradient-to-r from-[var(--ocean-blue)] via-[var(--deep-teal)] to-[var(--royal-gold)] bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              {t("homepage_title")}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.link
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="text-base" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg bg-card border border-border hover:bg-accent transition-all"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
            </button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2 pb-3 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.link
            return (
              <Link
                key={item.link}
                href={item.link}
                className={`flex flex-col items-center justify-center min-w-[70px] px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <Icon className="text-lg mb-1" />
                <span className="text-[10px] leading-tight text-center">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
