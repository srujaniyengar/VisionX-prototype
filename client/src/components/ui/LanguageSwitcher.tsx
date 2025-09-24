import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "ta", label: "தமிழ்" },
  { code: "hi", label: "हिंदी" }
];

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  return (
    <div style={{
      position: "fixed",
      top: 20,
      left: 20,
      zIndex: 1000,
      background: "rgba(255,255,255,0.85)",
      borderRadius: "6px",
      padding: "0.4em 1em",
      display: "flex",
      alignItems: "center",
      gap: "0.8em",
      boxShadow: "0 2px 6px rgba(0,0,0,0.07)"
    }}>
      <span style={{ fontWeight: 600, fontSize: 14 }}>{t("language")}:</span>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          style={{
            background: i18n.language === lang.code ? "#5227ff" : "transparent",
            color: i18n.language === lang.code ? "#fff" : "#222",
            border: "none",
            padding: "0.3em 0.8em",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14,
            transition: "background 0.2s"
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;