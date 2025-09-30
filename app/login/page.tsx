"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

export default function LoginPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("isAdmin", "true")
      router.push("/analytics")
    } else {
      setError(t("invalid_credentials"))
    }
  }

  return (
    <main className="min-h-screen px-4 py-8 md:py-16 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{t("login_title")}</h1>
          <p className="text-sm md:text-base text-muted-foreground">{t("login_subtitle")}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border-2 border-primary/20 rounded-lg p-4 md:p-6 space-y-4 md:space-y-6 shadow-xl"
        >
          {error && (
            <div className="bg-destructive/10 border-2 border-destructive text-destructive-foreground px-3 py-2 md:px-4 md:py-3 rounded-lg text-xs md:text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              {t("username")}
            </label>
            <input
              id="username"
              type="text"
              required
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-input border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder={t("username")}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              {t("password")}
            </label>
            <input
              id="password"
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-3 py-2 md:px-4 md:py-2 text-sm md:text-base bg-input border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder={t("password")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl hover:shadow-primary/30"
          >
            {t("sign_in")}
          </button>

          <div className="text-center text-xs md:text-sm text-muted-foreground">
            <p>{t("demo_credentials")}</p>
            <p className="font-mono">admin / admin123</p>
          </div>
        </form>
      </div>
    </main>
  )
}
