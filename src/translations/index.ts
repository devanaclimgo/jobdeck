import { en } from './en'
import { ptBR } from './pt-BR'

export const translations = {
  en,
  'pt-BR': ptBR,
} as const

export type Language = keyof typeof translations

export const languageMeta: Record<
  Language,
  { label: string; flag: string }
> = {
  en: { label: 'English', flag: '🇬🇧' },
  'pt-BR': { label: 'Português', flag: '🇧🇷' },
}

export { en, ptBR }
