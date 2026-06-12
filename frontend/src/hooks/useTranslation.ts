import { useLanguageContext } from '../contexts/LanguageContext'

/**
 * Translation hook.
 * Returns `t` for the active dictionary and language controls.
 */
export function useTranslation() {
  const { dict, language, setLanguage } = useLanguageContext()
  return { t: dict, language, setLanguage }
}
