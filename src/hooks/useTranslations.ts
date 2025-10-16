import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation, translations } from "@/lib/translations";

export function useTranslations() {
  const { language } = useLanguage();

  const t = (key: keyof typeof translations.en) =>
    getTranslation(key, language);

  return { t, language };
}
