import type { Language } from '../translations'

export function formatDate(iso: string | undefined, language: Language) {
  if (!iso) return ''
  const locale = language === 'pt-BR' ? 'pt-BR' : 'en-US'
  return new Date(iso).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
