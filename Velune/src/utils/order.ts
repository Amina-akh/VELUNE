import { OrderFormData, Occasion, Budget, DeliveryType } from '../types/order'

const OCCASION_LABELS: Record<Occasion, string> = {
  birthday: 'День рождения',
  anniversary: 'Годовщина / важная дата',
  'first-date': 'Первое свидание',
  apology: 'Извинения',
  'no-reason': 'Без повода',
  holiday: 'Праздник',
  other: 'Другое',
}

const BUDGET_LABELS: Record<Budget, string> = {
  '3900-4900': '3 900 – 4 900 ₽',
  '5000-6900': '5 000 – 6 900 ₽',
  '7900-9900': '7 900 – 9 900 ₽',
  '10000+': 'от 10 000 ₽',
}

const BUDGET_ORDER: Budget[] = ['3900-4900', '5000-6900', '7900-9900', '10000+']

const DELIVERY_LABELS: Record<DeliveryType, string> = {
  address: 'На адрес',
  hands: 'Вручить лично в руки',
  reception: 'Оставить у ресепшена',
  anonymous: 'Анонимная доставка',
}

export function formatOrderMessage(order: OrderFormData, orderId: string): string {
  const occasion =
    order.occasion === 'other'
      ? order.occasionOther
      : order.occasion
        ? OCCASION_LABELS[order.occasion]
        : '—'

  const block = (title: string, lines: (string | null | undefined)[]) => {
    const body = lines.filter(Boolean).join('\n')
    return body ? `${title}\n${body}` : ''
  }

  const sections = [
    `VELUNE — NEW ORDER`,
    `#${orderId}`,
  ]

  const client = block('[ CLIENT ]', [
    `Name · ${order.clientName}`,
    `Phone · ${order.phone}`,
    order.telegram ? `TG · ${order.telegram}` : null,
  ])

  const timing = block('[ TIMING ]', [
    `Occasion · ${occasion}`,
    `Date · ${order.deliveryDate || '—'}`,
    order.deliveryTime ? `Time · ${order.deliveryTime}` : null,
    order.isUrgent ? `Urgent · YES` : null,
  ])

  const her = block('[ HER ]', [
    order.herName ? `Name · ${order.herName}` : null,
    order.herAge ? `Age · ${order.herAge}` : null,
    `Character · ${order.herPersonality || '—'}`,
    `Likes · ${order.herLikes || '—'}`,
    `Dislikes · ${order.herDislikes || '—'}`,
    order.herStyle ? `Style · ${order.herStyle}` : null,
  ])

  const bouquet = block('[ BOUQUET ]', [
    `Budget · ${order.budget ? BUDGET_LABELS[order.budget] : '—'}`,
    order.colorPreference ? `Colors · ${order.colorPreference}` : null,
    order.notes ? `Notes · ${order.notes}` : null,
  ])

  const delivery = block('[ DELIVERY ]', [
    `Type · ${order.deliveryType ? DELIVERY_LABELS[order.deliveryType] : '—'}`,
    order.anonymous ? `Anonymous · YES` : null,
    `Address · ${order.address || '—'}`,
    order.recipientPhone ? `Recipient · ${order.recipientPhone}` : null,
    order.cardMessage ? `Card · ${order.cardMessage}` : null,
  ])

  return [...sections, '', client, '', timing, '', her, '', bouquet, '', delivery]
    .filter((s) => s !== '')
    .join('\n')
}

export function generateOrderId(): string {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `V${date}-${rand}`
}

export function saveOrder(order: OrderFormData): string {
  const id = generateOrderId()
  const saved = {
    ...order,
    id,
    createdAt: new Date().toISOString(),
    status: 'pending' as const,
  }

  const existing = JSON.parse(localStorage.getItem('velune_orders') || '[]')
  existing.push(saved)
  localStorage.setItem('velune_orders', JSON.stringify(existing))

  return id
}

export { OCCASION_LABELS, BUDGET_LABELS, BUDGET_ORDER, DELIVERY_LABELS }
