export const TELEGRAM_USERNAME =
  import.meta.env.VITE_TELEGRAM_USERNAME || 'theaminasoul'

export function getTelegramOrderUrl(message: string): string {
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`
}
