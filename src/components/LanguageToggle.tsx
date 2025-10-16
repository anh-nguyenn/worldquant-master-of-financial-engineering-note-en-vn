"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-black hover:text-gray-600 transition-colors border border-gray-300 rounded-md hover:border-black"
      aria-label={`Switch to ${language === "en" ? "Vietnamese" : "English"}`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <span className="hidden sm:inline">
        {language === "en" ? "VI" : "EN"}
      </span>
      <span className="sm:hidden">{language === "en" ? "🇻🇳" : "🇺🇸"}</span>
    </button>
  );
}
